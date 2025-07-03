import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', icon: '🎓', label: '홈' },
  { id: 'chat', icon: '📩', label: '쪽지함' },
  { id: 'profile', icon: '👤', label: '마이' },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 z-50">
      <div className="max-w-lg mx-auto px-4 py-2">
        <div className="flex justify-around">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-4 ${
                activeTab === tab.id 
                  ? 'bg-gradient-primary text-primary-foreground shadow-glow' 
                  : 'hover:bg-muted/50'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}