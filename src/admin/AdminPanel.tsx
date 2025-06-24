import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Settings, 
  BarChart3, 
  Target, 
  CreditCard, 
   
  Bell, 
  Database,
  LogOut,
  Menu,
  X,
  Search,
   
  RefreshCw,
   
  Plus,
  
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react';

// Import admin components
import TaskManager from './components/TaskManager';
import UserManager from './components/UserManager';
import Analytics from './components/Analytics';
import PaymentManager from './components/PaymentManager';
import SystemSettings from './components/SystemSettings';
import NotificationManager from './components/NotificationManager';
import DatabaseManager from './components/DatabaseManager';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'moderator';
  avatar?: string;
  lastLogin: string;
}

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalTasks: number;
  completedTasks: number;
  totalEarnings: number;
  pendingWithdrawals: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  serverUptime: string;
}

const AdminPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const  dashboardStats : DashboardStats= {
    totalUsers: 15420,
    activeUsers: 8930,
    totalTasks: 156,
    completedTasks: 89340,
    totalEarnings: 125430.50,
    pendingWithdrawals: 23450.75,
    systemHealth: 'healthy',
    serverUptime: '99.9%'
  }

  useEffect(() => {
    // Simulate admin user login
    setCurrentUser({
      id: '1',
      email: 'admin@itonzi.com',
      name: 'Admin User',
      role: 'super_admin',
      avatar: '👨‍💼',
      lastLogin: new Date().toISOString()
    });
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'text-blue-400' },
    { id: 'tasks', label: 'Task Manager', icon: Target, color: 'text-green-400' },
    { id: 'users', label: 'User Manager', icon: Users, color: 'text-purple-400' },
    { id: 'payments', label: 'Payments', icon: CreditCard, color: 'text-yellow-400' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'text-cyan-400' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-pink-400' },
    { id: 'database', label: 'Database', icon: Database, color: 'text-orange-400' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-400' }
  ];

  const getSystemHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-400 bg-green-400/20';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20';
      case 'critical': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">iTonzi Admin Dashboard</h1>
              <p className="text-blue-100">Welcome back, {currentUser?.name}</p>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getSystemHealthColor(dashboardStats.systemHealth).split(' ')[1]}`}></div>
                  <span>System {dashboardStats.systemHealth}</span>
                </div>
                <div>Uptime: {dashboardStats.serverUptime}</div>
                <div>Last updated: {new Date().toLocaleTimeString()}</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-blue-400">
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="text-green-400 text-sm font-bold">+12.5%</div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{dashboardStats.totalUsers.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Total Users</div>
                <div className="text-xs text-gray-500 mt-2">{dashboardStats.activeUsers.toLocaleString()} active today</div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-green-400">
                    <Target className="w-8 h-8" />
                  </div>
                  <div className="text-green-400 text-sm font-bold">+8.3%</div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{dashboardStats.totalTasks}</div>
                <div className="text-gray-400 text-sm">Active Tasks</div>
                <div className="text-xs text-gray-500 mt-2">{dashboardStats.completedTasks.toLocaleString()} completed</div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-yellow-400">
                    <DollarSign className="w-8 h-8" />
                  </div>
                  <div className="text-green-400 text-sm font-bold">+15.7%</div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">${dashboardStats.totalEarnings.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Total Earnings</div>
                <div className="text-xs text-gray-500 mt-2">${dashboardStats.pendingWithdrawals.toLocaleString()} pending</div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-purple-400">
                    <Activity className="w-8 h-8" />
                  </div>
                  <div className={`text-sm font-bold ${getSystemHealthColor(dashboardStats.systemHealth).split(' ')[0]}`}>
                    {dashboardStats.systemHealth.toUpperCase()}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{dashboardStats.serverUptime}</div>
                <div className="text-gray-400 text-sm">System Uptime</div>
                <div className="text-xs text-gray-500 mt-2">Last restart: 2 days ago</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-white font-bold text-lg mb-4">Recent User Activity</h3>
                <div className="space-y-3">
                  {[
                    { user: 'CryptoKing', action: 'Completed task', time: '2 min ago', type: 'success' },
                    { user: 'TonMaster', action: 'Withdrawal request', time: '5 min ago', type: 'warning' },
                    { user: 'AirdropHunter', action: 'New registration', time: '8 min ago', type: 'info' },
                    { user: 'DiamondHands', action: 'Referral bonus', time: '12 min ago', type: 'success' },
                    { user: 'MoonWalker', action: 'Task completion', time: '15 min ago', type: 'success' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'success' ? 'bg-green-400' :
                          activity.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                        }`}></div>
                        <div>
                          <div className="text-white font-medium">{activity.user}</div>
                          <div className="text-gray-400 text-sm">{activity.action}</div>
                        </div>
                      </div>
                      <div className="text-gray-500 text-xs">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-white font-bold text-lg mb-4">System Alerts</h3>
                <div className="space-y-3">
                  {[
                    { message: 'High withdrawal volume detected', severity: 'warning', time: '1 hour ago' },
                    { message: 'Database backup completed', severity: 'success', time: '2 hours ago' },
                    { message: 'New task template created', severity: 'info', time: '3 hours ago' },
                    { message: 'User verification pending', severity: 'warning', time: '4 hours ago' },
                    { message: 'System update available', severity: 'info', time: '6 hours ago' }
                  ].map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <div className="mt-1">
                        {alert.severity === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                        {alert.severity === 'success' && <CheckCircle className="w-4 h-4 text-green-400" />}
                        {alert.severity === 'info' && <Clock className="w-4 h-4 text-blue-400" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm">{alert.message}</div>
                        <div className="text-gray-500 text-xs mt-1">{alert.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-white font-bold text-lg mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => setActiveSection('tasks')}
                  className="bg-green-600 hover:bg-green-500 p-4 rounded-lg transition-colors flex flex-col items-center gap-2"
                >
                  <Plus className="w-6 h-6" />
                  <span className="text-sm font-medium">Add Task</span>
                </button>
                <button 
                  onClick={() => setActiveSection('users')}
                  className="bg-blue-600 hover:bg-blue-500 p-4 rounded-lg transition-colors flex flex-col items-center gap-2"
                >
                  <Users className="w-6 h-6" />
                  <span className="text-sm font-medium">Manage Users</span>
                </button>
                <button 
                  onClick={() => setActiveSection('payments')}
                  className="bg-yellow-600 hover:bg-yellow-500 p-4 rounded-lg transition-colors flex flex-col items-center gap-2"
                >
                  <CreditCard className="w-6 h-6" />
                  <span className="text-sm font-medium">Process Payments</span>
                </button>
                <button 
                  onClick={() => setActiveSection('analytics')}
                  className="bg-purple-600 hover:bg-purple-500 p-4 rounded-lg transition-colors flex flex-col items-center gap-2"
                >
                  <BarChart3 className="w-6 h-6" />
                  <span className="text-sm font-medium">View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        );
      case 'tasks':
        return <TaskManager />;
      case 'users':
        return <UserManager />;
      case 'payments':
        return <PaymentManager />;
      case 'analytics':
        return <Analytics />;
      case 'notifications':
        return <NotificationManager />;
      case 'database':
        return <DatabaseManager />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <div className="text-white">Section not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-gray-800 border-r border-gray-700 transition-all duration-300 z-30 ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h2 className="text-xl font-bold text-white">iTonzi Admin</h2>
                <p className="text-gray-400 text-sm">Control Panel</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${item.color}`} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        {sidebarOpen && currentUser && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-lg">
                {currentUser.avatar}
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">{currentUser.name}</div>
                <div className="text-gray-400 text-xs">{currentUser.role.replace('_', ' ')}</div>
              </div>
            </div>
            <button className="w-full flex items-center gap-2 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Top Bar */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-white capitalize">
                {activeSection === 'dashboard' ? 'Dashboard' : activeSection.replace('_', ' ')}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors">
                <RefreshCw className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;