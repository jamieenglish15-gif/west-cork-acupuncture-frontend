import Head from "next/head";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
const API = process.env.NEXT_PUBLIC_API_URL;

function VoucherCheckout({ voucher, onClose, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) { setError("Please enter your name and email."); return; }
    setLoading(true);
    setError("");
    try {
      const intentRes = await fetch(`${API}/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: voucher.amount, name, email, service: "Gift Voucher - " + voucher.title })
      });
      const { clientSecret } = await intentRes.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement), billing_details: { name, email } }
      });

      if (result.error) { setError(result.error.message); setLoading(false); return; }

      const voucherRes = await fetch(`${API}/vouchers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: voucher.amount, purchaser: name, recipient: recipient || name })
      });
      const { voucher: newVoucher } = await voucherRes.json();

      // Send email with voucher code via backend
      await fetch(`${API}/vouchers/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purchaser: name,
          email,
          recipient: recipient || name,
          code: newVoucher.code,
          amount: voucher.amount,
          title: voucher.title
        })
      });

      onSuccess(newVoucher.code, name, email);
    } catch (err) {
      setError("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "#fff", borderRadius: "12px", padding: "2rem", width: "100%", maxWidth: "480px", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.2rem", color: "#085041" }}>Buy Gift Voucher</h2>
            <p style={{ margin: "4px 0 0", color: "#555", fontSize: "0.9rem" }}>{voucher.title} — €{voucher.amount}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#666" }}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: "0.85rem", color: "#555", display: "block", marginBottom: "4px" }}>Your name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" style={{ width: "100%", padding: "10px", marginBottom: "12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }} />

          <label style={{ fontSize: "0.85rem", color: "#555", display: "block", marginBottom: "4px" }}>Your email (voucher will be sent here)</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@email.com" type="email" style={{ width: "100%", padding: "10px", marginBottom: "12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }} />

          <label style={{ fontSize: "0.85rem", color: "#555", display: "block", marginBottom: "4px" }}>Recipient name (optional — for the voucher)</label>
          <input value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="e.g. Sarah" style={{ width: "100%", padding: "10px", marginBottom: "16px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }} />

          <label style={{ fontSize: "0.85rem", color: "#555", display: "block", marginBottom: "8px" }}>Card details</label>
          <div style={{ border: "1px solid #ddd", borderRadius: "6px", padding: "12px", marginBottom: "16px" }}>
            <CardElement options={{ style: { base: { fontSize: "16px", fontFamily: "sans-serif" } } }} />
          </div>

          {error && <p style={{ color: "red", fontSize: "0.85rem", marginBottom: "12px" }}>{error}</p>}

          <button type="submit" disabled={loading || !stripe} style={{ width: "100%", padding: "12px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: "6px", fontSize: "1rem", cursor: "pointer", fontWeight: "600" }}>
            {loading ? "Processing..." : `Pay €${voucher.amount}`}
          </button>
        </form>
      </div>
    </div>
  );
}

function SuccessModal({ code, name, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "#fff", borderRadius: "12px", padding: "2rem", width: "100%", maxWidth: "440px", textAlign: "center", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
        <h2 style={{ color: "#085041", marginBottom: "0.5rem" }}>Voucher purchased!</h2>
        <p style={{ color: "#555", marginBottom: "1.5rem" }}>Thank you, {name}. Your voucher code has been sent to your email.</p>
        <div style={{ background: "#E1F5EE", borderRadius: "8px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ margin: "0 0 8px", fontSize: "0.85rem", color: "#555" }}>Voucher code</p>
          <p style={{ margin: 0, fontSize: "1.8rem", fontWeight: "700", color: "#085041", letterSpacing: "0.1em" }}>{code}</p>
        </div>
        <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "1.5rem" }}>Valid for 12 months. Enter this code when booking online.</p>
        <button onClick={onClose} style={{ padding: "10px 24px", background: "#085041", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>Done</button>
      </div>
    </div>
  );
}

export default function Voucher() {
  const [selected, setSelected] = useState(null);
  const [success, setSuccess] = useState(null);

  const vouchers = [
    { title: "Acupuncture Session", amount: 80, desc: "One full acupuncture treatment with Kate." },
    { title: "Cosmetic Acupuncture", amount: 125, desc: "One cosmetic facial acupuncture session." },
  ];

  const handleSuccess = (code, name, email) => {
    setSelected(null);
    setSuccess({ code, name, email });
  };

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <Head>
        <title>Gift Vouchers | West Cork Acupuncture Skibbereen</title>
        <meta name="description" content="Buy gift vouchers for acupuncture and cosmetic facial acupuncture treatments at West Cork Acupuncture, Skibbereen." />
        <link rel="canonical" href="https://westcorkacupuncture.ie/voucher" />
      </Head>

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "40px", color: "#085041", marginBottom: "8px" }}>Gift Vouchers</h1>
        <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "32px", lineHeight: "1.7" }}>
          Give the gift of wellbeing. Our gift vouchers are perfect for birthdays, anniversaries or any special occasion.
        </p>

        <div style={{ display: "grid", gap: "16px", marginBottom: "32px" }}>
          {vouchers.map(v => (
            <div key={v.title} style={{ background: "white", padding: "28px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h2 style={{ fontSize: "22px", color: "#085041", fontWeight: "normal", margin: 0 }}>{v.title}</h2>
                <p style={{ fontSize: "28px", color: "#085041", fontWeight: "bold", margin: 0 }}>€{v.amount}</p>
              </div>
              <p style={{ fontFamily: "sans-serif", color: "#555", marginBottom: "16px" }}>{v.desc}</p>
              <button
                onClick={() => setSelected(v)}
                style={{ display: "inline-block", background: "#1D9E75", color: "white", padding: "12px 24px", borderRadius: "6px", border: "none", fontFamily: "sans-serif", fontSize: "14px", cursor: "pointer", fontWeight: "600" }}
              >
                Buy with card
              </button>
            </div>
          ))}

          <div style={{ background: "white", padding: "28px", borderRadius: "8px", borderLeft: "8px solid #1D9E75", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: "22px", color: "#085041", fontWeight: "normal", marginBottom: "12px" }}>Custom Amount</h2>
            <p style={{ fontFamily: "sans-serif", color: "#555", marginBottom: "16px" }}>Contact Kate to arrange a custom gift voucher.</p>
            <a href="https://wa.me/353831156950" target="_blank" rel="noreferrer" style={{ display: "inline-block", background: "#085041", color: "white", padding: "12px 24px", borderRadius: "6px", textDecoration: "none", fontFamily: "sans-serif", fontSize: "14px" }}>
              Contact Kate
            </a>
          </div>
        </div>

        <div style={{ background: "#E1F5EE", padding: "24px", borderRadius: "8px" }}>
          <h3 style={{ fontSize: "18px", color: "#085041", marginBottom: "12px" }}>How it works</h3>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8", marginBottom: "8px" }}>1. Purchase a voucher by card — you'll receive a unique code instantly by email</p>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8", marginBottom: "8px" }}>2. Share the voucher code with the recipient</p>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8", marginBottom: "8px" }}>3. The recipient enters the code when booking online</p>
          <p style={{ fontFamily: "sans-serif", color: "#333", lineHeight: "1.8" }}>4. Vouchers are valid for 12 months from date of purchase</p>
        </div>
      </div>

      {selected && (
        <Elements stripe={stripePromise}>
          <VoucherCheckout voucher={selected} onClose={() => setSelected(null)} onSuccess={handleSuccess} />
        </Elements>
      )}

      {success && <SuccessModal code={success.code} name={success.name} onClose={() => setSuccess(null)} />}
    </div>
  );
}
