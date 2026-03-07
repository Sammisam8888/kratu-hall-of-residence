import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About & History" },
  { href: "/administration", label: "Administration" },
  { href: "/student-council", label: "Student Council" },
  { href: "/facilities", label: "Facilities" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-dark-950 border-t border-gold-400/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-heading font-bold text-dark-900 text-lg">
                K
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-lg">
                  KRATU
                </h3>
                <p className="text-[10px] text-gold-400/70 tracking-[0.2em] uppercase -mt-0.5">
                  Hall of Residence
                </p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Part of the Saptarishi legacy at VSSUT Burla. Home to 254
              boarders and decades of engineering excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-gold-400 text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-gold-400 text-sm uppercase tracking-widest mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-white/50">
              <p>
                VSSUT, Burla, Sambalpur
                <br />
                Odisha, India — 768018
              </p>
              <p>
                <span className="text-white/70">Email:</span>{" "}
                <a
                  href="mailto:kratuhr@vssut.ac.in"
                  className="text-gold-400/80 hover:text-gold-400 transition-colors"
                >
                  kratuhr@vssut.ac.in
                </a>
              </p>
              <p>
                <span className="text-white/70">Warden:</span>{" "}
                <a
                  href="tel:8249715656"
                  className="text-gold-400/80 hover:text-gold-400 transition-colors"
                >
                  8249715656
                </a>
              </p>
              <p>
                <a
                  href="https://www.vssut.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400/80 hover:text-gold-400 transition-colors"
                >
                  www.vssut.ac.in
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Kratu Hall of Residence, VSSUT Burla.
            All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Named after Sage Kratu — one of the Saptarishis
          </p>
        </div>
      </div>
    </footer>
  );
}
