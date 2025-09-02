// src/app/page.tsx
'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/pinterest-logo.png" // You can add a Pinterest logo or use text
                alt="Pinterest Uploader"
                width={32}
                height={32}
                className="mr-2"
              />
              <span className="text-xl font-bold text-red-600">PinUploader</span>
            </div>
            
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Image
                  src="/google-logo.png" // Add Google logo or use text
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Create Beautiful Pinterest Pins
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your images, add engaging descriptions, and share your content 
            with the world on Pinterest. Simple, fast, and effective.
          </p>

          {!session ? (
            <div className="space-y-6">
              <button
                onClick={() => signIn("google")}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center mx-auto transition-colors"
              >
                <Image
                  src="/google-logo-white.png"
                  alt="Google"
                  width={24}
                  height={24}
                  className="mr-3"
                />
                Sign in with Google to Get Started
              </button>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h2>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Fast Uploads</h3>
                    <p className="text-gray-600">Quick and easy pin creation process</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Multiple Boards</h3>
                    <p className="text-gray-600">Organize your pins across different boards</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🔒</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Secure</h3>
                    <p className="text-gray-600">Your data is safe with Google authentication</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Ready to Create Your First Pin?
                </h2>
                <p className="text-gray-600 mb-6">
                  You're all signed in! Start uploading your images and sharing them on Pinterest.
                </p>
                <a
                  href="/upload"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg text-lg font-semibold inline-block transition-colors"
                >
                  Go to Upload Page
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="font-semibold text-gray-900 mb-3">📸 Upload Images</h3>
                  <p className="text-gray-600">Upload your best images to create engaging pins</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="font-semibold text-gray-900 mb-3">📝 Add Descriptions</h3>
                  <p className="text-gray-600">Write compelling descriptions for your audience</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="font-semibold text-gray-900 mb-3">📌 Choose Boards</h3>
                  <p className="text-gray-600">Select the perfect board for your content</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="font-semibold text-gray-900 mb-3">🌍 Share with World</h3>
                  <p className="text-gray-600">Reach millions of Pinterest users</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 PinUploader. All rights reserved.</p>
            <p className="mt-2">Built with Next.js and Pinterest API</p>
          </div>
        </div>
      </footer>
    </div>
  );
}