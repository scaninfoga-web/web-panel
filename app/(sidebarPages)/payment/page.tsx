'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Cashfree from '@cashfreepayments/cashfree-js';

export default function WalletTopUp() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Get token from Redux state
  const token = useSelector((state: any) => state.user.token);

  const initiatePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Enter a valid amount.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        'https://backend.scaninfoga.com/api/payments/initiate-payment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // ✅ Authorization header added
          },
          body: JSON.stringify({ amount }),
        },
      );

      const data = await res.json();

      if (data.paymentSessionId) {
        launchCashfreeCheckout(data.paymentSessionId);
      } else {
        alert('Failed to initiate payment.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const launchCashfreeCheckout = (paymentSessionId: string) => {
    const cashfree = new Cashfree({ paymentSessionId });
    cashfree.redirect();
  };

  return (
    <div className="mx-auto flex max-w-md flex-col space-y-4 p-4">
      <h1 className="mb-4 text-2xl font-bold">Wallet Top-Up</h1>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="rounded border p-2"
      />
      <button
        onClick={initiatePayment}
        disabled={loading}
        className="rounded bg-blue-500 p-2 text-white"
      >
        {loading ? 'Processing...' : 'Top-Up Wallet'}
      </button>
    </div>
  );
}
