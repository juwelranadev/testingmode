import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Ban, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Download,
  Upload,
  Mail,
  Phone,
  Calendar,
  Coins,
  Trophy,
  Star,
  Shield,
  Clock,
  TrendingUp,
  UserPlus,
  UserMinus,
  Settings,
  MoreVertical
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  coins: number;
  totalEarned: number;
  referrals: number;
  tasksCompleted: number;
  status: 'active' | 'suspended' | 'banned' | 'pending';
  role: 'user' | 'premium' | 'vip';
  joinDate: string;
  lastActive: string;
  country: string;
  verified: boolean;
  walletConnected: boolean;
  walletAddress?: string;
  withdrawalCount: number;
  totalWithdrawn: number;
  riskScore: number;
  notes?: string;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  bannedUsers: number;
  verifiedUsers: number;
  premiumUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
}

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended' | 'banned' | 'pending'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'premium' | 'vip'>('all');
  const [sortBy, setSortBy] = useState<'username' | 'coins' | 'level' | 'joinDate' | 'lastActive'>('joinDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);

  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 15420,
    activeUsers: 8930,
    suspendedUsers: 45,
    bannedUsers: 12,
    verifiedUsers: 12340,
    premiumUsers: 890,
    newUsersToday: 156,
    newUsersThisWeek: 1240
  });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterAndSortUsers();
  }, [users, searchTerm, statusFilter, roleFilter, sortBy, sortOrder]);

  const loadUsers = () => {
    // Generate sample users
    const sampleUsers: User[] = Array.from({ length: 100 }, (_, index) => ({
      id: `user_${index + 1}`,
      username: `User${index + 1}`,
      email: `user${index + 1}@example.com`,
      avatar: ['👤', '👨', '👩', '🧑', '👱', '👨‍💼', '👩‍💼'][index % 7],
      level: Math.floor(Math.random() * 10) + 1,
      coins: Math.floor(Math.random() * 10000),
      totalEarned: Math.floor(Math.random() * 50000),
      referrals: Math.floor(Math.random() * 20),
      tasksCompleted: Math.floor(Math.random() * 100),
      status: ['active', 'active', 'active', 'active', 'suspended', 'banned', 'pending'][Math.floor(Math.random() * 7)] as any,
      role: ['user', 'user', 'user', 'premium', 'vip'][Math.floor(Math.random() * 5)] as any,
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      country: ['🇺🇸', '🇬🇧', '🇩🇪', '🇫🇷', '🇯🇵', '🇰🇷', '🇨🇦', '🇦🇺', '🇧🇷', '🇮🇳'][Math.floor(Math.random() * 10)],
      verified: Math.random() > 0.3,
      walletConnected: Math.random() > 0.4,
      walletAddress: Math.random() > 0.4 ? `UQBx...${Math.random().toString(36).substr(2, 4)}` : undefined,
      withdrawalCount: Math.floor(Math.random() * 10),
      totalWithdrawn: Math.floor(Math.random() * 1000),
      riskScore: Math.floor(Math.random() * 100),
      notes: Math.random() > 0.8 ? 'Suspicious activity detected' : undefined
    }));

    setUsers(sampleUsers);
  };

  const filterAndSortUsers = () => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      if (sortBy === 'joinDate' || sortBy === 'lastActive') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleUserAction = (userId: string, action: 'suspend' | 'ban' | 'activate' | 'verify' | 'delete') => {
    if (action === 'delete' && !confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        switch (action) {
          case 'suspend':
            return { ...user, status: 'suspended' as const };
          case 'ban':
            return { ...user, status: 'banned' as const };
          case 'activate':
            return { ...user, status: 'active' as const };
          case 'verify':
            return { ...user, verified: true };
          default:
            return user;
        }
      }
      return user;
    });

    if (action === 'delete') {
      setUsers(users.filter(user => user.id !== userId));
    } else {
      setUsers(updatedUsers);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'suspended': return 'text-yellow-400 bg-yellow-400/20';
      case 'banned': return 'text-red-400 bg-red-400/20';
      case 'pending': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'vip': return 'text-purple-400 bg-purple-400/20';
      case 'premium': return 'text-yellow-400 bg-yellow-400/20';
      case 'user': return 'text-gray-400 bg-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-400 bg-red-400/20';
    if (score >= 40) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-green-400 bg-green-400/20';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
  };

  const exportUsers = () => {
    const dataStr = JSON.stringify(filteredUsers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'itonzi-users.json';
    link.click();
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">User Management</h2>
        <p className="text-purple-100">Manage users, permissions, and account status</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-white">{userStats.totalUsers.toLocaleString()}</div>
          <div className="text-gray-400 text-sm">Total Users</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-green-400">{userStats.activeUsers.toLocaleString()}</div>
          <div className="text-gray-400 text-sm">Active</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400">{userStats.suspendedUsers}</div>
          <div className="text-gray-400 text-sm">Suspended</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-red-400">{userStats.bannedUsers}</div>
          <div className="text-gray-400 text-sm">Banned</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400">{userStats.verifiedUsers.toLocaleString()}</div>
          <div className="text-gray-400 text-sm">Verified</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-purple-400">{userStats.premiumUsers}</div>
          <div className="text-gray-400 text-sm">Premium</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-cyan-400">{userStats.newUsersToday}</div>
          <div className="text-gray-400 text-sm">Today</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-orange-400">{userStats.newUsersThisWeek}</div>
          <div className="text-gray-400 text-sm">This Week</div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="banned">Banned</option>
                <option value="pending">Pending</option>
              </select>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
              >
                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:outline-none"
              >
                <option value="joinDate">Join Date</option>
                <option value="lastActive">Last Active</option>
                <option value="username">Username</option>
                <option value="coins">Coins</option>
                <option value="level">Level</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white hover:bg-gray-600 transition-colors"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={exportUsers}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="text-gray-400 text-sm">
          Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">User</th>
                <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                <th className="text-left p-4 text-gray-300 font-medium">Role</th>
                <th className="text-left p-4 text-gray-300 font-medium">Stats</th>
                <th className="text-left p-4 text-gray-300 font-medium">Activity</th>
                <th className="text-left p-4 text-gray-300 font-medium">Risk</th>
                <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{user.avatar}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{user.username}</span>
                          <span className="text-lg">{user.country}</span>
                          {user.verified && <CheckCircle className="w-4 h-4 text-green-400" />}
                          {user.walletConnected && <Shield className="w-4 h-4 text-blue-400" />}
                        </div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                        <div className="text-gray-500 text-xs">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="text-white">Level {user.level}</div>
                      <div className="text-yellow-400">{user.coins} coins</div>
                      <div className="text-gray-400">{user.tasksCompleted} tasks</div>
                      <div className="text-purple-400">{user.referrals} refs</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="text-gray-400">Joined: {formatDate(user.joinDate)}</div>
                      <div className="text-gray-400">Active: {formatTimeAgo(user.lastActive)}</div>
                      <div className="text-green-400">${user.totalEarned}</div>
                      <div className="text-red-400">${user.totalWithdrawn}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRiskColor(user.riskScore)}`}>
                      {user.riskScore}%
                    </span>
                    {user.notes && (
                      <div className="text-yellow-400 text-xs mt-1">⚠️ Has notes</div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className="w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {user.status === 'active' ? (
                        <button
                          onClick={() => handleUserAction(user.id, 'suspend')}
                          className="w-8 h-8 bg-yellow-600 hover:bg-yellow-500 rounded-lg flex items-center justify-center transition-colors"
                          title="Suspend"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUserAction(user.id, 'activate')}
                          className="w-8 h-8 bg-green-600 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors"
                          title="Activate"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleUserAction(user.id, 'ban')}
                        className="w-8 h-8 bg-red-600 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors"
                        title="Ban"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-700 flex items-center justify-between">
            <div className="text-gray-400 text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-700">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{selectedUser.avatar}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedUser.username}</h3>
                    <p className="text-purple-100">{selectedUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h4 className="text-white font-bold text-lg">Basic Information</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-gray-400 text-sm">User ID</div>
                      <div className="text-white">{selectedUser.id}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Status</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status}
                      </span>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Role</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRoleColor(selectedUser.role)}`}>
                        {selectedUser.role}
                      </span>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Country</div>
                      <div className="text-white">{selectedUser.country}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Verified</div>
                      <div className="text-white">{selectedUser.verified ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <h4 className="text-white font-bold text-lg">Statistics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-gray-400 text-sm">Level</div>
                      <div className="text-white">{selectedUser.level}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Current Coins</div>
                      <div className="text-yellow-400">{selectedUser.coins}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Total Earned</div>
                      <div className="text-green-400">${selectedUser.totalEarned}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Total Withdrawn</div>
                      <div className="text-red-400">${selectedUser.totalWithdrawn}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Tasks Completed</div>
                      <div className="text-white">{selectedUser.tasksCompleted}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Referrals</div>
                      <div className="text-purple-400">{selectedUser.referrals}</div>
                    </div>
                  </div>
                </div>

                {/* Activity & Security */}
                <div className="space-y-4">
                  <h4 className="text-white font-bold text-lg">Activity & Security</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-gray-400 text-sm">Join Date</div>
                      <div className="text-white">{formatDate(selectedUser.joinDate)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Last Active</div>
                      <div className="text-white">{formatTimeAgo(selectedUser.lastActive)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Wallet Connected</div>
                      <div className="text-white">{selectedUser.walletConnected ? 'Yes' : 'No'}</div>
                    </div>
                    {selectedUser.walletAddress && (
                      <div>
                        <div className="text-gray-400 text-sm">Wallet Address</div>
                        <div className="text-white font-mono text-sm">{selectedUser.walletAddress}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-gray-400 text-sm">Withdrawal Count</div>
                      <div className="text-white">{selectedUser.withdrawalCount}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Risk Score</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRiskColor(selectedUser.riskScore)}`}>
                        {selectedUser.riskScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedUser.notes && (
                <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/50 rounded-lg">
                  <h5 className="text-yellow-400 font-bold mb-2">Admin Notes</h5>
                  <p className="text-white">{selectedUser.notes}</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-700 flex gap-3">
              <button
                onClick={() => handleUserAction(selectedUser.id, 'verify')}
                disabled={selectedUser.verified}
                className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Verify User
              </button>
              <button
                onClick={() => handleUserAction(selectedUser.id, selectedUser.status === 'active' ? 'suspend' : 'activate')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedUser.status === 'active' 
                    ? 'bg-yellow-600 hover:bg-yellow-500' 
                    : 'bg-green-600 hover:bg-green-500'
                }`}
              >
                {selectedUser.status === 'active' ? 'Suspend' : 'Activate'}
              </button>
              <button
                onClick={() => handleUserAction(selectedUser.id, 'ban')}
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Ban User
              </button>
              <button
                onClick={() => setShowUserModal(false)}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;