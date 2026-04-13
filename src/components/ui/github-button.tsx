'use client';
import React, { useState } from 'react';
import { Github, Star } from 'lucide-react';
import { Liquid } from '@/components/ui/button-1';
const COLORS = {
  color1: '#FFFFFF',
  color2: '#1E10C5',
  color3: '#9089E2',
  color4: '#FCFCFE',
  color5: '#F9F9FD',
  color6: '#B2B8E7',
  color7: '#0E2DCB',
  color8: '#0017E9',
  color9: '#4743EF',
  color10: '#7D7BF4',
  color11: '#0B06FC',
  color12: '#C5C1EA',
  color13: '#1403DE',
  color14: '#B6BAF6',
  color15: '#C1BEEB',
  color16: '#290ECB',
  color17: '#3F4CC0',
};
const GitHubButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex justify-center items-center">
      <a
        href="https://github.com/anasx07/AutaKimi-Release"
        target="_blank"
        className="relative inline-block w-32 h-10 group bg-black border-white/20 border rounded-xl overflow-visible transition-transform hover:-translate-y-0.5">
        <div className="absolute w-[112.81%] h-[128.57%] top-[8.57%] left-1/2 -translate-x-1/2 filter blur-[10px] opacity-50 group-hover:opacity-80 transition-opacity duration-500">
          <span className="absolute inset-0 rounded-xl bg-[#d9d9d9] filter blur-[6.5px]"></span>
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            <Liquid isHovered={isHovered} colors={COLORS} />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[92.23%] h-[112.85%] rounded-xl bg-[#010128] filter blur-[7.3px]"></div>
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <span className="absolute inset-0 rounded-xl bg-[#d9d9d9]"></span>
          <span className="absolute inset-0 rounded-xl bg-black"></span>
          <Liquid isHovered={isHovered} colors={COLORS} />
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`absolute inset-0 rounded-xl border-solid border-[1px] border-gradient-to-b from-transparent to-white/50 mix-blend-overlay filter ${i <= 2 ? 'blur-[3px]' : i === 3 ? 'blur-[5px]' : 'blur-[4px]'}`}></span>
          ))}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70.8%] h-[42.85%] rounded-xl filter blur-[15px] bg-[#006]"></span>
        </div>
        <button
          className="absolute inset-0 rounded-xl bg-transparent cursor-pointer w-full h-full flex items-center justify-center"
          aria-label="GitHub Repository"
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <span className="flex items-center justify-center gap-2 rounded-xl group-hover:text-white text-white/90 text-sm font-semibold tracking-wide whitespace-nowrap">
            <Github className="group-hover:fill-white fill-transparent w-4 h-4 flex-shrink-0" />
            <span>GitHub</span>
          </span>
        </button>
      </a>
    </div>
  );
};
export default GitHubButton;
