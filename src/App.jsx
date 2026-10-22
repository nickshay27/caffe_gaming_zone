import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  ShoppingBag,
  ShoppingCart,
  X,
  Plus,
  Minus,
  Check,
  CreditCard,
  Lock,
  ArrowLeft,
  Sparkles,
  Watch,
  Briefcase,
  Glasses,
  Wallet,
  Loader2,
  ShieldCheck,
  ChevronRight,
  Printer,
  PackageCheck,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/*  DATA                                                                   */
/* ---------------------------------------------------------------------- */

const PRODUCTS = [
  {
    id: "weekender",
    name: "Meridian Weekender",
    tagline: "Full-grain cognac leather",
    price: 480,
    Icon: Briefcase,
    gradient: "linear-gradient(135deg,#7a4a26,#c9915a 55%,#3c220f)",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "chronograph",
    name: "Aurelius Chronograph",
    tagline: "Hand-finished, 41mm case",
    price: 1240,
    Icon: Watch,
    gradient: "linear-gradient(135deg,#2b2b31,#54545c 55%,#0c0c0e)",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "obsidian",
    name: "Obsidian Frame",
    tagline: "Polarized, titanium temple",
    price: 210,
    Icon: Glasses,
    gradient: "linear-gradient(135deg,#241533,#5b3a86 55%,#0d0713)",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cascade",
    name: "Cascade Card Case",
    tagline: "Vegetable-tanned, brass edge",
    price: 95,
    Icon: Wallet,
    gradient: "linear-gradient(135deg,#123626,#2f6b4f 55%,#081c14)",
    image:
      "https://images.unsplash.com/photo-1517254797898-04edd251b7f8?auto=format&fit=crop&w=800&q=80",
  },
];

const PROCESS_STEPS = [
  { label: "Encrypting your details", Icon: Lock },
  { label: "Verifying with your bank", Icon: ShieldCheck },
  { label: "Confirming item availability", Icon: PackageCheck },
  { label: "Finalizing your order", Icon: Sparkles },
];

const STEP_LABELS = ["Payment details", "Processing", "Confirmed"];

const currency = (n) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ---------------------------------------------------------------------- */
/*  HELPERS                                                                */
/* ---------------------------------------------------------------------- */

function formatCardNumber(raw) {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(raw) {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}
function luhnValid(num) {
  const digits = num.replace(/\D/g, "");
  if (digits.length < 15) return false;
  let sum = 0,
    alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (alt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    alt = !alt;
  }
  return sum % 10 === 0;
}
function randomOrderId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `MN-${s.slice(0, 4)}-${s.slice(4)}`;
}
function seededRand(seedStr) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) >>> 0;
  return () => {
    h = (h * 1103515245 + 12345) >>> 0;
    return (h % 1000) / 1000;
  };
}

/* ---------------------------------------------------------------------- */
/*  IMAGE WITH GRACEFUL FALLBACK                                           */
/* ---------------------------------------------------------------------- */

function ProductVisual({ product, imgRef, size = 200 }) {
  const Icon = product.Icon;
  return (
    <div className="relative w-full" style={{ height: size, overflow: "hidden" }}>
      <img
        ref={imgRef}
        src={product.image}
        alt={product.name}
        className="mn-product-img"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          const fb = e.currentTarget.nextElementSibling;
          if (fb) fb.style.display = "flex";
        }}
      />
      <div
        className="mn-fallback absolute inset-0 items-center justify-center"
        style={{ display: "none", background: product.gradient }}
      >
        <Icon size={52} color="rgba(255,255,255,0.92)" strokeWidth={1.3} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  BARCODE (deterministic, from order id)                                 */
/* ---------------------------------------------------------------------- */

