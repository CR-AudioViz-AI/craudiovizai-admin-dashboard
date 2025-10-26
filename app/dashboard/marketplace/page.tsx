'use client'
import { UniversalCreditsBar } from '@/components/UniversalCreditsBar'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <UniversalCreditsBar isAdmin={true} credits={0} />
      <div className="container mx-auto px-4 py-8">
        <Link href="/dashboard" className="text-blue-600 hover:underline mb-2 inline-block">← Back</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Page</h1>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-gray-600">Content here</p>
        </div>
      </div>
    </div>
  )
}
