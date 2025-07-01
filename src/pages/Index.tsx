import { useState } from 'react';
import { UserCard } from '@/components/UserCard';
import { BottomNavigation } from '@/components/BottomNavigation';
import { ChatList } from '@/components/ChatList';
import { ProfilePage } from '@/components/ProfilePage';
import { useToast } from '@/hooks/use-toast';

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
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isOnline: true
  },
  {
    id: '2',
    name: '박지민',
    department: '경영학과',
    year: 3,
    distance: '120m',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isOnline: false
  },
  {
    id: '3',
    name: '최민수',
    department: '디자인학과',
    year: 2,
    distance: '200m',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isOnline: true
  },
  {
    id: '4',
    name: '정수연',
    department: '심리학과',
    year: 1,
    distance: '350m',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c4?w=150&h=150&fit=crop&crop=face',
    isOnline: false
  },
  {
    id: '5',
    name: '김태현',
    department: '체육학과',
    year: 3,
    distance: '450m',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
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
          description: `${user.name}님에게 하트를 보냈습니다. 채팅방이 24시간 동안 열렸어요!`,
          duration: 3000
        });
      } else {
        toast({
          title: "😶 익명 하트 전송 완료!",
          description: `${user.name}님에게 익명 하트를 보냈습니다. 상대도 보내면 서로 공개돼요!`,
          duration: 3000
        });
      }
    }
  };

  const handleVote = (userId: string, compliment: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      toast({
        title: "🎯 칭찬 전송 완료!",
        description: `${user.name}님에게 "${compliment}" 칭찬을 보냈습니다!`,
        duration: 3000
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <h1 className="text-3xl font-bold text-gradient mb-2">주변 사람들</h1>
              <p className="text-muted-foreground">가까운 거리에 있는 친구들에게 하트와 칭찬을 보내보세요!</p>
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
