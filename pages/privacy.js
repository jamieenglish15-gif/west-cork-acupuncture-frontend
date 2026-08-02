import Head from "next/head";

export default function Privacy() {
  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <Head>
        <title>Privacy Policy | West Cork Acupuncture</title>
      </Head>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "40px", color: "#085041", marginBottom: "8px" }}>Privacy Policy</h1>
        <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "32px" }}>Last updated: August 2026</p>

        {[
          { title: "Who we are", text: "West Cork Acupuncture is operated by Kate English, Acupuncturist, based at 13 North Street, Skibbereen, Co. Cork. Contact: 083 115 6950." },
          { title: "What information we collect", text: "We collect personal information you provide when booking an appointment or completing a health questionnaire. This includes your name, phone number, email address, and health information necessary for safe treatment." },
          { title: "How we use your information", text: "Your information is used solely to provide acupuncture treatments, manage appointments, and communicate with you about your bookings. We do not sell, share or transfer your personal data to third parties." },
          { title: "How we store your information", text: "Your data is stored securely on encrypted servers. Health records and appointment data are retained for a minimum of 7 years in accordance with Irish healthcare guidelines." },
          { title: "Your rights under GDPR", text: "You have the right to access, correct, or request deletion of your personal data at any time. You may also request a copy of all data we hold about you. To exercise these rights, contact Kate at 083 115 6950." },
          { title: "Cookies", text: "Our website uses cookies to improve your browsing experience and analyse site traffic. You can accept or decline cookies using the banner on our website. Essential cookies required for the site to function cannot be disabled." },
          { title: "Contact", text: "For any privacy-related queries, please contact Kate English at West Cork Acupuncture, 13 North Street, Skibbereen, Co. Cork. Phone: 083 115 6950." }
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
