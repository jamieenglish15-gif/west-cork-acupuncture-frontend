export default function Nav() {
  const waStyle = {
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
    zIndex: 999
  };

  return (
    <div>
      <nav style={{ background: "#085041", padding: "12px 24px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", position: "sticky", top: 0, zIndex: 100 }}>
        <a href="/">
          <img src="/logo.jpg" alt="West Cork Acupuncture" style={{ height: "60px", borderRadius: "4px" }} />
        </a>
        <div style={{ marginLeft: "auto", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <a href="/" style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>Home</a>
          <a href="/about" style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>About</a>
          <a href="/conditions" style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>Conditions</a>
          <a href="/faq" style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>FAQ</a>
          <a href="/contact" style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>Contact</a>
          <a href="/cancellation" style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>Policy</a>
          <a href="https://www.instagram.com/west_corkacupuncture/" target="_blank" style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>Instagram</a>
          <a href="/book" style={{ background: "#1D9E75", color: "white", padding: "8px 16px", borderRadius: "4px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>Book Now</a>
        </div>
      </nav>
      <a href="https://wa.me/353831156950" target="_blank" style={waStyle}>WhatsApp Kate</a>
    </div>
  );
}
