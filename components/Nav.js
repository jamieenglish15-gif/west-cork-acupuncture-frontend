import { useState } from "react";

export default function Nav() {
  const [policyOpen, setPolicyOpen] = useState(false);

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
          <a href="/conditions" style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>Conditions Treated</a>
          <a href="/faq" style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>FAQ</a>
          <a href="/contact" style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>Contact</a>

          <div style={{ position: "relative" }}>
            <button
              onClick={() => setPolicyOpen(!policyOpen)}
              style={{ background: "transparent", border: "none", color: "#9FE1CB", fontFamily: "sans-serif", fontSize: "13px", cursor: "pointer", padding: 0 }}
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
              
          <a href="/voucher" style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>Gift Vouchers</a>
          <a href="https://www.instagram.com/west_corkacupuncture/" target="_blank" style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>Instagram</a>
          <a href="/book" style={{ background: "#1D9E75", color: "white", padding: "8px 16px", borderRadius: "4px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>Book Now</a>
        </div>
      </nav>
      <a href="https://wa.me/353831156950" target="_blank" style={waStyle}>WhatsApp Kate</a>
    </div>
  );
}
