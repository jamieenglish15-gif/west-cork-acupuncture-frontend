import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function Nav() {
  const [open, setOpen] = useState(null);

  const toggle = (id) => setOpen(open === id ? null : id);
  const close = () => setOpen(null);

  const btnStyle = {
    background: "transparent",
    color: "#0B5A45",
    border: "1px solid #C9A44C",
    borderRadius: "2px",
    padding: "9px 18px",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "uppercase",
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    lineHeight: 1.2,
  };

  const bookStyle = btnStyle;

  const dropTrigger = (id) => ({
    ...btnStyle,
    background: open === id ? "#0B5A45" : "transparent",
    color: open === id ? "#F9FAF7" : "#0B5A45",
  });

  const dropMenu = {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: "0",
    background: "#fff",
    border: "1px solid #E6DFCC",
    borderTop: "2px solid #C9A44C",
    borderRadius: "2px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    minWidth: "180px",
    zIndex: 500,
    overflow: "hidden",
  };

  const dropItem = {
    display: "block",
    padding: "11px 16px",
    fontFamily: "sans-serif",
    fontSize: "13px",
    color: "#0B5A45",
    textDecoration: "none",
    borderBottom: "1px solid #F1EEE6",
    fontWeight: "500",
  };

  const dropItemLast = { ...dropItem, borderBottom: "none" };

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
    zIndex: 999,
  };

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&display=swap" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: `
        .wca-nb:hover { background: #0B5A45 !important; color: #F9FAF7 !important; }
        @media (max-width: 900px) { .wca-wordmark { display: none; } }
      ` }} />
      {open && (
        <div
          onClick={close}
          style={{ position: "fixed", inset: 0, zIndex: 99 }}
        />
      )}

      <nav style={{
        background: "#F9FAF7",
        padding: "10px 28px",
        display: "flex",
        gap: "8px",
        alignItems: "center",
        flexWrap: "wrap",
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid #C9A44C",
      }}>
        <a href="/" onClick={close} style={{ display: "flex", alignItems: "center", gap: "14px", textDecoration: "none" }}>
          <img src="/wca-emblem.jpg" alt="West Cork Acupuncture" style={{ height: "64px", width: "auto" }} />
          <span className="wca-wordmark" style={{ fontFamily: "'DejaVu Serif', Georgia, 'Times New Roman', serif", fontSize: "17px", fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            <span style={{ color: "#0B5A45" }}>West</span>{" "}<span style={{ color: "#C9A44C" }}>Cork</span>{" "}<span style={{ color: "#0B5A45" }}>Acupuncture</span>
          </span>
        </a>

        <div style={{ marginLeft: "auto", display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>

          {/* Treatments dropdown */}
          <div style={{ position: "relative" }}>
            <button className="wca-nb" style={dropTrigger("treatments")} onClick={() => toggle("treatments")}>
              Treatments <span style={{ fontSize: "10px" }}>{open === "treatments" ? "▲" : "▼"}</span>
            </button>
            {open === "treatments" && (
              <div style={dropMenu}>
                <a href="/conditions" style={dropItem} onClick={close}>Conditions Treated</a>
                <a href="/faq" style={dropItemLast} onClick={close}>FAQ</a>
              </div>
            )}
          </div>

          {/* About dropdown */}
          <div style={{ position: "relative" }}>
            <button className="wca-nb" style={dropTrigger("about")} onClick={() => toggle("about")}>
              About <span style={{ fontSize: "10px" }}>{open === "about" ? "▲" : "▼"}</span>
            </button>
            {open === "about" && (
              <div style={dropMenu}>
                <a href="/about" style={dropItem} onClick={close}>About Kate</a>
                <a href="/contact" style={dropItemLast} onClick={close}>Contact</a>
              </div>
            )}
          </div>

          {/* Policy dropdown */}
          <div style={{ position: "relative" }}>
            <button className="wca-nb" style={dropTrigger("policy")} onClick={() => toggle("policy")}>
              Policy <span style={{ fontSize: "10px" }}>{open === "policy" ? "▲" : "▼"}</span>
            </button>
            {open === "policy" && (
              <div style={dropMenu}>
                <a href="/cancellation" style={dropItem} onClick={close}>Cancellation Policy</a>
                <a href="/privacy" style={dropItem} onClick={close}>Privacy Policy</a>
                <a href="/terms" style={dropItemLast} onClick={close}>Terms & Conditions</a>
              </div>
            )}
          </div>

          <a href="/shop" className="wca-nb" style={btnStyle}>Shop</a>
          <a href="/voucher" className="wca-nb" style={btnStyle}>Gift Vouchers</a>
          <a href="https://wa.me/353831156950" target="_blank" rel="noreferrer" className="wca-nb" style={bookStyle}>Message Kate</a>

        </div>
      </nav>

      <a href="https://wa.me/353831156950" target="_blank" rel="noreferrer" style={waStyle}>WhatsApp Kate</a>
    </div>
  );
}
