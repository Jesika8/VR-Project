import {type InterestPointData } from "../types/index";

export const InfoCard: React.FC<{ point: InterestPointData; onClose: () => void; onView360: () => void; is360Mode: boolean }> = ({ point, onClose, onView360, is360Mode }) => (
  <div className={`fixed z-[120] transition-all duration-500 flex justify-center ${
    is360Mode 
    ? 'bottom-6 left-0 right-0 px-4' 
    : 'bottom-28 md:bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md'
  }`}>
    <div className={`
      ${is360Mode ? 'bg-black/40 backdrop-blur-md border-white/20 text-white' : 'bg-white/95 backdrop-blur-xl border-gray-200 text-gray-900'} 
      rounded-2xl shadow-2xl p-4 border w-full max-w-md animate-in fade-in slide-in-from-bottom-4
    `}>
      <div className="flex items-start justify-between mb-1">
        <h2 className="text-base font-bold leading-tight">{point.name}</h2>
        {!is360Mode && (
          <button onClick={onClose} className="text-gray-400 p-1 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>
      <p className={`text-[11px] leading-relaxed line-clamp-2 md:line-clamp-none ${is360Mode ? 'text-gray-100' : 'text-gray-600'}`}>
        {point.description}
      </p>
      {is360Mode && <p className="text-[9px] mt-2 opacity-60 italic">Drag to look around</p>}
      {!is360Mode && point.has360 && (
        <button onClick={onView360} className="w-full mt-3 bg-blue-600 text-white font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          Enter 360° View
        </button>
      )}
    </div>
  </div>
);