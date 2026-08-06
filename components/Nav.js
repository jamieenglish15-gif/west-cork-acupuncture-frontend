import { useState } from "react";

export default function Nav() {
  const [policyOpen, setPolicyOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  const linkColor = (id) => hovered === id ? "white" : "#9FE1CB";

  const divider = <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 4px" }}>|</span>;

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
      <nav style={{ background: "#085041", padding: "12px 24px", display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <a href="/">
          <img src="/logo.jpg" alt="West Cork Acupuncture" style={{ height: "60px", borderRadius: "4px" }} />
        </a>
        <div style={{ marginLeft: "auto", display: "flex", gap: "4px", flexWrap: "wrap", alignItems: "center", fontWeight: "bold" }}>

          <a href="/" style={{ color: linkColor("home"), textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px", padding: "0 8px" }} onMouseEnter={() => setHovered("home")} onMouseLeave={() => setHovered(null)}>Home</a>
          {divider}
          <a href="/about" style={{ color: linkColor("about"), textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px", padding: "0 8px" }} onMouseEnter={() => setHovered("about")} onMouseLeave={() => setHovered(null)}>About</a>
          {divider}
          <a href="/conditions" style={{ color: linkColor("conditions"), textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px", padding: "0 8px" }} onMouseEnter={() => setHovered("conditions")} onMouseLeave={() => setHovered(null)}>Conditions Treated</a>
          {divider}
          <a href="/faq" style={{ color: linkColor("faq"), textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px", padding: "0 8px" }} onMouseEnter={() => setHovered("faq")} onMouseLeave={() => setHovered(null)}>FAQ</a>
          {divider}
          <a href="/contact" style={{ color: linkColor("contact"), textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px", padding: "0 8px" }} onMouseEnter={() => setHovered("contact")} onMouseLeave={() => setHovered(null)}>Contact</a>
          {divider}

          <div style={{ position: "relative", padding: "0 8px" }}>
            <button
              onClick={() => setPolicyOpen(!policyOpen)}
              onMouseEnter={() => setHovered("policy")}
              onMouseLeave={() => setHovered(null)}
              style={{ background: "transparent", border: "none", color: linkColor("policy"), fontFamily: "sans-serif", fontSize: "13px", cursor: "pointer", padding: 0 }}
            >
              Policy
            </button>
            {policyOpen && (
              <div style={{ position: "absolute", top: "24px", right: 0, background: "white", borderRadius: "6px", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", minWidth: "200px", zIndex: 200 }}>
                <a href="/cancellation" onClick={() => setPolicyOpen(false)} style={{ display: "block", padding: "12px 16px", fontFamily: "sans-serif", fontSize: "13px", color: "#085041", textDecoration: "none", borderBottom: "1px solid #E1F5EE" }}>Cancellation Policy</a>
                <a href="/privacy" onClick={() => setPolicyOpen(false)} style={{ display: "block", padding: "12px 16px", fontFamily: "sans-serif", fontSize: "13px", color: "#085041", textDecoration: "none", borderBottom: "1px solid #E1F5EE" }}>Privacy Policy</a>
                <a href="/terms" onClick={() => setPolicyOpen(false)} style={{ display: "block", padding: "12px 16px", fontFamily: "sans-serif", fontSize: "13px", color: "#085041", textDecoration: "none" }}>Terms & Conditions</a>
              </div>
            )}
          </div>

          {divider}
          <a href="/voucher" style={{ color: linkColor("voucher"), textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px", padding: "0 8px" }} onMouseEnter={() => setHovered("voucher")} onMouseLeave={() => setHovered(null)}>Gift Vouchers</a>
          {divider}
          <a href="https://www.instagram.com/west_corkacupuncture/" target="_blank" style={{ color: linkColor("instagram"), textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px", padding: "0 8px" }} onMouseEnter={() => setHovered("instagram")} onMouseLeave={() => setHovered(null)}>Instagram</a>

          <a href="/book" style={{ background: "#1D9E75", color: "white", padding: "8px 16px", borderRadius: "4px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px", marginLeft: "8px" }}>Book Now</a>
        </div>
      </nav>
      <a href="https://wa.me/353831156950" target="_blank" style={waStyle}>WhatsApp Kate</a>
    </div>
  );
}
