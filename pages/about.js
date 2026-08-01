export default function About() {
  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "40px", color: "#085041", marginBottom: "24px" }}>About Your Practitioner</h1>

        <div style={{ background: "white", padding: "32px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", color: "#085041", marginBottom: "16px" }}>Jamie — Acupuncturist & Holistic Practitioner</h2>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8", marginBottom: "16px" }}>
            Jamie is a dedicated acupuncturist with a passion for helping clients reconnect with balance, ease, and natural healing. With a calm, grounded approach, each treatment is tailored to support the nervous system, reduce pain, and restore harmony in the body.
          </p>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8", marginBottom: "16px" }}>
            Trained in traditional acupuncture, cupping therapy, and cosmetic facial acupuncture, Jamie blends evidence-based practice with intuitive care.
          </p>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8" }}>
            Whether you're seeking pain relief, stress reduction, hormonal support, or a cosmetic boost, Jamie's treatments are designed to help you feel grounded, restored, and deeply cared for.
          </p>
        </div>

        <div style={{ background: "#E1F5EE", padding: "24px", borderRadius: "8px" }}>
          <p style={{ fontSize: "22px", color: "#085041", marginBottom: "8px" }}>"Healing happens when the body feels safe."</p>
          <p style={{ fontFamily: "sans-serif", color: "#555" }}>Every session is built around creating that sense of safety.</p>
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
