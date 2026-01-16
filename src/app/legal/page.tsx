import Link from "next/link";

export default function LegalNoticePage() {
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
            Legal Notice / Impressum
          </h1>

          <div className="space-y-6 text-gray-700">
            <section className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h2 className="mb-3 text-xl font-semibold text-blue-900">
                📚 Educational Open Source Project
              </h2>
              <p className="text-blue-800">
                This is a{" "}
                <strong>non-commercial, open source educational project</strong>{" "}
                created exclusively for study and learning purposes. It is not
                intended for commercial use or public service provision.
              </p>
              <p className="mt-2 text-blue-800">
                Hosted in the United States. No DPO is appointed because this
                project is non-commercial and used solely for study. Typical
                Impressum requirements (§5 TMG) for commercial services do not
                apply.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                Project Information
              </h2>
              <div className="space-y-1">
                <p>
                  <strong>Project Name:</strong> ContentPageMaker
                </p>
                <p>
                  <strong>Type:</strong> Open Source Educational Project
                </p>
                <p>
                  <strong>Purpose:</strong> Study and Learning
                </p>
                <p>
                  <strong>Status:</strong> Non-Commercial
                </p>
                <p>
                  <strong>License:</strong> MIT (Open Source)
                </p>
                <p>
                  <strong>Hosting:</strong> United States (cloud infrastructure)
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                Contact
              </h2>
              <p>
                For questions or inquiries regarding this educational project,
                please refer to the project repository or documentation.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                Disclaimer
              </h2>
              <p>
                <strong>Educational Use Only:</strong> This service is provided
                for educational purposes only. It is not intended for production
                use, critical applications, or commercial activities.
              </p>
              <p className="mt-2">
                <strong>No Warranty / Own Risk:</strong> The service is provided
                "as is" without any warranties or guarantees. Use is at your
                sole responsibility and risk.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                Data Ownership and Usage
              </h2>
              <p>
                By using this service you grant the project maintainers a
                non-exclusive, worldwide license to store, process, and display
                any content you input for the purpose of operating and improving
                this educational project. Do not submit confidential or
                sensitive information.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                Third-Party Services
              </h2>
              <p>
                This project uses the following third-party services for
                educational purposes:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  <strong>Neon Database:</strong> PostgreSQL database hosting
                </li>
                <li>
                  <strong>GitHub OAuth:</strong> Optional authentication (if
                  configured)
                </li>
                <li>
                  <strong>Google OAuth:</strong> Optional authentication (if
                  configured)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                External Links
              </h2>
              <p>
                This service may contain links to external websites. We are not
                responsible for the content, privacy policies, or practices of
                any third-party sites or services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                Changes to This Notice
              </h2>
              <p>
                We may update this legal notice from time to time. Changes will
                be posted on this page with an updated revision date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
