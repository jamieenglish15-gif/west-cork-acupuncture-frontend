import Head from "next/head";

export default function Terms() {
  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <Head>
        <title>Terms & Conditions | West Cork Acupuncture</title>
        <meta name="description" content="Terms and conditions for West Cork Acupuncture. Appointments, cancellations, pricing and liability information." />
        <link rel="canonical" href="https://westcorkacupuncture.ie/terms" />
      </Head>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "40px", color: "#085041", marginBottom: "8px" }}>Terms & Conditions</h1>
        <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "32px" }}>Last updated: August 2026</p>

        {[
          { title: "Appointments", text: "All appointments are subject to availability and are confirmed only upon acceptance by West Cork Acupuncture. Booking requests submitted online are not confirmed until you receive confirmation from Kate." },
          { title: "Cancellation Policy", text: "We require at least 24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may be charged the full treatment fee. Repeated late cancellations may result in prepayment being required for future bookings." },
          { title: "Health Information", text: "Clients are required to provide accurate and complete health information before treatment. West Cork Acupuncture accepts no liability for adverse reactions arising from undisclosed medical conditions or medications." },
          { title: "Treatment Suitability", text: "Kate English reserves the right to decline or discontinue treatment if it is deemed clinically inappropriate or unsafe. Clients will be advised and referred to their GP where necessary." },
          { title: "Pricing", text: "Treatment prices are as listed on our website. Prices are subject to change with reasonable notice. Gift vouchers are non-refundable and valid for 12 months from date of purchase." },
          { title: "Liability", text: "West Cork Acupuncture carries full professional indemnity insurance. Our liability is limited to the cost of the treatment provided. We accept no liability for loss or damage to personal property." },
          { title: "Complaints", text: "Any complaints should be directed to Kate English in the first instance. We aim to resolve all complaints within 14 working days. If you are not satisfied, you may contact the relevant professional regulatory body." },
          { title: "Governing Law", text: "These terms are governed by the laws of Ireland. Any disputes shall be subject to the exclusive jurisdiction of the Irish courts." }
        ].map(s => (
          <div key={s.title} style={{ background: "white", padding: "24px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "20px", color: "#085041", marginBottom: "12px" }}>{s.title}</h2>
            <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8" }}>{s.text}</p>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a href="/book" style={{ background: "#1D9E75", color: "white", padding: "14px 40px", borderRadius: "8px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "16px" }}>
            Book Appointment
          </a>
        </div>

      </div>
    </div>
  );
}
