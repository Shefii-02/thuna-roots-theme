import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { pageMeta } from "@/lib/seo";
import { getInitiatives } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/donate")({
  head: () =>
    pageMeta({
      title: "Donate",
      description: "Make a one-time or monthly donation to support Thuna Foundations.",
      path: "/donate",
    }),
  component: DonatePage,
});

const AMOUNTS = [25, 50, 100, 250, 500];

// Replace with your organization's actual WhatsApp number, in international
// format without "+", spaces, or dashes — e.g. "919812345678" for India.
const WHATSAPP_NUMBER = "919539567552";

function DonatePage() {
  const initiatives = getInitiatives();
  const [amount, setAmount] = useState<number | "custom">(100);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("monthly");
  const [initiative, setInitiative] = useState("general");
  const [submitted, setSubmitted] = useState(false);

  // Donor info — lifted into state so we can build the WhatsApp message
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const finalAmount = amount === "custom" ? custom : amount;
    const initiativeLabel =
      initiative === "general"
        ? "Where it's needed most"
        : initiatives.find((i) => i.slug === initiative)?.name ?? initiative;

    const lines = [
      "Hello Thuna Foundations, I'd like to make a donation:",
      "",
      `Amount: ₹${finalAmount}`,
      `Frequency: ${frequency === "monthly" ? "Monthly" : "One-time"}`,
      `Directed to: ${initiativeLabel}`,
      "",
      `Name: ${fullName}`,
      `Email: ${email}`,
      country && `Country: ${country}`,
      phone && `Phone: ${phone}`,
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join("\n"));
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy text-white pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent-yellow/25 blur-3xl" />
        <div className="container-page relative">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-yellow">Donate</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-tight text-white md:text-7xl text-balance">
            Your gift becomes someone's <em className="not-italic text-accent-yellow">hope.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">Every donation is directed transparently to the initiatives and campaigns you choose.</p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-page grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            {submitted ? (
              <div className="rounded-[2rem] bg-brand-cream p-12 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-accent-green" />
                <h2 className="mt-6 font-display text-4xl text-brand-navy">Thank you.</h2>
                <p className="mt-3 text-brand-navy/70">
                  We&apos;ve opened WhatsApp with your donation details. Send the message to
                  confirm with our team — no payment has been processed yet.
                </p>
                <button onClick={() => setSubmitted(false)} className="mt-8 rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white">
                  Make another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-brand-navy/5 md:p-10"
              >
                {/* Frequency */}
                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">Frequency</legend>
                  <div className="mt-3 inline-flex rounded-full bg-brand-cream p-1">
                    {(["monthly", "once"] as const).map((f) => (
                      <button type="button" key={f} onClick={() => setFrequency(f)}
                        className={cn("rounded-full px-5 py-2 text-sm font-semibold transition",
                          frequency === f ? "bg-brand-navy text-white" : "text-brand-navy/70")}>
                        {f === "monthly" ? "Monthly" : "One-time"}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Amount */}
                <fieldset className="mt-8">
                  <legend className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">Amount (INR)</legend>
                  <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
                    {AMOUNTS.map((a) => (
                      <button type="button" key={a} onClick={() => setAmount(a)}
                        className={cn("rounded-2xl border py-3 font-display text-lg transition",
                          amount === a ? "border-brand-navy bg-brand-navy text-white" : "border-brand-navy/15 text-brand-navy hover:border-brand-navy/40")}>
                        ₹{a}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <label className="text-sm text-brand-navy/70">Or custom:</label>
                    <div className="relative flex-1 max-w-xs">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/50">₹</span>
                      <input
                        type="number" min={1} value={custom}
                        onChange={(e) => { setCustom(e.target.value); setAmount("custom"); }}
                        onFocus={() => setAmount("custom")}
                        className={cn("w-full rounded-2xl border py-3 pl-8 pr-4 text-brand-navy focus:outline-none",
                          amount === "custom" ? "border-brand-navy" : "border-brand-navy/15")}
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Initiative */}
                <fieldset className="mt-8">
                  <legend className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">Direct my gift to</legend>
                  <select value={initiative} onChange={(e) => setInitiative(e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-brand-navy/15 bg-white py-3 px-4 text-brand-navy focus:border-brand-navy focus:outline-none">
                    <option value="general">Where it's needed most</option>
                    {initiatives.map((i) => <option key={i.slug} value={i.slug}>{i.name} — {i.title}</option>)}
                  </select>
                </fieldset>

                {/* Donor info */}
                <fieldset className="mt-8 grid gap-4 sm:grid-cols-2">
                  <Input label="Full name" required value={fullName} onChange={setFullName} />
                  <Input label="Email" type="email" required value={email} onChange={setEmail} />
                  <Input label="Country" value={country} onChange={setCountry} />
                  <Input label="Phone (optional)" value={phone} onChange={setPhone} />
                </fieldset>

                <button type="submit" className="mt-10 w-full rounded-full bg-brand-navy px-6 py-4 text-base font-semibold text-white transition hover:bg-brand-navy-soft">
                  Complete donation via WhatsApp
                </button>
                <p className="mt-3 text-center text-xs text-brand-navy/50">
                  Preview only — this opens WhatsApp with your details, no payment is processed here.
                </p>
              </form>
            )}
          </div>

          <aside className="md:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-3xl bg-brand-cream p-8">
                <p className="font-display text-2xl text-brand-navy">Where your gift goes</p>
                <ul className="mt-4 space-y-3 text-brand-navy/75">
                  <li className="flex gap-3"><span className="font-display text-accent-coral">85%</span> Programs & direct support</li>
                  <li className="flex gap-3"><span className="font-display text-accent-yellow">10%</span> Local operations</li>
                  <li className="flex gap-3"><span className="font-display text-accent-green">5%</span> Fundraising & compliance</li>
                </ul>
              </div>
              <div className="rounded-3xl bg-brand-navy p-8 text-white">
                <p className="font-display text-2xl">A monthly gift changes everything.</p>
                <p className="mt-2 text-sm text-white/70">Monthly donors help us plan long-term — from village programs to scholarships.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Input({
  label,
  type = "text",
  required,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">{label}{required && " *"}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-brand-navy/15 bg-white px-4 py-3 text-brand-navy focus:border-brand-navy focus:outline-none"
      />
    </label>
  );
}