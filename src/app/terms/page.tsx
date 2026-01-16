import Link from "next/link";

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="mb-4 text-sm text-gray-600">
            Last Updated: January 16, 2026
          </p>

          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-blue-800">
              <strong>📚 Educational Project Notice:</strong> This is a
              non-commercial open source project for educational purposes only.
              Use of this service is provided on an as-is basis for study and
              learning. Hosted in the United States. No warranties or commercial
              guarantees are provided.
            </p>
          </div>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using ContentPageMaker (the Service), you
                acknowledge that this is a non-commercial study tool provided
                for educational and learning purposes only. If you do not agree
                to these terms, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                2. Description of Service
              </h2>
              <p>
                ContentPageMaker is an{" "}
                <strong>open source educational project</strong> that provides
                tools for creating and managing landing page content. It is
                intended solely for study, learning, and educational purposes.
              </p>
              <p className="mt-2">
                <strong>Non-Commercial Use:</strong> This service is not
                intended for commercial use, production environments, or
                business activities. It is a learning project only. Hosting and
                processing occur in the United States (cloud infrastructure).
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                3. User Accounts and Authentication
              </h2>
              <p>You may use this service by:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Signing in with GitHub OAuth (if configured)</li>
                <li>Signing in with Google OAuth (if configured)</li>
                <li>Using the shared guest account (for testing)</li>
              </ul>
              <p className="mt-2">
                You are responsible for maintaining the confidentiality of your
                account credentials. Use is at your sole responsibility and
                risk.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                4. Acceptable Use
              </h2>
              <p>
                You agree to use this educational service only for lawful
                purposes and in accordance with these Terms. You agree NOT to:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Use the service for commercial purposes</li>
                <li>Upload illegal, harmful, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to the system</li>
                <li>Interfere with or disrupt the service</li>
                <li>
                  Use the service to store sensitive or confidential information
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                5. User Content
              </h2>
              <p>
                You retain all rights to the content you create using this
                service. By creating content, you acknowledge:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>You own or have the right to use the content</li>
                <li>
                  Your content does not violate any laws or third-party rights
                </li>
                <li>
                  The service is for educational purposes and not suitable for
                  sensitive data
                </li>
              </ul>
              <p className="mt-2">
                By submitting content, you grant the project maintainers a
                non-exclusive, worldwide license to store, process, display, and
                use your content to operate and improve this educational
                project. Do not submit confidential or sensitive data.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                6. Educational Nature and Disclaimers
              </h2>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <p className="mb-2 font-semibold text-yellow-900">
                  IMPORTANT DISCLAIMERS:
                </p>
                <ul className="list-disc space-y-1 pl-6 text-yellow-800">
                  <li>
                    <strong>Educational Purpose:</strong> This is a learning
                    project, not a production-ready service
                  </li>
                  <li>
                    <strong>No Warranty:</strong> The service is provided AS IS
                    without any warranties
                  </li>
                  <li>
                    <strong>No Guarantee:</strong> We do not guarantee uptime,
                    data persistence, or error-free operation
                  </li>
                  <li>
                    <strong>Data Loss:</strong> Your data may be lost at any
                    time. Do not rely on this for important work
                  </li>
                  <li>
                    <strong>No Support:</strong> No professional support or SLA
                    is provided
                  </li>
                  <li>
                    <strong>Own Risk:</strong> You use the service at your own
                    risk; you are solely responsible for any outcomes.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                7. Intellectual Property
              </h2>
              <p>
                This is an open source project released under the MIT License.
                The source code is freely available for educational use,
                modification, and distribution.
              </p>
              <p className="mt-2">
                Third-party services (Next.js, Prisma, etc.) are used under
                their respective licenses.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                8. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, the project maintainers
                and contributors shall not be liable for any:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Data loss or corruption</li>
                <li>Service interruptions or downtime</li>
                <li>Errors, bugs, or security vulnerabilities</li>
                <li>
                  Any damages arising from use of this educational service
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                9. Privacy and Data Protection
              </h2>
              <p>
                Your use of this service is also governed by our{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
                . Please review it to understand how we handle your data for
                educational purposes.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                10. Modifications to Service and Terms
              </h2>
              <p>We reserve the right to:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  Modify or discontinue the service at any time without notice
                </li>
                <li>Update these Terms at any time</li>
                <li>Remove or modify features for educational purposes</li>
              </ul>
              <p className="mt-2">
                Continued use after changes constitutes acceptance of the
                updated Terms.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                11. Termination
              </h2>
              <p>
                You may stop using the service at any time and delete your data.
                We may also:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  Suspend or terminate access for violations of these Terms
                </li>
                <li>Remove content that violates these Terms</li>
                <li>Discontinue the service for educational maintenance</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                12. Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of Germany. Any disputes
                shall be resolved in accordance with German law, recognizing the
                educational and non-commercial nature of this project.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                13. Contact
              </h2>
              <p>
                For questions about these Terms, please refer to the project
                repository or documentation.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                14. Acknowledgment
              </h2>
              <p className="font-semibold">
                By using this service, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service, and
                that you understand this is an educational project not intended
                for commercial or production use.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
