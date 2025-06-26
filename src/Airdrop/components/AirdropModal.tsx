import React, { useState } from 'react';
import { ArrowLeft, Gift, Target, Users, Trophy } from 'lucide-react';
import { AirdropTask, LeaderboardUser, ReferralData } from '../types';
import TaskList from './TaskList';
import ReferralTab from './ReferralTab';
import LeaderboardTab from './LeaderboardTab';

interface AirdropModalProps {
  isOpen: boolean;
  onClose: () => void;
  airdropTasks: AirdropTask[];
  setAirdropTasks: React.Dispatch<React.SetStateAction<AirdropTask[]>>;
  airdropBalance: number;
  setAirdropBalance: React.Dispatch<React.SetStateAction<number>>;
  walletConnected: boolean;
  setWalletConnected: React.Dispatch<React.SetStateAction<boolean>>;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
}

const AirdropModal: React.FC<AirdropModalProps> = ({
  isOpen,
  onClose,
  airdropTasks,
  setAirdropTasks,
  airdropBalance,
  setAirdropBalance,
  walletConnected,
  setWalletConnected,
  setWalletAddress
}) => {
  const [airdropTab, setAirdropTab] = useState('tasks');

  const referralData: ReferralData = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarned: 2400,
    referralCode: 'iTONZI2024',
    referralLink: 'https://t.me/iTonziBot?start=iTONZI2024'
  };

  const leaderboardUsers: LeaderboardUser[] = [
    { id: 1, username: 'CryptoKing', coins: 15680, rank: 1, avatar: '👑', level: 8 },
    { id: 2, username: 'TONMaster', coins: 13450, rank: 2, avatar: '⚡', level: 7 },
    { id: 3, username: 'AirdropHunter', coins: 11250, rank: 3, avatar: '🎯', level: 6 },
    { id: 4, username: 'CoinCollector', coins: 9870, rank: 4, avatar: '💰', level: 5 },
    { id: 5, username: 'TaskMaster', coins: 8230, rank: 5, avatar: '🏆', level: 5 }
  ];

  const handleTaskComplete = (taskId: number) => {
    setAirdropTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, completed: true }
          : task
      )
    );
    const task = airdropTasks.find(t => t.id === taskId);
    if (task) {
      setAirdropBalance(prev => prev + task.reward);
    }
  };

  const connectWallet = () => {
    setWalletConnected(true);
    setWalletAddress('UQBx...7k9m');
    setAirdropTasks(prev =>
      prev.map(task =>
        task.id === 7
          ? { ...task, completed: true }
          : task
      )
    );
    setAirdropBalance(prev => prev + 200);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-400/30';
      case 'legendary': return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '⭐';
      case 'medium': return '⚡';
      case 'hard': return '👑';
      case 'legendary': return '🏆';
      default: return '⭐';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-2xl w-full h-full flex flex-col overflow-hidden border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                iTonzi Airdrop
              </h1>
              <p className="text-cyan-100 text-sm">Earn • Collect • Prosper</p>
            </div>

            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6 text-yellow-300" />
            </div>
          </div>

          {/* User Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="text-2xl font-bold text-yellow-400">
                {airdropBalance}
              </div>
              <div className="text-xs text-cyan-100">Balance</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="text-2xl font-bold text-green-400">
                {airdropTasks.filter(task => task.completed).length}
              </div>
              <div className="text-xs text-cyan-100">Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="text-2xl font-bold text-purple-400">42</div>
              <div className="text-xs text-cyan-100">Rank</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-black/40 backdrop-blur-sm border-b border-gray-700/50">
          <div className="flex">
            {[
              { id: 'tasks', label: 'Tasks', icon: Target },
              { id: 'referral', label: 'Referral', icon: Users },
              { id: 'leaderboard', label: 'Ranking', icon: Trophy }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAirdropTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 transition-all ${
                    airdropTab === tab.id
                      ? 'text-cyan-400 bg-cyan-400/10 border-b-2 border-cyan-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pb-6">
          {airdropTab === 'tasks' && (
            <TaskList 
              tasks={airdropTasks}
              onTaskComplete={handleTaskComplete}
              getDifficultyColor={getDifficultyColor}
              getDifficultyIcon={getDifficultyIcon}
              connectWallet={connectWallet}
              walletConnected={walletConnected}
            />
          )}
          
          {airdropTab === 'referral' && (
            <ReferralTab referralData={referralData} />
          )}
          
          {airdropTab === 'leaderboard' && (
            <LeaderboardTab 
              users={leaderboardUsers}
              currentBalance={airdropBalance}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AirdropModal; 