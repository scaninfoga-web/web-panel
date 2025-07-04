'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [status, setStatus] = useState('Verifying Payment...');

  // ✅ Get token from Redux state
  const token = useSelector((state: any) => state.user.token);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderId) return;

      try {
        const res = await fetch(
          `https://backend.scaninfoga.com/api/payments/verify-payment?order_id=${orderId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Token added
            },
          },
        );

        const data = await res.json();

        if (data.status === 'success') {
          setStatus(
            `✅ Payment Successful! Mode: ${data.payment_mode}, Payment ID: ${data.cashfree_payment_id}`,
          );
        } else if (data.status === 'pending') {
          setStatus('⏳ Payment is still pending. Please wait...');
        } else {
          setStatus('❌ Payment Failed or Not Found.');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setStatus('Error verifying payment.');
      }
    };

    verifyPayment();
  }, [orderId, token]); // ✅ Added token to dependency array

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <h1 className="mb-4 text-2xl font-bold text-white">{status}</h1>
      <Link
        href="/profile"
        className="mt-4 rounded p-2 text-xl text-emerald-500"
      >
        Go back to profile
      </Link>
    </div>
  );
}
