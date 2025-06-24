import { useState, useEffect } from 'react';
import { 
  CreditCard, 
  History, 
  Trophy, 
  FileText, 
  Headphones,
  Gift,
  
  Check,
  Users,
  Clock,
  Coins,
  Star,
  Zap,
  Crown,
  
  ArrowLeft,
  Copy,
  Share2,
  Wallet,
  ExternalLink,
 
  Target,
  Calendar,
  MessageCircle,
  Heart,
  TrendingUp,
  Award,
  
  Bell,
  Loader2
} from 'lucide-react';
import PaymentModal from '../components/modals/PaymentModal';
import HistoryModal from '../components/modals/HistoryModal';
import LeaderboardModal from '../components/modals/LeaderboardModal';
import RulesModal from '../components/modals/RulesModal';
import SupportModal from '../components/modals/SupportModal';
import UpdatesModal from '../components/modals/UpdatesModal';

declare global {
  interface Window {
    show_9486612?: () => Promise<void>;
  }
}

interface Stats {
  totalAds: number;
  totalEarned: number;
  dailyAds: number;
  dailyEarnings: number;
  payable: number;
  siteVisits: number;
}

interface AirdropTask {
  id: number;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  type: 'social' | 'referral' | 'daily' | 'special' | 'community';
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  category: string;
  timeLimit?: string;
  isActive?: boolean;
  requirements?: string[];
  externalUrl?: string;
}

interface LeaderboardUser {
  id: number;
  username: string;
  coins: number;
  rank: number;
  avatar: string;
  level: number;
}

interface ReferralData {
  totalReferrals: number;
  activeReferrals: number;
  totalEarned: number;
  referralCode: string;
  referralLink: string;
}

