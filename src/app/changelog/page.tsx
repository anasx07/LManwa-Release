"use client";
import { useEffect, useState } from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { History, Download, Calendar } from 'lucide-react';

interface Release {
  id: number;
  name: string;
  tag_name: string;
  published_at: string;
  html_url: string;
  body: string;
}

export default function ChangelogPage() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/repos/anasx07/AutaKimi-Release/releases')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setReleases(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full max-w-4xl px-6 py-12 flex flex-col items-center animate-fade-in relative z-10">
      <div className="text-center mb-16 space-y-4">
        <span className="premium-pill">Release History</span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gradient">Changelog</h1>
        <p className="text-zinc-400 text-lg max-w-lg mx-auto">Track the evolution of AutaKimi. Every feature, fix, and performance upgrade.</p>
      </div>

      <div className="w-full space-y-8">
        {loading ? (
          <div className="flex justify-center text-zinc-500 py-12 animate-pulse font-medium">Synchronizing with GitHub...</div>
        ) : releases.map((release, i) => (
          <GlowCard key={release.id || i} customSize className="w-full p-8 md:p-10 group" glowColor="purple">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/5 pb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white relative z-10">
                  <History className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-3 relative z-10 text-white">
                    {release.name || release.tag_name}
                    {i === 0 && <span className="bg-[#1E10C5]/30 text-[#9089E2] text-xs px-2.5 py-1 rounded-md border border-[#1E10C5]/50 uppercase tracking-widest font-black">Latest</span>}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-zinc-500 mt-1 relative z-10 font-bold">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(release.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
              <a 
                href={release.html_url} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-transform hover:scale-105 active:scale-95 relative z-10 w-full md:w-auto shadow-lg"
              >
                <Download className="w-4 h-4" />
                Download Release
              </a>
            </div>
            
            {/* Release Notes Parser */}
            <div className="text-zinc-300 relative z-10 space-y-2 text-[15px] leading-relaxed font-medium">
              {release.body ? release.body.split('\n').map((line, j) => {
                // Extremely simple formatting for Github markdown lists
                const isHeader = line.startsWith('#');
                const isListItem = line.trim().startsWith('-');
                
                if (isHeader) {
                  return <h3 key={j} className="text-white font-bold text-lg mt-6 mb-2">{line.replace(/#/g, '').trim()}</h3>;
                }
                
                if (isListItem) {
                  return (
                    <div key={j} className="flex items-start gap-3 mt-1">
                       <span className="text-primary mt-1">•</span>
                       <span>{line.replace(/^-/, '').trim()}</span>
                    </div>
                  );
                }
                
                return <p key={j} className="min-h-[1em]">{line}</p>;
              }) : <p className="italic text-zinc-500">No release notes provided.</p>}
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}
