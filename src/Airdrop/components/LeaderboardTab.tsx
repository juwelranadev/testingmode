import React from 'react';
import { Trophy, Medal, Crown, Star, TrendingUp } from 'lucide-react';
import { LeaderboardUser } from '../types';

interface LeaderboardTabProps {
  users: LeaderboardUser[];
  currentBalance: number;
}

const LeaderboardTab: React.FC<LeaderboardTabProps> = ({ users, currentBalance }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-gray-400 font-bold">{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 2: return 'bg-gradient-to-r from-gray-400 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-600 to-yellow-600';
      default: return 'bg-white/10';
    }
  };

  // Find current user's rank (assuming they're not in the top 5)
  const currentUserRank = 42; // This would be calculated based on currentBalance

  return (
    <div className="p-6 space-y-6">
      {/* Current User Stats */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold">Your Ranking</h3>
            <p className="text-cyan-100 text-sm">Keep earning to climb the leaderboard!</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">#{currentUserRank}</div>
            <div className="text-sm text-cyan-100">Rank</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">{currentBalance}</div>
            <div className="text-sm text-cyan-100">Total Coins</div>
          </div>
          <TrendingUp className="w-8 h-8 text-cyan-200" />
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h3 className="text-lg font-bold text-white">Top Performers</h3>
        </div>
        
        <div className="space-y-3">
          {users.map((user, index) => (
            <div
              key={user.id}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-300 ${
                getRankColor(user.rank)
              } ${
                user.rank <= 3 
                  ? 'border-yellow-400/50 shadow-lg shadow-yellow-400/20' 
                  : 'border-gray-600/50'
              }`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                {getRankIcon(user.rank)}
              </div>

              {/* Avatar */}
              <div className="text-2xl">{user.avatar}</div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white">{user.username}</h4>
                  <div className="flex items-center gap-1 text-xs text-gray-300">
                    <Star className="w-3 h-3" />
                    Level {user.level}
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  {user.coins.toLocaleString()} coins
                </div>
              </div>

              {/* Rewards */}
              {user.rank <= 3 && (
                <div className="text-right">
                  <div className="text-xs text-yellow-400 font-bold">
                    {user.rank === 1 && '🏆 Champion'}
                    {user.rank === 2 && '🥈 Runner-up'}
                    {user.rank === 3 && '🥉 Bronze'}
                  </div>
                  <div className="text-xs text-gray-300">
                    +{user.rank === 1 ? '1000' : user.rank === 2 ? '500' : '250'} bonus
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Info */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50">
        <h3 className="text-lg font-bold text-white mb-4">Leaderboard Rewards</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">1st Place</span>
            </div>
            <span className="text-yellow-400 font-bold">+1000 coins</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-400/20 to-gray-500/20 rounded-lg border border-gray-400/30">
            <div className="flex items-center gap-3">
              <Medal className="w-5 h-5 text-gray-400" />
              <span className="text-white font-medium">2nd Place</span>
            </div>
            <span className="text-gray-400 font-bold">+500 coins</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-lg border border-amber-600/30">
            <div className="flex items-center gap-3">
              <Medal className="w-5 h-5 text-amber-600" />
              <span className="text-white font-medium">3rd Place</span>
            </div>
            <span className="text-amber-400 font-bold">+250 coins</span>
          </div>
        </div>
      </div>

      {/* How to Climb */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
        <h3 className="text-lg font-bold text-purple-400 mb-4">How to Climb the Leaderboard</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <span className="text-white font-medium">Complete Daily Tasks</span>
              <p className="text-purple-200">Earn coins by completing all available tasks</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <span className="text-white font-medium">Watch Ads Regularly</span>
              <p className="text-purple-200">Consistent ad watching adds up quickly</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <span className="text-white font-medium">Invite Friends</span>
              <p className="text-purple-200">Referral bonuses can boost your ranking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTab; 