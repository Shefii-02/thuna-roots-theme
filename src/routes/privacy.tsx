import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

// ---------------------------------------------------------------------
// THUNA FOUNDATIONS — PRIVACY POLICY (route: /privacy)
// Matches the brand system used across the rest of the site: deep navy,
// coral, warm cream, editorial serif headings.
// ---------------------------------------------------------------------

export const Route = createFileRoute('/privacy')({
  component: PrivacyPolicy,
})

const COLORS = {
  navy: '#16213F',
  navySoft: '#243357',
  coral: '#EF5C3F',
  coralDeep: '#D6482D',
  yellow: '#F3B33D',
  green: '#2F8F68',
  purple: '#9B5DE0',
  cream: '#F8F3E8',
  creamDeep: '#F1E9D8',
  ink: '#2B2621',
  inkSoft: '#8A8172',
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'information-we-collect', label: 'Information We Collect' },
  { id: 'how-we-use-it', label: 'How We Use It' },
  { id: 'how-we-share-it', label: 'How We Share It' },
  { id: 'advertising-id', label: 'Advertising ID & Analytics' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'your-rights', label: 'Your Rights & Choices' },
  { id: 'childrens-privacy', label: "Children's Privacy" },
  { id: 'security', label: 'Security' },
  { id: 'international-transfers', label: 'International Transfers' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
]

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

function SectionHeading({
  eyebrow,
  children,
  id,
}: {
  eyebrow?: string
  children: React.ReactNode
  id: string
}) {
  return (
    <div id={id} className="scroll-mt-28 mb-4">
      {eyebrow && (
        <div
          className="text-[10.5px] font-bold tracking-widest uppercase mb-2"
          style={{ color: COLORS.coral, letterSpacing: '0.12em' }}
        >
          {eyebrow}
        </div>
      )}
      <h2 className="font-serif text-2xl md:text-3xl" style={{ color: COLORS.navy, fontWeight: 600 }}>
        {children}
      </h2>
    </div>
  )
}

function Card({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <div
      className="rounded-2xl p-5 md:p-6 mb-4"
      style={{
        background: '#FFFFFF',
        boxShadow: '0 8px 20px -10px rgba(22,33,63,0.15)',
        borderLeft: accent ? `3px solid ${accent}` : undefined,
      }}
    >
      {children}
    </div>
  )
}

function Pill({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mr-2 mb-2"
      style={{ background: `${color}1F`, color }}
    >
      {children}
    </span>
  )
}

