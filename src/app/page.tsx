"use client";

import { Download, BookOpen, Puzzle, History, Search, Zap, ChevronDown, Globe, Smartphone, MonitorSmartphone, Database, Cpu } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

import AuroraShader from '@/components/backgrounds/AuroraShader'
import GitHubButton from '@/components/ui/github-button'
import { MediaButton } from '@/components/ui/media-button'
import StarfieldShader from '@/components/backgrounds/StarfieldShader'
import CyberGridShader from '@/components/backgrounds/CyberGridShader'
import { GlowCard } from '@/components/ui/spotlight-card'

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)
  const [version, setVersion] = useState("1.5.71")

  useEffect(() => {
    fetch('https://api.github.com/repos/anasx07/AutaKimi-Release/releases/latest')
      .then(res => res.json())
      .then(data => {
        if (data.tag_name) {
          setVersion(data.tag_name.replace(/^v/, ''));
        }
      })
      .catch(console.error);
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Personal Library",
      description: "Organize your collection with a beautiful, responsive library interface."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Localization",
      description: "Full support for Arabic (العربية) and English, ensuring a native experience for global readers."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Native Anime Support",
      description: "Watch your favorite anime series with our built-in, high-performance video player (BETA)."
    },
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: "Modular Architecture",
      description: "Expand your content with an advanced, language-aware extension system and bulk management."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Smart Search",
      description: "Find any title across all your connected sources instantly."
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Fast & Lightweight",
      description: "Built with performance in mind for a smooth, lag-free experience."
    },
    {
      icon: <MonitorSmartphone className="w-6 h-6" />,
      title: "Cross-Platform (Soon)",
      description: "Currently available on Windows. Uncompromising native apps for macOS, Linux, and Mobile arriving shortly."
    }
  ]

  const showcases = [
    {
      badge: "Customization",
      title: "Premium Themes",
      description: "Make AutaKimi yours. Choose from a variety of premium themes, ranging from classic dark modes to character-inspired aesthetics.",
      image: "/AutaKimi-Release/assets/screenshot-themes.png" // Updated path
    },
    {
      badge: "Discovery",
      title: "Smart Search & Filters",
      description: "Find your next read across connected translation sources instantly with deep filter support.",
      image: "/AutaKimi-Release/assets/screenshot-themes.png", // Updated path
      reverse: true
    }
  ]

  const faqs = [
    { q: "Is AutaKimi free to use?", a: "Yes, AutaKimi is 100% free to use with no ads or tracking." },
    { q: "How do I install extensions?", a: "Extensions are self-contained and pre-installed in the application for immediate native browsing." },
    { q: "Does it support offline reading?", a: "Yes, you can easily download your favorite chapters to read fully offline anytime." }
  ]

  return (
    <div className="relative flex flex-col items-center selection:bg-primary/30 w-full">
      <header className="pb-16 w-full flex justify-center">
        <div className="glass-card rounded-[32px] p-10 md:p-16 max-w-[680px] w-[90%] text-center hero-animate">
          <div className="mb-8 flex justify-center opacity-0 animate-[fadeIn_0.8s_ease_forwards_0.4s]">
            <Image src="/AutaKimi-Release/assets/icon.png" alt="AutaKimi Icon" width={100} height={100} className="w-[100px] h-[100px] rounded-3xl shadow-2xl" />
          </div>
          <span className="premium-pill mb-6 opacity-0 animate-[fadeIn_0.8s_ease_forwards_0.4s]">Version {version}</span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-5 text-gradient opacity-0 animate-[fadeIn_0.8s_ease_forwards_0.6s]">AutaKimi</h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-[500px] mx-auto mb-12 leading-relaxed opacity-0 animate-[fadeIn_0.8s_ease_forwards_0.8s]">
            The ultimate manga and anime experience for Windows.
            Free, extensible, and built for speed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-[fadeIn_0.8s_ease_forwards_1s]">
            <MediaButton
              label="Repo Release Page"
              href="https://github.com/anasx07/AutaKimi-Release/releases/latest"
              icon={<Download className="w-5 h-5 text-white" />}
              mediaUrl="https://i.pinimg.com/originals/65/2b/4b/652b4b5e1044885c6045242d6ac7e1bf.gif"
              className="w-full sm:w-auto"
            />
            <MediaButton
              label="Download Installer"
              href="https://github.com/anasx07/AutaKimi-Release/releases/download/latest/AutaKimi.exe"
              icon={<Download className="w-5 h-5 text-white" />}
              mediaUrl="https://v1.pinimg.com/videos/mc/720p/c6/65/cd/c665cdad613f37177c727ba93a5a4512.mp4"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </header>

      <section id="features" className="py-24 px-6 max-w-6xl w-full">
        <div className="text-center mb-12 space-y-4">
          <span className="premium-pill">Features</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Everything you need</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <GlowCard 
              key={i} 
              customSize 
              glowColor="purple" 
              className="p-10 group transition-transform duration-500 hover:-translate-y-2 opacity-0 animate-fade-in cursor-default" 
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-white group-hover:text-purple-400 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 z-10 relative">{f.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm z-10 relative">{f.description}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      <section id="showcase" className="py-24 w-full bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto px-6 space-y-32">
          {showcases.map((s, i) => (
            <div key={i} className={cn("grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", s.reverse && "lg:flex-row-reverse")}>
              <div className={cn("space-y-6", s.reverse && "lg:order-2")}>
                <span className="premium-pill">{s.badge}</span>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient">{s.title}</h2>
                <p className="text-zinc-400 text-lg leading-relaxed">{s.description}</p>
              </div>
              <div className={cn("relative rounded-3xl overflow-hidden glass-card transform perspective-1000 rotate-x-2 hover:rotate-x-0 transition-all group", s.reverse && "lg:order-1")}>
                <Image src={s.image} alt={s.title} width={1280} height={800} className="w-full group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </section>


      <section id="faq" className="py-24 px-6 max-w-3xl w-full">
        <div className="text-center mb-12 space-y-4">
          <span className="premium-pill">FAQ</span>
          <h2 className="text-4xl font-extrabold tracking-tight">Common Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <button
                className="w-full p-6 flex justify-between items-center text-left font-bold text-lg hover:bg-white/5 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{f.q}</span>
                <ChevronDown className={cn("w-5 h-5 text-zinc-500 transition-transform duration-300", openFaq === i && "rotate-180 text-white")} />
              </button>
              <div className={cn("grid transition-all duration-300 ease-in-out", openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 text-zinc-400 leading-relaxed text-sm">
                    {f.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
