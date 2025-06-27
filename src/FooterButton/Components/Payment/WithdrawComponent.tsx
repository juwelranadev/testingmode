import React, { useState } from 'react';
import { Wallet, DollarSign, CreditCard, Smartphone, Send, ArrowRight } from 'lucide-react';

interface WithdrawComponentProps {
  balance: number;
  onWithdraw: (method: string, amount: string, address: string) => void;
  isProcessing: boolean;
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

const WithdrawComponent: React.FC<WithdrawComponentProps> = ({ 
  balance, 
  onWithdraw, 
  isProcessing 
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');

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

  const handleWithdraw = () => {
    if (!selectedMethod || !amount || !walletAddress) return;
    onWithdraw(selectedMethod, amount, walletAddress);
  };

  const resetForm = () => {
    setAmount('');
    setWalletAddress('');
    setSelectedMethod('');
  };

  return (
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
  );
};

export default WithdrawComponent; 