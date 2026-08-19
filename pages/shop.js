import { useState, useEffect } from "react";
import Head from "next/head";
import Nav from "../components/Nav";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
const API = process.env.NEXT_PUBLIC_API_URL;

const IMAGE_MAP = {
  stainless_contour: "/stainless_contour.jpg",
  rose_quartz_gua_sha: "/rose_quartz_gua_sha.jpg",
  jade_gua_sha: "/jade_gua_sha.jpg",
  stainless_facial: "/stainless_facial.jpg",
  jade_spa_set: "/jade_roller.jpg",
  scalp_massager: "/scalp_massager.jpg",
  jade_massager: "/jade_massager.jpg",
  rose_eye_tool: "/rose_eye_tool.jpg",
  collagen_mask: "/collagen_mask.jpg",
  radiance_set: "/radiance_set.jpg",
};

function CheckoutForm({ cart, total, onSuccess, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ amount: total, name, email, service: "Shop order" })
      });
      const { clientSecret } = await intentRes.json();
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement), billing_details: { name, email } }
      });
      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }
      await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          customer_email: email,
          items: cart.map(i => ({ id: i.id, name: i.name, price: parseFloat(i.price), quantity: i.qty })),
          total,
          stripe_payment_id: result.paymentIntent.id
        })
      });
      onSuccess(name, email);
    } catch (err) {
      setError("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "#fff", borderRadius: "12px", padding: "2rem", width: "100%", maxWidth: "480px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 600 }}>Checkout</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#666" }}>×</button>
        </div>
        <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "#f9f9f9", borderRadius: "8px" }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "4px" }}>
              <span>{item.name} ×{item.qty}</span>
              <span>€{(parseFloat(item.price) * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #ddd", marginTop: "8px", paddingTop: "8px", fontWeight: 600, display: "flex", justifyContent: "space-between" }}>
            <span>Total</span><span>€{total.toFixed(2)}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" style={{ width: "100%", padding: "10px", marginBottom: "12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }} />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email" style={{ width: "100%", padding: "10px", marginBottom: "12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.95rem", boxSizing: "border-box" }} />
          <div style={{ border: "1px solid #ddd", borderRadius: "6px", padding: "12px", marginBottom: "16px" }}>
            <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
          </div>
          {error && <p style={{ color: "red", fontSize: "0.85rem", marginBottom: "12px" }}>{error}</p>}
          <button type="submit" disabled={loading || !stripe} style={{ width: "100%", padding: "12px", background: "#2c5f5f", color: "#fff", border: "none", borderRadius: "6px", fontSize: "1rem", cursor: "pointer", fontWeight: 600 }}>
            {loading ? "Processing..." : `Pay €${total.toFixed(2)}`}
          </button>
        </form>
        <p style={{ fontSize: "0.8rem", color: "#888", textAlign: "center", marginTop: "1rem" }}>
          Click & collect only — 13 North Street, Skibbereen, Mon–Fri 9am–5pm
        </p>
      </div>
    </div>
  );
}

