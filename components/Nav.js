import { useState } from "react";
import { useRouter } from "next/router";

export default function Nav() {
  const [policyOpen, setPolicyOpen] = useState(false);
  const router = useRouter();

  const linkStyle = (href) => ({
    color: router.pathname === href ? "white" : "#9FE1CB",
    textDecoration: "none",
    fontFamily: "sans-serif",
    fontSize: "13px",
    paddingBottom: "2px",
    borderBottom: router.pathname === href ? "2px solid #1D9E75" : "2px solid transparent",
    transition: "color 0.2s, border-color 0.2s"
  });

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
          <a href="/" style={linkStyle("/")}
            onMouseEnter={e => e.target.style.color = "white"}
            onMouseLeave={e => e.target.style.color = router.pathname === "/" ? "white" : "#9FE1CB"}>
            Home
          </a>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <a href="/about" style={linkStyle("/about")}
            onMouseEnter={e => e.target.style.color = "white"}
            onMouseLeave={e => e.target.style.color = router.pathname === "/about" ? "white" : "#9FE1CB"}>
            About
          </a>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <a href="/conditions" style={linkStyle("/conditions")}
            onMouseEnter={e => e.target.style.color = "white"}
            onMouseLeave={e => e.target.style.color = router.pathname === "/conditions" ? "white" : "#9FE1CB"}>
            Conditions Treated
          </a>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <a href="/faq" style={linkStyle("/faq")}
            onMouseEnter={e => e.target.style.color = "white"}
            onMouseLeave={e => e.target.style.color = router.pathname === "/faq" ? "white" : "#9FE1CB"}>
            FAQ
          </a>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <a href="/contact" style={linkStyle("/contact")}
            onMouseEnter={e => e.target.style.color = "white"}
            onMouseLeave={e => e.target.style.color = router.pathname
