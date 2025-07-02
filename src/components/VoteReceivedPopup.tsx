import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VoteReceivedPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  votes: Array<{
    compliment: string;
    count: number;
    emoji: string;
  }>;
}

export function VoteReceivedPopup({ 
  isOpen, 
  onOpenChange, 
  votes 
}: VoteReceivedPopupProps) {
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowSparkles(true);
      const timer = setTimeout(() => setShowSparkles(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const totalVotes = votes.reduce((sum, vote) => sum + vote.count, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-secondary/20 max-w-sm mx-auto">
        <DialogHeader className="text-center space-y-6">
          {/* Sparkles Animation */}
          {showSparkles && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 80}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: '2s'
                  }}
                >
                  {['✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 4)]}
                </div>
              ))}
            </div>
          )}

          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center animate-glow">
                <span className="text-4xl animate-float">🎯</span>
              </div>
              <div className="absolute -top-1 -right-1 animate-bounce">
                <span className="text-2xl">✨</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <DialogTitle className="text-2xl font-bold text-gradient">
            🎉 새로운 칭찬이 도착했어요! 🎉
          </DialogTitle>

          {/* Vote Summary */}
          <div className="bg-gradient-secondary/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-3xl">🏆</span>
              <p className="text-lg font-semibold">
                총 <span className="text-secondary">{totalVotes}개</span>의 칭찬
              </p>
            </div>
            
            <div className="space-y-2">
              {votes.map((vote, index) => (
                <div key={index} className="flex items-center justify-between bg-card/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{vote.emoji}</span>
                    <span className="text-sm font-medium">{vote.compliment}</span>
                  </div>
                  <Badge className="bg-secondary text-secondary-foreground">
                    {vote.count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Motivational Message */}
          <div className="bg-gradient-warm/10 rounded-lg p-3">
            <p className="text-sm text-muted-foreground">
              💝 누군가가 당신을 특별하게 생각하고 있어요!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 pt-4">
            <Button 
              onClick={() => onOpenChange(false)}
              className="bg-gradient-secondary hover:shadow-card transition-all duration-300"
            >
              🎯 더 많은 칭찬 확인하기
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