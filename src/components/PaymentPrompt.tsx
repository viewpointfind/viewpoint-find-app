
import React from 'react';

interface PaymentPromptProps {
  onPay: () => void;
}

export const PaymentPrompt: React.FC<PaymentPromptProps> = ({ onPay }) => {
  return (
    <div className="bg-gray-800 border border-brand-teal/50 rounded-lg p-6 mt-8 text-center shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-2">Unlock Full Results</h3>
      <p className="text-gray-400 mb-6">
        To view all comments, a one-time payment of <span className="font-bold text-brand-teal text-lg">$2.99</span> is required. This gives you full access to the results of this search.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* This is a simulated button. In a real app, this would be a full integration. */}
        <button
          onClick={onPay}
          className="w-full sm:w-auto bg-brand-teal hover:bg-cyan-600 text-black font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
        >
          Pay $2.99 to Reveal
        </button>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <p className="text-gray-500 text-sm">Powered by</p>
            <div className="flex items-center gap-3">
                <span className="font-bold text-xl italic text-blue-400">Stripe</span>
                <span className="font-bold text-xl italic text-blue-200">PayPal</span>
            </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-6">
        This is a simulated payment for this MVP. Clicking the button will instantly unlock the results. A real application would integrate Stripe and PayPal for secure user account creation and payment processing.
      </p>
    </div>
  );
};
