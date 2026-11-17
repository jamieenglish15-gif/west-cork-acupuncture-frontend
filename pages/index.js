import Head from "next/head";

const GREEN = "#0B5A45";
const DEEP = "#073D2F";
const GOLD = "#C9A44C";
const IVORY = "#F9FAF7";
const SAND = "#F1EEE6";

const serif = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const sans = "'Helvetica Neue', Arial, sans-serif";

const eyebrow = { fontFamily: sans, fontSize: "11px", letterSpacing: "5px", color: GOLD, textTransform: "uppercase", marginBottom: "14px" };
const h2 = { fontFamily: serif, fontSize: "44px", color: GREEN, fontWeight: 500, letterSpacing: "1px", margin: "0 0 12px" };

function Divider({ light }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", margin: "0 auto 56px" }}>
      <span style={{ width: "60px", height: "1px", background: GOLD }} />
      <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: GOLD }} />
      <span style={{ width: "60px", height: "1px", background: GOLD }} />
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ fontFamily: serif, background: IVORY, color: GREEN }}>
      <Head>
        <title>West Cork Acupuncture | Acupuncture Skibbereen | Kate</title>
        <meta name="description" content="West Cork Acupuncture offers traditional acupuncture and cosmetic facial acupuncture at 13 North Street, Skibbereen. Message Kate to arrange your appointment." />
        <meta property="og:image" content="https://www.westcorkacupuncture.ie/wca-logo.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" />
      </Head>

      {/* HERO */}
      <section className="wca-hero">
        <div className="wca-hero-copy">
          <p style={{ ...eyebrow, marginBottom: "22px" }}>Traditional Acupuncture · West Cork, Ireland</p>
          <h1 className="wca-h1">
            Restore.<br /><em style={{ color: GOLD }}>Rebalance.</em><br />Heal.
          </h1>
          <p style={{ fontFamily: sans, fontSize: "17px", color: "#4b5b54", lineHeight: 1.8, margin: "0 0 40px", maxWidth: "480px" }}>
            Gentle, evidence-based acupuncture to support your body's natural healing, in a calm, private clinic in Skibbereen.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="https://wa.me/353831156950" target="_blank" rel="noreferrer" className="wca-btn wca-btn-solid">MESSAGE KATE</a>
            <a href="/conditions" className="wca-btn wca-btn-line">LEARN MORE</a>
          </div>
        </div>
        <div className="wca-hero-art">
          <img src="/wca-emblem.jpg" alt="West Cork Acupuncture: phoenix rising over mountains" style={{ width: "100%", maxWidth: "560px", height: "auto" }} />
        </div>
      </section>

      {/* CONDITIONS STRIP */}
      <div style={{ background: GREEN, padding: "22px 40px", display: "flex", gap: "12px 44px", flexWrap: "wrap", justifyContent: "center", borderTop: "3px solid " + GOLD }}>
        {["Pain Relief", "Stress & Anxiety", "Fertility Support", "Cosmetic Acupuncture", "Facial Rejuvenation"].map(t => (
          <span key={t} style={{ color: IVORY, fontFamily: sans, fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase" }}>{t}</span>
        ))}
      </div>

      {/* TREATMENTS */}
      <section className="wca-section">
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <p style={eyebrow}>Treatments</p>
          <h2 style={h2}>What We Offer</h2>
          <Divider />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", textAlign: "left" }}>
            {[
              { title: "Acupuncture", desc: "Supports pain relief, stress reduction, hormonal balance and overall wellbeing through traditional needle therapy.", duration: "45-50 min", price: "80" },
              { title: "Cosmetic Acupuncture", desc: "A natural approach to skin rejuvenation, stimulating collagen, improving tone and softening the signs of ageing.", duration: "45-50 min", price: "125" }
            ].map(s => (
              <div key={s.title} style={{ background: "white", border: "1px solid #e6dfcc", borderTop: "3px solid " + GOLD, padding: "40px 36px", boxShadow: "0 6px 28px rgba(7,61,47,0.06)" }}>
                <h3 style={{ fontFamily: serif, fontSize: "28px", fontWeight: 500, color: GREEN, margin: "0 0 14px" }}>{s.title}</h3>
                <p style={{ fontFamily: sans, color: "#55635d", lineHeight: 1.75, margin: "0 0 26px" }}>{s.desc}</p>
                <p style={{ fontFamily: sans, fontSize: "11px", color: GOLD, letterSpacing: "3px", textTransform: "uppercase", margin: "0 0 6px" }}>{"Duration · " + s.duration}</p>
                <p style={{ fontFamily: serif, fontSize: "34px", color: GREEN, fontWeight: 600, margin: 0 }}>{"€" + s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTITIONER */}
      <section style={{ background: DEEP, padding: "100px 40px", color: IVORY }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", gap: "60px", alignItems: "center", flexWrap: "wrap" }}>
          <img
            src="/WestCorkAcupuncture-facial.png"
            alt="Kate, West Cork Acupuncture"
            style={{ width: "320px", maxWidth: "100%", height: "320px", objectFit: "cover", flexShrink: 0, border: "1px solid " + GOLD, padding: "8px", background: DEEP }}
          />
          <div style={{ flex: 1, minWidth: "280px" }}>
            <p style={eyebrow}>Your Practitioner</p>
            <h2 style={{ ...h2, color: IVORY, fontSize: "52px" }}>Kate</h2>
            <p style={{ fontFamily: sans, fontSize: "17px", opacity: 0.85, lineHeight: 1.85, margin: "0 0 36px" }}>
              A dedicated acupuncturist with a passion for helping clients reconnect with balance, ease and natural healing. Every treatment is tailored, gentle and deeply supportive.
            </p>
            <a href="/about" className="wca-btn wca-btn-gold">MEET KATE</a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="wca-section" style={{ background: SAND }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <p style={eyebrow}>Reviews</p>
          <h2 style={h2}>Client Experiences</h2>
          <Divider />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "28px", textAlign: "left" }}>
            {[
              "I felt calmer after one session than I have in months.",
              "My pain reduced dramatically. Kate is incredibly skilled.",
              "The cosmetic acupuncture gave my skin a natural glow."
            ].map(t => (
              <div key={t} style={{ background: "white", padding: "36px", border: "1px solid #e6dfcc" }}>
                <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "23px", color: GREEN, lineHeight: 1.5, margin: "0 0 22px" }}>{"“" + t + "”"}</p>
                <div style={{ width: "40px", height: "2px", background: GOLD }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: GREEN, padding: "90px 40px", textAlign: "center", borderTop: "3px solid " + GOLD }}>
        <h2 style={{ ...h2, color: IVORY, fontSize: "46px" }}>Ready to Begin?</h2>
        <p style={{ fontFamily: sans, color: "rgba(249,250,247,0.85)", fontSize: "16px", margin: "0 0 36px" }}>
          Message Kate directly on WhatsApp to arrange your appointment.
        </p>
        <a href="https://wa.me/353831156950" target="_blank" rel="noreferrer" className="wca-btn wca-btn-gold">WHATSAPP KATE</a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: DEEP, padding: "44px 40px", textAlign: "center" }}>
        <img src="/wca-logo.jpg" alt="West Cork Acupuncture" style={{ width: "120px", height: "auto", marginBottom: "14px", borderRadius: "4px" }} />
        <p style={{ fontFamily: sans, color: "rgba(249,250,247,0.55)", fontSize: "13px", lineHeight: 1.8, margin: 0 }}>
          13 North Street, Skibbereen, Co. Cork · 083 115 6950<br />
          {"© 2026 West Cork Acupuncture · "}
          <a href="https://www.instagram.com/west_corkacupuncture/" target="_blank" rel="noreferrer" style={{ color: GOLD, textDecoration: "none" }}>Instagram</a>
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .wca-hero { background: ${IVORY}; display: flex; align-items: center; justify-content: center; gap: 60px; padding: 70px 60px 80px; flex-wrap: wrap; max-width: 1200px; margin: 0 auto; }
        .wca-hero-copy { flex: 1 1 420px; max-width: 560px; }
        .wca-hero-art { flex: 1 1 340px; display: flex; justify-content: center; }
        .wca-h1 { font-family: ${serif}; font-size: 76px; line-height: 1.05; font-weight: 500; color: ${GREEN}; margin: 0 0 26px; letter-spacing: 1px; }
        .wca-section { padding: 100px 40px; }
        .wca-btn { display: inline-block; padding: 16px 40px; font-family: ${sans}; font-size: 13px; letter-spacing: 3px; text-decoration: none; }
        .wca-btn-solid { background: ${GREEN}; color: ${IVORY}; border: 1px solid ${GREEN}; }
        .wca-btn-line { color: ${GREEN}; border: 1px solid ${GOLD}; }
        .wca-btn-gold { background: ${GOLD}; color: ${DEEP}; border: 1px solid ${GOLD}; font-weight: 600; }
        @media (max-width: 700px) {
          .wca-hero { padding: 40px 24px 56px; gap: 32px; }
          .wca-hero-art { order: -1; }
          .wca-h1 { font-size: 52px; }
          .wca-section { padding: 64px 24px; }
        }
      ` }} />
    </div>
  );
}
