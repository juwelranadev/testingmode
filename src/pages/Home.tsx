import { useState, useEffect } from 'react';
import { 
  CreditCard, 
  History, 
  Trophy, 
  FileText, 
  Headphones,
  Gift,
  Loader2,
  Bell,
  Globe
} from 'lucide-react';
import PaymentModal from '../FooterActionButtons/PaymentModal';
import HistoryModal from '../FooterActionButtons/HistoryModal';
import LeaderboardModal from '../FooterActionButtons/LeaderboardModal';
import RulesModal from '../FooterActionButtons/RulesModal';
import SupportModal from '../FooterActionButtons/SupportModal';
import UpdatesModal from '../Updates/components/UpdatesModal';
import ReactCountryFlag from 'react-country-flag';
// Import new airdrop components
import { 
  AirdropModal, 
  AirdropTask, 
  getDefaultTasks
} from '../Airdrop';

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

// Language translations
const translations = {
  en: {
    notice: "NOTICE",
    noticeText: "iTonzi, where you can earn by watching ads • New airdrop tasks available • Earn up to $10 daily • Join our community for exclusive rewards •",
    supportedBy: "Supported by iTonziFinance",
    totalAds: "Total Ads:",
    totalEarned: "Total Earned:",
    dailyAds: "Daily Ads:",
    dailyEarnings: "Daily Earnings:",
    payable: "Payable:",
    siteVisits: "Site Visits:",
    watchAds: "Watch Ads",
    watching: "Watching...",
    showAutoAds: "Show Auto Ads",
    stopAutoAds: "Stop Auto Ads",
    starting: "Starting...",
    stopping: "Stopping...",
    rewardsAds: "Rewards Ads",
    loading: "Loading...",
    monetagMarquee: "Earn more with Monetag Direct Links! • Fast payouts • High CPM offers • Try all 4 links below for maximum rewards •",
    smartOffer: "SMART OFFER",
    wait: "Wait",
    seconds: "s",
    payment: "Payment",
    history: "History",
    leaderboard: "Leaderboard",
    rules: "Rules",
    support: "Support",
    language: "Language"
  },
  es: {
    notice: "AVISO",
    noticeText: "iTonzi, donde puedes ganar viendo anuncios • Nuevas tareas de airdrop disponibles • Gana hasta $10 diarios • Únete a nuestra comunidad para recompensas exclusivas •",
    supportedBy: "Apoyado por iTonziFinance",
    totalAds: "Anuncios Totales:",
    totalEarned: "Total Ganado:",
    dailyAds: "Anuncios Diarios:",
    dailyEarnings: "Ganancias Diarias:",
    payable: "Pagable:",
    siteVisits: "Visitas al Sitio:",
    watchAds: "Ver Anuncios",
    watching: "Viendo...",
    showAutoAds: "Mostrar Anuncios Auto",
    stopAutoAds: "Detener Anuncios Auto",
    starting: "Iniciando...",
    stopping: "Deteniendo...",
    rewardsAds: "Anuncios de Recompensas",
    loading: "Cargando...",
    monetagMarquee: "¡Gana más con Enlaces Directos de Monetag! • Pagos rápidos • Ofertas de alto CPM • Prueba los 4 enlaces de abajo para máximas recompensas •",
    smartOffer: "OFERTA INTELIGENTE",
    wait: "Espera",
    seconds: "s",
    payment: "Pago",
    history: "Historial",
    leaderboard: "Clasificación",
    rules: "Reglas",
    support: "Soporte",
    language: "Idioma"
  },
  fr: {
    notice: "AVIS",
    noticeText: "iTonzi, où vous pouvez gagner en regardant des publicités • Nouvelles tâches d'airdrop disponibles • Gagnez jusqu'à 10$ par jour • Rejoignez notre communauté pour des récompenses exclusives •",
    supportedBy: "Soutenu par iTonziFinance",
    totalAds: "Publicités Totales:",
    totalEarned: "Total Gagné:",
    dailyAds: "Publicités Quotidiennes:",
    dailyEarnings: "Gains Quotidiens:",
    payable: "Payable:",
    siteVisits: "Visites du Site:",
    watchAds: "Regarder les Publicités",
    watching: "Regarde...",
    showAutoAds: "Afficher les Publicités Auto",
    stopAutoAds: "Arrêter les Publicités Auto",
    starting: "Démarrage...",
    stopping: "Arrêt...",
    rewardsAds: "Publicités de Récompenses",
    loading: "Chargement...",
    monetagMarquee: "Gagnez plus avec les Liens Directs Monetag ! • Paiements rapides • Offres CPM élevées • Essayez les 4 liens ci-dessous pour des récompenses maximales •",
    smartOffer: "OFFRE INTELLIGENTE",
    wait: "Attendre",
    seconds: "s",
    payment: "Paiement",
    history: "Historique",
    leaderboard: "Classement",
    rules: "Règles",
    support: "Support",
    language: "Langue"
  },
  ar: {
    notice: "تنبيه",
    noticeText: "iTonzi، حيث يمكنك الربح من مشاهدة الإعلانات • مهام الإيردروب الجديدة متاحة • اربح حتى 10$ يومياً • انضم إلى مجتمعنا للحصول على مكافآت حصرية •",
    supportedBy: "مدعوم من iTonziFinance",
    totalAds: "إجمالي الإعلانات:",
    totalEarned: "إجمالي الأرباح:",
    dailyAds: "الإعلانات اليومية:",
    dailyEarnings: "الأرباح اليومية:",
    payable: "القابل للدفع:",
    siteVisits: "زيارات الموقع:",
    watchAds: "مشاهدة الإعلانات",
    watching: "يشاهد...",
    showAutoAds: "عرض الإعلانات التلقائية",
    stopAutoAds: "إيقاف الإعلانات التلقائية",
    starting: "بدء التشغيل...",
    stopping: "إيقاف...",
    rewardsAds: "إعلانات المكافآت",
    loading: "تحميل...",
    monetagMarquee: "اربح المزيد مع روابط Monetag المباشرة! • مدفوعات سريعة • عروض CPM عالية • جرب الروابط الأربعة أدناه للحصول على أقصى مكافآت •",
    smartOffer: "عرض ذكي",
    wait: "انتظر",
    seconds: "ث",
    payment: "الدفع",
    history: "السجل",
    leaderboard: "المتصدرين",
    rules: "القواعد",
    support: "الدعم",
    language: "اللغة"
  },
  bn: {
    notice: "বিজ্ঞপ্তি",
    noticeText: "iTonzi, যেখানে আপনি বিজ্ঞাপন দেখে আয় করতে পারেন • নতুন এয়ারড্রপ টাস্ক উপলব্ধ • প্রতিদিন $10 পর্যন্ত আয় করুন • এক্সক্লুসিভ পুরস্কারের জন্য আমাদের কমিউনিটিতে যোগ দিন •",
    supportedBy: "iTonziFinance দ্বারা সমর্থিত",
    totalAds: "মোট বিজ্ঞাপন:",
    totalEarned: "মোট আয়:",
    dailyAds: "দৈনিক বিজ্ঞাপন:",
    dailyEarnings: "দৈনিক আয়:",
    payable: "প্রদেয়:",
    siteVisits: "সাইট ভিজিট:",
    watchAds: "বিজ্ঞাপন দেখুন",
    watching: "দেখছে...",
    showAutoAds: "অটো বিজ্ঞাপন দেখান",
    stopAutoAds: "অটো বিজ্ঞাপন বন্ধ করুন",
    starting: "শুরু হচ্ছে...",
    stopping: "বন্ধ হচ্ছে...",
    rewardsAds: "পুরস্কার বিজ্ঞাপন",
    loading: "লোড হচ্ছে...",
    monetagMarquee: "Monetag ডাইরেক্ট লিংক দিয়ে আরও আয় করুন! • দ্রুত পেমেন্ট • উচ্চ CPM অফার • সর্বোচ্চ পুরস্কারের জন্য নীচের 4টি লিংক চেষ্টা করুন •",
    smartOffer: "স্মার্ট অফার",
    wait: "অপেক্ষা করুন",
    seconds: "সে",
    payment: "পেমেন্ট",
    history: "ইতিহাস",
    leaderboard: "লিডারবোর্ড",
    rules: "নিয়ম",
    support: "সহায়তা",
    language: "ভাষা"
  },
  hi: {
    notice: "सूचना",
    noticeText: "iTonzi, जहां आप विज्ञापन देखकर कमा सकते हैं • नए एयरड्रॉप टास्क उपलब्ध • प्रतिदिन $10 तक कमाएं • विशेष पुरस्कारों के लिए हमारे समुदाय में शामिल हों •",
    supportedBy: "iTonziFinance द्वारा समर्थित",
    totalAds: "कुल विज्ञापन:",
    totalEarned: "कुल कमाई:",
    dailyAds: "दैनिक विज्ञापन:",
    dailyEarnings: "दैनिक कमाई:",
    payable: "भुगतान योग्य:",
    siteVisits: "साइट विजिट:",
    watchAds: "विज्ञापन देखें",
    watching: "देख रहा है...",
    showAutoAds: "ऑटो विज्ञापन दिखाएं",
    stopAutoAds: "ऑटो विज्ञापन रोकें",
    starting: "शुरू हो रहा है...",
    stopping: "रुक रहा है...",
    rewardsAds: "पुरस्कार विज्ञापन",
    loading: "लोड हो रहा है...",
    monetagMarquee: "Monetag डायरेक्ट लिंक के साथ और कमाएं! • तेज़ भुगतान • उच्च CPM ऑफर • अधिकतम पुरस्कारों के लिए नीचे के 4 लिंक आज़माएं •",
    smartOffer: "स्मार्ट ऑफर",
    wait: "प्रतीक्षा करें",
    seconds: "से",
    payment: "भुगतान",
    history: "इतिहास",
    leaderboard: "लीडरबोर्ड",
    rules: "नियम",
    support: "सहायता",
    language: "भाषा"
  },
  zh: {
    notice: "通知",
    noticeText: "iTonzi，您可以通过观看广告赚钱 • 新的空投任务可用 • 每天赚取高达$10 • 加入我们的社区获得独家奖励 •",
    supportedBy: "由 iTonziFinance 支持",
    totalAds: "总广告数:",
    totalEarned: "总收入:",
    dailyAds: "每日广告:",
    dailyEarnings: "每日收入:",
    payable: "可支付:",
    siteVisits: "网站访问:",
    watchAds: "观看广告",
    watching: "观看中...",
    showAutoAds: "显示自动广告",
    stopAutoAds: "停止自动广告",
    starting: "启动中...",
    stopping: "停止中...",
    rewardsAds: "奖励广告",
    loading: "加载中...",
    monetagMarquee: "通过 Monetag 直接链接赚取更多！• 快速付款 • 高 CPM 优惠 • 尝试下面的 4 个链接获得最大奖励 •",
    smartOffer: "智能优惠",
    wait: "等待",
    seconds: "秒",
    payment: "支付",
    history: "历史",
    leaderboard: "排行榜",
    rules: "规则",
    support: "支持",
    language: "语言"
  }
};

