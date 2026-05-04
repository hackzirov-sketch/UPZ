import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                U
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">UPZ</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Universal Productivity Zone is the all-in-one workspace that replaces your scattered tools. Work, learn, and earn in one place.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-muted-foreground hover:text-indigo-600 text-sm transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-muted-foreground hover:text-indigo-600 text-sm transition-colors">How it Works</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-indigo-600 text-sm transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-indigo-600 text-sm transition-colors">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Community</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-indigo-600 text-sm transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-indigo-600 text-sm transition-colors">Discord</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-indigo-600 text-sm transition-colors">Twitter</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-indigo-600 text-sm transition-colors">GitHub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-indigo-600 text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-indigo-600 text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-indigo-600 text-sm transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Universal Productivity Zone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