function Barcode({ seed }) {
  const rand = useMemo(() => seededRand(seed), [seed]);
  const bars = useMemo(() => {
    const arr = [];
    let x = 0;
    for (let i = 0; i < 46 && x < 196; i++) {
      const w = rand() > 0.55 ? 3 : 1.4;
      arr.push({ x, w });
      x += w + 2.2;
    }
    return arr;
  }, [rand]);
  return (
    <svg width="100%" height="42" viewBox="0 0 200 42" preserveAspectRatio="none">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={34} fill="#161616" />
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/*  STEP TRACKER                                                           */
/* ---------------------------------------------------------------------- */

function Stepper({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-3 mn-fade-up" style={{ maxWidth: 480, margin: "0 auto" }}>
      {STEP_LABELS.map((label, i) => {
        const state = i < current ? "done" : i === current ? "active" : "pending";
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center" style={{ minWidth: 74 }}>
              <div
                className="flex items-center justify-center rounded-full mn-step-circle"
                style={{
                  width: 30,
                  height: 30,
                  border: state === "pending" ? "1px solid rgba(255,255,255,0.18)" : "none",
                  background:
                    state === "done"
                      ? "linear-gradient(135deg,#e4c77d,#c9a961)"
                      : state === "active"
                      ? "rgba(201,169,97,0.16)"
                      : "transparent",
                  boxShadow: state === "active" ? "0 0 0 3px rgba(201,169,97,0.22)" : "none",
                  transition: "all 0.4s ease",
                }}
              >
                {state === "done" ? (
                  <Check size={15} color="#0c0c0e" />
                ) : (
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "'JetBrains Mono', monospace",
                      color: state === "active" ? "#e4c77d" : "#6f6b62",
                    }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: 11,
                  marginTop: 6,
                  color: state === "pending" ? "#6f6b62" : "#c9c5ba",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.12)", position: "relative", top: -12, maxWidth: 60 }}>
                <div
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg,#e4c77d,#c9a961)",
                    width: i < current ? "100%" : "0%",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  ANIMATED CARD (with live field-focus highlighting)                     */
/* ---------------------------------------------------------------------- */

function AnimatedCard({ form, flipped, focusField }) {
  const wrapRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const onMove = useCallback((e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * 14, ry: (px - 0.5) * 18 });
    setGlow({ x: px * 100, y: py * 100 });
  }, []);
  const onLeave = useCallback(() => setTilt({ rx: 0, ry: 0 }), []);

  const digits = form.number.replace(/\D/g, "");
  const groups = ["••••", "••••", "••••", "••••"];
  const typed = form.number.split(" ").filter(Boolean);
  for (let i = 0; i < typed.length; i++) groups[i] = typed[i].padEnd(4, "•");
  const network = digits.startsWith("4") ? "PULSE" : digits.startsWith("5") ? "AURUM" : "NOIR";

  const ring = (active) => ({
    boxShadow: active ? "0 0 0 2px rgba(228,199,125,0.65)" : "0 0 0 2px transparent",
    borderRadius: 8,
    transition: "box-shadow 0.25s ease",
  });

  return (
    <div ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave} style={{ perspective: "1200px" }} className="w-full select-none">
      <div
        className="relative w-full mn-card-float"
        style={{
          aspectRatio: "1.586 / 1",
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry + (flipped ? 180 : 0)}deg)`,
          transition: "transform 0.6s cubic-bezier(.2,.8,.2,1)",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{ backfaceVisibility: "hidden", background: "linear-gradient(145deg,#17171b 0%,#0c0c0e 45%,#1c1c21 100%)", border: "1px solid rgba(201,169,97,0.25)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(228,199,125,0.22), transparent 55%)`, transition: "background 0.15s ease" }}
          />
          <div className="mn-sheen" />

          <div className="relative h-full w-full p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="rounded-md relative overflow-hidden" style={{ width: 46, height: 34, background: "linear-gradient(135deg,#e4c77d,#a9843f 60%,#7a5f2c)" }}>
                <div className="mn-chip-shimmer" />
                <div style={{ position: "absolute", inset: 6, border: "1px solid rgba(0,0,0,0.25)", borderRadius: 3 }} />
              </div>
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "rgba(243,239,230,0.55)" }}>{network}</span>
            </div>

            <div style={ring(focusField === "number")}>
              <div
                className="flex gap-4 px-1 py-1"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(15px, 4.6vw, 21px)", color: "#f3efe6", letterSpacing: "0.06em" }}
              >
                {groups.map((g, i) => (
                  <span key={i} className="mn-digit-group">{g}</span>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between gap-3">
              <div style={ring(focusField === "name")} className="flex-1">
                <div className="px-1 py-1">
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 9, letterSpacing: "0.15em", color: "rgba(243,239,230,0.4)", marginBottom: 4 }}>CARDHOLDER</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, letterSpacing: "0.05em", color: "#f3efe6", textTransform: "uppercase", minHeight: 18 }}>
                    {form.name || "YOUR NAME"}
                  </div>
                </div>
              </div>
              <div style={ring(focusField === "expiry")}>
                <div className="px-1 py-1">
                  <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: 9, letterSpacing: "0.15em", color: "rgba(243,239,230,0.4)", marginBottom: 4, textAlign: "right" }}>EXPIRES</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#f3efe6", minHeight: 18 }}>{form.expiry || "MM/YY"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(145deg,#17171b 0%,#0c0c0e 45%,#1c1c21 100%)", border: "1px solid rgba(201,169,97,0.25)" }}
        >
          <div className="w-full mt-6" style={{ height: 42, background: "#08080a" }} />
          <div className="px-6 mt-6 flex justify-end">
            <div style={ring(focusField === "cvc")}>
              <div className="flex items-center px-3 rounded" style={{ height: 30, width: 170, background: "rgba(243,239,230,0.9)" }}>
                <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#0c0c0e", letterSpacing: "0.1em" }}>
                  {form.cvc ? form.cvc.padEnd(3, "•") : "•••"}
                </span>
              </div>
            </div>
          </div>
          <div className="px-6 mt-6">
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 9, lineHeight: 1.6, color: "rgba(243,239,230,0.35)" }}>
              This card remains the property of Maison Noir and is issued subject to its member terms. Authorized signature required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  CONFETTI                                                               */
/* ---------------------------------------------------------------------- */

