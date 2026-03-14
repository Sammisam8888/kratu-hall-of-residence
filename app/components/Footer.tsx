import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/about", label: "About & History" },
  { href: "/administration", label: "Administration" },
  { href: "/student-council", label: "Student Council" },
  { href: "/facilities", label: "Facilities" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-dark-950 border-t border-yellow-100/10 mt-32 w-full flex justify-center">
      <div className="w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10  flex items-center justify-center relative overflow-hidden">
                <Image src="/favicon.ico" alt="Kratu Logo" fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-lg">
                  KRATU
                </h3>
                <p className="text-[10px] text-yellow-100/70 tracking-[0.2em] uppercase -mt-0.5">
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
            <h4 className="font-heading font-semibold text-yellow-100 text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-yellow-100 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-yellow-100 text-sm uppercase tracking-widest mb-4">
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
                  className="text-yellow-100/80 hover:text-yellow-100 transition-colors"
                >
                  kratuhr@vssut.ac.in
                </a>
              </p>
              <p>
                <span className="text-white/70">Warden:</span>{" "}
                <a
                  href="tel:8249715656"
                  className="text-yellow-100/80 hover:text-yellow-100 transition-colors"
                >
                  8249715656
                </a>
              </p>
              <p>
                <a
                  href="https://www.vssut.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-100/80 hover:text-yellow-100 transition-colors"
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
