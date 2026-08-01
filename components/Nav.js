export default function Nav() {
  return (
    <nav style={{ background: "#085041", padding: "16px 40px", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
      <a href="/">
        <img src="/logo.jpg" alt="West Cork Acupuncture" style={{ height: "70px", borderRadius: "4px" }} />
      </a>
      <div style={{ marginLeft: "auto", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
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
        <a href="https://instagram.com/westcorkacupuncture" target="_blank" style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "14px" }}>
          Instagram
        </a>
      </div>
    </nav>
  );
}
