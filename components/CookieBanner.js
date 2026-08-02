import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: "#085041",
      color: "white",
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "16px",
      zIndex: 1000,
      boxShadow: "0 -4px 16px rgba(0,0,0,0.2)"
    }}>
      <p style={{ fontFamily: "sans-serif", fontSize: "13px", margin: 0, maxWidth: "700px", lineHeight: "1.6" }}>
        We use cookies to improve your experience and analyse site traffic. By clicking Accept you consent to our use of cookies in accordance with our Privacy Policy.
      </p>
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={accept}
          style={{ background: "#1D9E75", color: "white", border: "none", padding: "10px 24px", borderRadius: "6px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "13px", whiteSpace: "nowrap" }}
        >
          Accept
        </button>
        <button
          onClick={decline}
          style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.5)", padding: "10px 24px", borderRadius: "6px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "13px", whiteSpace: "nowrap" }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
