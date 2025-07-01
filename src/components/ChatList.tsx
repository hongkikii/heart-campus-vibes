import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Chat {
  id: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isExpiring?: boolean;
  timeLeft?: string;
}

const mockChats: Chat[] = [
  {
    id: '1',
    userName: '김하늘',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c4?w=150&h=150&fit=crop&crop=face',
    lastMessage: '안녕하세요! 하트 보내주셔서 감사해요 ☺️',
    timestamp: '2분 전',
    unreadCount: 2,
    isExpiring: true,
    timeLeft: '22시간'
  },
  {
    id: '2',
    userName: '이준서',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastMessage: '오늘 같이 점심 먹을래요?',
    timestamp: '1시간 전',
    unreadCount: 0
  },
  {
    id: '3',
    userName: '박지민',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lastMessage: '과제 같이 하실래요?',
    timestamp: '3시간 전',
    unreadCount: 1
  },
];

export function ChatList() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gradient">채팅</h2>
        <Badge variant="secondary" className="bg-gradient-warm text-secondary-foreground">
          {mockChats.filter(chat => chat.unreadCount > 0).length}개의 새 메시지
        </Badge>
      </div>

      {mockChats.length === 0 ? (
        <Card className="glass-card p-8 text-center">
          <div className="text-6xl mb-4 animate-float">💬</div>
          <h3 className="text-lg font-semibold mb-2">아직 채팅이 없어요</h3>
          <p className="text-muted-foreground">하트를 보내서 새로운 인연을 만들어보세요!</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {mockChats.map((chat) => (
            <Card key={chat.id} className="glass-card p-4 cursor-pointer hover:shadow-card transition-all duration-300 hover:scale-[1.01]">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="w-14 h-14 border-2 border-primary/20">
                    <img src={chat.userAvatar} alt={chat.userName} className="w-full h-full object-cover" />
                  </Avatar>
                  {chat.unreadCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground min-w-[20px] h-5 flex items-center justify-center p-1">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">{chat.userName}</h3>
                    <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  {chat.isExpiring && (
                    <div className="flex items-center mt-2">
                      <Badge variant="outline" className="text-xs border-destructive/50 text-destructive">
                        ⏰ {chat.timeLeft} 후 만료
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}