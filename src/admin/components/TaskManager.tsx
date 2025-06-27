import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Search, 
  Download,
  Copy,
  Star,
  Zap,
  Crown,
  Award,
  Calendar,
  Users,
  MessageCircle,
  Heart,
  Target,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { tasksApi } from '../../services/api';

interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  type: 'social' | 'referral' | 'daily' | 'special' | 'community';
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  category: string;
  timeLimit?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  completionCount: number;
  maxCompletions?: number;
  requirements?: string[];
  externalUrl?: string;
}

interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  defaultReward: number;
  type: string;
  difficulty: string;
  category: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'active' | 'inactive' | 'completed'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard' | 'legendary'>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    reward: 0,
    type: 'daily',
    difficulty: 'easy',
    category: '',
    timeLimit: '',
    isActive: true,
    requirements: [],
    externalUrl: ''
  });

  const taskTemplates: TaskTemplate[] = [
    {
      id: '1',
      name: 'Social Media Follow',
      description: 'Follow our social media accounts',
      defaultReward: 50,
      type: 'social',
      difficulty: 'easy',
      category: 'Social Media'
    },
    {
      id: '2',
      name: 'Daily Check-in',
      description: 'Complete daily check-in',
      defaultReward: 25,
      type: 'daily',
      difficulty: 'easy',
      category: 'Daily Tasks'
    },
    {
      id: '3',
      name: 'Referral Program',
      description: 'Invite friends to join',
      defaultReward: 200,
      type: 'referral',
      difficulty: 'medium',
      category: 'Referral Program'
    },
    {
      id: '4',
      name: 'Community Engagement',
      description: 'Participate in community activities',
      defaultReward: 100,
      type: 'community',
      difficulty: 'medium',
      category: 'Community'
    }
  ];

  useEffect(() => {
    // Load tasks from localStorage or API
    loadTasks();
  }, []);

  useEffect(() => {
    // Filter tasks based on search and filters
    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(task => {
        switch (filterType) {
          case 'active': return task.isActive;
          case 'inactive': return !task.isActive;
          case 'completed': return task.completed;
          default: return true;
        }
      });
    }

    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(task => task.difficulty === filterDifficulty);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, filterType, filterDifficulty]);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await tasksApi.getTasks();
      setTasks(response.items || response.data || []);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.description || !newTask.reward) {
      alert('Please fill in all required fields');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await tasksApi.createTask(newTask as any);
      setShowCreateModal(false);
      resetNewTask();
      await loadTasks();
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = async () => {
    if (!selectedTask) return;
    setLoading(true);
    setError(null);
    try {
      await tasksApi.updateTask(selectedTask.id.toString(), selectedTask as any);
      setShowEditModal(false);
      setSelectedTask(null);
      await loadTasks();
    } catch (err) {
      setError('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      setError(null);
      try {
        await tasksApi.deleteTask(taskId.toString());
        await loadTasks();
      } catch (err) {
        setError('Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleActive = async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    setLoading(true);
    setError(null);
    try {
      await tasksApi.updateTask(taskId.toString(), { isActive: !task.isActive });
      await loadTasks();
    } catch (err) {
      setError('Failed to update task status');
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicateTask = (task: Task) => {
    const duplicatedTask: Task = {
      ...task,
      id: Date.now(),
      title: `${task.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completionCount: 0
    };
    const updatedTasks = [...tasks, duplicatedTask];
    setTasks(updatedTasks);
  };

  const resetNewTask = () => {
    setNewTask({
      title: '',
      description: '',
      reward: 0,
      type: 'daily',
      difficulty: 'easy',
      category: '',
      timeLimit: '',
      isActive: true,
      requirements: [],
      externalUrl: ''
    });
  };

  const applyTemplate = (template: TaskTemplate) => {
    setNewTask({
      title: template.name,
      description: template.description,
      reward: template.defaultReward,
      type: template.type as any,
      difficulty: template.difficulty as any,
      category: template.category,
      timeLimit: '',
      isActive: true,
      requirements: [],
      externalUrl: ''
    });
  };

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'itonzi-tasks.json';
    link.click();
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <Star className="w-4 h-4 text-green-400" />;
      case 'medium': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'hard': return <Crown className="w-4 h-4 text-red-400" />;
      case 'legendary': return <Award className="w-4 h-4 text-purple-400" />;
      default: return <Star className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'social': return <MessageCircle className="w-4 h-4 text-blue-400" />;
      case 'daily': return <Calendar className="w-4 h-4 text-orange-400" />;
      case 'referral': return <Users className="w-4 h-4 text-purple-400" />;
      case 'special': return <Star className="w-4 h-4 text-yellow-400" />;
      case 'community': return <Heart className="w-4 h-4 text-pink-400" />;
      default: return <Target className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Task Manager</h2>
        <p className="text-green-100">Create, edit, and manage airdrop tasks</p>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <div>Total Tasks: {tasks.length}</div>
          <div>Active: {tasks.filter(t => t.isActive).length}</div>
          <div>Completed: {tasks.filter(t => t.completed).length}</div>
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
                placeholder="Search tasks..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-green-400 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value as any)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-green-400 focus:outline-none"
              >
                <option value="all">All Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="legendary">Legendary</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={exportTasks}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Task
            </button>
          </div>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">{tasks.length}</div>
            <div className="text-gray-400 text-sm">Total Tasks</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">{tasks.filter(t => t.isActive).length}</div>
            <div className="text-gray-400 text-sm">Active Tasks</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{tasks.reduce((sum, t) => sum + t.completionCount, 0)}</div>
            <div className="text-gray-400 text-sm">Total Completions</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">{tasks.reduce((sum, t) => sum + (t.reward * t.completionCount), 0)}</div>
            <div className="text-gray-400 text-sm">Total Rewards</div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-white font-bold text-lg">Tasks ({filteredTasks.length})</h3>
        </div>
        
        <div className="divide-y divide-gray-700">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-6 hover:bg-gray-700/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white font-bold text-lg">{task.title}</h4>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(task.type)}
                      {getDifficultyIcon(task.difficulty)}
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        task.isActive ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'
                      }`}>
                        {task.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-3">{task.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <span className="bg-gray-700 px-2 py-1 rounded">{task.category}</span>
                    <span>Reward: {task.reward} coins</span>
                    <span>Completions: {task.completionCount}</span>
                    {task.timeLimit && <span>Time: {task.timeLimit}</span>}
                    {task.maxCompletions && <span>Max: {task.maxCompletions}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleToggleActive(task.id)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      task.isActive 
                        ? 'bg-green-600 hover:bg-green-500 text-white' 
                        : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                    }`}
                    title={task.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {task.isActive ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setShowEditModal(true);
                    }}
                    className="w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDuplicateTask(task)}
                    className="w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="w-8 h-8 bg-red-600 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {task.requirements && task.requirements.length > 0 && (
                <div className="mt-3">
                  <div className="text-gray-400 text-sm mb-2">Requirements:</div>
                  <div className="flex flex-wrap gap-2">
                    {task.requirements.map((req, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="p-12 text-center">
            <Target className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <h3 className="text-white font-bold mb-2">No Tasks Found</h3>
            <p className="text-gray-400 mb-4">
              {searchTerm || filterType !== 'all' || filterDifficulty !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first task to get started'
              }
            </p>
            {!searchTerm && filterType === 'all' && filterDifficulty === 'all' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Create First Task
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-gray-700">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Create New Task</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {/* Templates */}
              <div className="mb-6">
                <h4 className="text-white font-bold mb-3">Quick Templates</h4>
                <div className="grid grid-cols-2 gap-3">
                  {taskTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => applyTemplate(template)}
                      className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors"
                    >
                      <div className="text-white font-medium text-sm">{template.name}</div>
                      <div className="text-gray-400 text-xs">{template.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Title *</label>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-green-400 focus:outline-none"
                      placeholder="Enter task title"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Category *</label>
                    <input
                      type="text"
                      value={newTask.category}
                      onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-green-400 focus:outline-none"
                      placeholder="e.g., Social Media"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Description *</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-green-400 focus:outline-none resize-none"
                    placeholder="Describe what users need to do"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Reward (coins) *</label>
                    <input
                      type="number"
                      value={newTask.reward}
                      onChange={(e) => setNewTask({...newTask, reward: parseInt(e.target.value) || 0})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-green-400 focus:outline-none"
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Type</label>
                    <select
                      value={newTask.type}
                      onChange={(e) => setNewTask({...newTask, type: e.target.value as any})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-green-400 focus:outline-none"
                    >
                      <option value="daily">Daily</option>
                      <option value="social">Social</option>
                      <option value="referral">Referral</option>
                      <option value="special">Special</option>
                      <option value="community">Community</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Difficulty</label>
                    <select
                      value={newTask.difficulty}
                      onChange={(e) => setNewTask({...newTask, difficulty: e.target.value as any})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-green-400 focus:outline-none"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                      <option value="legendary">Legendary</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Time Limit</label>
                    <input
                      type="text"
                      value={newTask.timeLimit}
                      onChange={(e) => setNewTask({...newTask, timeLimit: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-green-400 focus:outline-none"
                      placeholder="e.g., 24h, 7 days"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">External URL</label>
                    <input
                      type="url"
                      value={newTask.externalUrl}
                      onChange={(e) => setNewTask({...newTask, externalUrl: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-green-400 focus:outline-none"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Requirements (one per line)</label>
                  <textarea
                    value={newTask.requirements?.join('\n') || ''}
                    onChange={(e) => setNewTask({...newTask, requirements: e.target.value.split('\n').filter(r => r.trim())})}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-green-400 focus:outline-none resize-none"
                    placeholder="Enter each requirement on a new line"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={newTask.isActive}
                    onChange={(e) => setNewTask({...newTask, isActive: e.target.checked})}
                    className="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                  />
                  <label htmlFor="isActive" className="text-white font-medium">
                    Activate task immediately
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-700 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="flex-1 bg-green-600 hover:bg-green-500 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {showEditModal && selectedTask && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-gray-700">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Edit Task</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={selectedTask.title}
                      onChange={(e) => setSelectedTask({...selectedTask, title: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Category</label>
                    <input
                      type="text"
                      value={selectedTask.category}
                      onChange={(e) => setSelectedTask({...selectedTask, category: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Description</label>
                  <textarea
                    value={selectedTask.description}
                    onChange={(e) => setSelectedTask({...selectedTask, description: e.target.value})}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Reward (coins)</label>
                    <input
                      type="number"
                      value={selectedTask.reward}
                      onChange={(e) => setSelectedTask({...selectedTask, reward: parseInt(e.target.value) || 0})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Type</label>
                    <select
                      value={selectedTask.type}
                      onChange={(e) => setSelectedTask({...selectedTask, type: e.target.value as any})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                    >
                      <option value="daily">Daily</option>
                      <option value="social">Social</option>
                      <option value="referral">Referral</option>
                      <option value="special">Special</option>
                      <option value="community">Community</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Difficulty</label>
                    <select
                      value={selectedTask.difficulty}
                      onChange={(e) => setSelectedTask({...selectedTask, difficulty: e.target.value as any})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                      <option value="legendary">Legendary</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Time Limit</label>
                    <input
                      type="text"
                      value={selectedTask.timeLimit || ''}
                      onChange={(e) => setSelectedTask({...selectedTask, timeLimit: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                      placeholder="e.g., 24h, 7 days"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">External URL</label>
                    <input
                      type="url"
                      value={selectedTask.externalUrl || ''}
                      onChange={(e) => setSelectedTask({...selectedTask, externalUrl: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Requirements</label>
                  <textarea
                    value={selectedTask.requirements?.join('\n') || ''}
                    onChange={(e) => setSelectedTask({...selectedTask, requirements: e.target.value.split('\n').filter(r => r.trim())})}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-400 focus:outline-none resize-none"
                    placeholder="Enter each requirement on a new line"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="editIsActive"
                    checked={selectedTask.isActive}
                    onChange={(e) => setSelectedTask({...selectedTask, isActive: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="editIsActive" className="text-white font-medium">
                    Task is active
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-700 flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditTask}
                className="flex-1 bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading/Error UI */}
      {loading && <div className="text-center text-gray-400">Loading tasks...</div>}
      {error && <div className="text-center text-red-400">{error}</div>}
    </div>
  );
};

export default TaskManager;