import React, { useState } from 'react';
import { X, CreditCard, Wallet, DollarSign, Clock, CheckCircle, AlertCircle, Copy, ExternalLink, Coins, TrendingUp, Calendar, ArrowRight, Smartphone, Send } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  minAmount: number;
  fee: number;
  processingTime: string;
  available: boolean;
}

interface Transaction {
  id: string;
  type: 'withdrawal' | 'deposit';
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  txHash?: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, balance }) => {
  const [activeTab, setActiveTab] = useState<'withdraw' | 'deposit' | 'history'>('withdraw');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'ton',
      name: 'TON Wallet',
      icon: <Wallet className="w-6 h-6" />,
      minAmount: 0.1,
      fee: 0.01,
      processingTime: '5-10 minutes',
      available: true
    },
    {
      id: 'usdt',
      name: 'USDT (TRC20)',
      icon: <DollarSign className="w-6 h-6" />,
      minAmount: 5,
      fee: 1,
      processingTime: '10-30 minutes',
      available: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <CreditCard className="w-6 h-6" />,
      minAmount: 10,
      fee: 0.5,
      processingTime: '1-3 business days',
      available: false
    },
    {
      id: 'bkash',
      name: 'bKash',
      icon: <Smartphone className="w-6 h-6 text-pink-500" />,
      minAmount: 100,
      fee: 10,
      processingTime: 'Instant',
      available: true
    },
    {
      id: 'nagad',
      name: 'Nagad',
      icon: <Smartphone className="w-6 h-6 text-yellow-400" />,
      minAmount: 100,
      fee: 10,
      processingTime: 'Instant',
      available: true
    },
    {
      id: 'rocket',
      name: 'Rocket',
      icon: <Send className="w-6 h-6 text-purple-400" />,
      minAmount: 100,
      fee: 10,
      processingTime: 'Instant',
      available: true
    }
  ];

  const recentTransactions: Transaction[] = [
    {
      id: '1',
      type: 'withdrawal',
      amount: 25.50,
      method: 'TON Wallet',
      status: 'completed',
      date: '2024-01-15',
      txHash: 'EQBx...7k9m'
    },
    {
      id: '2',
      type: 'withdrawal',
      amount: 15.00,
      method: 'USDT (TRC20)',
      status: 'pending',
      date: '2024-01-14'
    },
    {
      id: '3',
      type: 'deposit',
      amount: 50.00,
      method: 'Bonus',
      status: 'completed',
      date: '2024-01-13'
    }
  ];

  const handleWithdraw = async () => {
    if (!selectedMethod || !amount || !walletAddress) return;
    
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setAmount('');
      setWalletAddress('');
      setSelectedMethod('');
      // Show success message
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'failed': return <AlertCircle className="w-5 h-5 text-red-400" />;
      default: return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-0 m-0">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 w-full h-full min-h-screen flex flex-col overflow-hidden border border-gray-700 rounded-none">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Payment Center</h2>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="flex items-center justify-center gap-2 text-white">
                <Coins className="w-6 h-6 text-yellow-300" />
                <span className="text-2xl font-bold">${balance.toFixed(3)}</span>
              </div>
              <p className="text-green-100 text-sm">Available Balance</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="flex">
            {[
              { id: 'withdraw', label: 'Withdraw', icon: TrendingUp },
              { id: 'deposit', label: 'Deposit', icon: Wallet },
              { id: 'history', label: 'History', icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 transition-all ${
                    activeTab === tab.id
                      ? 'text-green-400 bg-green-400/10 border-b-2 border-green-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0">
          {activeTab === 'withdraw' && (
            <div className="space-y-6">
              {/* Payment Methods */}
              <div>
                <h3 className="text-white font-bold mb-3">Select Payment Method</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => method.available && setSelectedMethod(method.id)}
                      disabled={!method.available}
                      className={`w-full p-4 rounded-lg border-2 transition-all ${
                        selectedMethod === method.id
                          ? 'border-green-400 bg-green-400/10'
                          : method.available
                          ? 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                          : 'border-gray-700 bg-gray-800/30 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-green-400">{method.icon}</div>
                          <div className="text-left">
                            <div className="text-white font-medium">{method.name}</div>
                            <div className="text-gray-400 text-sm">
                              Min: ${method.minAmount} • Fee: ${method.fee}
                            </div>
                          </div>
                        </div>
                        {!method.available && (
                          <span className="text-red-400 text-xs font-bold">SOON</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              {selectedMethod && (
                <div>
                  <label className="block text-white font-bold mb-2">Withdrawal Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                    />
                    <button
                      onClick={() => setAmount(balance.toString())}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-sm font-bold transition-colors"
                    >
                      MAX
                    </button>
                  </div>
                  {amount && (
                    <div className="mt-2 text-sm text-gray-400">
                      You'll receive: ${(parseFloat(amount) - paymentMethods.find(m => m.id === selectedMethod)!.fee).toFixed(2)}
                    </div>
                  )}
                </div>
              )}

              {/* Wallet Address / Mobile Number */}
              {selectedMethod && (
                <div>
                  <label className="block text-white font-bold mb-2">
                    {['bkash','nagad','rocket'].includes(selectedMethod) ? 'Mobile Number' : 'Wallet Address'}
                  </label>
                  {['bkash','nagad','rocket'].includes(selectedMethod) ? (
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-700 border border-gray-600 rounded-l-lg px-3 py-3 text-white select-none">+880</span>
                      <input
                        type="text"
                        value={walletAddress}
                        onChange={e => {
                          // Only allow digits, max 10
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setWalletAddress(val);
                        }}
                        placeholder="1XXXXXXXXX"
                        className="w-full bg-gray-800 border-t border-b border-r border-gray-600 rounded-r-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                        maxLength={10}
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      placeholder="Enter your wallet address"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
                    />
                  )}
                </div>
              )}

              {/* Submit Button */}
              {selectedMethod && amount && (
                ((['bkash','nagad','rocket'].includes(selectedMethod) && walletAddress.length === 10) || (!['bkash','nagad','rocket'].includes(selectedMethod) && walletAddress)) && (
                  <button
                    onClick={handleWithdraw}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 py-3 rounded-lg font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-5 h-5" />
                        Withdraw ${amount}
                      </>
                    )}
                  </button>
                )
              )}
            </div>
          )}

          {activeTab === 'deposit' && (
            <div className="space-y-6 text-center">
              <div className="bg-blue-600/20 border border-blue-400/50 rounded-lg p-6">
                <Wallet className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-white font-bold text-lg mb-2">Earn More Coins</h3>
                <p className="text-gray-300 mb-4">
                  Complete tasks, watch ads, and refer friends to earn more coins automatically.
                </p>
                <button
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold transition-colors"
                >
                  Start Earning
                </button>
              </div>
              
              <div className="bg-purple-600/20 border border-purple-400/50 rounded-lg p-4">
                <h4 className="text-white font-bold mb-2">Bonus Opportunities</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>• Daily check-in bonus: +10 coins</div>
                  <div>• Referral bonus: +100 coins per friend</div>
                  <div>• Weekly challenges: Up to +500 coins</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-white font-bold">Recent Transactions</h3>
              {recentTransactions.length > 0 ? (
                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(tx.status)}
                          <span className="text-white font-medium">
                            {tx.type === 'withdrawal' ? 'Withdrawal' : 'Deposit'}
                          </span>
                        </div>
                        <span className={`font-bold ${
                          tx.type === 'withdrawal' ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>Method: {tx.method}</div>
                        <div>Date: {tx.date}</div>
                        {tx.txHash && (
                          <div className="flex items-center gap-2">
                            <span>TX: {tx.txHash}</span>
                            <button className="text-blue-400 hover:text-blue-300">
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                  <p className="text-gray-400">No transactions yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;