// import { ArrowLeft } from 'lucide-react';
// import { Button } from '../ui/button';
// import TxnSubmissionForm from './TxnSubmissionForm';

// interface PaymentConfirmationStepProps {
//   onNext: () => void;
//   onBack: () => void;
//   onClose: () => void;
// }

// const PaymentConfirmationStep = ({
//   onNext,
//   onBack,
//   onClose,
// }: PaymentConfirmationStepProps) => {
//   return (
//     <>
//       <TxnSubmissionForm onClose={onClose} />
//       <div className="mt-8 flex gap-3">
//         <Button
//           onClick={onBack}
//           variant="outline"
//           className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back
//         </Button>
//         <Button
//           onClick={onNext}
//           className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 font-medium text-white hover:from-teal-600 hover:to-emerald-600"
//         >
//           Proceed to Confirm
//         </Button>
//       </div>
//     </>
//   );
// };

// export default PaymentConfirmationStep;

import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import TxnSubmissionForm from './TxnSubmissionForm';

interface PaymentConfirmationStepProps {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}

const PaymentConfirmationStep = ({
  onNext,
  onBack,
  onClose,
}: PaymentConfirmationStepProps) => {
  return (
    <>
      <TxnSubmissionForm onClose={onClose} />
      <div className="mt-8 flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 font-medium text-white hover:from-teal-600 hover:to-emerald-600"
        >
          Proceed to Confirm
        </Button>
      </div>
    </>
  );
};

export default PaymentConfirmationStep;