function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAirdrop, setShowAirdrop] = useState(false);
  const [autoAdsRunning, setAutoAdsRunning] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [, setWalletAddress] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  
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

  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [isAutoAdsLoading, setIsAutoAdsLoading] = useState(false);
  const [isRewardsLoading, setIsRewardsLoading] = useState(false);

  // Add state for countdowns for each button
  const [offerCountdowns, setOfferCountdowns] = useState([0, 0, 0, 0]);

  // Get current translations
  const t = translations[currentLanguage as keyof typeof translations];

  // Load tasks from admin panel or localStorage
  useEffect(() => {
    const loadTasks = () => {
      const savedTasks = localStorage.getItem('adminTasks') || localStorage.getItem('airdropTasks');
      if (savedTasks) {
        try {
          const tasks = JSON.parse(savedTasks);
          console.log('Loaded tasks from localStorage:', tasks);
          // Filter only active tasks for the main app
          const activeTasks = tasks.filter((task: AirdropTask) => task.isActive !== false);
          console.log('Active tasks after filtering:', activeTasks);
          setAirdropTasks(activeTasks);
        } catch (error) {
          console.error('Error loading tasks:', error);
          setAirdropTasks(getDefaultTasks());
        }
      } else {
        console.log('No saved tasks found, using default tasks');
        setAirdropTasks(getDefaultTasks());
      }
    };

    // Force refresh tasks by clearing localStorage and using default tasks
    const forceRefreshTasks = () => {
      console.log('Force refreshing tasks...');
      localStorage.removeItem('adminTasks');
      localStorage.removeItem('airdropTasks');
      const defaultTasks = getDefaultTasks();
      console.log('Setting default tasks:', defaultTasks);
      setAirdropTasks(defaultTasks);
      // Save the default tasks to localStorage
      localStorage.setItem('airdropTasks', JSON.stringify(defaultTasks));
    };

    // Check if we need to force refresh (if wallet connect task is missing)
    const savedTasks = localStorage.getItem('adminTasks') || localStorage.getItem('airdropTasks');
    if (savedTasks) {
      try {
        const tasks = JSON.parse(savedTasks);
        const hasWalletTask = tasks.some((task: AirdropTask) => task.id === 7);
        if (!hasWalletTask) {
          console.log('Wallet connect task missing, forcing refresh...');
          forceRefreshTasks();
          return;
        }
      } catch (error) {
        console.error('Error checking tasks:', error);
        forceRefreshTasks();
        return;
      }
    }

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
    { id: 'payment', label: t.payment, icon: CreditCard },
    { id: 'history', label: t.history, icon: History },
    { id: 'leaderboard', label: t.leaderboard, icon: Trophy },
    { id: 'rules', label: t.rules, icon: FileText },
    { id: 'support', label: t.support, icon: Headphones }
  ];

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
      <AirdropModal
        isOpen={showAirdrop}
        onClose={() => setShowAirdrop(false)}
        airdropTasks={airdropTasks}
        setAirdropTasks={setAirdropTasks}
        airdropBalance={airdropBalance}
        setAirdropBalance={setAirdropBalance}
        walletConnected={walletConnected}
        setWalletConnected={setWalletConnected}
        setWalletAddress={setWalletAddress}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col text-white relative overflow-hidden" style={{ backgroundImage: 'url(https://i.ibb.co/S49D48yj/34101037-rm251-mind-08-f.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Notice Bar with Marquee - absolutely fixed at top, above all */}
      <div className="w-full py-2 text-sm flex items-center fixed top-0 left-0 right-0 z-50 border-2 border-yellow-400 animate-notice-border" style={{ backgroundColor: '#000080' }}>
        <span className="font-bold mr-2 z-10 animate-notice-color text-yellow-500">{t.notice}</span>
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap min-w-max">
            <span className="inline-block text-white font-bold">{t.noticeText}</span>
          </div>
        </div>
      </div>

      {/* Language Selector - Top Right */}
      <div className="fixed top-12 right-4 z-40">
        <div className="relative">
          <button
            onClick={() => setShowLanguageSelector(!showLanguageSelector)}
            className="bg-gray-800/90 backdrop-blur-sm border border-gray-600 rounded-lg px-3 py-2 text-white text-sm font-medium flex items-center gap-2 hover:bg-gray-700/90 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{t.language}</span>
          </button>
          
          {showLanguageSelector && (
            <div className="absolute top-full right-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-lg shadow-xl z-50 min-w-[120px]">
              {Object.entries(translations).map(([code]) => (
                <button
                  key={code}
                  onClick={() => {
                    setCurrentLanguage(code);
                    setShowLanguageSelector(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-700/50 transition-colors ${
                    currentLanguage === code ? 'text-cyan-400 bg-cyan-400/10' : 'text-white'
                  } ${code === 'ar' ? 'text-right' : ''}`}
                >
                  {code === 'en' && <><ReactCountryFlag countryCode="US" svg style={{width: '1.5em', height: '1.5em', marginRight: 8}} /> English</>}
                  {code === 'es' && <><ReactCountryFlag countryCode="ES" svg style={{width: '1.5em', height: '1.5em', marginRight: 8}} /> Español</>}
                  {code === 'fr' && <><ReactCountryFlag countryCode="FR" svg style={{width: '1.5em', height: '1.5em', marginRight: 8}} /> Français</>}
                  {code === 'ar' && <><ReactCountryFlag countryCode="SA" svg style={{width: '1.5em', height: '1.5em', marginRight: 8}} /> العربية</>}
                  {code === 'bn' && <><ReactCountryFlag countryCode="BD" svg style={{width: '1.5em', height: '1.5em', marginRight: 8}} /> বাংলা</>}
                  {code === 'hi' && <><ReactCountryFlag countryCode="IN" svg style={{width: '1.5em', height: '1.5em', marginRight: 8}} /> हिंदी</>}
                  {code === 'zh' && <><ReactCountryFlag countryCode="CN" svg style={{width: '1.5em', height: '1.5em', marginRight: 8}} /> 中文</>}
                </button>
              ))}
          </div>
          )}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 space-y-6 pb-32 mt-[48px] overflow-y-auto z-10">
        {/* Logo Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundImage: 'url(https://i.ibb.co/60Jzx0KX/complete-0-EB4-EAC6-8-F81-4-A4-B-BA22-D1-CAE9933-FF6.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              {/* Logo image only, no icon overlay */}
            </div>
            <h2 className="text-4xl font-bold text-green-400">iTonzi</h2>
          </div>
          <p className="text-yellow-400 text-lg font-semibold">{t.supportedBy}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 p-4 bg-blue-600/80 backdrop-blur-sm rounded-lg border-2 border-blue-400">
          <div className="bg-gray-100 text-black p-3 rounded text-center">
            <div className="font-bold text-sm">{t.totalAds}</div>
            <div className="text-xl font-bold">{stats.totalAds}</div>
          </div>
          <div className="bg-gray-100 text-black p-3 rounded text-center">
            <div className="font-bold text-sm">{t.totalEarned}</div>
            <div className="text-xl font-bold">${stats.totalEarned.toFixed(3)}</div>
          </div>
          <div className="bg-gray-100 text-black p-3 rounded text-center">
            <div className="font-bold text-sm">{t.dailyAds}</div>
            <div className="text-xl font-bold">{stats.dailyAds}/500</div>
          </div>
          <div className="bg-gray-100 text-black p-3 rounded text-center">
            <div className="font-bold text-sm">{t.dailyEarnings}</div>
            <div className="text-xl font-bold">${stats.dailyEarnings.toFixed(3)}</div>
          </div>
          <div className="bg-gray-100 text-black p-3 rounded text-center">
            <div className="font-bold text-sm">{t.payable}</div>
            <div className="text-xl font-bold">${stats.payable.toFixed(3)}</div>
          </div>
          <div className="bg-gray-100 text-black p-3 rounded text-center">
            <div className="font-bold text-sm">{t.siteVisits}</div>
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
              t.watchAds
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
                {autoAdsRunning ? t.stopping : t.starting}
              </span>
            ) : (
              autoAdsRunning ? t.stopAutoAds : t.showAutoAds
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
                {t.loading}
              </span>
            ) : (
              t.rewardsAds
            )}
          </button>
        </div>

        {/* Marquee above Monetag Direct Link Grid */}
        <div className="overflow-hidden bg-black/80 rounded-lg my-2">
          <div className="animate-marquee whitespace-nowrap py-2 px-4 text-yellow-400 font-semibold text-sm">
            {t.monetagMarquee}
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
              className={`group relative w-full py-4 rounded-lg text-white font-bold text-lg shadow-md transition-all duration-300 transform overflow-hidden
                ${offerCountdowns[i] > 0 ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'}`}
              onClick={() => offerCountdowns[i] === 0 && handleSmartOfferClick(i, url)}
              disabled={offerCountdowns[i] > 0}
            >
              <span className="relative z-10">{offerCountdowns[i] > 0 ? `${t.wait} ${offerCountdowns[i]}${t.seconds}` : t.smartOffer}</span>
              <span
                className="pointer-events-none absolute inset-0 rounded-lg p-[2px] bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-border-move opacity-100"
                aria-hidden="true"
              >
                <span className="block w-full h-full rounded-lg bg-black"></span>
              </span>
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
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-700 via-blue-800 to-purple-800 bg-opacity-90 backdrop-blur-lg border-t border-cyan-600/40 shadow-2xl z-30">
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