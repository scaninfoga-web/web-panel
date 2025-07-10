'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// @ts-ignore
import { load } from '@cashfreepayments/cashfree-js'; // ✅ Correct import

export default function WalletTopUp() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [cashfree, setCashfree] = useState<any>(null);

  const token = useSelector((state: any) => state.user.token);

  // ✅ Load SDK when component mounts
  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        const cashfreeInstance = await load({
          mode: 'production',
        });
        setCashfree(cashfreeInstance);
      } catch (error) {}
    };

    initializeCashfree();
  }, []);

  const initiatePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Enter a valid amount.');
      return;
    }

    if (!cashfree) {
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
            Authorization: `Bearer ${token}`, // ✅ Passing user token
          },
          body: JSON.stringify({ amount }),
        },
      );

      const data = await res.json();

      if (data.paymentSessionId) {
        launchCashfreeCheckout(data.paymentSessionId);
      } else {
        alert(
          'Failed to initiate payment: ' +
            (data.message || 'No payment session ID'),
        );
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const launchCashfreeCheckout = (paymentSessionId: string) => {
    try {
      cashfree.checkout({
        paymentSessionId,
        redirectTarget: '_self', // ✅ Can also use '_blank', '_modal', or a DOM element
      });
    } catch (error) {}
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
