'use client'
import { UniversalCreditsBar } from '@/components/UniversalCreditsBar'
import { DollarSign, TrendingDown, Calendar } from 'lucide-react'
import Link from 'next/link'

const expenses = [
  { name: 'Supabase', amount: 25, category: 'Database', nextDue: '2025-11-15' },
  { name: 'Vercel', amount: 20, category: 'Hosting', nextDue: '2025-11-01' },
  { name: 'OpenAI', amount: 450, category: 'AI Services', nextDue: '2025-11-10' },
  { name: 'Stripe', amount: 0, category: 'Payments', nextDue: 'Usage-based' },
]

export default function CostTrackerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
      <UniversalCreditsBar isAdmin={true} credits={0} />
      <div className="container mx-auto px-4 py-8">
        <Link href="/dashboard" className="text-blue-600 hover:underline mb-2 inline-block">← Back</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Cost Tracker</h1>
        <p className="text-lg text-gray-600 mb-8">Business expenses and subscriptions</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <DollarSign className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-2xl font-bold">$495</p>
            <p className="text-sm text-gray-600">Monthly Expenses</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <TrendingDown className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold">$5,940</p>
            <p className="text-sm text-gray-600">Yearly Total</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Calendar className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold">4</p>
            <p className="text-sm text-gray-600">Active Subscriptions</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expenses.map((expense, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{expense.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{expense.category}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">${expense.amount}/mo</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{expense.nextDue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
