'use client'

import { CreditCard, Sparkles } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

interface UniversalCreditsBarProps {
  isAdmin?: boolean
  credits: number
}

export function UniversalCreditsBar({ isAdmin = false, credits }: UniversalCreditsBarProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">CR AudioViz AI</span>
          </div>

          <div className="flex items-center space-x-6">
            {isAdmin ? (
              <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                <CreditCard className="w-4 h-4" />
                <span className="font-semibold">Free Unlimited</span>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm">Credits:</span>
                  <span className="font-bold text-lg">{formatNumber(credits)}</span>
                </div>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors">
                  Add Credits
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
