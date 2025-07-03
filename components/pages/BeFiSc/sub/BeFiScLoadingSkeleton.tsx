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
import { cn } from '@/lib/utils';
import React from 'react';

export default function BeFiScLoadingSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex h-[400px] w-full items-center justify-center',
        className,
      )}
    >
      <div className="h-52 w-52">
        <LottieLoader />
      </div>
    </div>
  );
}
