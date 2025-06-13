import React from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  Building2, 
  Users, 
  TrendingUp,
  FileText
} from 'lucide-react'
import { MetricCard } from '../components/ui/MetricCard'
import { DepartmentCard } from '../components/dashboard/DepartmentCard'
import { PriorityTracker } from '../components/dashboard/PriorityTracker'
import { RiskRadar } from '../components/dashboard/RiskRadar'
import { FirmHealthScore } from '../components/dashboard/FirmHealthScore'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'

// Mock data
const metrics = {
  aum: 2300000000,
  aumChange: 5.2,
  activeFunds: 8,
  teamSize: 47,
  clientSatisfaction: 92,
}

const departments = [
  {
    id: 'legal',
    name: 'Legal & Compliance',
    status: 'green' as const,
    goals: { completed: 4, total: 5 },
    budget: { used: 870000, total: 1000000 },
    metrics: [
      { label: 'Contracts Reviewed', value: '23' },
      { label: 'Compliance Score', value: '98%' },
    ],
    teamSize: 5,
  },
  {
    id: 'fund-ops',
    name: 'Fund Operations',
    status: 'green' as const,
    goals: { completed: 8, total: 8 },
    budget: { used: 2208000, total: 2400000 },
    metrics: [
      { label: 'SLA Performance', value: '99.5%' },
      { label: 'Daily Reconciliation', value: '100%' },
    ],
    teamSize: 12,
  },
  {
    id: 'it',
    name: 'IT & Infrastructure',
    status: 'yellow' as const,
    goals: { completed: 3, total: 5 },
    budget: { used: 1650000, total: 1500000 },
    metrics: [
      { label: 'System Uptime', value: '99.8%' },
      { label: 'Tickets Resolved', value: '142' },
    ],
    teamSize: 8,
  },
  {
    id: 'finance',
    name: 'Finance & Accounting',
    status: 'green' as const,
    goals: { completed: 6, total: 6 },
    budget: { used: 780000, total: 1000000 },
    metrics: [
      { label: 'Month-End Close', value: '2 days' },
      { label: 'Accuracy Rate', value: '99.9%' },
    ],
    teamSize: 6,
  },
  {
    id: 'client-service',
    name: 'Client Service',
    status: 'green' as const,
    goals: { completed: 7, total: 8 },
    budget: { used: 450000, total: 500000 },
    metrics: [
      { label: 'NPS Score', value: '72' },
      { label: 'Response Time', value: '< 2hr' },
    ],
    teamSize: 4,
  },
  {
    id: 'hr',
    name: 'Human Resources',
    status: 'yellow' as const,
    goals: { completed: 3, total: 5 },
    budget: { used: 320000, total: 400000 },
    metrics: [
      { label: 'Open Positions', value: '3' },
      { label: 'Turnover Rate', value: '5%' },
    ],
    teamSize: 3,
  },
]

const priorities = [
  {
    id: '1',
    title: 'Q4 Fund Launch - Equi Growth Fund III',
    progress: 75,
    owner: { name: 'Sarah Chen' },
    dueDate: 'Dec 15',
    status: 'on-track' as const,
  },
  {
    id: '2',
    title: 'Annual Compliance Audit Completion',
    progress: 88,
    owner: { name: 'Michael Ross' },
    dueDate: 'Nov 30',
    status: 'on-track' as const,
  },
  {
    id: '3',
    title: 'Core System Migration to Cloud',
    progress: 45,
    owner: { name: 'Alex Kumar' },
    dueDate: 'Jan 31',
    status: 'at-risk' as const,
  },
  {
    id: '4',
    title: 'Client Portal 2.0 Launch',
    progress: 92,
    owner: { name: 'Emma Wilson' },
    dueDate: 'Nov 25',
    status: 'on-track' as const,
  },
  {
    id: '5',
    title: 'Senior Analyst Hiring Sprint',
    progress: 30,
    owner: { name: 'David Park' },
    dueDate: 'Dec 31',
    status: 'delayed' as const,
  },
]

