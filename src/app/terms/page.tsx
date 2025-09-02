export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        These Terms of Service govern your use of this Sandbox testing
        application for TikTok API integrations.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Use of Service</h2>
      <p className="mb-4">
        This application is intended only for testing TikTok API features such
        as login and video uploads. It is not a production application.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">User Responsibilities</h2>
      <p className="mb-4">
        You agree to use this application solely for testing purposes and to
        comply with TikTok’s developer policies. Any misuse is strictly
        prohibited.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
      <p className="mb-4">
        We are not responsible for any issues, damages, or data loss that may
        occur while using this Sandbox application.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p>
        For questions about these Terms of Service, please contact us at{" "}
        <a href="mailto:youremail@example.com" className="text-blue-600">
          youremail@example.com
        </a>
        .
      </p>
    </main>
  );
}