function PrivacyPolicy() {
  const active = useActiveSection(SECTIONS.map((s) => s.id))

  return (
    <div style={{ background: COLORS.cream, minHeight: '100vh' }} className="text-[15px] leading-relaxed">
      {/* HERO */}
      <div style={{ background: `linear-gradient(160deg, ${COLORS.navy}, ${COLORS.navySoft})` }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 pt-16 pb-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative w-8 h-8">
              <span className="absolute w-3.5 h-3.5 rounded-full" style={{ background: COLORS.coral, top: 0, left: 7 }} />
              <span className="absolute w-3.5 h-3.5 rounded-full" style={{ background: COLORS.yellow, bottom: 2, left: 0 }} />
              <span className="absolute w-3.5 h-3.5 rounded-full" style={{ background: COLORS.green, bottom: 2, right: 0 }} />
            </div>
            <span className="font-serif text-lg tracking-wide" style={{ color: '#fff' }}>
              THUNA
            </span>
          </div>
          <div className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: COLORS.yellow, letterSpacing: '0.14em' }}>
            Privacy Policy
          </div>
          <h1 className="font-serif text-3xl md:text-5xl max-w-2xl" style={{ color: '#fff', fontWeight: 600, lineHeight: 1.25 }}>
            Your trust is part of how we stand beside people.
          </h1>
          <p className="mt-5 max-w-xl text-[14px]" style={{ color: 'rgba(248,243,232,0.75)' }}>
            This policy explains what information Thuna Foundations collects across our app and
            website, why we collect it, and the choices you have. Plain language, no fine-print
            surprises.
          </p>
          <p className="mt-6 text-[12px]" style={{ color: 'rgba(248,243,232,0.55)' }}>
            Effective date: July 29, 2026 &nbsp;·&nbsp; Last updated: July 29, 2026
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 md:py-14 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        {/* TOC */}
        <nav className="hidden md:block sticky top-8 self-start">
          <div className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: COLORS.inkSoft }}>
            On this page
          </div>
          <ul className="space-y-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block text-[13px] py-1.5 px-3 rounded-lg transition-colors"
                  style={{
                    color: active === s.id ? '#fff' : COLORS.navy,
                    background: active === s.id ? COLORS.navy : 'transparent',
                    fontWeight: active === s.id ? 700 : 500,
                  }}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CONTENT */}
        <div>
          <SectionHeading eyebrow="Start here" id="overview">
            Overview
          </SectionHeading>
          <Card>
            <p className="mb-3">
              Thuna Foundations ("Thuna," "we," "us") runs a charity and social-impact platform —
              donations, volunteer opportunities, community chat, and support requests — through
              our mobile app and website (together, the "Services").
            </p>
            <p className="mb-3">
              This policy applies to anyone who uses the Services, whether or not you create an
              account. Browsing initiatives, campaigns, and stories doesn't require an account —
              we only ask you to log in when you want to join a volunteer task, donate, chat in a
              community, save content, or request support.
            </p>
            <p>
              By using the Services, you agree to the collection and use of information as
              described here. If you don't agree, please don't use the Services.
            </p>
          </Card>

          <SectionHeading eyebrow="What we collect" id="information-we-collect">
            Information We Collect
          </SectionHeading>

          <Card accent={COLORS.coral}>
            <h3 className="font-semibold mb-2" style={{ color: COLORS.navy }}>
              Account & profile information
            </h3>
            <p className="mb-2">When you create an account, we collect:</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>Phone number (for OTP verification) or Google account details, if you sign in with Google</li>
              <li>Name, username, profile photo, bio, location, and date of birth (optional, where relevant)</li>
              <li>Interests, skills, and volunteer preferences you choose to share</li>
            </ul>
            <p>
              Your <strong>username</strong>, profile name, and photo are what other members see —
              your phone number is never shown to other users, including in community chat.
            </p>
          </Card>

          <Card accent={COLORS.green}>
            <h3 className="font-semibold mb-2" style={{ color: COLORS.navy }}>
              Donations & payment information
            </h3>
            <p>
              When you donate, our payment processor collects and handles your card/UPI/bank
              details directly — Thuna does not store full payment card numbers on our own
              servers. We keep a record of the donation amount, frequency, campaign, and receipt
              for your donation history and tax/accounting purposes.
            </p>
          </Card>

          <Card accent={COLORS.yellow}>
            <h3 className="font-semibold mb-2" style={{ color: COLORS.navy }}>
              Volunteering & location
            </h3>
            <p>
              When you join a volunteer task, we record your participation status (joined,
              checked in, completed), any photo/notes you submit as evidence, and — if you enable
              location for check-in — your location at the time of check-in. We don't track your
              location in the background.
            </p>
          </Card>

          <Card accent={COLORS.purple}>
            <h3 className="font-semibold mb-2" style={{ color: COLORS.navy }}>
              Community & chat
            </h3>
            <p>
              Messages, reactions, replies, polls, and files you share in community channels are
              stored so the conversation history works. Reports and blocks you submit are
              reviewed by our moderation team.
            </p>
          </Card>

          <Card accent={COLORS.coralDeep}>
            <h3 className="font-semibold mb-2" style={{ color: COLORS.navy }}>
              Support requests
            </h3>
            <p>
              If you submit a support request (healthcare, financial assistance, housing, etc.),
              we collect the details you provide to review, verify, and connect you with
              assistance. We treat this information as sensitive and restrict internal access to
              the team members who review and assign requests.
            </p>
          </Card>

          <Card accent={COLORS.navySoft}>
            <h3 className="font-semibold mb-2" style={{ color: COLORS.navy }}>
              Device & usage information
            </h3>
            <p>
              We automatically collect device type, operating system, app version, crash logs,
              and general usage patterns (screens viewed, features used) to keep the app working
              and improve it. See{' '}
              <a href="#advertising-id" className="underline" style={{ color: COLORS.coral }}>
                Advertising ID &amp; Analytics
              </a>{' '}
              below for specifics.
            </p>
          </Card>

          <SectionHeading eyebrow="Why" id="how-we-use-it">
            How We Use It
          </SectionHeading>
          <Card>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To create and secure your account, and verify your identity via OTP or Google Sign-In</li>
              <li>To process donations and send receipts</li>
              <li>To connect you with volunteer tasks, events, and communities you choose to join</li>
              <li>To operate community chat, including moderation, reports, and blocks</li>
              <li>To review and route support requests to the right team</li>
              <li>
                To send notifications you've opted into (campaign updates, task reminders, community
                messages, donation updates, badges/certificates — emergency alerts cannot be turned off)
              </li>
              <li>To maintain security, prevent fraud and abuse, and comply with legal obligations</li>
              <li>To understand how the Services are used so we can improve them</li>
            </ul>
          </Card>

          <SectionHeading eyebrow="Who sees it" id="how-we-share-it">
            How We Share It
          </SectionHeading>
          <Card>
            <p className="mb-3">
              <strong>We do not sell your personal information.</strong> We share information only
              in these circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mb-3">
              <li>
                <strong>Payment processors</strong> (e.g. Razorpay/Stripe) to process donations —
                they receive what's needed to complete the transaction under their own privacy terms.
              </li>
              <li>
                <strong>Infrastructure &amp; analytics providers</strong> (Google Firebase — Cloud
                Messaging for notifications, Analytics for usage insights) that process data on our
                behalf.
              </li>
              <li>
                <strong>SMS/OTP providers</strong> to deliver verification codes to your phone number.
              </li>
              <li>
                <strong>Other members</strong>, limited to your username, profile photo, and anything
                you post in community chat or public stories — never your phone number.
              </li>
              <li>
                <strong>Legal or safety reasons</strong> — if required by law, or to protect the
                rights, safety, or property of Thuna, our users, or the public.
              </li>
              <li>
                <strong>Business transfers</strong> — if Thuna is involved in a merger, acquisition,
                or asset sale, your information may be transferred as part of that transaction,
                subject to this policy's protections.
              </li>
            </ul>
          </Card>

          <SectionHeading eyebrow="Compliance detail" id="advertising-id">
            Advertising ID &amp; Analytics
          </SectionHeading>
          <Card accent={COLORS.coral}>
            <p className="mb-3">
              Thuna is not an advertising platform and does not run ads. We use{' '}
              <strong>Google Firebase Analytics</strong> to understand basic usage patterns (which
              screens are used, crash reports, retention). Depending on your device settings, this
              can include an on-device advertising identifier (Android Advertising ID / iOS IDFA).
            </p>
            <div className="flex flex-wrap mb-3">
              <Pill color={COLORS.green}>No ad personalization</Pill>
              <Pill color={COLORS.green}>No ad networks</Pill>
              <Pill color={COLORS.green}>No selling of identifiers</Pill>
            </div>
            <p>
              You can reset or limit your advertising identifier at any time in your device's system
              settings (Settings → Privacy → Ads, on both Android and iOS), independent of the Thuna
              app.
            </p>
          </Card>

          <SectionHeading eyebrow="How long" id="data-retention">
            Data Retention
          </SectionHeading>
          <Card>
            <p>
              We keep your information for as long as your account is active, plus a limited period
              afterward for legal, accounting, and dispute-resolution purposes (for example, donation
              records are typically kept for the period required by tax law). When you delete your
              account, we delete or anonymize your personal information within a reasonable period,
              except where retention is legally required.
            </p>
          </Card>

          <SectionHeading eyebrow="You're in control" id="your-rights">
            Your Rights &amp; Choices
          </SectionHeading>
          <Card>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Access &amp; export</strong> — view and request a copy of your data from Settings.</li>
              <li><strong>Correct</strong> — update your profile at any time under Edit Profile.</li>
              <li><strong>Delete</strong> — delete your account and associated data from Settings → Delete Account.</li>
              <li><strong>Notification preferences</strong> — control which notification types you receive (except emergency alerts) under Settings → Notification Preferences.</li>
              <li><strong>Chat controls</strong> — block or report other users directly from a conversation.</li>
              <li><strong>Withdraw consent</strong> — where we rely on consent (e.g. optional profile fields), you can withdraw it at any time by removing that information.</li>
            </ul>
          </Card>

          <SectionHeading eyebrow="Under 18" id="childrens-privacy">
            Children's Privacy
          </SectionHeading>
          <Card>
            <p>
              Thuna's Services are intended for users aged 18 and older. We do not knowingly collect
              personal information from children under 18. If you believe a child has provided us
              with personal information, please contact us and we will delete it promptly.
            </p>
          </Card>

          <SectionHeading eyebrow="How we protect it" id="security">
            Security
          </SectionHeading>
          <Card>
            <p className="mb-2">We use industry-standard safeguards to protect your information, including:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Encrypted connections (HTTPS/TLS) between the app and our servers</li>
              <li>Hashed storage of PINs and passwords — never stored in plain text</li>
              <li>
                Biometric sign-in (Face ID / fingerprint) is verified entirely on your device; Thuna
                never receives or stores your biometric data, only a pass/fail confirmation
              </li>
              <li>Access controls limiting which staff can view sensitive data, such as support requests</li>
            </ul>
            <p className="mt-2">
              No method of transmission or storage is 100% secure, but we work to protect your
              information using commercially reasonable measures.
            </p>
          </Card>

          <SectionHeading eyebrow="Where data goes" id="international-transfers">
            International Transfers
          </SectionHeading>
          <Card>
            <p>
              Your information may be processed on servers located outside your home country,
              including by service providers like Google Firebase. Where this happens, we take steps
              to ensure appropriate safeguards are in place consistent with applicable data
              protection law.
            </p>
          </Card>

          <SectionHeading eyebrow="Staying current" id="changes">
            Changes to This Policy
          </SectionHeading>
          <Card>
            <p>
              We may update this policy as Thuna's Services evolve. If we make material changes,
              we'll notify you in the app or by other reasonable means before the changes take
              effect. The "Last updated" date at the top of this page always reflects the most
              recent version.
            </p>
          </Card>

          <SectionHeading eyebrow="Get in touch" id="contact">
            Contact Us
          </SectionHeading>
          <Card>
            <p className="mb-1">Questions, requests, or concerns about this policy or your data? Reach us at:</p>
            <p className="font-semibold" style={{ color: COLORS.navy }}>
              privacy@thunafoundations.org
            </p>
          </Card>

          <div
            className="mt-10 pt-6 text-center text-[12px]"
            style={{ color: COLORS.inkSoft, borderTop: `1px solid ${COLORS.creamDeep}` }}
          >
            © {new Date().getFullYear()} Thuna Foundations. Together, we stand beside people.
          </div>
        </div>
      </div>
    </div>
  )
}