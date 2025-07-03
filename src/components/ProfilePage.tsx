import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Import Korean profile image
import profileGirl1 from '@/assets/profile-girl-1.jpg';

interface Compliment {
  id: string;
  text: string;
  count: number;
  recentDate: string;
  emoji: string;
}

const mockProfile = {
  name: '김하늘',
  department: '경영학과',
  year: 2,
  avatar: profileGirl1,
  seedsReceived: 8,
  messagesSent: 12,
  complimentsReceived: 15
};

const mockCompliments: Compliment[] = [
  { id: '1', text: '이 강의실의 패피는 너야', count: 5, recentDate: '어제', emoji: '👚' },
  { id: '2', text: '페이커 뺨 칠 거 같음', count: 3, recentDate: '2일 전', emoji: '🎮' },
  { id: '3', text: '과탑일 거 같아요', count: 4, recentDate: '3일 전', emoji: '💯' },
  { id: '4', text: '혹시 3대 500?', count: 2, recentDate: '5일 전', emoji: '💪' },
  { id: '5', text: '완전 친화력 갑!', count: 1, recentDate: '1주일 전', emoji: '🌟' },
];

export function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="glass-card p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-primary/30">
              <img src={mockProfile.avatar} alt={mockProfile.name} className="w-full h-full object-cover" />
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-semibold">
              {mockProfile.year}학년
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gradient mb-2">{mockProfile.name}</h1>
            <p className="text-muted-foreground mb-4">{mockProfile.department}</p>
            
            <div className="flex space-x-6 justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">🌱</div>
                <div className="text-2xl font-bold text-primary">{mockProfile.seedsReceived}</div>
                <div className="text-xs text-muted-foreground">받은 씨앗</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">📩</div>
                <div className="text-2xl font-bold text-secondary">{mockProfile.messagesSent}</div>
                <div className="text-xs text-muted-foreground">보낸 쪽지</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">🎯</div>
                <div className="text-2xl font-bold text-accent">{mockProfile.complimentsReceived}</div>
                <div className="text-xs text-muted-foreground">받은 칭찬</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Settings */}
      <Card className="glass-card p-4">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xl">⚙️</span>
          <h3 className="font-semibold text-gradient">설정</h3>
        </div>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            🔔 알림 설정
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            🔒 프라이버시 설정
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            ❓ 도움말
          </Button>
          <Button variant="ghost" className="w-full justify-start text-destructive">
            🚪 로그아웃
          </Button>
        </div>
      </Card>

      {/* Received Compliments */}
      <Card className="glass-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🎯</span>
            <h3 className="font-semibold text-gradient">받은 칭찬</h3>
          </div>
          <Badge variant="secondary" className="bg-gradient-warm text-secondary-foreground">
            ✨ 총 {mockCompliments.reduce((sum, c) => sum + c.count, 0)}개
          </Badge>
        </div>
        
        {mockCompliments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3 animate-float">🎯</div>
            <p className="text-muted-foreground">아직 받은 칭찬이 없어요</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockCompliments.map((compliment) => (
              <div key={compliment.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-300 border-l-4 border-primary/30">
                <div className="flex items-center space-x-3 flex-1">
                  <span className="text-2xl flex-shrink-0">{compliment.emoji}</span>
                  <div className="flex-1">
                    <p className="font-medium">{compliment.text}</p>
                    <p className="text-xs text-muted-foreground">📅 {compliment.recentDate}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                  ✨ {compliment.count}명
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}