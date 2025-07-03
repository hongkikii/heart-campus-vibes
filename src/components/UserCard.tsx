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
  onMessageSent: (userId: string, message: string) => void;
  onSeedSent: (userId: string) => void;
  onComplimentSent: (userId: string, compliment: string) => void;
}

const compliments = [
  { text: "혹시 3대 500?", emoji: "💪" },
  { text: "이 강의실의 패피는 너야", emoji: "👚" },
  { text: "페이커 뺨 칠 거 같음", emoji: "🎮" },
  { text: "과탑일 거 같아요", emoji: "💯" },
  { text: "완전 친화력 갑!", emoji: "🌟" },
  { text: "센스가 정말 좋으시네요", emoji: "✨" }
];

export function UserCard({ user, onMessageSent, onSeedSent, onComplimentSent }: UserCardProps) {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showSeedModal, setShowSeedModal] = useState(false);
  const [showComplimentModal, setShowComplimentModal] = useState(false);
  const [message, setMessage] = useState('');
  const [actionSent, setActionSent] = useState('');

  const handleMessageSend = () => {
    if (message.trim() && message.length <= 30) {
      onMessageSent(user.id, message);
      setActionSent('message');
      setShowMessageModal(false);
      setMessage('');
      setTimeout(() => setActionSent(''), 600);
    }
  };

  const handleSeedSend = () => {
    onSeedSent(user.id);
    setActionSent('seed');
    setShowSeedModal(false);
    setTimeout(() => setActionSent(''), 600);
  };

  const handleComplimentSend = (compliment: string) => {
    onComplimentSent(user.id, compliment);
    setActionSent('compliment');
    setShowComplimentModal(false);
    setTimeout(() => setActionSent(''), 600);
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
          {/* 쪽지 보내기 */}
          <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                className={`bg-gradient-primary hover:bg-gradient-primary/90 ${actionSent === 'message' ? 'animate-pulse' : ''}`}
              >
                📩
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-gradient">📩 쪽지 보내기</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4 p-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 relative">
                    <Avatar className="w-full h-full border-2 border-primary/30">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </Avatar>
                  </div>
                  <h3 className="font-semibold text-lg">{user.name}님에게</h3>
                  <p className="text-muted-foreground text-sm">💌 하루 5개까지 보낼 수 있어요</p>
                </div>
                
                <div className="space-y-3">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="30자 이하로 메시지를 입력하세요..."
                    className="w-full p-3 border rounded-lg resize-none h-20 text-sm"
                    maxLength={30}
                  />
                  <div className="text-right text-xs text-muted-foreground">
                    {message.length}/30
                  </div>
                  <Button 
                    onClick={handleMessageSend}
                    className="w-full bg-gradient-primary hover:bg-gradient-primary/90"
                    disabled={!message.trim() || message.length > 30}
                  >
                    📤 쪽지 보내기
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* 씨앗 보내기 */}
          <Dialog open={showSeedModal} onOpenChange={setShowSeedModal}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                variant="outline" 
                className={`border-secondary/50 hover:bg-secondary/10 ${actionSent === 'seed' ? 'animate-pulse' : ''}`}
              >
                🌱
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-gradient">🌱 씨앗 보내기</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4 p-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 relative">
                    <Avatar className="w-full h-full border-2 border-secondary/30">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </Avatar>
                    <div className="absolute -top-1 -right-1 text-xl animate-bounce">🌱</div>
                  </div>
                  <h3 className="font-semibold text-lg">{user.name}님에게</h3>
                  <p className="text-muted-foreground text-sm">🤫 익명으로 관심을 표현해보세요</p>
                </div>
                
                <div className="bg-secondary/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    💡 씨앗을 보내면 상대방은 누가 보냈는지 모릅니다
                  </p>
                  <p className="text-sm text-muted-foreground">
                    🎯 서로 씨앗을 보내면 채팅방이 열려요!
                  </p>
                </div>
                
                <Button 
                  onClick={handleSeedSend}
                  className="w-full bg-gradient-secondary hover:bg-gradient-secondary/90"
                >
                  🌱 익명 씨앗 보내기
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* 칭찬하기 */}
          <Dialog open={showComplimentModal} onOpenChange={setShowComplimentModal}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                variant="outline" 
                className={`border-accent/50 hover:bg-accent/10 ${actionSent === 'compliment' ? 'animate-pulse' : ''}`}
              >
                🎯
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-gradient">🎯 칭찬하기</DialogTitle>
              </DialogHeader>
              <div className="p-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-3 relative">
                    <Avatar className="w-full h-full border-2 border-accent/30">
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
                      onClick={() => handleComplimentSend(compliment.text)}
                      variant="outline"
                      className="text-left justify-start hover:bg-accent/50 transition-all duration-300 p-4 h-auto relative overflow-hidden group border-l-4 border-accent/30"
                    >
                      <div className="flex items-start space-x-3 w-full">
                        <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {compliment.emoji}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-base leading-tight">{compliment.text}</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
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