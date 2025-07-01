import { useState } from 'react';
import { UserCard } from '@/components/UserCard';
import { BottomNavigation } from '@/components/BottomNavigation';
import { ChatList } from '@/components/ChatList';
import { ProfilePage } from '@/components/ProfilePage';
import { useToast } from '@/hooks/use-toast';

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

const mockUsers: User[] = [
  {
    id: '1',
    name: '이준서',
    department: '컴퓨터공학과',
    year: 4,
    distance: '50m',
    avatar: profileBoy1,
    isOnline: true
  },
  {
    id: '2',
    name: '박지민',
    department: '경영학과',
    year: 3,
    distance: '120m',
    avatar: profileGirl2,
    isOnline: false
  },
  {
    id: '3',
    name: '최민수',
    department: '디자인학과',
    year: 2,
    distance: '200m',
    avatar: profileBoy2,
    isOnline: true
  },
  {
    id: '4',
    name: '정수연',
    department: '심리학과',
    year: 1,
    distance: '350m',
    avatar: profileGirl3,
    isOnline: false
  },
  {
    id: '5',
    name: '김태현',
    department: '체육학과',
    year: 3,
    distance: '450m',
    avatar: profileBoy3,
    isOnline: true
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { toast } = useToast();

  const handleHeartSent = (userId: string, type: 'anonymous' | 'real') => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      if (type === 'real') {
        toast({
          title: "💗 실명 하트 전송 완료!",
          description: `✨ ${user.name}님에게 하트를 보냈습니다. 채팅방이 24시간 동안 열렸어요!`,
          duration: 4000
        });
      } else {
        toast({
          title: "🤫 익명 하트 전송 완료!",
          description: `🎯 ${user.name}님에게 익명 하트를 보냈습니다. 상대도 보내면 서로 공개돼요!`,
          duration: 4000
        });
      }
    }
  };

  const handleVote = (userId: string, compliment: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      toast({
        title: "🎯 칭찬 전송 완료!",
        description: `💌 ${user.name}님에게 "${compliment}" 칭찬을 보냈습니다!`,
        duration: 4000
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-4xl animate-float">💗</span>
                <h1 className="text-3xl font-bold text-gradient">주변 사람들</h1>
                <span className="text-4xl animate-float" style={{ animationDelay: '0.5s' }}>✨</span>
              </div>
              <p className="text-muted-foreground">🎯 가까운 거리에 있는 친구들에게 하트와 칭찬을 보내보세요!</p>
            </div>
            
            <div className="space-y-4">
              {mockUsers.map((user) => (
                <UserCard 
                  key={user.id}
                  user={user}
                  onHeartSent={handleHeartSent}
                  onVote={handleVote}
                />
              ))}
            </div>
          </div>
        );
      
      case 'chat':
        return <ChatList />;
      
      case 'profile':
        return <ProfilePage />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl animate-float">💗</div>
              <h1 className="text-xl font-bold text-gradient">Campus Heart</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-glow"></div>
              <span className="text-sm text-muted-foreground">온라인</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 py-6 pb-20">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
