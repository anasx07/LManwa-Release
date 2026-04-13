import Image from 'next/image';
import Link from 'next/link';
import GitHubButton from '@/components/ui/github-button';

export function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 md:px-0 opacity-0 animate-[fadeIn_0.5s_ease_forwards]">
      <nav className="w-full max-w-5xl flex items-center justify-between px-3 py-3 bg-[#0a0a14]/60 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative group/nav transition-colors duration-500 hover:bg-[#0f0f1d]/70 hover:border-white/20">
        {/* Subtle animated internal glow */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-purple-500/10 opacity-30 group-hover/nav:opacity-60 transition-opacity duration-500"></div>
        </div>
        
        {/* Logo Section */}
        <Link href="/" className="relative flex items-center gap-3 cursor-pointer group ml-2 z-10 w-fit">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-lg blur-md group-hover:bg-white/40 transition-colors"></div>
            <Image src="/AutaKimi-Release/assets/icon.png" alt="AutaKimi Logo" width={32} height={32} className="relative w-8 h-8 rounded-lg shadow-xl group-hover:scale-105 transition-transform" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white transition-all group-hover:tracking-wider drop-shadow-md">AutaKimi</span>
        </Link>

        {/* Centered Links (Desktop only) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 bg-black/30 px-8 py-2.5 rounded-2xl border border-white/5 shadow-inner z-10">
          <Link href="/#features" className="text-[13px] font-bold tracking-wide text-zinc-400 hover:text-white transition-all hover:-translate-y-0.5 uppercase relative after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-4 after:h-[2px] after:bg-white after:rounded-full after:transition-all">Features</Link>
          <Link href="/docs" className="text-[13px] font-bold tracking-wide text-zinc-400 hover:text-white transition-all hover:-translate-y-0.5 uppercase relative after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-4 after:h-[2px] after:bg-white after:rounded-full after:transition-all">Docs</Link>
          <Link href="/changelog" className="text-[13px] font-bold tracking-wide text-zinc-400 hover:text-white transition-all hover:-translate-y-0.5 uppercase relative after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-4 after:h-[2px] after:bg-white after:rounded-full after:transition-all">Changelog</Link>
        </div>
        
        {/* Right Action */}
        <div className="relative flex items-center z-10">
           <GitHubButton />
        </div>
      </nav>
    </div>
  );
}