function Confetti() {
  const pieces = useMemo(() => {
    const colors = ["#e4c77d", "#7fbf9c", "#f3efe6", "#c9a961"];
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 1.6 + Math.random() * 1.1,
      color: colors[i % colors.length],
      rotate: Math.random() * 360,
      size: 5 + Math.random() * 5,
    }));
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 70, overflow: "hidden" }}>
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            top: -20,
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.6,
            background: p.color,
            opacity: 0.9,
            transform: `rotate(${p.rotate}deg)`,
            animation: `mnConfettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  MAIN APP                                                               */
/* ---------------------------------------------------------------------- */

export default function App() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [step, setStep] = useState("shop"); // shop | checkout | processing | success
  const [addedId, setAddedId] = useState(null);
  const [cartBump, setCartBump] = useState(0);
  const [form, setForm] = useState({ name: "", number: "", expiry: "", cvc: "" });
  const [focusField, setFocusField] = useState(null);
  const [errors, setErrors] = useState({});
  const [shakeKey, setShakeKey] = useState(0);
  const [order, setOrder] = useState(null);
  const [displayTotal, setDisplayTotal] = useState(0);
  const [processingStatus, setProcessingStatus] = useState(
    Array(PROCESS_STEPS.length).fill("pending")
  );
  const [flyers, setFlyers] = useState([]);

  const cartBtnRef = useRef(null);
  const imgRefs = useRef({});

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartItems = PRODUCTS.filter((p) => cart[p.id] > 0).map((p) => ({ ...p, qty: cart[p.id] }));
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 500 ? 0 : 24;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  /* -------- fly-to-cart animation -------- */
  const addToCart = (product) => {
    const imgEl = imgRefs.current[product.id];
    const cartEl = cartBtnRef.current;
    setAddedId(product.id);
    window.setTimeout(() => setAddedId((cur) => (cur === product.id ? null : cur)), 1200);

    if (imgEl && cartEl) {
      const startRect = imgEl.getBoundingClientRect();
      const endRect = cartEl.getBoundingClientRect();
      const flyId = `${product.id}-${Date.now()}`;
      setFlyers((f) => [
        ...f,
        {
          id: flyId,
          img: product.image,
          gradient: product.gradient,
          start: startRect,
          end: endRect,
          stage: "start",
        },
      ]);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setFlyers((f) => f.map((fl) => (fl.id === flyId ? { ...fl, stage: "end" } : fl)));
        })
      );
      window.setTimeout(() => {
        setCart((c) => ({ ...c, [product.id]: (c[product.id] || 0) + 1 }));
        setCartBump((n) => n + 1);
        setFlyers((f) => f.filter((fl) => fl.id !== flyId));
      }, 650);
    } else {
      setCart((c) => ({ ...c, [product.id]: (c[product.id] || 0) + 1 }));
      setCartBump((n) => n + 1);
    }
  };

  const changeQty = (id, delta) => {
    setCart((c) => {
      const next = { ...c };
      const v = (next[id] || 0) + delta;
      if (v <= 0) delete next[id];
      else next[id] = v;
      return next;
    });
  };

  const updateForm = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e = {};
    // if (form.name.trim().length < 2) e.name = "Enter the name on your card";
    // if (!luhnValid(form.number)) e.number = "That card number doesn't look right";
    const [mm, yy] = form.expiry.split("/");
    if (!mm || !yy || Number(mm) < 1 || Number(mm) > 12 || yy.length < 2) e.expiry = "Use MM/YY";
    if (form.cvc.length < 3) e.cvc = "3 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitPayment = (ev) => {
    ev.preventDefault();
    if (!validate()) {
      setShakeKey((k) => k + 1);
      return;
    }
    const snapshot = {
      id: randomOrderId(),
      items: cartItems,
      subtotal,
      shipping,
      tax,
      total,
      last4: form.number.replace(/\D/g, "").slice(-4),
      date: new Date(),
    };
    setOrder(snapshot);
    setStep("processing");
  };

  /* -------- processing checklist sequence -------- */
  useEffect(() => {
    if (step !== "processing") return;
    setProcessingStatus(Array(PROCESS_STEPS.length).fill("pending"));
    const timers = [];
    PROCESS_STEPS.forEach((_, i) => {
      timers.push(
        window.setTimeout(() => {
          setProcessingStatus((s) => s.map((v, idx) => (idx === i ? "active" : v)));
        }, i * 620)
      );
      timers.push(
        window.setTimeout(() => {
          setProcessingStatus((s) => s.map((v, idx) => (idx === i ? "done" : v)));
        }, i * 620 + 460)
      );
    });
    timers.push(
      window.setTimeout(() => {
        setStep("success");
      }, PROCESS_STEPS.length * 620 + 400)
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [step]);

  /* -------- receipt total count-up -------- */
  useEffect(() => {
    if (step !== "success" || !order) return;
    setDisplayTotal(0);
    const duration = 900;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayTotal(order.total * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step, order]);

  const startOver = () => {
    setCart({});
    setForm({ name: "", number: "", expiry: "", cvc: "" });
    setErrors({});
    setOrder(null);
    setCartOpen(false);
    setStep("shop");
  };

  const stepperIndex = step === "checkout" ? 0 : step === "processing" ? 1 : step === "success" ? 2 : -1;

  return (
    <div className="min-h-screen w-full relative" style={{ background: "#0a0a0c", color: "#f3efe6", fontFamily: "'Manrope', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .mn-serif { font-family: 'Fraunces', serif; }

        @keyframes mnFadeUp { from { opacity:0; transform:translateY(14px);} to { opacity:1; transform:translateY(0);} }
        .mn-fade-up { animation: mnFadeUp 0.6s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes mnFadeIn { from{opacity:0;} to{opacity:1;} }
        .mn-fade { animation: mnFadeIn 0.45s ease both; }
        @keyframes mnScaleIn { from{opacity:0; transform:scale(0.92);} to{opacity:1; transform:scale(1);} }
        .mn-scale-in { animation: mnScaleIn 0.5s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes mnBump { 0%{transform:scale(1);} 35%{transform:scale(1.35);} 60%{transform:scale(0.92);} 100%{transform:scale(1);} }
        .mn-bump { animation: mnBump 0.5s cubic-bezier(.3,1.5,.4,1); }
        @keyframes mnCardFloat { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-6px);} }
        @keyframes mnSheen { 0%{transform:translateX(-120%) rotate(20deg);} 100%{transform:translateX(220%) rotate(20deg);} }
        .mn-sheen { position:absolute; top:-40%; left:0; width:30%; height:180%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.09),transparent); animation:mnSheen 3.2s ease-in-out infinite; pointer-events:none; }
        @keyframes mnChipShimmer { 0%{transform:translateX(-100%);} 100%{transform:translateX(100%);} }
        .mn-chip-shimmer { position:absolute; inset:0; background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,0.55) 50%,transparent 70%); animation:mnChipShimmer 2.6s ease-in-out infinite; }
        .mn-digit-group { display:inline-block; animation: mnScaleIn 0.25s ease both; }
        @keyframes mnDrawCheck { to { stroke-dashoffset:0; } }
        .mn-check-path { stroke-dasharray:48; stroke-dashoffset:48; animation:mnDrawCheck 0.55s 0.15s cubic-bezier(.4,0,.2,1) forwards; }
        @keyframes mnRingPop { 0%{transform:scale(0.4); opacity:0;} 60%{transform:scale(1.08); opacity:1;} 100%{transform:scale(1); opacity:1;} }
        .mn-ring-pop { animation: mnRingPop 0.5s cubic-bezier(.3,1.4,.4,1) both; }
        @keyframes mnDots { 0%,20%{opacity:0.2;} 50%{opacity:1;} 100%{opacity:0.2;} }
        .mn-dot { animation: mnDots 1.2s ease-in-out infinite; }
        .mn-dot:nth-child(2){animation-delay:0.15s;} .mn-dot:nth-child(3){animation-delay:0.3s;}
        @keyframes mnShake { 10%,90%{transform:translateX(-1px);} 20%,80%{transform:translateX(2px);} 30%,50%,70%{transform:translateX(-4px);} 40%,60%{transform:translateX(4px);} }
        .mn-shake { animation: mnShake 0.5s; }
        @keyframes mnSpin { to { transform: rotate(360deg); } }
        .mn-spin { animation: mnSpin 0.9s linear infinite; }
        @keyframes mnPrintOut { from { transform: translateY(-102%); } to { transform: translateY(0); } }
        .mn-print-out { animation: mnPrintOut 0.85s cubic-bezier(.16,1,.3,1) both; }
        @keyframes mnConfettiFall { to { transform: translateY(110vh) rotate(540deg); opacity:0.2; } }
        @keyframes mnPulseSlit { 0%,100%{opacity:0.5;} 50%{opacity:1;} }
        .mn-slit { animation: mnPulseSlit 1.6s ease-in-out infinite; }

        .mn-btn-primary { background: linear-gradient(135deg,#e4c77d,#c9a961 60%,#a9843f); color:#0c0c0e; transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease; }
        .mn-btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px -8px rgba(201,169,97,0.5); filter: brightness(1.05); }
        .mn-btn-primary:active:not(:disabled) { transform: translateY(0); }
        .mn-btn-primary:disabled { opacity:0.6; cursor:default; }
        .mn-btn-ghost { background: rgba(255,255,255,0.06); color:#f3efe6; border:1px solid rgba(255,255,255,0.14); transition: background 0.2s ease, transform 0.2s ease; }
        .mn-btn-ghost:hover { background: rgba(255,255,255,0.1); transform: translateY(-2px); }

        .mn-card-tile { transition: transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s ease; }
        .mn-card-tile:hover { transform: translateY(-6px); box-shadow: 0 22px 40px -18px rgba(0,0,0,0.6); }
        .mn-card-tile:hover .mn-product-img { transform: scale(1.08); }
        .mn-product-img { transition: transform 0.5s cubic-bezier(.2,.8,.2,1); }

        .mn-input { background: rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); color:#f3efe6; transition: border-color 0.2s ease, background 0.2s ease; }
        .mn-input:focus { outline:none; border-color: rgba(201,169,97,0.6); background: rgba(255,255,255,0.05); }
        .mn-scrollbar::-webkit-scrollbar { width:6px; }
        .mn-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius:3px; }

        .mn-receipt-paper { position:relative; }
        .mn-receipt-paper::after {
          content:''; position:absolute; left:0; right:0; bottom:-11px; height:22px;
          background-image: linear-gradient(135deg, #fefefe 50%, transparent 50%), linear-gradient(-135deg, #fefefe 50%, transparent 50%);
          background-size: 18px 18px; background-position: bottom left; background-repeat: repeat-x;
        }

        .mn-checklist-row { transition: opacity 0.4s ease, transform 0.4s ease; }

        @media print {
          body * { visibility: hidden; }
          .mn-print-area, .mn-print-area * { visibility: visible; }
          .mn-print-area { position: absolute; top:0; left:0; width:100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mn-sheen, .mn-chip-shimmer, .mn-dot, .mn-slit { animation:none !important; }
        }
      `}</style>

      {/* ---------------- FLYING ADD-TO-CART CLONES ---------------- */}
      {flyers.map((fl) => (
        <img
          key={fl.id}
          src={fl.img}
          alt=""
          style={{
            position: "fixed",
            top: fl.stage === "start" ? fl.start.top : fl.end.top + fl.end.height / 2 - 12,
            left: fl.stage === "start" ? fl.start.left : fl.end.left + fl.end.width / 2 - 12,
            width: fl.stage === "start" ? fl.start.width : 24,
            height: fl.stage === "start" ? fl.start.height : 24,
            borderRadius: fl.stage === "start" ? 14 : 999,
            objectFit: "cover",
            zIndex: 80,
            opacity: fl.stage === "end" ? 0.35 : 1,
            pointerEvents: "none",
            boxShadow: "0 14px 30px rgba(0,0,0,0.45)",
            transition: "all 0.62s cubic-bezier(.2,.8,.2,1)",
          }}
        />
      ))}

      {/* ---------------- HEADER ---------------- */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-10 py-5"
        style={{ background: "rgba(10,10,12,0.8)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <button onClick={startOver} className="flex items-center gap-2" style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Sparkles size={18} color="#c9a961" />
          <span className="mn-serif" style={{ fontSize: 20, letterSpacing: "0.04em" }}>Maison Noir</span>
        </button>

        {step === "shop" && (
          <button
            ref={cartBtnRef}
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <ShoppingCart size={18} />
            <span style={{ fontSize: 14 }}>Cart</span>
            {cartCount > 0 && (
              <span
                key={cartBump}
                className="mn-bump absolute flex items-center justify-center"
                style={{ top: -6, right: -6, width: 20, height: 20, borderRadius: "50%", background: "#c9a961", color: "#0c0c0e", fontSize: 11, fontWeight: 700 }}
              >
                {cartCount}
              </span>
            )}
          </button>
        )}

        {(step === "checkout") && (
          <button onClick={() => setStep("shop")} className="flex items-center gap-2" style={{ background: "none", border: "none", color: "#9a968c", cursor: "pointer" }}>
            <ArrowLeft size={16} />
            <span style={{ fontSize: 14 }}>Back to shop</span>
          </button>
        )}
      </header>

      {(step === "checkout" || step === "processing" || step === "success") && (
        <div className="pt-8 pb-2 px-6">
          <Stepper current={stepperIndex} />
        </div>
      )}

      {/* ---------------- SHOP ---------------- */}
      {step === "shop" && (
        <main className="max-w-6xl mx-auto px-6 md:px-10 py-12 mn-fade">
          <div className="mb-10 mn-fade-up">
            <p style={{ letterSpacing: "0.25em", fontSize: 11, color: "#c9a961" }}>AUTUMN COLLECTION</p>
            <h1 className="mn-serif" style={{ fontSize: "clamp(32px,5vw,52px)", marginTop: 8, fontWeight: 500 }}>Objects worth keeping.</h1>
            <p style={{ color: "#9a968c", marginTop: 10, maxWidth: 520, fontSize: 15, lineHeight: 1.6 }}>
              Four pieces, made slowly. Free shipping on orders over $500.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRODUCTS.map((p, i) => {
              const isAdded = addedId === p.id;
              return (
                <div
                  key={p.id}
                  className="mn-card-tile mn-fade-up rounded-2xl overflow-hidden"
                  style={{ background: "#141417", border: "1px solid rgba(255,255,255,0.07)", animationDelay: `${i * 90}ms` }}
                >
                  <ProductVisual product={p} imgRef={(el) => (imgRefs.current[p.id] = el)} />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="mn-serif" style={{ fontSize: 19, fontWeight: 500 }}>{p.name}</h3>
                        <p style={{ color: "#9a968c", fontSize: 13, marginTop: 4 }}>{p.tagline}</p>
                      </div>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, whiteSpace: "nowrap" }}>{currency(p.price)}</span>
                    </div>
                    <button
                      onClick={() => addToCart(p)}
                      className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-full mn-btn-primary"
                      style={{ fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", background: isAdded ? "linear-gradient(135deg,#5fa480,#3a7d5c)" : undefined }}
                    >
                      {isAdded ? (
                        <span key="added" className="mn-scale-in flex items-center gap-2" style={{ color: "#f3efe6" }}>
                          <Check size={16} /> Added to cart
                        </span>
                      ) : (
                        <span key="add" className="flex items-center gap-2">
                          <ShoppingBag size={16} /> Add to cart
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* ---------------- CART DRAWER ---------------- */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 mn-fade" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }} onClick={() => setCartOpen(false)} />
          <div
            className="relative h-full w-full flex flex-col"
            style={{ maxWidth: 420, background: "#111114", borderLeft: "1px solid rgba(255,255,255,0.08)", animation: "mnFadeUp 0.35s cubic-bezier(.2,.8,.2,1) both" }}
          >
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <h2 className="mn-serif" style={{ fontSize: 20 }}>Your cart</h2>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9a968c" }}><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto mn-scrollbar px-6 py-4">
              {cartItems.length === 0 && (
                <div className="mn-fade" style={{ color: "#6f6b62", textAlign: "center", marginTop: 60, fontSize: 14 }}>Nothing here yet.</div>
              )}
              {cartItems.map((item, i) => (
                <div key={item.id} className="mn-fade-up flex items-center gap-4 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", animationDelay: `${i * 60}ms` }}>
                  <div className="rounded-lg flex-shrink-0 overflow-hidden" style={{ width: 56, height: 56 }}>
                    <ProductVisual product={item} imgRef={() => {}} size={56} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</p>
                    <p style={{ fontSize: 12, color: "#9a968c", marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>{currency(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-3" style={{ background: "rgba(255,255,255,0.04)", borderRadius: 999, padding: "4px 8px" }}>
                    <button onClick={() => changeQty(item.id, -1)} style={{ background: "none", border: "none", color: "#f3efe6", cursor: "pointer", display: "flex" }}><Minus size={14} /></button>
                    <span style={{ fontSize: 13, minWidth: 14, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)} style={{ background: "none", border: "none", color: "#f3efe6", cursor: "pointer", display: "flex" }}><Plus size={14} /></button>
                  </div>
                </div>
              ))}
            </div>

            {cartItems.length > 0 && (
              <div className="px-6 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex justify-between mb-2" style={{ fontSize: 13, color: "#9a968c" }}>
                  <span>Subtotal</span><span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{currency(subtotal)}</span>
                </div>
                <div className="flex justify-between mb-4" style={{ fontSize: 13, color: "#9a968c" }}>
                  <span>Shipping</span><span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{shipping === 0 ? "Free" : currency(shipping)}</span>
                </div>
                <button
                  onClick={() => { setCartOpen(false); setStep("checkout"); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full mn-btn-primary"
                  style={{ fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer" }}
                >
                  Checkout <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------- CHECKOUT ---------------- */}
      {step === "checkout" && (
        <main className="max-w-5xl mx-auto px-6 md:px-10 py-6 mn-fade">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="mn-fade-up order-2 md:order-1">
              <div style={{ maxWidth: 400 }}>
                <AnimatedCard form={form} flipped={focusField === "cvc"} focusField={focusField} />
              </div>
              <div className="mt-8 rounded-2xl p-5" style={{ background: "#141417", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ fontSize: 12, letterSpacing: "0.15em", color: "#9a968c", marginBottom: 12 }}>ORDER SUMMARY</p>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2" style={{ fontSize: 13 }}>
                    <span style={{ color: "#c9c5ba" }}>{item.name} × {item.qty}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{currency(item.price * item.qty)}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", margin: "12px 0" }} />
                <div className="flex justify-between mb-1" style={{ fontSize: 13, color: "#9a968c" }}><span>Shipping</span><span>{shipping === 0 ? "Free" : currency(shipping)}</span></div>
                <div className="flex justify-between mb-3" style={{ fontSize: 13, color: "#9a968c" }}><span>Tax</span><span>{currency(tax)}</span></div>
                <div className="flex justify-between" style={{ fontSize: 16, fontWeight: 700 }}>
                  <span>Total</span><span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{currency(total)}</span>
                </div>
              </div>
            </div>

            <div className="mn-fade-up order-1 md:order-2" style={{ animationDelay: "100ms" }}>
              <h2 className="mn-serif" style={{ fontSize: 26, marginBottom: 4 }}>Payment details</h2>
              <p style={{ color: "#9a968c", fontSize: 13, marginBottom: 24 }}>All transactions are encrypted end to end.</p>

              <form key={shakeKey} onSubmit={submitPayment} className={`flex flex-col gap-4 ${Object.keys(errors).length ? "mn-shake" : ""}`}>
                <div>
                  <label style={{ fontSize: 12, color: "#9a968c", display: "block", marginBottom: 6 }}>Name on card</label>
                  <input
                    className="mn-input w-full rounded-lg px-4 py-3" style={{ fontSize: 14 }}
                    placeholder="Alexandra Reyes" value={form.name}
                    onFocus={() => setFocusField("name")} onBlur={() => setFocusField(null)}
                    onChange={(e) => updateForm("name", e.target.value)}
                  />
                  {errors.name && <p style={{ color: "#c1666b", fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
                </div>

                <div>
                  <label style={{ fontSize: 12, color: "#9a968c", display: "block", marginBottom: 6 }}>Card number</label>
                  <div className="relative">
                    <input
                      className="mn-input w-full rounded-lg pl-4 pr-11 py-3" style={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace" }}
                      placeholder="0000 0000 0000 0000" value={form.number}
                      onFocus={() => setFocusField("number")} onBlur={() => setFocusField(null)}
                      onChange={(e) => updateForm("number", formatCardNumber(e.target.value))}
                    />
                    <CreditCard size={16} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#6f6b62" }} />
                  </div>
                  {errors.number && <p style={{ color: "#c1666b", fontSize: 12, marginTop: 4 }}>{errors.number}</p>}
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label style={{ fontSize: 12, color: "#9a968c", display: "block", marginBottom: 6 }}>Expiry</label>
                    <input
                      className="mn-input w-full rounded-lg px-4 py-3" style={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace" }}
                      placeholder="MM/YY" value={form.expiry}
                      onFocus={() => setFocusField("expiry")} onBlur={() => setFocusField(null)}
                      onChange={(e) => updateForm("expiry", formatExpiry(e.target.value))}
                    />
                    {errors.expiry && <p style={{ color: "#c1666b", fontSize: 12, marginTop: 4 }}>{errors.expiry}</p>}
                  </div>
                  <div className="flex-1">
                    <label style={{ fontSize: 12, color: "#9a968c", display: "block", marginBottom: 6 }}>CVC</label>
                    <input
                      className="mn-input w-full rounded-lg px-4 py-3" style={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace" }}
                      placeholder="123" value={form.cvc}
                      onFocus={() => setFocusField("cvc")} onBlur={() => setFocusField(null)}
                      onChange={(e) => updateForm("cvc", e.target.value.replace(/\D/g, "").slice(0, 3))}
                    />
                    {errors.cvc && <p style={{ color: "#c1666b", fontSize: 12, marginTop: 4 }}>{errors.cvc}</p>}
                  </div>
                </div>

                <button
                  type="submit" disabled={cartItems.length === 0}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-4 rounded-full mn-btn-primary"
                  style={{ fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer" }}
                >
                  <Lock size={15} /> Pay {currency(total)}
                </button>
                <p style={{ fontSize: 11, color: "#6f6b62", textAlign: "center", marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <ShieldCheck size={13} /> Secured with 256-bit encryption
                </p>
              </form>
            </div>
          </div>
        </main>
      )}

      {/* ---------------- PROCESSING (side-by-side with the card) ---------------- */}
      {step === "processing" && (
        <main className="max-w-5xl mx-auto px-6 md:px-10 py-6 mn-fade">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="mn-fade-up order-2 md:order-1">
              <div style={{ maxWidth: 400 }}>
                <AnimatedCard form={form} flipped={false} focusField={null} />
              </div>
            </div>

            <div className="mn-fade-up order-1 md:order-2" style={{ animationDelay: "80ms" }}>
              <h2 className="mn-serif" style={{ fontSize: 24, marginBottom: 18 }}>Confirming your order</h2>
              <div className="rounded-2xl p-6" style={{ background: "#141417", border: "1px solid rgba(255,255,255,0.07)" }}>
                {PROCESS_STEPS.map((s, i) => {
                  const status = processingStatus[i];
                  const Icon = s.Icon;
                  return (
                    <div
                      key={s.label}
                      className="mn-checklist-row flex items-center gap-4 py-3"
                      style={{
                        opacity: status === "pending" ? 0.35 : 1,
                        borderBottom: i < PROCESS_STEPS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      }}
                    >
                      <div
                        className="flex items-center justify-center rounded-full flex-shrink-0"
                        style={{
                          width: 34, height: 34,
                          background: status === "done" ? "linear-gradient(135deg,#e4c77d,#c9a961)" : "rgba(255,255,255,0.06)",
                          border: status === "active" ? "1px solid rgba(201,169,97,0.5)" : "none",
                          transition: "background 0.3s ease",
                        }}
                      >
                        {status === "done" ? (
                          <Check size={16} color="#0c0c0e" />
                        ) : status === "active" ? (
                          <Loader2 size={16} className="mn-spin" color="#e4c77d" />
                        ) : (
                          <Icon size={15} color="#6f6b62" />
                        )}
                      </div>
                      <span style={{ fontSize: 14, color: status === "pending" ? "#6f6b62" : "#f3efe6" }}>{s.label}</span>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: 12, color: "#6f6b62", marginTop: 16, textAlign: "center" }}>Please don't close this window.</p>
            </div>
          </div>
        </main>
      )}

      {/* ---------------- SUCCESS / PRINTED RECEIPT ---------------- */}
      {step === "success" && order && (
        <main className="max-w-xl mx-auto px-6 py-14 flex flex-col items-center mn-fade">
          <Confetti />
          <div className="mn-ring-pop flex items-center justify-center rounded-full" style={{ width: 72, height: 72, background: "rgba(76,140,107,0.15)", border: "1px solid rgba(76,140,107,0.4)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M4 12.5L9.5 18L20 6" stroke="#7fbf9c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mn-check-path" pathLength="48" />
            </svg>
          </div>
          <h1 className="mn-serif mn-fade-up" style={{ fontSize: 28, marginTop: 18, animationDelay: "150ms" }}>Payment successful</h1>
          <p className="mn-fade-up" style={{ color: "#9a968c", fontSize: 13, marginTop: 4, animationDelay: "200ms" }}>Your printed receipt is below.</p>

          {/* printer housing */}
          <div className="mn-fade-up w-full mt-10" style={{ maxWidth: 380, animationDelay: "260ms" }}>
            <div style={{ height: 16, borderRadius: 8, background: "#1c1c1c", position: "relative", boxShadow: "0 6px 16px rgba(0,0,0,0.5)" }}>
              <div className="mn-slit" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "60%", height: 3, borderRadius: 2, background: "#e4c77d" }} />
            </div>

            <div style={{ overflow: "hidden" }}>
              <div className="mn-print-out mn-receipt-paper" style={{ background: "#fefefe", color: "#1a1a1a", padding: "26px 24px 30px", fontFamily: "'JetBrains Mono', monospace", boxShadow: "0 30px 60px -20px rgba(0,0,0,0.55)" }}>
                <div className="mn-print-area">
                  <div style={{ textAlign: "center" }}>
                    <div className="mn-serif" style={{ fontSize: 20, letterSpacing: "0.05em", fontFamily: "'Fraunces', serif" }}>MAISON NOIR</div>
                    <div style={{ fontSize: 10, color: "#666", marginTop: 2, letterSpacing: "0.1em" }}>ONLINE ORDER RECEIPT</div>
                  </div>

                  <div style={{ borderTop: "1px dashed #999", margin: "16px 0" }} />

                  <div className="flex justify-between" style={{ fontSize: 11 }}>
                    <span>ORDER #</span><span>{order.id}</span>
                  </div>
                  <div className="flex justify-between mt-1" style={{ fontSize: 11 }}>
                    <span>DATE</span><span>{order.date.toLocaleDateString()} {order.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>

                  <div style={{ borderTop: "1px dashed #999", margin: "16px 0" }} />

                  {order.items.map((item, i) => (
                    <div key={item.id} className="mn-fade-up" style={{ marginBottom: 8, animationDelay: `${340 + i * 90}ms` }}>
                      <div className="flex justify-between" style={{ fontSize: 12, fontWeight: 600 }}>
                        <span>{item.name}</span>
                        <span>{currency(item.price * item.qty)}</span>
                      </div>
                      <div style={{ fontSize: 10, color: "#777" }}>{item.qty} × {currency(item.price)}</div>
                    </div>
                  ))}

                  <div style={{ borderTop: "1px dashed #999", margin: "16px 0" }} />

                  <div className="flex justify-between" style={{ fontSize: 11, color: "#555" }}><span>SUBTOTAL</span><span>{currency(order.subtotal)}</span></div>
                  <div className="flex justify-between mt-1" style={{ fontSize: 11, color: "#555" }}><span>SHIPPING</span><span>{order.shipping === 0 ? "FREE" : currency(order.shipping)}</span></div>
                  <div className="flex justify-between mt-1" style={{ fontSize: 11, color: "#555" }}><span>TAX</span><span>{currency(order.tax)}</span></div>

                  <div style={{ borderTop: "1px dashed #999", margin: "16px 0" }} />

                  <div className="flex justify-between items-baseline" style={{ fontSize: 17, fontWeight: 700 }}>
                    <span>TOTAL PAID</span><span>{currency(displayTotal)}</span>
                  </div>

                  <div className="flex justify-between mt-4" style={{ fontSize: 11, color: "#555" }}>
                    <span>PAYMENT</span><span>CARD •••• {order.last4}</span>
                  </div>

                  <div style={{ borderTop: "1px dashed #999", margin: "16px 0" }} />

                  <div style={{ margin: "0 auto 6px", width: "80%" }}>
                    <Barcode seed={order.id} />
                  </div>
                  <div style={{ textAlign: "center", fontSize: 10, letterSpacing: "0.15em", color: "#666" }}>{order.id}</div>

                  <div style={{ textAlign: "center", marginTop: 18, fontSize: 11, color: "#444", lineHeight: 1.6 }}>
                    Thank you for shopping with Maison Noir.<br />Returns accepted within 30 days.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mn-fade-up flex gap-3 mt-8" style={{ animationDelay: "550ms" }}>
            <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-3 rounded-full mn-btn-ghost" style={{ fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              <Printer size={15} /> Print receipt
            </button>
            <button onClick={startOver} className="px-5 py-3 rounded-full mn-btn-primary" style={{ fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer" }}>
              Continue shopping
            </button>
          </div>
        </main>
      )}
    </div>
  );
}