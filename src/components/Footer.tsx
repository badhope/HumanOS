import { Github, Twitter, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gradient">HumanOS</span>
              <span className="text-white/40">|</span>
              <span className="text-sm text-white/60">专业前端框架展示平台</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/badhope/HumanOS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@humanos.dev"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-1 text-sm text-white/60">
              <span>© {currentYear} HumanOS.</span>
              <span className="hidden sm:inline">Made with</span>
              <Heart className="w-4 h-4 text-pink-500 hidden sm:inline" />
              <span className="hidden sm:inline">by badhope</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
