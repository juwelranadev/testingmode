import React, { useState } from 'react';
import { X, Headphones, MessageCircle, Mail, Phone, Send, Clock, CheckCircle, AlertCircle, Book, ExternalLink, User, Bug, HelpCircle, Star } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'pending' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  date: string;
  lastUpdate: string;
}

interface ContactMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  responseTime: string;
  available: boolean;
  action: string;
}

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'contact' | 'tickets' | 'help' | 'feedback'>('contact');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    message: ''
  });
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 0,
    category: '',
    message: ''
  });

  const supportTickets: SupportTicket[] = [
    {
      id: 'TKT-001',
      subject: 'Withdrawal not processed',
      status: 'pending',
      priority: 'high',
      date: '2024-01-15',
      lastUpdate: '2 hours ago'
    },
    {
      id: 'TKT-002',
      subject: 'Ad viewing issues',
      status: 'resolved',
      priority: 'medium',
      date: '2024-01-14',
      lastUpdate: '1 day ago'
    },
    {
      id: 'TKT-003',
      subject: 'Account verification',
      status: 'open',
      priority: 'low',
      date: '2024-01-13',
      lastUpdate: '3 days ago'
    }
  ];

  const contactMethods: ContactMethod[] = [
    {
      id: 'telegram',
      name: 'Telegram Support',
      icon: <MessageCircle className="w-6 h-6" />,
      description: 'Chat with our support team on Telegram',
      responseTime: 'Usually within 1 hour',
      available: true,
      action: 'Open Telegram'
    },
    {
      id: 'email',
      name: 'Email Support',
      icon: <Mail className="w-6 h-6" />,
      description: 'Send us an email for detailed inquiries',
      responseTime: 'Usually within 24 hours',
      available: true,
      action: 'Send Email'
    },
    {
      id: 'live-chat',
      name: 'Live Chat',
      icon: <Headphones className="w-6 h-6" />,
      description: 'Real-time chat support',
      responseTime: 'Available 9 AM - 6 PM UTC',
      available: false,
      action: 'Start Chat'
    },
    {
      id: 'phone',
      name: 'Phone Support',
      icon: <Phone className="w-6 h-6" />,
      description: 'Call our support hotline',
      responseTime: 'Available 9 AM - 5 PM UTC',
      available: false,
      action: 'Call Now'
    }
  ];

  const helpTopics = [
    {
      id: '1',
      title: 'Getting Started',
      description: 'Learn how to use iTonzi and start earning',
      icon: <User className="w-5 h-5" />,
      articles: 12
    },
    {
      id: '2',
      title: 'Earning & Tasks',
      description: 'How to maximize your earnings',
      icon: <Star className="w-5 h-5" />,
      articles: 8
    },
    {
      id: '3',
      title: 'Payments & Withdrawals',
      description: 'Everything about payments and withdrawals',
      icon: <CheckCircle className="w-5 h-5" />,
      articles: 15
    },
    {
      id: '4',
      title: 'Technical Issues',
      description: 'Troubleshooting common problems',
      icon: <Bug className="w-5 h-5" />,
      articles: 6
    },
    {
      id: '5',
      title: 'Account & Security',
      description: 'Account management and security',
      icon: <HelpCircle className="w-5 h-5" />,
      articles: 10
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'open': return <AlertCircle className="w-4 h-4 text-blue-400" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const handleSubmitTicket = () => {
    // Handle ticket submission
    console.log('Ticket submitted:', ticketForm);
    setTicketForm({ subject: '', category: '', priority: 'medium', message: '' });
  };

  const handleSubmitFeedback = () => {
    // Handle feedback submission
    console.log('Feedback submitted:', feedbackForm);
    setFeedbackForm({ rating: 0, category: '', message: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-0 m-0">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 w-full h-full min-h-screen flex flex-col overflow-hidden border border-gray-700 rounded-none">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Support Center</h2>
            <p className="text-cyan-100 text-sm">
              We're here to help you 24/7
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="flex">
            {[
              { id: 'contact', label: 'Contact', icon: MessageCircle },
              { id: 'tickets', label: 'Tickets', icon: Clock },
              { id: 'help', label: 'Help', icon: Book },
              { id: 'feedback', label: 'Feedback', icon: Star }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 transition-all ${
                    activeTab === tab.id
                      ? 'text-cyan-400 bg-cyan-400/10 border-b-2 border-cyan-400'
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
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-white font-bold text-lg mb-2">Get in Touch</h3>
                <p className="text-gray-400 text-sm">
                  Choose your preferred way to contact us
                </p>
              </div>

              <div className="space-y-3">
                {contactMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`bg-gray-800/50 rounded-lg p-4 border border-gray-700 ${
                      method.available ? 'hover:border-cyan-400/50 cursor-pointer' : 'opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-cyan-400">{method.icon}</div>
                        <div>
                          <div className="text-white font-bold">{method.name}</div>
                          <div className="text-gray-400 text-sm">{method.description}</div>
                        </div>
                      </div>
                      {!method.available && (
                        <span className="text-red-400 text-xs font-bold">OFFLINE</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">{method.responseTime}</span>
                      <button
                        disabled={!method.available}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                          method.available
                            ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={
                          method.id === 'telegram' && method.available
                            ? () => window.open('https://t.me/zikrulislam84', '_blank', 'noopener,noreferrer')
                            : method.id === 'email' && method.available
                              ? () => window.open('mailto:itonzi.finance@gmail.com')
                              : undefined
                        }
                      >
                        {method.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact Form */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mt-6">
                <h4 className="text-white font-bold mb-3">Quick Message</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                  />
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="technical">Technical Issue</option>
                    <option value="payment">Payment Problem</option>
                    <option value="account">Account Issue</option>
                    <option value="general">General Question</option>
                  </select>
                  <textarea
                    placeholder="Describe your issue..."
                    value={ticketForm.message}
                    onChange={(e) => setTicketForm({...ticketForm, message: e.target.value})}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none"
                  />
                  <button
                    onClick={handleSubmitTicket}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-white font-bold text-lg mb-2">Support Tickets</h3>
                <p className="text-gray-400 text-sm">
                  Track your support requests
                </p>
              </div>

              {supportTickets.length > 0 ? (
                <div className="space-y-3">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(ticket.status)}
                          <span className="text-white font-medium">{ticket.subject}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-400">
                          <div>ID: {ticket.id}</div>
                          <div>Created: {ticket.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-400">Last update:</div>
                          <div className="text-cyan-400">{ticket.lastUpdate}</div>
                        </div>
                      </div>
                      
                      <button className="w-full mt-3 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg font-medium transition-colors">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                  <h3 className="text-white font-bold mb-2">No Support Tickets</h3>
                  <p className="text-gray-400 text-sm">
                    You haven't submitted any support tickets yet
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'help' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-white font-bold text-lg mb-2">Help Center</h3>
                <p className="text-gray-400 text-sm">
                  Find answers to common questions
                </p>
              </div>

              <div className="space-y-3">
                {helpTopics.map((topic) => (
                  <div key={topic.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-cyan-400/50 cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-cyan-400">{topic.icon}</div>
                        <div>
                          <div className="text-white font-bold">{topic.title}</div>
                          <div className="text-gray-400 text-sm">{topic.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-xs">{topic.articles} articles</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Search Help */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mt-6">
                <h4 className="text-white font-bold mb-3">Search Help Articles</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search for help..."
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                  />
                  <button className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg transition-colors">
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-white font-bold text-lg mb-2">Share Your Feedback</h3>
                <p className="text-gray-400 text-sm">
                  Help us improve iTonzi with your suggestions
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="space-y-4">
                  {/* Rating */}
                  <div>
                    <label className="block text-white font-bold mb-2">Rate your experience</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setFeedbackForm({...feedbackForm, rating: star})}
                          className={`text-2xl transition-colors ${
                            star <= feedbackForm.rating ? 'text-yellow-400' : 'text-gray-600'
                          }`}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-white font-bold mb-2">Feedback Category</label>
                    <select
                      value={feedbackForm.category}
                      onChange={(e) => setFeedbackForm({...feedbackForm, category: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="">Select Category</option>
                      <option value="ui">User Interface</option>
                      <option value="features">Features</option>
                      <option value="performance">Performance</option>
                      <option value="bugs">Bug Report</option>
                      <option value="suggestion">Suggestion</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white font-bold mb-2">Your Feedback</label>
                    <textarea
                      placeholder="Tell us what you think..."
                      value={feedbackForm.message}
                      onChange={(e) => setFeedbackForm({...feedbackForm, message: e.target.value})}
                      rows={4}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSubmitFeedback}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Feedback
                  </button>
                </div>
              </div>

              {/* Community Links */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <h4 className="text-white font-bold mb-3">Join Our Community</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => window.open('https://t.me/iTonziFinanceChannel', '_blank', 'noopener,noreferrer')}
                    className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Telegram Community
                  </button>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Discord Server
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportModal;