import Head from "next/head";

export default function Conditions() {
  const conditions = [
    { title: "Pain & Musculoskeletal", items: ["Back pain", "Neck pain", "Shoulder tension", "Sciatica", "Joint pain", "Sports injuries"] },
    { title: "Women's Health", items: ["PMS & menstrual pain", "Cycle regulation", "Fertility support", "Pregnancy discomfort", "Postpartum recovery"] },
    { title: "Men's Health", items: ["Promoting heart health and circulation", "Supporting mental well-being", "Erectile dysfunction", "Overall sexual function"] },
    { title: "Stress & Mental Health", items: ["Stress", "Anxiety", "Burnout", "Sleep issues", "Emotional imbalance", "Increasing energy and vitality" ] },
    { title: "Digestive Health", items: ["IBS", "Bloating", "Nausea", "Slow digestion", "Gut motility issues"] },
    { title: "Skin & Cosmetic", items: ["Fine lines", "Dull complexion", "Acne", "Facial tension", "Circulation support"] }
  ];

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <Head>
        <title>Conditions Treated | West Cork Acupuncture Skibbereen</title>
        <meta name="description" content="West Cork Acupuncture treats pain, stress, fertility, digestive and skin conditions. Book with Kate in Skibbereen, West Cork." />
        <link rel="canonical" href="https://westcorkacupuncture.ie/conditions" />
      </Head>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "40px", color: "#085041", marginBottom: "12px" }}>Conditions Treated</h1>
        <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "32px" }}>
          Acupuncture supports the body's natural healing systems. Below are some of the most common conditions treated at West Cork Acupuncture.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {conditions.map(section => (
            <div key={section.title} style={{ background: "white", padding: "24px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <h2 style={{ fontSize: "22px", color: "#085041", marginBottom: "12px" }}>{section.title}</h2>
              <ul style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "2", paddingLeft: "0", listStyle: "none" }}>
                {section.items.map(item => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          ))}
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
