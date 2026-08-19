import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [open, setOpen] = useState(null);

  const toggle = (id) => setOpen(open === id ? null : id);
  const close = () => setOpen(null);

  const btnStyle = {
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "4px",
    padding: "7px 14px",
    fontFamily: "sans-serif",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  const bookStyle = {
    ...btnStyle,
    background: "#1D9E75",
    border: "1px solid #1D9E75",
  };

  const dropTrigger = (id, label) => ({
    background: "transparent",
    border: "none",
    color: open === id ? "#fff" : "#9FE1CB",
    fontFamily: "sans-serif",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    padding: "7px 10px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    whiteSpace: "nowrap",
  });

  const dropMenu = {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: "0",
    background: "#fff",
    borderRadius: "8px",
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
    color: "#085041",
    textDecoration: "none",
    borderBottom: "1px solid #E1F5EE",
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
      {open && (
        <div
          onClick={close}
          style={{ position: "fixed", inset: 0, zIndex: 99 }}
        />
      )}

      <nav style={{
        background: "#085041",
        padding: "10px 24px",
        display: "flex",
        gap: "8px",
        alignItems: "center",
        flexWrap: "wrap",
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        <a href="/" onClick={close}>
          <img src="/logo.jpg" alt="West Cork Acupuncture" style={{ height: "56px", borderRadius: "4px" }} />
        </a>

        <div style={{ marginLeft: "auto", display: "flex", gap: "4px", alignItems: "center", flexWrap: "wrap" }}>

          {/* Treatments dropdown */}
          <div style={{ position: "relative" }}>
            <button style={dropTrigger("treatments")} onClick={() => toggle("treatments")}>
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
            <button style={dropTrigger("about")} onClick={() => toggle("about")}>
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
            <button style={dropTrigger("policy")} onClick={() => toggle("policy")}>
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

          <a href="/shop" style={btnStyle}>Shop</a>
          <a href="/voucher" style={btnStyle}>Gift Vouchers</a>
          <a href="https://www.instagram.com/west_corkacupuncture/" target="_blank" rel="noreferrer" style={btnStyle}>Instagram</a>
          <a href="/book" style={bookStyle}>Book Now</a>

        </div>
      </nav>

      <a href="https://wa.me/353831156950" target="_blank" rel="noreferrer" style={waStyle}>WhatsApp Kate</a>
    </div>
  );
}
