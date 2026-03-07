import { Zap, Eye, Clock } from 'lucide-react';

interface Step1Props {
  isActive: boolean;
  direction: 'forward' | 'back';
}

export function Step1HowItWorks({ isActive, direction }: Step1Props) {
  const getClassName = () => {
    if (isActive) return 'kyc-step-active';
    if (direction === 'forward') return 'kyc-step-exit-left';
    return 'kyc-step-exit-right';
  };

  return (
    <div className={`kyc-step ${getClassName()}`}>
      <span className="font-['Inter'] text-[10px] tracking-[0.3em] uppercase text-[#7FFF00]/50 mb-[14px] block">
        Getting started
      </span>
      <h1 className="font-['Libre_Baskerville'] text-[clamp(28px,4vw,40px)] font-light italic leading-[1.15] tracking-[-0.02em] text-white/90 mb-[10px]">
        Meet people<br />
        <em className="not-italic text-[#7FFF00]">worth meeting.</em>
      </h1>
      <p className="text-[15px] font-light leading-[1.75] text-white/45 mb-8">
        Lethe's matching is different. Here's what to expect.
      </p>

      <div className="flex flex-col gap-[1px]">
        {/* Feature 1 */}
        <div className="flex items-start gap-5 py-[22px] border-b border-white/[0.07]">
          <div className="w-10 h-10 rounded-xl flex-shrink-0 bg-[#7FFF00]/[0.06] border border-[#7FFF00]/[0.12] flex items-center justify-center text-[#7FFF00]/70">
            <Zap size={18} strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[17px] font-normal text-white/90 mb-1">
              One match, every week
            </div>
            <div className="text-[14px] font-light leading-[1.7] text-white/45">
              Lethe finds one person worth talking to and makes the introduction. Not a hundred maybes — one considered yes.
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-start gap-5 py-[22px] border-b border-white/[0.07]">
          <div className="w-10 h-10 rounded-xl flex-shrink-0 bg-[#7FFF00]/[0.06] border border-[#7FFF00]/[0.12] flex items-center justify-center text-[#7FFF00]/70">
            <Eye size={18} strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[17px] font-normal text-white/90 mb-1">
              Context before you meet
            </div>
            <div className="text-[14px] font-light leading-[1.7] text-white/45">
              Their feed gives you a sense of who they are. Not a LinkedIn bio — real thoughts, real perspective.
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-start gap-5 py-[22px]">
          <div className="w-10 h-10 rounded-xl flex-shrink-0 bg-[#7FFF00]/[0.06] border border-[#7FFF00]/[0.12] flex items-center justify-center text-[#7FFF00]/70">
            <Clock size={18} strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[17px] font-normal text-white/90 mb-1">
              Always in control
            </div>
            <div className="text-[14px] font-light leading-[1.7] text-white/45">
              Pause anytime. Skip a week. No guilt, no consequences. This is yours to use on your terms.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}