function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAirdrop, setShowAirdrop] = useState(false);
  const [airdropTab, setAirdropTab] = useState('tasks');
  const [autoAdsRunning, setAutoAdsRunning] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const  userRank = 42
  const userLevel = 3
  
  // Modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showUpdatesModal, setShowUpdatesModal] = useState(false);
  
  // Initialize stats from localStorage or start with zeros
  const [stats, setStats] = useState<Stats>(() => {
    const saved = localStorage.getItem('stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback to zeros if parse fails
      }
    }
    return {
      totalAds: 0,
      totalEarned: 0,
      dailyAds: 0,
      dailyEarnings: 0,
      payable: 0,
      siteVisits: 0
    };
  });

  // Store stats in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('stats', JSON.stringify(stats));
  }, [stats]);

  const [airdropTasks, setAirdropTasks] = useState<AirdropTask[]>([]);
  const [airdropBalance, setAirdropBalance] = useState(205);

  const  referralData : ReferralData  = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarned: 2400,
    referralCode: 'iTONZI2024',
    referralLink: 'https://t.me/iTonziBot?start=iTONZI2024'
  };

  const leaderboard : LeaderboardUser[] = [
    { id: 1, username: 'CryptoKing', coins: 15420, rank: 1, avatar: '👑', level: 8 },
    { id: 2, username: 'TonMaster', coins: 12890, rank: 2, avatar: '🚀', level: 7 },
    { id: 3, username: 'AirdropHunter', coins: 11250, rank: 3, avatar: '🎯', level: 6 },
    { id: 4, username: 'DiamondHands', coins: 9870, rank: 4, avatar: '💎', level: 6 },
    { id: 5, username: 'MoonWalker', coins: 8640, rank: 5, avatar: '🌙', level: 5 },
    { id: 6, username: 'TokenCollector', coins: 7520, rank: 6, avatar: '🪙', level: 5 },
    { id: 7, username: 'Web3Pioneer', coins: 6890, rank: 7, avatar: '🌐', level: 4 },
    { id: 8, username: 'BlockchainBoss', coins: 6120, rank: 8, avatar: '⛓️', level: 4 },
    { id: 9, username: 'DeFiDegen', coins: 5780, rank: 9, avatar: '🔥', level: 4 },
    { id: 10, username: 'NFTCollector', coins: 5340, rank: 10, avatar: '🎨', level: 3 }
  ]

  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [isAutoAdsLoading, setIsAutoAdsLoading] = useState(false);
  const [isRewardsLoading, setIsRewardsLoading] = useState(false);

  // Add state for countdowns for each button
  const [offerCountdowns, setOfferCountdowns] = useState([0, 0, 0, 0]);

  // Load tasks from admin panel or localStorage
  useEffect(() => {
    const loadTasks = () => {
      const savedTasks = localStorage.getItem('adminTasks') || localStorage.getItem('airdropTasks');
      if (savedTasks) {
        try {
          const tasks = JSON.parse(savedTasks);
          // Filter only active tasks for the main app
          const activeTasks = tasks.filter((task: AirdropTask) => task.isActive !== false);
          setAirdropTasks(activeTasks);
        } catch (error) {
          console.error('Error loading tasks:', error);
          setAirdropTasks(getDefaultTasks());
        }
      } else {
        setAirdropTasks(getDefaultTasks());
      }
    };

    loadTasks();

    // Listen for task updates from admin panel
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminTasks' || e.key === 'airdropTasks') {
        loadTasks();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getDefaultTasks = (): AirdropTask[] => [
    {
      id: 1,
      title: 'Join iTonzi Community',
      description: 'Join our Telegram channel and become part of our growing community',
      reward: 100,
      completed: false,
      type: 'social',
      difficulty: 'easy',
      category: 'Social Media',
      isActive: true
    },
    {
      id: 2,
      title: 'Daily Check-in Streak',
      description: 'Check in daily for 7 consecutive days to earn bonus rewards',
      reward: 50,
      completed: true,
      type: 'daily',
      difficulty: 'easy',
      category: 'Daily Tasks',
      timeLimit: '24h',
      isActive: true
    },
    {
      id: 3,
      title: 'Invite 5 Friends',
      description: 'Share iTonzi with friends and earn massive rewards for each referral',
      reward: 500,
      completed: false,
      type: 'referral',
      difficulty: 'hard',
      category: 'Referral Program',
      isActive: true
    },
    {
      id: 4,
      title: 'Watch 10 Ads Today',
      description: 'Complete your daily ad viewing goal to unlock bonus coins',
      reward: 25,
      completed: false,
      type: 'daily',
      difficulty: 'medium',
      category: 'Daily Tasks',
      timeLimit: '24h',
      isActive: true
    },
    {
      id: 5,
      title: 'Share on Social Media',
      description: 'Post about iTonzi on your social media accounts',
      reward: 75,
      completed: false,
      type: 'social',
      difficulty: 'medium',
      category: 'Social Media',
      isActive: true
    },
    {
      id: 6,
      title: 'Complete Profile',
      description: 'Fill out your complete profile information',
      reward: 30,
      completed: true,
      type: 'daily',
      difficulty: 'easy',
      category: 'Profile Setup',
      isActive: true
    },
    {
      id: 7,
      title: 'Connect Wallet',
      description: 'Connect your TON wallet to secure your earnings',
      reward: 200,
      completed: walletConnected,
      type: 'special',
      difficulty: 'medium',
      category: 'Wallet Integration',
      isActive: true
    }
  ];

  // Auto Ads Effect: show rewarded ad, then wait 5s before next ad while autoAdsRunning is true
  useEffect(() => {
    let stopped = false;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    async function runAutoAds() {
      while (!stopped && autoAdsRunning) {
        if (typeof window.show_9486612 === 'function') {
          await window.show_9486612();
          setStats(prev => ({
            ...prev,
            totalAds: prev.totalAds + 1,
            dailyAds: prev.dailyAds + 1,
            totalEarned: +(prev.totalEarned + 0.001).toFixed(3),
            dailyEarnings: +(prev.dailyEarnings + 0.001).toFixed(3),
            payable: +(prev.payable + 0.001).toFixed(3),
          }));
        }
        // Wait 5 seconds before next ad
        await new Promise(res => { timeout = setTimeout(res, 5000); });
      }
    }
    if (autoAdsRunning) {
      runAutoAds();
    }
    return () => {
      stopped = true;
      if (timeout) clearTimeout(timeout);
    };
  }, [autoAdsRunning]);

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
    // Simulate wallet connection
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

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralData.referralLink);
    // You could add a toast notification here
  };

  const watchAd = () => {
    setIsWatchingAd(true);
    if (typeof window.show_9486612 === 'function') {
      window.show_9486612().then(() => {
        setStats(prev => ({
          ...prev,
          totalAds: prev.totalAds + 1,
          dailyAds: prev.dailyAds + 1,
          totalEarned: +(prev.totalEarned + 0.001).toFixed(3),
          dailyEarnings: +(prev.dailyEarnings + 0.001).toFixed(3),
          payable: +(prev.payable + 0.001).toFixed(3),
        }));
        setIsWatchingAd(false);
        alert('You have seen an ad!');
      });
    } else {
      setTimeout(() => {
        setIsWatchingAd(false);
        alert('Ad SDK not loaded.');
      }, 1500);
    }
  };

  const handleNavClick = (itemId: string) => {
    setActiveTab(itemId);
    switch (itemId) {
      case 'payment':
        setShowPaymentModal(true);
        break;
      case 'history':
        setShowHistoryModal(true);
        break;
      case 'leaderboard':
        setShowLeaderboardModal(true);
        break;
      case 'rules':
        setShowRulesModal(true);
        break;
      case 'support':
        setShowSupportModal(true);
        break;
    }
  };

  const navItems = [
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'history', label: 'History', icon: History },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'rules', label: 'Rules', icon: FileText },
    { id: 'support', label: 'Support', icon: Headphones }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/20';
      case 'legendary': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return Star;
      case 'medium': return Zap;
      case 'hard': return Crown;
      case 'legendary': return Award;
      default: return Star;
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    if (rank <= 10) return '🏆';
    return '⭐';
  };

  // Handler for SMART OFFER button click
  const handleSmartOfferClick = (idx: number, url: string) => {
    // Open the offer in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
    // Track site visit and reward
    setStats(prev => ({
      ...prev,
      siteVisits: prev.siteVisits + 1,
      totalEarned: +(prev.totalEarned + 0.001).toFixed(3),
      dailyEarnings: +(prev.dailyEarnings + 0.001).toFixed(3),
      payable: +(prev.payable + 0.001).toFixed(3),
    }));
    // Start countdown for this button
    setOfferCountdowns(prev => {
      const updated = [...prev];
      updated[idx] = 30;
      return updated;
    });
  };

  // Effect to handle countdown timers
  useEffect(() => {
    const interval = setInterval(() => {
      setOfferCountdowns(prev => prev.map(time => (time > 0 ? time - 1 : 0)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (showAirdrop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-2xl"></div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <button
              onClick={() => setShowAirdrop(false)}
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
          
          <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
                  🚀
                </div>
                <div>
                  <div className="font-bold text-lg">Level {userLevel}</div>
                  <div className="text-cyan-200 text-sm">Rank #{userRank}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-2xl font-bold">
                  <Coins className="w-6 h-6 text-yellow-400" />
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    {airdropBalance}
                  </span>
                </div>
                <div className="text-cyan-200 text-sm">Total Coins</div>
              </div>
            </div>
            
            {/* Wallet Status */}
            <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-cyan-400" />
                <span className="text-sm">
                  {walletConnected ? `Connected: ${walletAddress}` : 'Wallet not connected'}
                </span>
              </div>
              {!walletConnected && (
                <button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1 rounded-full text-sm font-bold hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                  Connect
                </button>
              )}
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
            <div className="p-6 space-y-6">
              {/* Task Categories */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Available Tasks</h3>
                <div className="flex justify-center gap-4 text-sm flex-wrap">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-green-400">Easy</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-yellow-400">Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-red-400">Hard</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-purple-400">Legendary</span>
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-gray-600/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-white">Progress Overview</h4>
                  <span className="text-cyan-400 font-bold">
                    {airdropTasks.filter(task => task.completed).length}/{airdropTasks.length}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(airdropTasks.filter(task => task.completed).length / airdropTasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-4">
                {airdropTasks.map((task) => {
                  const DifficultyIcon = getDifficultyIcon(task.difficulty);
                  return (
                    <div
                      key={task.id}
                      className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 transition-all duration-300 hover:scale-[1.02] ${
                        task.completed
                          ? 'border-green-400/50 bg-green-400/10 shadow-lg shadow-green-400/20'
                          : 'border-gray-600/50 hover:border-cyan-400/50 hover:bg-white/15'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-white">{task.title}</h3>
                            <div className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getDifficultyColor(task.difficulty)}`}>
                              <DifficultyIcon className="w-3 h-3" />
                              {task.difficulty}
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed mb-2">{task.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="bg-gray-700/50 px-2 py-1 rounded">{task.category}</span>
                            {task.timeLimit && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.timeLimit}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-3">
                          {task.type === 'social' && <MessageCircle className="w-5 h-5 text-blue-400" />}
                          {task.type === 'daily' && <Calendar className="w-5 h-5 text-orange-400" />}
                          {task.type === 'referral' && <Users className="w-5 h-5 text-purple-400" />}
                          {task.type === 'special' && <Star className="w-5 h-5 text-yellow-400" />}
                          {task.type === 'community' && <Heart className="w-5 h-5 text-pink-400" />}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-yellow-300 font-bold bg-yellow-400/20 px-3 py-1 rounded-full">
                          <Coins className="w-4 h-4" />
                          <span>+{task.reward}</span>
                        </div>
                        
                        {task.completed ? (
                          <div className="flex items-center gap-2 text-green-400 font-bold bg-green-400/20 px-4 py-2 rounded-full">
                            <Check className="w-5 h-5" />
                            <span>Completed</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleTaskComplete(task.id)}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {airdropTab === 'referral' && (
            <div className="p-6 space-y-6">
              {/* Referral Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-600/80 to-pink-600/80 backdrop-blur-sm rounded-xl p-4 border border-purple-400/50">
                  <div className="text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-purple-200" />
                    <div className="text-2xl font-bold text-white">{referralData.totalReferrals}</div>
                    <div className="text-purple-200 text-sm">Total Referrals</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-600/80 to-teal-600/80 backdrop-blur-sm rounded-xl p-4 border border-green-400/50">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-200" />
                    <div className="text-2xl font-bold text-white">{referralData.activeReferrals}</div>
                    <div className="text-green-200 text-sm">Active Users</div>
                  </div>
                </div>
              </div>

              {/* Total Earned */}
              <div className="bg-gradient-to-r from-yellow-600/80 to-orange-600/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/50 text-center">
                <Coins className="w-12 h-12 mx-auto mb-3 text-yellow-200" />
                <div className="text-3xl font-bold text-white mb-2">{referralData.totalEarned}</div>
                <div className="text-yellow-200">Total Referral Earnings</div>
              </div>

              {/* Referral Code */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50">
                <h3 className="text-xl font-bold text-white mb-4 text-center">Your Referral Code</h3>
                <div className="bg-black/40 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-cyan-400 text-lg">{referralData.referralCode}</span>
                    <button
                      onClick={copyReferralLink}
                      className="bg-cyan-500 hover:bg-cyan-400 p-2 rounded-lg transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="bg-black/40 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm flex-1 mr-2 break-all">{referralData.referralLink}</span>
                    <button
                      onClick={copyReferralLink}
                      className="bg-blue-500 hover:bg-blue-400 p-2 rounded-lg transition-colors flex-shrink-0"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share Referral Link
                </button>
              </div>

              {/* Referral Rewards */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50">
                <h3 className="text-xl font-bold text-white mb-4">Referral Rewards</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-300">First referral</span>
                    <span className="text-yellow-400 font-bold">+100 coins</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-300">Active referral (monthly)</span>
                    <span className="text-green-400 font-bold">+50 coins</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-300">Premium referral</span>
                    <span className="text-purple-400 font-bold">+200 coins</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {airdropTab === 'leaderboard' && (
            <div className="p-6 space-y-6">
              {/* Your Rank */}
              <div className="bg-gradient-to-r from-cyan-600/80 to-blue-600/80 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/50 text-center">
                <div className="text-4xl mb-2">{getRankIcon(userRank)}</div>
                <div className="text-2xl font-bold text-white mb-1">Rank #{userRank}</div>
                <div className="text-cyan-200">Your Current Position</div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">{airdropBalance} coins</span>
                </div>
              </div>

              {/* Top Rankings */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50">
                <h3 className="text-xl font-bold text-white mb-4 text-center">Top Earners</h3>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all hover:scale-[1.02] ${
                        user.rank <= 3
                          ? 'bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-400/50'
                          : 'bg-black/30 hover:bg-black/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{getRankIcon(user.rank)}</div>
                        <div className="text-3xl">{user.avatar}</div>
                        <div>
                          <div className="font-bold text-white">{user.username}</div>
                          <div className="text-gray-400 text-sm flex items-center gap-2">
                            <span>Level {user.level}</span>
                            <span>•</span>
                            <span>Rank #{user.rank}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-yellow-400 font-bold">
                          <Coins className="w-5 h-5" />
                          <span>{user.coins.toLocaleString()}</span>
                        </div>
                        <div className="text-gray-400 text-sm">coins</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ranking Rewards */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50">
                <h3 className="text-xl font-bold text-white mb-4">Weekly Rewards</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 rounded-lg border border-yellow-400/50">
                    <span className="text-white font-bold">🥇 1st Place</span>
                    <span className="text-yellow-400 font-bold">+1000 coins</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-600/30 to-gray-500/30 rounded-lg border border-gray-400/50">
                    <span className="text-white font-bold">🥈 2nd Place</span>
                    <span className="text-gray-300 font-bold">+500 coins</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-600/30 to-yellow-600/30 rounded-lg border border-orange-400/50">
                    <span className="text-white font-bold">🥉 3rd Place</span>
                    <span className="text-orange-400 font-bold">+250 coins</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-300">Top 10</span>
                    <span className="text-purple-400 font-bold">+100 coins</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

       
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Notice Bar with Marquee */}
      <div className="bg-black px-4 py-2 text-sm flex items-center relative overflow-hidden">
        <span className="font-bold mr-2 z-10 animate-notice-color">NOTICE</span>
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            <span className="inline-block">iTonzi, where you can earn by watching ads • New airdrop tasks available • Earn up to $10 daily • Join our community for exclusive rewards • </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6 pb-32">
        {/* Logo Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-green-400">iTonzi</h2>
          </div>
          <p className="text-red-400 text-lg font-semibold">Supported by iTonziFinance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 p-4 bg-blue-600/80 backdrop-blur-sm rounded-lg border-2 border-blue-400">
          <div className="bg-gray-100 text-black p-3 rounded text-center">
            <div className="font-bold text-sm">Total Ads:</div>
            <div className="text-xl font-bold">{stats.totalAds}</div>
          </div>
          <div className="bg-gray-100 text-black p-3 rounded text-center">
            <div className="font-bold text-sm">Total Earned:</div>
            <div className="text-xl font-bold">${stats.totalEarned.toFixed(3)}</div>
          </div>
          <div className="bg-gray-100 text-black p-3 rounded text-center">
            <div className="font-bold text-sm">Daily Ads:</div>
            <div className="text-xl font-bold">{stats.dailyAds}/500</div>
          </div>
          <div className="bg-gray-100 text-black p-3 rounded text-center">
            <div className="font-bold text-sm">Daily Earnings:</div>
            <div className="text-xl font-bold">${stats.dailyEarnings.toFixed(3)}</div>
          </div>
          <div className="bg-gray-100 text-black p-3 rounded text-center">
            <div className="font-bold text-sm">Payable:</div>
            <div className="text-xl font-bold">${stats.payable.toFixed(3)}</div>
          </div>
          <div className="bg-gray-100 text-black p-3 rounded text-center">
            <div className="font-bold text-sm">Site Visits:</div>
            <div className="text-xl font-bold">{stats.siteVisits}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-green-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(stats.dailyAds / 500) * 100}%` }}
          ></div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 p-4 bg-black/40 backdrop-blur-sm rounded-lg border border-red-500">
          <button 
            onClick={isWatchingAd ? undefined : watchAd}
            disabled={isWatchingAd}
            className={`w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-black font-bold text-lg transition-all duration-300 transform ${
              isWatchingAd
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:from-yellow-400 hover:to-orange-400 hover:scale-105'
            }`}
          >
            {isWatchingAd ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Watching...
              </span>
            ) : (
              'Watch Ads'
            )}
          </button>
          <button
            onClick={isAutoAdsLoading ? undefined : () => {
              setIsAutoAdsLoading(true);
              setTimeout(() => {
                setAutoAdsRunning(!autoAdsRunning);
                setIsAutoAdsLoading(false);
              }, 1500);
            }}
            disabled={isAutoAdsLoading}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 transform ${
              autoAdsRunning
                ? 'bg-gradient-to-r from-red-500 to-pink-500'
                : 'bg-gradient-to-r from-green-500 to-teal-500'
            } ${
              isAutoAdsLoading
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:scale-105 hover:from-green-400 hover:to-teal-400 hover:from-red-400 hover:to-pink-400'
            }`}
          >
            {isAutoAdsLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                {autoAdsRunning ? 'Stopping...' : 'Starting...'}
              </span>
            ) : (
              autoAdsRunning ? 'Stop Auto Ads' : 'Show Auto Ads'
            )}
          </button>
          <button
            onClick={isRewardsLoading ? undefined : () => {
              setIsRewardsLoading(true);
              setTimeout(() => {
                setIsRewardsLoading(false);
              }, 1500);
            }}
            disabled={isRewardsLoading}
            className={`w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg font-bold text-lg transition-all duration-300 transform ${
              isRewardsLoading
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:from-purple-400 hover:to-indigo-400 hover:scale-105'
            }`}
          >
            {isRewardsLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading...
              </span>
            ) : (
              'Rewards Ads'
            )}
          </button>
        </div>

        {/* Marquee above Monetag Direct Link Grid */}
        <div className="overflow-hidden bg-black/80 rounded-lg my-2">
          <div className="animate-marquee whitespace-nowrap py-2 px-4 text-cyan-300 font-semibold text-sm">
            Earn more with Monetag Direct Links! • Fast payouts • High CPM offers • Try all 4 links below for maximum rewards •
          </div>
        </div>

        {/* Monetag Direct Link Grid */}
        <div className="grid grid-cols-2 gap-4 my-6">
          {[
            'https://otieu.com/4/9133535',
            'https://otieu.com/4/9133536',
            'https://otieu.com/4/9133537',
            'https://otieu.com/4/9133532',
          ].map((url, i) => (
            <button
              key={i}
              className={`w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white font-bold text-lg shadow-md transition-all duration-300 transform hover:scale-105 ${offerCountdowns[i] > 0 ? 'opacity-60 cursor-not-allowed' : 'hover:from-green-300 hover:to-blue-400'}`}
              onClick={() => offerCountdowns[i] === 0 && handleSmartOfferClick(i, url)}
              disabled={offerCountdowns[i] > 0}
            >
              {offerCountdowns[i] > 0 ? `Wait ${offerCountdowns[i]}s` : 'SMART OFFER'}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Updates and Airdrop Buttons - Right Side */}
      <div className="fixed bottom-24 right-6 z-20 flex flex-col items-end gap-4">
        <button
          onClick={() => setShowUpdatesModal(true)}
          className="relative w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
        >
          <Bell className="w-6 h-6 text-white" />
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
            3
          </div>
        </button>
        <button
          onClick={() => setShowAirdrop(true)}
          className="relative w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse"
        >
          <Gift className="w-6 h-6 text-white" />
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
            {airdropTasks.filter(task => !task.completed).length}
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/50 to-blue-500/50 animate-ping"></div>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-700 via-blue-800 to-purple-800 bg-opacity-90 backdrop-blur-lg border-t border-cyan-600/40 shadow-2xl">
        <div className="grid grid-cols-5 gap-1 px-2 py-3">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            // Assign a unique color for each icon
            const iconColors = [
              'text-yellow-400', // Payment
              'text-blue-400',   // History
              'text-purple-400', // Leaderboard
              'text-green-400',  // Rules
              'text-pink-400'    // Support
            ];
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${iconColors[idx]}`} />
                <span className="text-xs font-bold text-white">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <PaymentModal
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)} 
        balance={stats.payable}
      />
      <HistoryModal 
        isOpen={showHistoryModal} 
        onClose={() => setShowHistoryModal(false)} 
      />
      <LeaderboardModal
        isOpen={showLeaderboardModal} 
        onClose={() => setShowLeaderboardModal(false)} 
      />
      <RulesModal
        isOpen={showRulesModal} 
        onClose={() => setShowRulesModal(false)} 
      />
      <SupportModal 
        isOpen={showSupportModal} 
        onClose={() => setShowSupportModal(false)} 
      />
      <UpdatesModal
        isOpen={showUpdatesModal} 
        onClose={() => setShowUpdatesModal(false)} 
      />

      
    </div>
  );
}

export default Home;