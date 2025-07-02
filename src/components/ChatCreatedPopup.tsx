import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

interface ChatCreatedPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  userAvatar: string;
  isRealNameHeart?: boolean;
}

export function ChatCreatedPopup({ 
  isOpen, 
  onOpenChange, 
  userName, 
  userAvatar,
  isRealNameHeart = false 
}: ChatCreatedPopupProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-primary/20 max-w-sm mx-auto">
        <DialogHeader className="text-center space-y-6">
          {/* Confetti Animation */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 50}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: '1.5s'
                  }}
                >
                  {['💗', '✨', '🎉', '💖', '🌟'][Math.floor(Math.random() * 5)]}
                </div>
              ))}
            </div>
          )}

          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-warm rounded-full flex items-center justify-center animate-pulse">
                <span className="text-4xl animate-float">💗</span>
              </div>
              <div className="absolute -top-2 -right-2 animate-bounce">
                <span className="text-2xl">🎉</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <DialogTitle className="text-2xl font-bold text-gradient">
            🎊 축하해요! 🎊
          </DialogTitle>

          {/* User Info */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-16 h-16 border-4 border-primary/30 shadow-glow">
              <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
            </Avatar>
            
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold">
                <span className="text-primary">{userName}</span>님과
              </p>
              <p className="text-lg font-semibold">
                채팅방이 생성되었어요! 💬
              </p>
              
              {isRealNameHeart ? (
                <p className="text-sm text-muted-foreground bg-gradient-warm/10 px-3 py-2 rounded-full">
                  ⏰ 24시간 동안 대화할 수 있어요
                </p>
              ) : (
                <p className="text-sm text-muted-foreground bg-gradient-warm/10 px-3 py-2 rounded-full">
                  💕 서로 마음이 통했어요!
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 pt-4">
            <Button 
              onClick={() => onOpenChange(false)}
              className="bg-gradient-warm hover:shadow-card transition-all duration-300"
            >
              💬 채팅 시작하기
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground"
            >
              나중에 확인하기
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}