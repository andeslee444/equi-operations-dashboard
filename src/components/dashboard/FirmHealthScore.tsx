import React from 'react'
import { motion } from 'framer-motion'
import { Activity, TrendingUp, AlertTriangle } from 'lucide-react'
import { cn } from '../../lib/utils'

interface FirmHealthScoreProps {
  score: number
  trend: 'up' | 'down' | 'stable'
  factors: {
    label: string
    score: number
    weight: number
  }[]
}

export const FirmHealthScore: React.FC<FirmHealthScoreProps> = ({ score, trend, factors }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-equi-green-400'
    if (score >= 60) return 'text-equi-amber-400'
    return 'text-equi-red-400'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-equi-green-500 to-equi-green-400'
    if (score >= 60) return 'from-equi-amber-500 to-equi-amber-400'
    return 'from-equi-red-500 to-equi-red-400'
  }

  const radius = 60
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-5" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-equi-blue-500/10 rounded-xl">
              <Activity className="w-5 h-5 text-equi-blue-400" />
            </div>
            <h3 className="text-lg font-semibold">Firm Health Score</h3>
          </div>
          <div className="flex items-center gap-2">
            {trend === 'up' && <TrendingUp className="w-4 h-4 text-equi-green-400" />}
            {trend === 'down' && <TrendingUp className="w-4 h-4 text-equi-red-400 rotate-180" />}
            <span className={cn(
              'text-sm font-medium',
              trend === 'up' && 'text-equi-green-400',
              trend === 'down' && 'text-equi-red-400',
              trend === 'stable' && 'text-equi-gray-400'
            )}>
              {trend === 'up' ? '+2.3%' : trend === 'down' ? '-1.5%' : '0%'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <svg className="w-32 h-32 -rotate-90">
              {/* Background circle */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                fill="none"
                stroke="rgb(31, 41, 55)"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <motion.circle
                cx="64"
                cy="64"
                r={radius}
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className={cn('text-equi-green-500', getScoreColor(score))} stopColor="currentColor" />
                  <stop offset="100%" className={cn('text-equi-green-400', getScoreColor(score))} stopColor="currentColor" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className={cn('text-4xl font-bold tabular-nums', getScoreColor(score))}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {score}
              </motion.span>
              <span className="text-xs text-equi-gray-500 font-medium">out of 100</span>
            </div>
          </div>
        </div>

        {/* Factor Breakdown */}
        <div className="space-y-3">
          {factors.map((factor, index) => (
            <motion.div
              key={factor.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-equi-gray-400">{factor.label}</span>
                <span className={cn('text-xs font-medium', getScoreColor(factor.score))}>
                  {factor.score}
                </span>
              </div>
              <div className="h-1.5 bg-equi-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className={cn('h-full bg-gradient-to-r', getScoreGradient(factor.score))}
                  initial={{ width: 0 }}
                  animate={{ width: `${factor.score}%` }}
                  transition={{ duration: 1, delay: 1 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {score < 70 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-4 p-3 bg-equi-amber-500/10 border border-equi-amber-500/20 rounded-lg"
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-equi-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-equi-amber-200">
                Health score below target. Review operational metrics for improvement areas.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}