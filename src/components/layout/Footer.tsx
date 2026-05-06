import Link from "next/link";
import { Sprout, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20 pb-10 pt-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sprout className="text-accent w-6 h-6" />
              <span className="font-bold text-xl tracking-tight text-white">
                CropSense AI
              </span>
            </Link>
            <p className="text-muted max-w-sm mb-6">
              Empowering farmers with state-of-the-art AI technology to detect crop diseases instantly and provide actionable treatment plans.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-border transition-colors">
                <Twitter size={18} className="text-muted" />
              </a>
              <a href="#" className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-border transition-colors">
                <Github size={18} className="text-muted" />
              </a>
              <a href="#" className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-border transition-colors">
                <Linkedin size={18} className="text-muted" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Platform</h3>
            <ul className="space-y-4">
              <li><Link href="/detect" className="text-muted hover:text-accent transition-colors">Detect Disease</Link></li>
              <li><Link href="/history" className="text-muted hover:text-accent transition-colors">Scan History</Link></li>
              <li><Link href="/suppliers" className="text-muted hover:text-accent transition-colors">Supplier Directory</Link></li>
              <li><Link href="/" className="text-muted hover:text-accent transition-colors">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-muted hover:text-accent transition-colors">Farmer Guide</Link></li>
              <li><Link href="#" className="text-muted hover:text-accent transition-colors">Treatment Database</Link></li>
              <li><Link href="#" className="text-muted hover:text-accent transition-colors">Contact Support</Link></li>
              <li><Link href="#" className="text-muted hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>© 2026 CropSense AI. All rights reserved.</p>
          <p>Built with ❤️ for Sustainable Agriculture</p>
        </div>
      </div>
    </footer>
  );
}
