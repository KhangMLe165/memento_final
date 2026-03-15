const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-16 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-display text-xl italic text-foreground">
          Memento
        </span>
        <div className="flex items-center gap-8 font-body text-sm text-muted-foreground">
          <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#privacy" className="hover:text-foreground transition-colors">Security</a>
          <a href="#showcase" className="hover:text-foreground transition-colors">About</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
        <p className="font-body text-xs text-muted-foreground">
          © 2026 Memento. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
