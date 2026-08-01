export default function Nav() {
  return (
    <div>
      <nav style={{
        background: "#085041",
        padding: "12px 24px",
        display: "flex",
        gap: "16px",
        alignItems: "center",
        flexWrap: "wrap",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <a href="/">
          <img src="/logo.jpg" alt="West Cork Acupuncture" style={{ height: "60px", borderRadius: "4px" }} />
        </a>
        <div style={{ marginLeft: "auto", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Conditions", href: "/conditions" },
            { label: "FAQ", href: "/faq" },
            { label: "Contact", href: "/contact" },
            { label: "Book", href: "/book" }
          ].map(link => (
            <a key={link.href} href={link.href} style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>
              {link.label}
            </a>
          ))}
          <a href="https://www.instagram.com/west_corkacupuncture/" target="_blank" style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>
            Instagram
          </a>
          <a href="/book" style={{ background: "#1D9E75", color: "white", padding: "8px 16px", borderRadius: "4px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px", whiteSpace: "nowrap" }}>
            Book Now
          </a>
        </div>
      </nav>
      
        href="https://wa.me/353831156950"
        target="_blank"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          background: "#25D366",
          color: "white",
          padding: "14px 20px",
          borderRadius: "50px",
          textDecoration: "none",
          fontFamily: "sans-serif",
          fontSize: "14px",
          fontWeight: "bold",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          zIndex: 999
        }}
      >
        WhatsApp Kate
      </a>
    </div>
  );
}
