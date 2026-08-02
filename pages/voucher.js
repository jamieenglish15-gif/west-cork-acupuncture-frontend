import Head from "next/head";

export default function Voucher() {
  const waLink = (title, amount) => {
    const msg = encodeURIComponent("Hi Kate, I would like to purchase a gift voucher for " + title + " (EUR" + amount + "). Please let me know how to proceed.");
    return "https://wa.me/353831156950?text=" + msg;
  };

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <Head>
        <title>Gift Vouchers | West Cork Acupuncture</title>
      </Head>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "40px", color: "#085041", marginBottom: "8px" }}>Gift Vouchers</h1>
        <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "32px", lineHeight: "1.7" }}>
          Give the gift of wellbeing. Our gift vouchers are perfect for birthdays, anniversaries or any special occasion.
        </p>

        <div style={{ display: "grid", gap: "16px", marginBottom: "32px" }}>
          <div style={{ background: "white", padding: "28px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h2 style={{ fontSize: "22px", color: "#085041", fontWeight: "normal", margin: 0 }}>Acupuncture Session</h2>
              <p style={{ fontSize: "28px", color: "#085041", fontWeight: "bold", margin: 0 }}>{"\u20ac80"}</p>
            </div>
            <p style={{ fontFamily: "sans-serif", color: "#555", marginBottom: "16px" }}>One full acupuncture treatment with Kate.</p>
            <a href={waLink("Acupuncture Session", "80")} target="_blank" style={{ display: "inline-block", background: "#1D9E75", color: "white", padding: "12px 24px", borderRadius: "6px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "14px" }}>
              Purchase via WhatsApp
            </a>
          </div>

          <div style={{ background: "white", padding: "28px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h2 style={{ fontSize: "22px", color: "#085041", fontWeight: "normal", margin: 0 }}>Cosmetic Acupuncture</h2>
              <p style={{ fontSize: "28px", color: "#085041", fontWeight: "bold", margin: 0 }}>{"\u20ac125"}</p>
            </div>
            <p style={{ fontFamily: "sans-serif", color: "#555", marginBottom: "16px" }}>One cosmetic facial acupuncture session.</p>
            <a href={waLink("Cosmetic Acupuncture", "125")} target="_blank" style={{ display: "inline-block", background: "#1D9E75", color: "white", padding: "12px 24px", borderRadius: "6px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "14px" }}>
              Purchase via WhatsApp
            </a>
          </div>

          <div style={{ background: "white", padding: "28px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h2 style={{ fontSize: "22px", color: "#085041", fontWeight: "normal", margin: 0 }}>Custom Amount</h2>
            </div>
            <p style={{ fontFamily: "sans-serif", color: "#555", marginBottom: "16px" }}>Contact Kate to arrange a custom gift voucher.</p>
            <a href="https://wa.me/353831156950" target="_blank" style={{ display: "inline-block", background: "#085041", color: "white", padding: "12px 24px", borderRadius: "6px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "14px" }}>
              Contact Kate
            </a>
          </div>
        </div>

        <div style={{ background: "#E1F5EE", padding: "24px", borderRadius: "8px" }}>
          <h3 style={{ fontSize: "18px", color: "#085041", marginBottom: "12px" }}>How it works</h3>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8", marginBottom: "8px" }}>1. Contact Kate via WhatsApp to purchase a voucher</p>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8", marginBottom: "8px" }}>2. Kate will generate a unique voucher code and send it to you</p>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8", marginBottom: "8px" }}>3. The recipient enters the code when booking online</p>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8" }}>4. Vouchers are valid for 12 months from date of purchase</p>
        </div>

      </div>
    </div>
  );
}
