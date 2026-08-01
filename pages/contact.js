export default function Contact() {
  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "40px", color: "#085041", marginBottom: "24px" }}>Contact & Location</h1>

        <div style={{ background: "white", padding: "32px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>Get in Touch</h2>
          <p style={{ fontFamily: "sans-serif", color: "#333", marginBottom: "12px" }}>
            <strong>Contact:</strong> Kate
          </p>
          <p style={{ fontFamily: "sans-serif", color: "#333", marginBottom: "12px" }}>
            <strong>Phone:</strong> 083 115 6950
          </p>
          <p style={{ fontFamily: "sans-serif", color: "#333", marginBottom: "12px" }}>
            <strong>Instagram:</strong>{" "}
            <a href="https://instagram.com/westcorkacupuncture" target="_blank" style={{ color: "#1D9E75" }}>
              @westcorkacupuncture
            </a>
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
            <a href="https://wa.me/353831156950" style={{ background: "#1D9E75", color: "white", padding: "12px 24px", borderRadius: "6px", textDecoration: "none", fontFamily: "sans-serif" }}>
              WhatsApp Kate
            </a>
            <a href="https://instagram.com/westcorkacupuncture" target="_blank" style={{ background: "#085041", color: "white", padding: "12px 24px", borderRadius: "6px", textDecoration: "none", fontFamily: "sans-serif" }}>
              Follow on Instagram
            </a>
          </div>
        </div>

        <div style={{ background: "white", padding: "32px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>Location</h2>
          <p style={{ fontFamily: "sans-serif", color: "#333" }}>
            West Cork, Ireland — Calm, private, and designed for deep relaxation.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a href="/book" style={{ background: "#1D9E75", color: "white", padding: "14px 40px", borderRadius: "8px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "16px" }}>
            Book Appointment
          </a>
        </div>

      </div>
    </div>
  );
}
