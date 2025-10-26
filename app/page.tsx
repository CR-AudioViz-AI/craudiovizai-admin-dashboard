import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            CR AudioViz AI Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Complete business operations management system with 13 powerful modules
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
