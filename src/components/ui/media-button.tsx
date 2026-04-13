'use client';

import React from 'react';
import { motion } from 'motion/react';

type MediaButtonProps = {
  label: string;
  mediaUrl: string; // .mp4, .webm, or .gif
  href?: string;
  icon?: React.ReactNode;
  className?: string;
};

export const MediaButton: React.FC<MediaButtonProps> = ({ label, mediaUrl, href, icon, className = '' }) => {
  const isVideo = /\.(mp4|webm)$/i.test(mediaUrl);

  const Component = href ? motion.a : motion.button;
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Component
      {...props as any}
      className={`relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-2xl px-8 text-white font-bold text-[15px] bg-black/40 border border-white/10 backdrop-blur-md group shadow-xl hover:shadow-white/10 hover:border-white/30 hover:scale-105 transition-all outline-none whitespace-nowrap ${className}`}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {isVideo ? (
        <motion.video
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          src={mediaUrl}
          muted
          loop
          playsInline
          autoPlay
        />
      ) : (
        <motion.img
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          src={mediaUrl}
          alt="Background"
        />
      )}

      {/* Dark Overlay to insure text readability over bright anime clips */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      {/* Button Content */}
      <div className="relative z-20 flex items-center gap-3 drop-shadow-md">
        {icon}
        <span className="tracking-wide" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
          {label}
        </span>
      </div>
    </Component>
  );
};
