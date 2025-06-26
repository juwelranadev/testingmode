import React, { useState } from 'react';
import { X, Zap, Star, Gift, TrendingUp, Calendar, Bell, CheckCircle, Clock, AlertCircle, Sparkles, Crown, Target, Users } from 'lucide-react';

interface UpdatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Update {
  id: string;
  type: 'feature' | 'improvement' | 'bugfix' | 'announcement' | 'event';
  title: string;
  description: string;
  date: string;
  version?: string;
  status: 'new' | 'active' | 'completed';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'promotion';
  date: string;
  urgent: boolean;
  action?: {
    label: string;
    url: string;
  };
}

const UpdatesModal: React.FC<UpdatesModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'updates' | 'announcements' | 'roadmap' | 'changelog'>('updates');
  const [filter, setFilter] = useState<'all' | 'feature' | 'improvement' | 'bugfix' | 'announcement' | 'event'>('all');

  const updates: Update[] = [
    {
      id: '1',
      type: 'feature',
      title: 'New Airdrop System',
      description: 'Introducing a comprehensive airdrop system with tasks, referrals, and leaderboards. Earn more coins through various activities!',
      date: '2024-01-15',
      version: 'v2.1.0',
      status: 'new',
      priority: 'high',
      tags: ['airdrop', 'earning', 'tasks']
    },
    {
      id: '2',
      type: 'improvement',
      title: 'Enhanced Payment System',
      description: 'Improved withdrawal processing with faster TON wallet transactions and better security measures.',
      date: '2024-01-14',
      version: 'v2.0.5',
      status: 'active',
      priority: 'medium',
      tags: ['payments', 'security', 'performance']
    },
    {
      id: '3',
      type: 'event',
      title: 'Weekly Competition Launch',
      description: 'Join our weekly leaderboard competition! Top performers win exclusive rewards and badges.',
      date: '2024-01-13',
      status: 'active',
      priority: 'high',
      tags: ['competition', 'rewards', 'leaderboard']
    },
    {
      id: '4',
      type: 'bugfix',
      title: 'Auto Ads Stability Fix',
      description: 'Fixed issues with auto ads not counting properly and improved overall stability.',
      date: '2024-01-12',
      version: 'v2.0.4',
      status: 'completed',
      priority: 'medium',
      tags: ['bugfix', 'ads', 'stability']
    },
    {
      id: '5',
      type: 'feature',
      title: 'Referral System Upgrade',
      description: 'Enhanced referral tracking with real-time statistics and bonus multipliers for active referrals.',
      date: '2024-01-11',
      version: 'v2.0.3',
      status: 'completed',
      priority: 'medium',
      tags: ['referral', 'tracking', 'bonuses']
    },
    {
      id: '6',
      type: 'announcement',
      title: 'Maintenance Schedule',
      description: 'Scheduled maintenance on January 20th from 2-4 AM UTC for system upgrades.',
      date: '2024-01-10',
      status: 'active',
      priority: 'low',
      tags: ['maintenance', 'schedule']
    }
  ];

  const announcements: Announcement[] = [
    {
      id: '1',
      title: '🎉 New Year Bonus Event!',
      message: 'Celebrate the new year with us! Double earnings on all activities until January 31st. Plus, complete special New Year tasks for exclusive rewards!',
      type: 'promotion',
      date: '2024-01-01',
      urgent: true,
      action: {
        label: 'Join Event',
        url: '#'
      }
    },
    {
      id: '2',
      title: '⚠️ Important Security Update',
      message: 'We\'ve implemented additional security measures to protect your account. Please review your account settings and enable two-factor authentication if you haven\'t already.',
      type: 'warning',
      date: '2024-01-14',
      urgent: false,
      action: {
        label: 'Update Settings',
        url: '#'
      }
    },
    {
      id: '3',
      title: '💰 Increased Withdrawal Limits',
      message: 'Good news! We\'ve increased daily withdrawal limits for verified users. Check your account to see your new limits.',
      type: 'success',
      date: '2024-01-13',
      urgent: false
    },
    {
      id: '4',
      title: '📱 Mobile App Coming Soon',
      message: 'We\'re working on a dedicated mobile app for iOS and Android. Stay tuned for updates and be among the first to try it!',
      type: 'info',
      date: '2024-01-12',
      urgent: false
    }
  ];

  const roadmapItems = [
    {
      quarter: 'Q1 2024',
      items: [
        { title: 'Mobile App Release', status: 'in-progress', description: 'Native iOS and Android applications' },
        { title: 'Advanced Analytics', status: 'planned', description: 'Detailed earning statistics and insights' },
        { title: 'Social Features', status: 'planned', description: 'Friend system and social interactions' }
      ]
    },
    {
      quarter: 'Q2 2024',
      items: [
        { title: 'NFT Integration', status: 'planned', description: 'Earn and trade exclusive NFTs' },
        { title: 'Staking System', status: 'planned', description: 'Stake coins for passive income' },
        { title: 'Premium Membership', status: 'planned', description: 'Exclusive benefits for premium users' }
      ]
    },
    {
      quarter: 'Q3 2024',
      items: [
        { title: 'DeFi Integration', status: 'research', description: 'Connect with DeFi protocols' },
        { title: 'Governance Token', status: 'research', description: 'Community governance system' },
        { title: 'Cross-chain Support', status: 'research', description: 'Support for multiple blockchains' }
      ]
    }
  ];

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'feature': return <Star className="w-5 h-5 text-yellow-400" />;
      case 'improvement': return <TrendingUp className="w-5 h-5 text-blue-400" />;
      case 'bugfix': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'announcement': return <Bell className="w-5 h-5 text-purple-400" />;
      case 'event': return <Gift className="w-5 h-5 text-pink-400" />;
      default: return <Zap className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Sparkles className="w-4 h-4 text-yellow-400" />;
      case 'active': return <Clock className="w-4 h-4 text-blue-400" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return null;
    }
  };

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'promotion': return <Gift className="w-5 h-5 text-pink-400" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'info': return <Bell className="w-5 h-5 text-blue-400" />;
      default: return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getAnnouncementColor = (type: string) => {
    switch (type) {
      case 'promotion': return 'border-pink-400/50 bg-pink-400/10';
      case 'warning': return 'border-yellow-400/50 bg-yellow-400/10';
      case 'success': return 'border-green-400/50 bg-green-400/10';
      case 'info': return 'border-blue-400/50 bg-blue-400/10';
      default: return 'border-gray-400/50 bg-gray-400/10';
    }
  };

  const getRoadmapStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-400 text-white';
      case 'in-progress': return 'bg-blue-400 text-white';
      case 'planned': return 'bg-yellow-400 text-black';
      case 'research': return 'bg-gray-400 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const filteredUpdates = filter === 'all' ? updates : updates.filter(update => update.type === filter);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-0 m-0">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 w-full h-full min-h-screen flex flex-col overflow-hidden border border-gray-700 rounded-none">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">What's New</h2>
            <p className="text-purple-100 text-sm">
              Latest updates and announcements
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="flex">
            {[
              { id: 'updates', label: 'Updates', icon: Zap },
              { id: 'announcements', label: 'News', icon: Bell },
              { id: 'roadmap', label: 'Roadmap', icon: Target },
              { id: 'changelog', label: 'Changelog', icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 transition-all ${
                    activeTab === tab.id
                      ? 'text-purple-400 bg-purple-400/10 border-b-2 border-purple-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          {activeTab === 'updates' && (
            <div className="space-y-4">
              {/* Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'feature', label: 'Features' },
                  { id: 'improvement', label: 'Improvements' },
                  { id: 'bugfix', label: 'Bug Fixes' },
                  { id: 'event', label: 'Events' }
                ].map((filterOption) => (
                  <button
                    key={filterOption.id}
                    onClick={() => setFilter(filterOption.id as any)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      filter === filterOption.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {filterOption.label}
                  </button>
                ))}
              </div>

              {/* Updates List */}
              <div className="space-y-3">
                {filteredUpdates.map((update) => (
                  <div key={update.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start gap-3 mb-3">
                      {getUpdateIcon(update.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-bold">{update.title}</h3>
                          {getStatusIcon(update.status)}
                          {update.version && (
                            <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">
                              {update.version}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-2">
                          {update.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {update.tags.map((tag, index) => (
                              <span key={index} className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{update.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-white font-bold text-lg mb-2">Latest Announcements</h3>
                <p className="text-gray-400 text-sm">
                  Important news and updates from the iTonzi team
                </p>
              </div>

              <div className="space-y-3">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`rounded-lg p-4 border-2 ${getAnnouncementColor(announcement.type)} ${
                      announcement.urgent ? 'ring-2 ring-yellow-400/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {getAnnouncementIcon(announcement.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-white font-bold">{announcement.title}</h3>
                          {announcement.urgent && (
                            <span className="text-xs bg-red-500 px-2 py-1 rounded-full text-white font-bold">
                              URGENT
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-3">
                          {announcement.message}
                        </p>
                        <div className="flex items-center justify-between">
                          {announcement.action && (
                            <button className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                              {announcement.action.label}
                            </button>
                          )}
                          <span className="text-xs text-gray-500 ml-auto">{announcement.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-white font-bold text-lg mb-2">Development Roadmap</h3>
                <p className="text-gray-400 text-sm">
                  Our plans for the future of iTonzi
                </p>
              </div>

              {roadmapItems.map((quarter, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="text-purple-400 font-bold text-lg flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    {quarter.quarter}
                  </h4>
                  <div className="space-y-2 ml-7">
                    {quarter.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-white font-medium">{item.title}</h5>
                          <span className={`text-xs px-2 py-1 rounded-full font-bold ${getRoadmapStatusColor(item.status)}`}>
                            {item.status.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'changelog' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-white font-bold text-lg mb-2">Version History</h3>
                <p className="text-gray-400 text-sm">
                  Detailed changelog of all releases
                </p>
              </div>

              <div className="space-y-4">
                {updates.filter(update => update.version).map((update) => (
                  <div key={update.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400 font-bold">{update.version}</span>
                        {getUpdateIcon(update.type)}
                      </div>
                      <span className="text-gray-500 text-sm">{update.date}</span>
                    </div>
                    <h4 className="text-white font-bold mb-2">{update.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {update.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-800 border-t border-gray-700">
          <div className="text-center">
            <p className="text-gray-400 text-xs mb-2">
              Stay updated with the latest iTonzi developments
            </p>
            <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 mx-auto">
              <Bell className="w-4 h-4" />
              Enable Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatesModal;