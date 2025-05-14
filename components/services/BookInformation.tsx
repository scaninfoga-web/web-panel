import { Button } from '../ui/button';

export default function BookInformation() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col space-y-6 text-center">
        <div className="text-5xl font-semibold">
          Book a Security Posture Review
        </div>
        <div className="text-2xl text-white/75">
          Assess Your Business For Security Risks
        </div>
        <div className="pt-16">
          <button className="rounded-xl bg-orange-500 px-4 py-3 text-xl font-semibold text-slate-100">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
}
