'use client'

import { UniversalCreditsBar } from '@/components/UniversalCreditsBar'
import { Bot, Upload, MessageSquare, Brain, Database, Zap } from 'lucide-react'
import Link from 'next/link'

export default function AIManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <UniversalCreditsBar isAdmin={true} credits={0} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:underline mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Management</h1>
          <p className="text-lg text-gray-600">Chat with Javari and manage AI training</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Javari Chat Interface */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Bot className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Chat with Javari</h3>
                  <p className="text-sm text-gray-500">Your autonomous AI assistant</p>
                </div>
              </div>
            </div>
            
            <div className="h-96 p-6 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-600 rounded-full">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-900">Hello! I'm Javari, your autonomous AI assistant. I can help you with:</p>
                    <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                      <li>Analyzing business data</li>
                      <li>Creating marketing content</li>
                      <li>Managing customer support</li>
                      <li>Building automated workflows</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Training Data Upload */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <Upload className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Training Data</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Upload documents to improve Javari's knowledge</p>
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Upload Files
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">AI Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Conversations</span>
                  <span className="font-semibold text-gray-900">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Models</span>
                  <span className="font-semibold text-gray-900">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Accuracy</span>
                  <span className="font-semibold text-gray-900">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Training Data</span>
                  <span className="font-semibold text-gray-900">2.4 GB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