function SuccessModal({ name, email, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "#fff", borderRadius: "12px", padding: "2rem", width: "100%", maxWidth: "440px", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
        <h2 style={{ marginBottom: "0.5rem" }}>Order confirmed!</h2>
        <p style={{ color: "#555", marginBottom: "1rem" }}>Thank you, {name}. A confirmation has been sent to {email}.</p>
        <div style={{ background: "#f0f7f4", borderRadius: "8px", padding: "1rem", marginBottom: "1.5rem", textAlign: "left" }}>
          <p style={{ margin: "0 0 4px", fontWeight: 600 }}>Collection details</p>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>West Cork Acupuncture<br />13 North Street, Skibbereen<br />Co. Cork, P81 Y237<br />Mon–Fri, 9am–5pm</p>
        </div>
        <button onClick={onClose} style={{ padding: "10px 24px", background: "#2c5f5f", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>Done</button>
      </div>
    </div>
  );
}

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    fetch(`${API}/products`).then(r => r.json()).then(setProducts).catch(console.error);
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const cartTotal = cart.reduce((sum, i) => sum + parseFloat(i.price) * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const handleSuccess = (name, email) => {
    setCheckoutOpen(false);
    setCart([]);
    setCartOpen(false);
    setSuccessData({ name, email });
  };

  return (
    <>
      <Head>
        <title>Shop — West Cork Acupuncture</title>
        <meta name="description" content="Mount Lai facial tools and wellness products — West Cork Acupuncture, Skibbereen" />
      </Head>
      <Nav />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1.5rem" }}>
          <div>
            <p style={{ margin: "0 0 4px", color: "#888", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Mount Lai</p>
            <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: 600 }}>Facial tools & accessories</h1>
            <p style={{ margin: "8px 0 0", color: "#555" }}>Curated tools Kate uses and recommends in clinic. Click & collect from the studio.</p>
          </div>
          {cartCount > 0 && (
            <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: "#2c5f5f", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontWeight: 600, fontSize: "0.95rem" }}>
              Cart ({cartCount}) — €{cartTotal.toFixed(2)}
            </button>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {products.map(product => {
            const inStock = parseInt(product.stock) > 0;
            const imgSrc = IMAGE_MAP[product.image_key] || "/Logo.jpg";
            return (
              <div key={product.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", paddingTop: "100%", background: "#f8f8f8" }}>
                  <img src={imgSrc} alt={product.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  {!inStock && (
                    <div style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "0.75rem", padding: "3px 8px", borderRadius: "4px" }}>Sold out</div>
                  )}
                  {product.bestseller && inStock && (
                    <div style={{ position: "absolute", top: "10px", left: "10px", background: "#2c5f5f", color: "#fff", fontSize: "0.75rem", padding: "3px 8px", borderRadius: "4px" }}>Bestseller</div>
                  )}
                </div>
                <div style={{ padding: "1rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  <p style={{ margin: "0 0 8px", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.3 }}>{product.name}</p>
                  <p style={{ margin: "0 0 auto", fontSize: "1rem", color: "#2c5f5f", fontWeight: 700, paddingBottom: "12px" }}>€{parseFloat(product.price).toFixed(2)}</p>
                  <button
                    onClick={() => inStock && addToCart(product)}
                    disabled={!inStock}
                    style={{ width: "100%", padding: "10px", background: inStock ? "#2c5f5f" : "#e0e0e0", color: inStock ? "#fff" : "#999", border: "none", borderRadius: "6px", cursor: inStock ? "pointer" : "default", fontWeight: 600, fontSize: "0.9rem" }}
                  >
                    {inStock ? "Add to cart" : "Sold out"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 900 }}>
          <div onClick={() => setCartOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "360px", background: "#fff", padding: "1.5rem", overflowY: "auto", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Your cart</h2>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#666" }}>×</button>
            </div>
            {cart.length === 0 ? (
              <p style={{ color: "#888" }}>Your cart is empty.</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} style={{ display: "flex", gap: "12px", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #eee" }}>
                    <img src={IMAGE_MAP[item.image_key] || "/Logo.jpg"} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: "0 0 4px", fontSize: "0.9rem", fontWeight: 600 }}>{item.name}</p>
                      <p style={{ margin: "0 0 8px", fontSize: "0.85rem", color: "#2c5f5f" }}>€{parseFloat(item.price).toFixed(2)}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: "24px", height: "24px", border: "1px solid #ddd", borderRadius: "4px", background: "#fff", cursor: "pointer" }}>−</button>
                        <span style={{ fontSize: "0.9rem" }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: "24px", height: "24px", border: "1px solid #ddd", borderRadius: "4px", background: "#fff", cursor: "pointer" }}>+</button>
                        <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#999", cursor: "pointer", fontSize: "0.8rem" }}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginBottom: "1rem", fontSize: "1.05rem" }}>
                    <span>Total</span><span>€{cartTotal.toFixed(2)}</span>
                  </div>
                  <button onClick={() => { setCartOpen(false); setCheckoutOpen(true); }} style={{ width: "100%", padding: "12px", background: "#2c5f5f", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "1rem" }}>
                    Checkout
                  </button>
                  <p style={{ fontSize: "0.8rem", color: "#888", textAlign: "center", marginTop: "8px" }}>Click & collect — Skibbereen studio</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {checkoutOpen && (
        <Elements stripe={stripePromise}>
          <CheckoutForm cart={cart} total={cartTotal} onSuccess={handleSuccess} onClose={() => setCheckoutOpen(false)} />
        </Elements>
      )}

      {successData && <SuccessModal name={successData.name} email={successData.email} onClose={() => setSuccessData(null)} />}
    </>
  );
}