const risks = [
  {
    id: '1',
    title: 'Regulatory Filing Deadline',
    category: 'compliance' as const,
    severity: 'critical' as const,
    description: 'SEC Form ADV annual update due in 10 days',
    impact: 'Potential fines and regulatory scrutiny',
    mitigation: 'Legal team working overtime to complete',
  },
  {
    id: '2',
    title: 'Market Volatility Impact',
    category: 'market' as const,
    severity: 'moderate' as const,
    description: 'Increased volatility affecting fund performance',
    impact: '2-3% performance deviation from benchmark',
    mitigation: 'Risk committee reviewing hedging strategies',
  },
  {
    id: '3',
    title: 'Key System Downtime',
    category: 'operations' as const,
    severity: 'moderate' as const,
    description: 'Trading system maintenance window extended',
    impact: 'Potential trading delays during maintenance',
    mitigation: 'Backup systems on standby, team alerted',
  },
  {
    id: '4',
    title: 'Vendor Contract Renewal',
    category: 'legal' as const,
    severity: 'low' as const,
    description: 'Bloomberg terminal contract expiring',
    impact: 'Potential service interruption if not renewed',
    mitigation: 'Procurement team negotiating renewal terms',
  },
]

const firmHealthFactors = [
  { label: 'Operational Efficiency', score: 94, weight: 0.3 },
  { label: 'Risk Management', score: 88, weight: 0.25 },
  { label: 'Team Performance', score: 91, weight: 0.2 },
  { label: 'Client Satisfaction', score: 92, weight: 0.15 },
  { label: 'Financial Health', score: 96, weight: 0.1 },
]

const actionItems = [
  { id: '1', title: 'Review Q4 Budget Allocations', type: 'decision', urgent: true },
  { id: '2', title: 'Approve Senior Hire Compensation', type: 'decision', urgent: false },
  { id: '3', title: 'Strategic Tech Stack Evaluation', type: 'decision', urgent: false },
]

export const Dashboard: React.FC = () => {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Key Metrics Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <MetricCard
          title="Assets Under Management"
          value={`$${(metrics.aum / 1000000000).toFixed(1)}B`}
          change={metrics.aumChange}
          changeLabel="vs last quarter"
          icon={DollarSign}
          status="success"
          sparkline={[65, 68, 72, 70, 75, 78, 82, 85, 88, 92]}
        />
        <MetricCard
          title="Active Funds"
          value={metrics.activeFunds}
          icon={Building2}
          status="success"
        />
        <MetricCard
          title="Team Size"
          value={metrics.teamSize}
          icon={Users}
          status="neutral"
        />
        <MetricCard
          title="Client Satisfaction"
          value={`${metrics.clientSatisfaction}%`}
          change={2.5}
          changeLabel="vs last month"
          icon={TrendingUp}
          status="success"
          sparkline={[88, 89, 87, 90, 91, 89, 92, 91, 92, 92]}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Health Score and Priorities */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <FirmHealthScore
              score={92}
              trend="up"
              factors={firmHealthFactors}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PriorityTracker priorities={priorities} />
          </motion.div>
        </div>

        {/* Center Column - Department Matrix */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Department Performance Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {departments.map((dept, index) => (
                    <motion.div
                      key={dept.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <DepartmentCard {...dept} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bottom Row - Risk Radar and Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <RiskRadar risks={risks} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Decision Queue</CardTitle>
                    <span className="text-sm text-equi-gray-400">
                      {actionItems.filter(item => item.urgent).length} urgent
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {actionItems.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between p-3 glass rounded-lg cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${item.urgent ? 'bg-equi-red-500' : 'bg-equi-blue-500'}`} />
                          <span className="text-sm text-equi-gray-200 group-hover:text-equi-gray-100">
                            {item.title}
                          </span>
                        </div>
                        <FileText className="w-4 h-4 text-equi-gray-500 group-hover:text-equi-gray-400" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-2 pt-4 border-t border-equi-gray-800">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-equi-gray-100">7</p>
                      <p className="text-xs text-equi-gray-500">Action Items</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-equi-amber-400">2</p>
                      <p className="text-xs text-equi-gray-500">Alerts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-equi-green-400">12</p>
                      <p className="text-xs text-equi-gray-500">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}