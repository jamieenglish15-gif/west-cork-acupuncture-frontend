import { useEffect, useState } from "react";

export default function QR() {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const url = encodeURIComponent("https://west-cork-acupuncture-frontend.vercel.app/book");
    setQrUrl("https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + url);
  }, []);

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "40px" }}>
      <div style={{ background: "white", padding: "48px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", textAlign: "center", maxWidth: "480px" }}>

        <img src="/logo.jpg" alt="West Cork Acupuncture" style={{ height: "80px", marginBottom: "24px" }} />

        <h1 style={{ fontSize: "28px", color: "#085041", marginBottom: "8px" }}>Book Online</h1>
        <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "32px" }}>
          Scan the QR code to book your appointment at West Cork Acupuncture
        </p>

        {qrUrl && (
          <img src={qrUrl} alt="QR Code" style={{ width: "240px", height: "240px", marginBottom: "24px", border: "8px solid #E1F5EE", borderRadius: "8px" }} />
        )}

        <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#085041", marginBottom: "8px" }}>
          13 North Street, Skibbereen · P81 Y237
        </p>
        <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#085041", marginBottom: "24px" }}>
          083 115 6950
        </p>

        
          href="/book"
          style={{ display: "block", background: "#1D9E75", color: "white", padding: "14px", borderRadius: "6px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "16px", marginBottom: "16px" }}
        >
          Book Online
        </a>

        <button
          onClick={() => window.print()}
          style={{ background: "#085041", color: "white", padding: "14px", borderRadius: "6px", border: "none", fontFamily: "sans-serif", fontSize: "16px", cursor: "pointer", width: "100%" }}
        >
          Print This Page
        </button>

      </div>
    </div>
  );
}
