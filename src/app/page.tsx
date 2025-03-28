'use client';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
    {/*h-dvh */}
            {/* Main Content */}
            <main className="flex flex-col items-center justify-center flex-1 text-center p-6 mt-10 md:mt-0">
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                    Welcome to Seongsik&rsquo;s Website
                </h1>
                <p className="mt-4 text-lg text-gray-700 max-w-2xl">
                    Explore powerful AI features, media tools, and more. Start your journey today!
                </p>

                <Link href="/llm">
                    <button className="mt-6 px-6 py-3 text-lg font-semibold bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition">
                        Ask Seongsik Anything
                    </button>
                </Link>
            </main>

            {/* Features Section */}
            <section className="bg-white w-full py-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-gray-800">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <FeatureCard title="AI Chat" description="Ask anything about Seongsik with AI-powered responses." />
                        <FeatureCard title="Media Upload" description="Upload and manage your files with ease." />
                        <FeatureCard title="Real-time Updates" description="Stay up to date with the latest data from Seongsik." />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center text-gray-600 py-4 border-t">
                © {new Date().getFullYear()} Seongsik. All rights reserved.
            </footer>
        </div>
    );
}

// FeatureCard Component (for reusability)
const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
      <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-gray-600">{description}</p>
      </div>
  );
};