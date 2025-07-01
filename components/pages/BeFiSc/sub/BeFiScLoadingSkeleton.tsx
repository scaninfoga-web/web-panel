// import { Loader } from '@/components/ui/loader';
// import React from 'react';

// export default function BeFiScLoadingSkeleton() {
//   return (
//     <div className="flex flex-col">
//       <div className="flex h-44 w-full items-center justify-center border border-slate-800">
//         <Loader />
//       </div>
//       <div className="mt-8 grid grid-cols-3 gap-6">
//         <div className="flex h-72 items-center justify-center border border-slate-800">
//           <Loader />
//         </div>
//         <div className="flex h-72 items-center justify-center border border-slate-800">
//           <Loader />
//         </div>
//         <div className="flex h-72 items-center justify-center border border-slate-800">
//           <Loader />
//         </div>
//         <div className="flex h-72 items-center justify-center border border-slate-800">
//           <Loader />
//         </div>
//         <div className="flex h-72 items-center justify-center border border-slate-800">
//           <Loader />
//         </div>
//         <div className="flex h-72 items-center justify-center border border-slate-800">
//           <Loader />
//         </div>
//       </div>
//     </div>
//   );
// }

import LottieLoader from '@/components/custom/components/LotteLoader';
import React from 'react';

export default function BeFiScLoadingSkeleton() {
  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center">
      <div className="max-h-96 max-w-96">
        <LottieLoader />
      </div>
    </div>
  );
}
