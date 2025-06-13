import React from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, CheckCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { StatusIndicator } from '../ui/StatusIndicator'
import { cn, formatPercentage } from '../../lib/utils'

interface DepartmentCardProps {
  name: string
  status: 'green' | 'yellow' | 'red'
  goals: {
    completed: number
    total: number
  }
  budget: {
    used: number
    total: number
  }
  metrics?: {
    label: string
    value: string | number
  }[]
  teamSize?: number
  onClick?: () => void
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({
  name,
  status,
  goals,
  budget,
  metrics = [],
  teamSize,
  onClick,
}) => {
  const goalsPercentage = (goals.completed / goals.total) * 100
  const budgetPercentage = (budget.used / budget.total) * 100
  const budgetStatus = budgetPercentage > 100 ? 'red' : budgetPercentage > 90 ? 'yellow' : 'green'

  return (
    <Card hover glow onClick={onClick} className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{name}</CardTitle>
          <StatusIndicator status={status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Goals Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-equi-gray-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Goals
              </span>
              <span className="text-sm font-medium">
                {goals.completed}/{goals.total}
              </span>
            </div>
            <div className="h-2 bg-equi-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-equi-blue-500 to-equi-blue-400"
                initial={{ width: 0 }}
                animate={{ width: `${goalsPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Budget Usage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-equi-gray-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Budget
              </span>
              <span className={cn(
                'text-sm font-medium',
                budgetStatus === 'red' && 'text-equi-red-400',
                budgetStatus === 'yellow' && 'text-equi-amber-400'
              )}>
                {formatPercentage(budgetPercentage, 0)}
              </span>
            </div>
            <div className="h-2 bg-equi-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  'h-full',
                  budgetStatus === 'green' && 'bg-gradient-to-r from-equi-green-500 to-equi-green-400',
                  budgetStatus === 'yellow' && 'bg-gradient-to-r from-equi-amber-500 to-equi-amber-400',
                  budgetStatus === 'red' && 'bg-gradient-to-r from-equi-red-500 to-equi-red-400'
                )}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Additional Metrics */}
          {metrics.length > 0 && (
            <div className="pt-2 border-t border-equi-gray-800">
              {metrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between py-1">
                  <span className="text-xs text-equi-gray-500">{metric.label}</span>
                  <span className="text-xs font-medium text-equi-gray-300">{metric.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Team Size */}
          {teamSize && (
            <div className="flex items-center justify-between pt-2 border-t border-equi-gray-800">
              <span className="text-xs text-equi-gray-500 flex items-center gap-1">
                <Users className="w-3 h-3" />
                Team Size
              </span>
              <span className="text-xs font-medium text-equi-gray-300">{teamSize}</span>
            </div>
          )}
        </div>

        {/* Hover Action */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-12 flex items-center justify-center bg-gradient-to-t from-equi-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        >
          <span className="text-sm font-medium text-equi-blue-400">View Details →</span>
        </motion.div>
      </CardContent>
    </Card>
  )
}