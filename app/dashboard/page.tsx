import { Activity, Bot, Newspaper, Megaphone, Users, DollarSign, CreditCard, Store, HeadphonesIcon, BarChart3, Settings, FileText, Heart } from 'lucide-react'
import Link from 'next/link'
import { UniversalCreditsBar } from '@/components/UniversalCreditsBar'

const dashboardCards = [
  {
    id: 'operations',
    title: 'Operations Monitoring',
    description: '50+ metrics, gauges, and real-time alerts',
    icon: Activity,
    href: '/dashboard/operations',
    color: 'from-blue-500 to-blue-600',
    stats: { active: '127', alerts: '3', uptime: '99.8%' }
  },
  {
    id: 'ai-management',
    title: 'AI Management',
    description: 'Chat with Javari, upload training data',
    icon: Bot,
    href: '/dashboard/ai-management',
    color: 'from-purple-500 to-purple-600',
    stats: { conversations: '1,234', models: '5', accuracy: '94%' }
  },
  {
    id: 'news',
    title: 'News Dashboard',
    description: 'Feed Javari knowledge, create marketing content',
    icon: Newspaper,
    href: '/dashboard/news',
    color: 'from-green-500 to-green-600',
    stats: { articles: '45', sources: '12', updated: '2m ago' }
  },
  {
    id: 'marketing',
    title: 'Marketing Dashboard',
    description: 'Campaigns, newsletters, social media',
    icon: Megaphone,
    href: '/dashboard/marketing',
    color: 'from-pink-500 to-pink-600',
    stats: { campaigns: '8', reach: '45K', engagement: '12%' }
  },
  {
    id: 'users',
    title: 'Users Management',
    description: 'Customer database and activity tracking',
    icon: Users,
    href: '/dashboard/users',
    color: 'from-indigo-500 to-indigo-600',
    stats: { total: '1,247', active: '892', new: '+45' }
  },
  {
    id: 'cost-tracker',
    title: 'Cost Tracker',
    description: 'Track business expenses and subscriptions',
    icon: DollarSign,
    href: '/dashboard/cost-tracker',
    color: 'from-yellow-500 to-yellow-600',
    stats: { monthly: '$2,459', ytd: '$24,892', vendors: '12' }
  },
  {
    id: 'payments',
    title: 'Payments',
    description: 'Revenue, transactions, and billing',
    icon: CreditCard,
    href: '/dashboard/payments',
    color: 'from-emerald-500 to-emerald-600',
    stats: { revenue: '$12,450', transactions: '342', pending: '5' }
  },
  {
    id: 'marketplace',
    title: 'Marketplace',
    description: 'Creator products and commission tracking',
    icon: Store,
    href: '/dashboard/marketplace',
    color: 'from-orange-500 to-orange-600',
    stats: { products: '234', creators: '67', sales: '$5,670' }
  },
  {
    id: 'support',
    title: 'Support Tickets',
    description: 'Customer support and ticket management',
    icon: HeadphonesIcon,
    href: '/dashboard/support',
    color: 'from-red-500 to-red-600',
    stats: { open: '12', resolved: '234', avgTime: '2.3h' }
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Platform usage and performance metrics',
    icon: BarChart3,
    href: '/dashboard/analytics',
    color: 'from-teal-500 to-teal-600',
    stats: { users: '12.5K', sessions: '45.2K', bounce: '32%' }
  },
  {
    id: 'pricing',
    title: 'Pricing Management',
    description: 'Manage plans, credits, and pricing tiers',
    icon: Settings,
    href: '/dashboard/pricing',
    color: 'from-violet-500 to-violet-600',
    stats: { plans: '4', avgRev: '$67.89', churn: '4.2%' }
  },
  {
    id: 'grants',
    title: 'Grants Tracking',
    description: 'Application status and funding pipeline',
    icon: FileText,
    href: '/dashboard/grants',
    color: 'from-cyan-500 to-cyan-600',
    stats: { applied: '8', awarded: '2', pipeline: '$600K' }
  },
  {
    id: 'health',
    title: 'System Health',
    description: 'Infrastructure status and monitoring',
    icon: Heart,
    href: '/dashboard/health',
    color: 'from-rose-500 to-rose-600',
    stats: { status: 'Healthy', errors: '0', latency: '45ms' }
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <UniversalCreditsBar isAdmin={true} credits={0} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">Complete business operations management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                <div className={`h-2 bg-gradient-to-r ${card.color}`} />
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color}`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs text-gray-500">
                      Live
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {card.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                    {Object.entries(card.stats).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                        <div className="text-sm font-semibold text-gray-900">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
