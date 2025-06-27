import React from 'react';
import { Wallet } from 'lucide-react';

interface DepositComponentProps {
  onClose: () => void;
}

const DepositComponent: React.FC<DepositComponentProps> = ({ onClose }) => {
  return (
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
  );
};

export default DepositComponent; 