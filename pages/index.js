import Head from "next/head";

export default function Home() {
  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8" }}>

      <Head>
        <title>West Cork Acupuncture | Acupuncture Skibbereen | Kate</title>
        <meta name="description" content="West Cork Acupuncture offers traditional acupuncture and cosmetic facial acupuncture at 13 North Street, Skibbereen. Book online with Kate." />
      </Head>

      <div style={{
        background: "linear-gradient(135deg, rgba(8,80,65,0.85) 0%, rgba(10,107,85,0.85) 100%), url('/kate-hero.jpg') center 50%/cover no-repeat",
        color: "white",
        padding: "80px 60px 60px 60px",
        display: "flex",
        alignItems: "center"
      }}>
        <div style={{ maxWidth: "600px" }}>
          <p style={{ fontFamily: "sans-serif", fontSize: "12px", letterSpacing: "4px", opacity: 0.7, marginBottom: "20px", textTransform: "uppercase" }}>
            Traditional Acupuncture — West Cork, Ireland
          </p>
          <h1 style={{ fontSize: "64px", lineHeight: "1.1", marginBottom: "24px", fontWeight: "normal" }}>
            Restore.<br /><em>Rebalance.</em><br />Heal.
          </h1>
          <p style={{ fontFamily: "sans-serif", fontSize: "18px", opacity: 0.85, marginBottom: "40px", lineHeight: "1.7" }}>
            Gentle, evidence-based acupuncture treatments tailored to support your body's natural healing in a calm, private clinic in West Cork.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="/book" style={{ background: "#1D9E75", color: "white", padding: "16px 40px", borderRadius: "4px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "14px", letterSpacing: "1px" }}>
              BOOK NOW
            </a>
            <a href="/conditions" style={{ border: "1px solid rgba(255,255,255,0.5)", color: "white", padding: "16px 40px", borderRadius: "4px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "14px", letterSpacing: "1px" }}>
              LEARN MORE
            </a>
          </div>
        </div>
      </div>

      <div style={{ background: "#1D9E75", padding: "24px 60px", display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "center" }}>
        {["Pain Relief", "Stress & Anxiety", "Fertility Support", "Cosmetic Acupuncture", "Facial Rejuvenation"].map(t => (
          <span key={t} style={{ color: "white", fontFamily: "sans-serif", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}>{t}</span>
        ))}
      </div>

      <div style={{ padding: "100px 60px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontFamily: "sans-serif", fontSize: "11px", letterSpacing: "4px", color: "#1D9E75", textTransform: "uppercase", marginBottom: "12px" }}>Treatments</p>
          <h2 style={{ fontSize: "42px", color: "#085041", marginBottom: "60px", fontWeight: "normal" }}>What We Offer</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {[
              { title: "Acupuncture", desc: "Supports pain relief, stress reduction, hormonal balance, and overall wellbeing through traditional needle therapy.", duration: "45-50 min", price: "80" },
              { title: "Cosmetic Acupuncture", desc: "A natural approach to skin rejuvenation - stimulating collagen, improving tone and reducing signs of aging.", duration: "45-50 min", price: "125" }
            ].map(s => (
              <div key={s.title} style={{ background: "white", borderRadius: "4px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div style={{ background: "#085041", height: "4px" }}></div>
                <div style={{ padding: "36px" }}>
                  <h3 style={{ fontSize: "22px", color: "#085041", marginBottom: "16px", fontWeight: "normal" }}>{s.title}</h3>
                  <p style={{ fontFamily: "sans-serif", color: "#555", lineHeight: "1.7", marginBottom: "24px" }}>{s.desc}</p>
                  <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#1D9E75", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>{"Duration: " + s.duration}</p>
                  <p style={{ fontFamily: "sans-serif", fontSize: "24px", color: "#085041", fontWeight: "bold" }}>{"\u20ac" + s.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#085041", padding: "100px 60px", color: "white" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", gap: "60px", alignItems: "center", flexWrap: "wrap" }}>
          <img
            src="/WestCorkAcupuncture-facial.png"
            alt="Kate - West Cork Acupuncture"
            style={{ width: "320px", height: "320px", objectFit: "cover", borderRadius: "4px", flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: "280px" }}>
            <p style={{ fontFamily: "sans-serif", fontSize: "11px", letterSpacing: "4px", opacity: 0.6, textTransform: "uppercase", marginBottom: "24px" }}>Your Practitioner</p>
            <h2 style={{ fontSize: "42px", fontWeight: "normal", marginBottom: "24px" }}>Kate</h2>
            <p style={{ fontFamily: "sans-serif", fontSize: "17px", opacity: 0.85, lineHeight: "1.8", marginBottom: "40px" }}>
              A dedicated acupuncturist with a passion for helping clients reconnect with balance, ease, and natural healing. Every treatment is tailored, gentle, and deeply supportive.
            </p>
            <a href="/about" style={{ border: "1px solid rgba(255,255,255,0.5)", color: "white", padding: "14px 36px", borderRadius: "4px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "13px", letterSpacing: "2px" }}>
              MEET KATE
            </a>
          </div>
        </div>
      </div>

      <div style={{ padding: "100px 60px", background: "#F5F0E8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontFamily: "sans-serif", fontSize: "11px", letterSpacing: "4px", color: "#1D9E75", textTransform: "uppercase", marginBottom: "12px" }}>Reviews</p>
          <h2 style={{ fontSize: "42px", color: "#085041", marginBottom: "60px", fontWeight: "normal" }}>Client Experiences</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {[
              "I felt calmer after one session than I have in months.",
              "My pain reduced dramatically - Kate is incredibly skilled.",
              "The cosmetic acupuncture gave my skin a natural glow."
            ].map(t => (
              <div key={t} style={{ background: "white", padding: "36px", borderRadius: "4px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <p style={{ fontSize: "22px", color: "#085041", lineHeight: "1.5", marginBottom: "24px" }}>"{t}"</p>
                <div style={{ width: "40px", height: "2px", background: "#1D9E75" }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#1D9E75", padding: "80px 60px", textAlign: "center" }}>
        <h2 style={{ fontSize: "42px", color: "white", fontWeight: "normal", marginBottom: "16px" }}>Ready to Begin?</h2>
        <p style={{ fontFamily: "sans-serif", color: "rgba(255,255,255,0.85)", fontSize: "16px", marginBottom: "40px" }}>Book your appointment online or message Kate directly on WhatsApp.</p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/book" style={{ background: "white", color: "#085041", padding: "16px 48px", borderRadius: "4px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "14px", letterSpacing: "1px" }}>
            BOOK ONLINE
          </a>
          <a href="https://wa.me/353831156950" style={{ border: "1px solid white", color: "white", padding: "16px 48px", borderRadius: "4px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "14px", letterSpacing: "1px" }}>
            WHATSAPP KATE
          </a>
        </div>
      </div>

      <div style={{ background: "#085041", padding: "40px 60px", textAlign: "center" }}>
        <p style={{ fontFamily: "sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
          {"2026 West Cork Acupuncture · 083 115 6950 · "}
          <a href="https://www.instagram.com/west_corkacupuncture/" target="_blank" style={{ color: "#9FE1CB", textDecoration: "none" }}>Instagram</a>
        </p>
      </div>

    </div>
  );
}
