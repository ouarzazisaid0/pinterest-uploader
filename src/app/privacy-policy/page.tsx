export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy explains how we collect, use, and protect your
        information when you use our application. This is a Sandbox testing
        application for TikTok API integrations.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-4">
        We may collect basic information such as your TikTok account ID, access
        tokens, and any content you choose to upload for testing purposes.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Information</h2>
      <p className="mb-4">
        The information collected is used solely to test TikTok API
        functionality such as login and video upload in Sandbox mode.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Data Protection</h2>
      <p className="mb-4">
        We take reasonable measures to protect your data and do not share it
        with third parties. All information is used only for Sandbox testing.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us at{" "}
        <a href="mailto:youremail@example.com" className="text-blue-600">
          youremail@example.com
        </a>
        .
      </p>
    </main>
  );
}
