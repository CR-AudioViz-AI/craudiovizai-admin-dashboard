'use client'

import { UniversalCreditsBar } from '@/components/UniversalCreditsBar'
import { Activity, Server, Database, Zap, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const metrics = [
  { name: 'API Response Time', value: '45ms', status: 'healthy', trend: '+2%', icon: Zap },
  { name: 'Database Queries', value: '1,234/min', status: 'healthy', trend: '-5%', icon: Database },
  { name: 'Active Users', value: '892', status: 'healthy', trend: '+12%', icon: Activity },
  { name: 'Server Load', value: '34%', status: 'healthy', trend: '+3%', icon: Server },
  { name: 'Error Rate', value: '0.02%', status: 'healthy', trend: '-15%', icon: CheckCircle },
  { name: 'Uptime', value: '99.98%', status: 'healthy', trend: '0%', icon: CheckCircle },
]

const recentAlerts = [
  { id: 1, type: 'warning', message: 'Database connection pool at 80%', time: '5m ago', resolved: false },
  { id: 2, type: 'info', message: 'Deployment completed successfully', time: '15m ago', resolved: true },
  { id: 3, type: 'success', message: 'System backup completed', time: '1h ago', resolved: true },
]

const performanceData = [
  { time: '00:00', requests: 400, latency: 42 },
  { time: '04:00', requests: 300, latency: 38 },
  { time: '08:00', requests: 600, latency: 45 },
  { time: '12:00', requests: 800, latency: 52 },
  { time: '16:00', requests: 750, latency: 48 },
  { time: '20:00', requests: 500, latency: 43 },
]

export default function OperationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <UniversalCreditsBar isAdmin={true} credits={0} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:underline mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Operations Monitoring</h1>
          <p className="text-lg text-gray-600">Real-time system metrics and alerts</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric) => (
            <div key={metric.name} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <metric.icon className="w-5 h-5 text-blue-600" />
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  metric.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {metric.trend}
                </span>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">{metric.name}</h3>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Volume (24h)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="requests" stroke="#3b82f6" fill="#93c5fd" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Latency (24h)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="latency" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                  {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                  {alert.type === 'info' && <Activity className="w-5 h-5 text-blue-600" />}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
                {alert.resolved ? (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Resolved</span>
                ) : (
                  <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700">
                    Resolve
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
