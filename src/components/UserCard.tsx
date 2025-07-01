import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Import Korean profile images
import profileGirl1 from '@/assets/profile-girl-1.jpg';
import profileBoy1 from '@/assets/profile-boy-1.jpg';
import profileGirl2 from '@/assets/profile-girl-2.jpg';
import profileBoy2 from '@/assets/profile-boy-2.jpg';
import profileGirl3 from '@/assets/profile-girl-3.jpg';
import profileBoy3 from '@/assets/profile-boy-3.jpg';

interface User {
  id: string;
  name: string;
  department: string;
  year: number;
  distance: string;
  avatar: string;
  isOnline: boolean;
}

interface UserCardProps {
  user: User;
  onHeartSent: (userId: string, type: 'anonymous' | 'real') => void;
  onVote: (userId: string, compliment: string) => void;
}

const compliments = [
  { text: "혹시 3대 500?", emoji: "💪", color: "bg-red-100 border-red-300 text-red-700" },
  { text: "선배님 밥 사주세요!", emoji: "🍚", color: "bg-orange-100 border-orange-300 text-orange-700" },
  { text: "이 강의실의 패피는 너야!", emoji: "👑", color: "bg-yellow-100 border-yellow-300 text-yellow-700" },
  { text: "완전 친화력 갑!", emoji: "🌟", color: "bg-green-100 border-green-300 text-green-700" },
  { text: "센스가 정말 좋으시네요", emoji: "✨", color: "bg-blue-100 border-blue-300 text-blue-700" },
  { text: "스타일이 완전 취저!", emoji: "🔥", color: "bg-purple-100 border-purple-300 text-purple-700" }
];

export function UserCard({ user, onHeartSent, onVote }: UserCardProps) {
  const [showHeartModal, setShowHeartModal] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [heartSent, setHeartSent] = useState(false);

  const handleHeartSend = (type: 'anonymous' | 'real') => {
    onHeartSent(user.id, type);
    setHeartSent(true);
    setShowHeartModal(false);
    
    // Reset after animation
    setTimeout(() => setHeartSent(false), 600);
  };

  const handleVote = (compliment: string) => {
    onVote(user.id, compliment);
    setShowVoteModal(false);
  };

  return (
    <Card className="glass-card p-4 transition-all duration-300 hover:shadow-card hover:scale-[1.02]">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar className="w-16 h-16 border-2 border-primary/20">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </Avatar>
          {user.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary rounded-full border-2 border-card animate-glow"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground truncate">{user.name}</h3>
          <p className="text-muted-foreground text-sm">{user.department} {user.year}학년</p>
          <Badge variant="outline" className="mt-1 text-xs">
            📍 {user.distance}
          </Badge>
        </div>

        <div className="flex flex-col space-y-2">
          <Dialog open={showHeartModal} onOpenChange={setShowHeartModal}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                className={`heart-button bg-gradient-primary hover:bg-gradient-primary/90 ${heartSent ? 'animate-heartbeat' : ''}`}
              >
                💗
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-gradient">하트 보내기</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4 p-4">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 relative">
                    <Avatar className="w-full h-full border-4 border-primary/30">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </Avatar>
                  </div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-muted-foreground">{user.department} {user.year}학년</p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleHeartSend('real')}
                    className="w-full bg-gradient-primary hover:bg-gradient-primary/90 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg">💗</span>
                      <span className="font-semibold">실명 하트 보내기</span>
                    </div>
                    <span className="block text-xs opacity-80 mt-1">✨ 즉시 채팅방이 열려요!</span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </Button>
                  
                  <Button 
                    onClick={() => handleHeartSend('anonymous')}
                    variant="outline"
                    className="w-full border-primary/30 hover:bg-primary/5 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg">🤫</span>
                      <span className="font-semibold">익명 하트 보내기</span>
                    </div>
                    <span className="block text-xs opacity-80 mt-1">🎯 상대도 보내면 서로 공개돼요!</span>
                    <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showVoteModal} onOpenChange={setShowVoteModal}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="border-secondary/50 hover:bg-secondary/10">
                🎯
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-gradient">칭찬하기</DialogTitle>
              </DialogHeader>
              <div className="p-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-3 relative">
                    <Avatar className="w-full h-full border-2 border-secondary/30">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </Avatar>
                    <div className="absolute -top-1 -right-1 text-xl animate-bounce">🎯</div>
                  </div>
                  <h3 className="font-semibold text-gradient">{user.name}님에게</h3>
                  <p className="text-muted-foreground text-sm">💌 어떤 칭찬을 보낼까요?</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {compliments.map((compliment, index) => (
                    <Button
                      key={index}
                      onClick={() => handleVote(compliment.text)}
                      variant="outline"
                      className="text-left justify-start hover:bg-accent/50 transition-all duration-300 p-4 h-auto relative overflow-hidden group border-l-4"
                      style={{ borderLeftColor: `hsl(var(--primary))` }}
                    >
                      <div className="flex items-start space-x-3 w-full">
                        <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {compliment.emoji}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-base leading-tight">{compliment.text}</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </Button>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );
}