import { BookOpen, Database, Puzzle, Zap, ChevronRight, Download } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";
import Link from 'next/link';

export default function DocsPage() {
  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      content: (
        <div className="space-y-4 text-zinc-300 leading-relaxed">
          <p>AutaKimi is entirely portable and built to run out-of-the-box with zero configuration.</p>
          <ol className="list-decimal pl-5 space-y-2 mt-4 text-zinc-400">
            <li>Download the latest executable from the <Link href="/changelog" className="text-primary hover:underline">Releases Page</Link>.</li>
            <li>Run <code className="bg-black/30 px-2 py-1 rounded text-sm text-white">AutaKimi.exe</code> anywhere on your system.</li>
            <li>Select your preferred language interface on the first launch.</li>
            <li>Start browsing! The default extension network will immediately populate the home screen.</li>
          </ol>
        </div>
      )
    },
    {
      id: "extensions",
      title: "Extensions System",
      icon: <Puzzle className="w-6 h-6 text-blue-400" />,
      content: (
        <div className="space-y-4 text-zinc-300 leading-relaxed">
          <p>AutaKimi does not host content. Instead, it relies on an embedded extension parsing engine which connects to your favorite sites seamlessly.</p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li><strong>No Installation Required:</strong> Core extensions are shipped directly with the app to avoid complex setup.</li>
            <li><strong>Language Tracking:</strong> You can filter sources by language using the globe icon in the navigation bar.</li>
            <li><strong>Updates:</strong> If a source changes its layout, AutaKimi will push an update to its parsing engine in the next release. Track updates in the Changelog.</li>
          </ul>
        </div>
      )
    },
    {
      id: "offline-reading",
      title: "Offline Reading & Storage",
      icon: <Database className="w-6 h-6 text-emerald-400" />,
      content: (
        <div className="space-y-4 text-zinc-300 leading-relaxed">
          <p>Built with an offline-first SQLite database, your library and progress are saved strictly locally. You can download entire volumes for plane rides or unstable networks.</p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4">
            <h4 className="text-white font-bold flex items-center gap-2 mb-2"><Download className="w-4 h-4 text-emerald-400"/> Bulk Downloading</h4>
            <p className="text-sm text-zinc-400">Long-press or Shift-Click chapters in the manga info view to select multiple chapters, then click the download icon in the top right to queue them into the background worker.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 relative z-10 animate-fade-in">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0 mt-8">
        <div className="sticky top-32 glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <BookOpen className="w-5 h-5 text-zinc-400" />
            <h3 className="font-bold text-white tracking-wide">Contents</h3>
          </div>
          <nav className="flex flex-col space-y-1 relative z-10">
            {sections.map((s) => (
              <a 
                key={s.id} 
                href={`#${s.id}`}
                className="text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between group"
              >
                {s.title}
                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-16">
        <div>
          <span className="premium-pill mb-4 block w-fit">Documentation</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">Knowledge Base</h1>
          <p className="text-zinc-400 text-lg">Everything you need to know about setting up, configuring, and maximizing your AutaKimi experience.</p>
        </div>

        <div className="space-y-12">
          {sections.map((section) => (
            <GlowCard key={section.id} customSize className="w-full p-8 md:p-10 group" glowColor="purple">
              <div id={section.id} className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center relative z-10">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white relative z-10">{section.title}</h2>
                </div>
                <div className="relative z-10">
                  {section.content}
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  );
}
