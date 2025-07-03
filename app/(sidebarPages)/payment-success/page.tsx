'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [status, setStatus] = useState('Verifying Payment...');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderId) return;

      try {
        const res = await fetch(
          `http://localhost:8000/api/verify-payment/?order_id=${orderId}`,
          {
            credentials: 'include',
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
  }, [orderId]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">{status}</h1>
    </div>
  );
}
