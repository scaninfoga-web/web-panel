import { Modal } from '@/components/common/Modal';

interface QrCodeModalProps {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({ open, onClose, onOk }) => {
  return (
    <Modal title="title" open={open} onClose={onClose} onOk={onOk}>
      THis is a modal
    </Modal>
  );
};

export default QrCodeModal;
