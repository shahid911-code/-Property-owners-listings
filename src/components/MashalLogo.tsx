import React from 'react';

export const REMOTE_LOGO_URL = 'https://mashalcore.vercel.app/assets/logo-BwvqY8AD.webp';
export const LOCAL_LOGO_URL = '/logo.webp';

interface MashalLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const MashalLogo: React.FC<MashalLogoProps> = ({
  className = '',
  size = 'lg',
}) => {
  // Prominent, well-sized logo, centered
  const dimensions =
    size === 'sm'
      ? 'w-auto max-w-[190px] sm:max-w-[210px] h-13 sm:h-14'
      : size === 'md'
      ? 'w-auto max-w-[230px] sm:max-w-[250px] h-15 sm:h-17'
      : size === 'xl'
      ? 'w-auto max-w-[290px] sm:max-w-[320px] h-20 sm:h-24'
      : 'w-auto max-w-[260px] sm:max-w-[290px] h-18 sm:h-21'; // Large default

  return (
    <div
      className={`w-full flex items-center justify-center select-none ${className}`}
    >
      <img
        src={LOCAL_LOGO_URL}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = REMOTE_LOGO_URL;
        }}
        alt="MashalCore Logo"
        width={280}
        height={80}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className={`${dimensions} object-contain transition-all mx-auto`}
      />
    </div>
  );
};
