import Head from "next/head";

export default function FAQ() {
  const faqs = [
    { q: "Does acupuncture hurt?", a: "Most people feel little to no discomfort. The needles are extremely fine, and treatments are gentle." },
    { q: "How many sessions will I need?", a: "This depends on your condition. Some people feel relief after one session; others benefit from a series." },
    { q: "What should I wear?", a: "Comfortable clothing is ideal. You may be asked to roll up sleeves or trousers." },
    { q: "Is acupuncture safe?", a: "Yes. When performed by a trained practitioner, acupuncture is extremely safe and well-researched." },
    { q: "Can I combine acupuncture with other treatments?", a: "Absolutely. Acupuncture works well alongside physiotherapy, massage, and medical care." },
    { q: "How long is each session?", a: "Initial consultations are typically 60-75 minutes. Follow-up sessions are usually 45-60 minutes." },
    { q: "What conditions do you treat?", a: "We treat a wide range of conditions including pain, stress, anxiety, fertility issues, digestive problems, and skin concerns." }
  ];

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <Head>
        <title>FAQ | West Cork Acupuncture Skibbereen</title>
        <meta name="description" content="Frequently asked questions about acupuncture and cosmetic treatments at West Cork Acupuncture in Skibbereen." />
        <link rel="canonical" href="https://westcorkacupuncture.ie/faq" />
      </Head>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "40px", color: "#085041", marginBottom: "24px" }}>Frequently Asked Questions</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {faqs.map(f => (
            <div key={f.q} style={{ background: "white", padding: "24px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <h2 style={{ fontSize: "20px", color: "#085041", marginBottom: "10px" }}>{f.q}</h2>
              <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.7" }}>{f.a}</p>
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
