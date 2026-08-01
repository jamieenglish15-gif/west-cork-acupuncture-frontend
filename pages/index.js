export default function Home() {
  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh" }}>
      
      {/* HERO */}
      <div style={{ background: "#085041", color: "white", padding: "60px 40px" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>West Cork Acupuncture</h1>
        <p style={{ fontSize: "18px", opacity: 0.9, marginBottom: "32px" }}>
          Gentle, restorative treatments designed to support your body's natural healing.
        </p>
        <a href="/book" style={{ background: "#1D9E75", color: "white", padding: "14px 32px", borderRadius: "8px", textDecoration: "none", fontFamily: "sans-serif" }}>
          Book Appointment
        </a>
      </div>

      {/* SERVICES */}
      <div style={{ padding: "60px 40px" }}>
        <h2 style={{ fontSize: "32px", color: "#085041", marginBottom: "40px" }}>Treatments Offered</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {[
            { title: "Acupuncture", text: "Supports pain relief, stress reduction, hormonal balance, and overall wellbeing." },
            { title: "Cupping Therapy", text: "Releases tension, improves circulation, and supports muscle recovery." },
            { title: "Cosmetic Acupuncture", text: "Boosts collagen, improves complexion, and reduces facial tension." }
          ].map(s => (
            <div key={s.title} style={{ background: "white", padding: "24px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <h3 style={{ fontSize: "20px", color: "#085041", marginBottom: "12px" }}>{s.title}</h3>
              <p style={{ fontFamily: "sans-serif", color: "#333" }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "60px 40px", background: "#E1F5EE" }}>
        <a href="/book" style={{ background: "#1D9E75", color: "white", padding: "16px 48px", borderRadius: "8px", textDecoration: "none", fontSize: "18px", fontFamily: "sans-serif" }}>
          Book Your Appointment
        </a>
      </div>

    </div>
  );
}
