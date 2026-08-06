import { useState } from "react";
import { useRouter } from "next/router";

export default function Nav() {
  const [policyOpen, setPolicyOpen] = useState(false);
  const router = useRouter();

  const activeColor = (href) => router.pathname === href ? "white" : "#9FE1CB";

  const navLink = (href, label) => (
    
      href={href}
      style={{
        color: activeColor(href),
        textDecoration: "none",
        fontFamily: "sans-serif",
        fontSize: "13px",
        paddingBottom: "2px",
        borderBottom: router.pathname === href ? "2px solid #1D9E75" : "2px solid transparent"
      }}
      onMouseEnter={e => e.currentTarget.style.color = "white"}
      onMouseLeave={e => e.currentTarget.style.color = activeColor(href)}
    >
      {label}
    </a>
  );

  const divider = <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>;

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
        <div style={{ marginLeft: "auto", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          {navLink("/", "Home")}
          {divider}
          {navLink("/about", "About")}
          {divider}
          {navLink("/conditions", "Conditions Treated")}
          {divider}
          {navLink("/faq", "FAQ")}
          {divider}
          {navLink("/contact", "Contact")}
          {divider}

          <div style={{ position: "relative" }}>
            <button
              onClick={() => setPolicyOpen(!policyOpen)}
              onMouseEnter={e => e.currentTarget.style.color = "white"}
              onMouseLeave={e => e.currentTarget.style.color = "#9FE1CB"}
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

          {divider}
          {navLink("/voucher", "Gift Vouchers")}
          {divider}
          
            href="https://www.instagram.com/west_corkacupuncture/"
            target="_blank"
            style={{ color: "#9FE1CB", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}
            onMouseEnter={e => e.currentTarget.style.color = "white"}
            onMouseLeave={e => e.currentTarget.style.color = "#9FE1CB"}
          >
            Instagram
          </a>
          <a href="/book" style={{ background: "#1D9E75", color: "white", padding: "8px 16px", borderRadius: "4px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px" }}>
            Book Now
          </a>
        </div>
      </nav>
      <a href="https://wa.me/353831156950" target="_blank" style={waStyle}>WhatsApp Kate</a>
    </div>
  );
}
