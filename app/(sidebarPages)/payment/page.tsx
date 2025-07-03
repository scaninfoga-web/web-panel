'use client';

import { useState } from 'react';
import Script from 'next/script';
import { useSelector } from 'react-redux';

export default function WalletTopUp() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [cashfreeReady, setCashfreeReady] = useState(false);

  const token = useSelector((state: any) => state.user.token);

  const initiatePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Enter a valid amount.');
      return;
    }

    if (!cashfreeReady) {
      alert('Cashfree SDK is not loaded yet.');
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
            Authorization: `Bearer ${token}`,
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
    if (typeof window !== 'undefined' && (window as any).Cashfree) {
      console.log(
        'Launching Cashfree checkout with session:',
        paymentSessionId,
      );
      (window as any).Cashfree.checkout({ paymentSessionId });
    } else {
      alert('Cashfree SDK is not properly loaded.');
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col space-y-4 p-4">
      <Script
        src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.js" // ✅ Correct SDK URL
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Cashfree SDK loaded successfully.');
          setCashfreeReady(true);
        }}
        onError={() => {
          console.error('Failed to load Cashfree SDK.');
          alert('Failed to load payment SDK.');
        }}
      />

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
