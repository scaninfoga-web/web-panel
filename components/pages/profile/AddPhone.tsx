'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/common/Modal';
import { Input } from '@/components/ui/input';
import { post } from '@/lib/api';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setPhone } from '@/redux/userSlice';

const AddPhone = () => {
  const [updatePhoneModalOpen, setUpdatePhoneModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSavePhoneNumber = async () => {
    // ✅ Phone number validation: exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phoneNumber)) {
      toast.error('Please enter a valid 10-digit phone number.');
      return; // Stop the process if validation fails
    }

    try {
      setLoading(true);
      await post('/api/auth/update-phone', { phone: phoneNumber });
      setUpdatePhoneModalOpen(false);
      dispatch(setPhone(phoneNumber));
      toast.success('Phone number updated successfully');
    } catch (error) {
      toast.error('Error updating phone number');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="outline" onClick={() => setUpdatePhoneModalOpen(true)}>
        Add Phone Number
      </Button>

      <Modal
        open={updatePhoneModalOpen}
        onClose={() => setUpdatePhoneModalOpen(false)}
        title="Add Phone Number"
        onOk={handleSavePhoneNumber}
        okText="Save"
        loading={loading}
      >
        <Input
          placeholder="Enter phone number"
          className="rounded-xl border-emerald-500"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          maxLength={10} // Optional: restrict max input length
        />
      </Modal>
    </div>
  );
};

export default AddPhone;
