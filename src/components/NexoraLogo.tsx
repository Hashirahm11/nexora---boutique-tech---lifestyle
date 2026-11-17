interface NexoraLogoProps {
  variant?: 'dark' | 'light';
  showTagline?: boolean;
}

export function NexoraLogo({ variant = 'dark', showTagline = true }: NexoraLogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#132238]';
  const taglineColor = variant === 'light' ? 'text-slate-300' : 'text-slate-400';

  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <svg
        width="38"
        height="36"
        viewBox="0 0 42 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="nexoraOrange" x1="2" y1="36" x2="26" y2="6" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
          <linearGradient id="nexoraNavy" x1="16" y1="8" x2="38" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={variant === 'light' ? '#94A3B8' : '#1E3A5F'} />
            <stop offset="100%" stopColor={variant === 'light' ? '#E2E8F0' : '#0F1D32'} />
          </linearGradient>
        </defs>
        <path
          d="M5 31.5C5 24 8.5 11.5 14.5 9.5C18.5 8.2 21.5 16.5 23.5 22.5C24.5 25.5 26 28.5 28 28.5C23 32 19.5 26.5 17.2 19.5C15.5 14.5 13.8 14.5 12.2 19.8C10.5 25.5 9.5 31.5 5 31.5Z"
          fill="url(#nexoraOrange)"
        />
        <path
          d="M14.5 9.5C19 8 22.5 15.5 25.2 22.2C27.2 27.2 29.2 26.5 31.2 19.5C32.5 14.8 34.2 10 37.5 8.5C36.8 16.5 33.8 29.5 27.8 31.2C23.5 32.4 20.5 24.5 18 17.5C16.8 14 15.5 11.2 14.5 9.5Z"
          fill="url(#nexoraNavy)"
        />
        <path
          d="M4.5 31.8C7.5 21 11.2 9.5 15.2 8.5C18.8 7.6 22.2 18.8 25.8 25.2C28 29.2 31.5 21.5 36.8 8.2C33.5 21.5 29.8 32.5 25 32.5C21 32.5 17.8 20.5 15.2 15.2C13.5 11.8 11.2 21.5 9 31.8H4.5Z"
          fill="url(#nexoraOrange)"
          fillOpacity="0.92"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`text-[22px] font-extrabold tracking-tight ${textColor}`}>
          Nexora
        </span>
        {showTagline && (
          <span className={`text-[9.5px] font-medium tracking-[0.02em] mt-0.5 ${taglineColor}`}>
            Better Life, Smarter Choice
          </span>
        )}
      </div>
    </div>
  );
}
