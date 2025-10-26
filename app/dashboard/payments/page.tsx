'use client'
import { UniversalCreditsBar } from '@/components/UniversalCreditsBar'
import { CreditCard } from 'lucide-react'
import Link from 'next/link'

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <UniversalCreditsBar isAdmin={true} credits={0} />
      <div className="container mx-auto px-4 py-8">
        <Link href="/dashboard" className="text-blue-600 hover:underline mb-2 inline-block">← Back</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Payments</h1>
        <p className="text-lg text-gray-600 mb-8">Revenue and transactions</p>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <CreditCard className="w-12 h-12 text-emerald-600 mb-4" />
          <p className="text-gray-600">Payment management dashboard</p>
        </div>
      </div>
    </div>
  )
}
