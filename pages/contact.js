export default function Contact() {
  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "40px", color: "#085041", marginBottom: "24px" }}>Contact & Location</h1>

        <div style={{ background: "white", padding: "32px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>Get in Touch</h2>
          <p style={{ fontFamily: "sans-serif", color: "#333", marginBottom: "12px" }}>
            <strong>Phone:</strong> +353 00 000 0000
          </p>
          <p style={{ fontFamily: "sans-serif", color: "#333", marginBottom: "12px" }}>
            <strong>Email:</strong> info@westcorkacupuncture.com
          </p>
          <p style={{ fontFamily: "sans-serif", color: "#333", marginBottom: "12px" }}>
            <strong>Instagram:</strong> @westcorkacupuncture
          </p>
          <a href="https://wa.me/353000000000" style={{ display: "inline-block", marginTop: "16px", background: "#1D9E75", color: "white", padding: "12px 24px", borderRadius: "6px", textDecoration: "none", fontFamily: "sans-serif" }}>
            Message on WhatsApp
          </a>
        </div>

        <div style={{ background: "white", padding: "32px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>Location</h2>
          <p style={{ fontFamily: "sans-serif", color: "#333", marginBottom: "16px" }}>
            West Cork, Ireland
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
