import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Head from "next/head";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
const API = "https://west-cork-acupuncture-backend-production-366a.up.railway.app";

function CheckoutForm({ amount, name, service, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError("");
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: "https://westcorkacupuncture.ie/book-confirmed" },
      redirect: "if_required"
    });
    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p style={{ color: "#c00", fontFamily: "sans-serif", fontSize: "14px", marginTop: "12px" }}>{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{ width: "100%", background: loading ? "#999" : "#1D9E75", color: "white", padding: "14px", borderRadius: "6px", border: "none", fontFamily: "sans-serif", fontSize: "16px", cursor: loading ? "not-allowed" : "pointer", marginTop: "20px" }}
      >
        {loading ? "Processing..." : "Pay " + "\u20ac" + amount}
      </button>
    </form>
  );
}

export default function Pay() {
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(80);
  const [name, setName] = useState("");
  const [service, setService] = useState("Acupuncture");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    if (!name) { alert("Please enter your name."); return; }
    setLoading(true);
    const res = await fetch(API + "/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, name, service })
    });
    const data = await res.json();
    setClientSecret(data.clientSecret);
    setLoading(false);
  };

  if (success) {
    return (
      <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "40px" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "8px", textAlign: "center", maxWidth: "480px" }}>
          <p style={{ fontSize: "48px", marginBottom: "16px" }}>✓</p>
          <h1 style={{ fontSize: "28px", color: "#085041", marginBottom: "16px" }}>Payment Successful</h1>
          <p style={{ fontFamily: "sans-serif", color: "#555", marginBottom: "24px" }}>Thank you {name}. Your payment has been received. Kate will be in touch to confirm your appointment.</p>
          <a href="/book" style={{ background: "#1D9E75", color: "white", padding: "12px 32px", borderRadius: "6px", textDecoration: "none", fontFamily: "sans-serif" }}>Book Appointment</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#F5F0E8", minHeight: "100vh", padding: "40px" }}>
      <Head>
        <title>Pay Online | West Cork Acupuncture</title>
      </Head>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", color: "#085041", marginBottom: "8px" }}>Pay Online</h1>
        <p style={{ fontFamily: "sans-serif", color: "#666", marginBottom: "32px" }}>Secure payment powered by Stripe.</p>

        {!clientSecret ? (
          <div style={{ background: "white", padding: "32px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041", fontWeight: "bold" }}>Your Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" style={{ width: "100%", padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", marginTop: "6px", fontFamily: "sans-serif", fontSize: "14px", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontFamily: "sans-serif", fontSize: "14px", color: "#085041", fontWeight: "bold" }}>Service</label>
              <select value={service} onChange={e => { setService(e.target.value); setAmount(e.target.value === "Cosmetic Acupuncture" ? 125 : 80); }} style={{ width: "100%", padding: "12px", border: "1px solid #9FE1CB", borderRadius: "6px", marginTop: "6px", fontFamily: "sans-serif", fontSize: "14px", boxSizing: "border-box" }}>
                <option value="Acupuncture">Acupuncture — {"\u20ac"}80</option>
                <option value="Cosmetic Acupuncture">Cosmetic Acupuncture — {"\u20ac"}125</option>
              </select>
            </div>
            <div style={{ background: "#E1F5EE", padding: "16px", borderRadius: "6px", marginBottom: "24px", textAlign: "center" }}>
              <p style={{ fontFamily: "sans-serif", fontSize: "32px", fontWeight: "bold", color: "#085041", margin: 0 }}>{"\u20ac"}{amount}</p>
              <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#666", margin: 0 }}>{service}</p>
            </div>
            <button onClick={startPayment} disabled={loading} style={{ width: "100%", background: loading ? "#999" : "#1D9E75", color: "white", padding: "14px", borderRadius: "6px", border: "none", fontFamily: "sans-serif", fontSize: "16px", cursor: "pointer" }}>
              {loading ? "Loading..." : "Continue to Payment"}
            </button>
          </div>
        ) : (
          <div style={{ background: "white", padding: "32px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ background: "#E1F5EE", padding: "16px", borderRadius: "6px", marginBottom: "24px", textAlign: "center" }}>
              <p style={{ fontFamily: "sans-serif", fontSize: "28px", fontWeight: "bold", color: "#085041", margin: 0 }}>{"\u20ac"}{amount}</p>
              <p style={{ fontFamily: "sans-serif", fontSize: "13px", color: "#666", margin: 0 }}>{service} — {name}</p>
            </div>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm amount={amount} name={name} service={service} onSuccess={() => setSuccess(true)} />
            </Elements>
          </div>
        )}

        <p style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#888", textAlign: "center", marginTop: "24px" }}>
          Payments are processed securely by Stripe. West Cork Acupuncture never stores your card details.
        </p>
      </div>
    </div>
  );
}
