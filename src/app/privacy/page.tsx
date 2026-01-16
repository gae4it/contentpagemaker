import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mb-4 text-sm text-gray-600">
            Last Updated: January 16, 2026
          </p>

          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-blue-800">
              <strong>📚 Educational Project Notice:</strong> This is a
              non-commercial open source educational project created exclusively
              for study and learning purposes. Hosted in the United States; no
              DPO is appointed because the project is non-commercial.
            </p>
          </div>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                1. Introduction
              </h2>
              <p>
                ContentPageMaker is an educational open source project committed
                to protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                use this learning application.
              </p>
              <p className="mt-2">
                This policy is designed to comply with the General Data
                Protection Regulation (GDPR) and other applicable European data
                protection laws, even though this is a non-commercial
                educational project.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                2. Data Controller
              </h2>
              <p>
                This is an educational open source project. As a non-commercial
                study project, there is no formal business entity acting as data
                controller in the traditional sense. Hosting and processing
                occur in the United States (cloud infrastructure). No DPO is
                appointed.
              </p>
              <div className="mt-2 space-y-1">
                <p>
                  <strong>Project:</strong> ContentPageMaker
                </p>
                <p>
                  <strong>Nature:</strong> Educational/Non-Commercial
                </p>
                <p>
                  <strong>Purpose:</strong> Study and Learning Only
                </p>
                <p>
                  <strong>Hosting:</strong> United States
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                3. Information We Collect
              </h2>

              <h3 className="mt-3 mb-2 font-semibold">
                3.1 Authentication Data (OAuth)
              </h3>
              <p>
                When you sign in with GitHub or Google (if configured), we
                collect:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Name</li>
                <li>Email address</li>
                <li>Profile picture (optional)</li>
                <li>OAuth provider ID</li>
              </ul>

              <h3 className="mt-3 mb-2 font-semibold">3.2 Guest Mode</h3>
              <p>
                If you use the guest account, no personal information is
                collected. All guest users share a common anonymous account for
                educational testing purposes.
              </p>

              <h3 className="mt-3 mb-2 font-semibold">3.3 Content Data</h3>
              <p>Information you create while using the application:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Landing page URLs and descriptions</li>
                <li>Section content (text, titles, descriptions)</li>
                <li>Button labels and links</li>
                <li>External image URLs</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                4. Legal Basis for Processing
              </h2>
              <p>Under GDPR Article 6(1), we process your data based on:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  <strong>Consent (Article 6(1)(a)):</strong> By using this
                  educational service, you consent to data processing for
                  learning purposes
                </li>
                <li>
                  <strong>Legitimate Interest (Article 6(1)(f)):</strong>{" "}
                  Educational and research purposes
                </li>
                <li>
                  <strong>International Transfers:</strong> Data may be
                  transferred to/processed in the United States; by using the
                  service you consent to these transfers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                5. Cookies
              </h2>
              <p>
                We use <strong>only essential session cookies</strong> for
                authentication (NextAuth.js). These cookies are strictly
                necessary for the service to function.
              </p>
              <div className="mt-3 space-y-1">
                <p>
                  <strong>Session Cookies:</strong> NextAuth session tokens
                  (HTTP-only, secure)
                </p>
                <p>
                  <strong>Purpose:</strong> Authentication and session
                  management only
                </p>
                <p>
                  <strong>Expiration:</strong> 30 days or when you logout
                </p>
                <p>
                  <strong>Legal Basis:</strong> Essential cookies (no consent
                  required under GDPR)
                </p>
              </div>
              <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3">
                <p className="text-sm text-green-800">
                  ℹ️ We do <strong>NOT</strong> use analytics, marketing,
                  tracking, or advertising cookies. Therefore,{" "}
                  <strong>
                    no cookie consent banner is required or implemented
                  </strong>
                  .
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                6. How We Use Your Information
              </h2>
              <p>
                We use the collected information for educational purposes and to
                operate the service:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>To provide authentication and user sessions</li>
                <li>To store and manage your landing page content</li>
                <li>To enable content export functionality</li>
                <li>For learning and educational demonstration purposes</li>
              </ul>
              <p className="mt-2 font-semibold">
                We do NOT use your data for marketing, profiling, automated
                decision-making, or commercial purposes.
              </p>
              <p className="mt-2">
                By submitting content, you grant the project maintainers a
                non-exclusive, worldwide license to store, process, display, and
                use the content to operate and improve this educational project.
                Do not submit confidential or sensitive data.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                7. Data Sharing
              </h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal
                information to third parties, except:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  <strong>OAuth Providers:</strong> GitHub/Google (only for
                  authentication)
                </li>
                <li>
                  <strong>Database Hosting:</strong> Neon (PostgreSQL hosting
                  service)
                </li>
              </ul>
              <p className="mt-2">
                All third-party services are used solely for educational project
                infrastructure.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                8. Data Storage and Security
              </h2>
              <p>
                Your data is stored securely in a Neon PostgreSQL database with:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>SSL/TLS encryption in transit</li>
                <li>Secure database authentication</li>
                <li>HTTP-only, secure session cookies</li>
                <li>Protection against SQL injection (Prisma ORM)</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                Note: As an educational project, security measures are
                implemented for learning purposes. This is not intended for
                production use with sensitive data. Use is at your sole
                responsibility.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                9. Your Rights Under GDPR
              </h2>
              <p>You have the following rights regarding your personal data:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  <strong>Right to Access (Art. 15):</strong> Request a copy of
                  your data
                </li>
                <li>
                  <strong>Right to Rectification (Art. 16):</strong> Correct
                  inaccurate data
                </li>
                <li>
                  <strong>Right to Erasure (Art. 17):</strong> Delete your
                  account and data
                </li>
                <li>
                  <strong>Right to Data Portability (Art. 20):</strong> Export
                  your data
                </li>
                <li>
                  <strong>Right to Object (Art. 21):</strong> Object to data
                  processing
                </li>
              </ul>
              <p className="mt-2">
                To exercise these rights, you can delete your data directly
                through the application or contact the project maintainer.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                10. Data Retention
              </h2>
              <p>We retain your data:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Until you delete your account</li>
                <li>Or until you delete your landing pages</li>
                <li>
                  Guest account data may be cleared periodically for educational
                  maintenance
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                11. International Data Transfers
              </h2>
              <p>
                Your data may be processed and stored on servers located outside
                your country of residence. We ensure appropriate safeguards are
                in place as required by GDPR.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                12. Children's Privacy
              </h2>
              <p>
                This educational service is intended for users of all ages for
                learning purposes. If you are under 16, please ensure you have
                parental consent before using this service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                13. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with an updated date. Continued use
                of the service after changes constitutes acceptance of the
                updated policy.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                14. Contact
              </h2>
              <p>
                For questions about this Privacy Policy or data protection,
                please refer to the project documentation or repository.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
