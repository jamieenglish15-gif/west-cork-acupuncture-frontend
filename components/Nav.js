export default function Nav() {
  return (
    <nav style={{ background: "#085041", padding: "16px 40px", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
      <a href="/" style={{ color: "white", textDecoration: "none", fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: "bold" }}>
        West Cork Acupuncture
      </a>
      <div style={{ marginLeft: "auto", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Conditions", href: "/conditions" },
          { label: "FAQ", href: "/faq" },
          { label: "Contact", href: "/contact" },
          { label: "Book", href: "/book" }
        ].map(link => (
          <a key={link.href} href={link.href} style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "14px" }}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
