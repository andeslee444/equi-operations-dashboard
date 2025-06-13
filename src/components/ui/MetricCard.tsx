import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react'
import { cn, formatNumber, formatPercentage } from '../../lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  status?: 'success' | 'warning' | 'danger' | 'neutral'
  sparkline?: number[]
  loading?: boolean
}

const statusColors = {
  success: 'text-equi-green-400',
  warning: 'text-equi-amber-400',
  danger: 'text-equi-red-400',
  neutral: 'text-equi-gray-400',
}

const statusBgColors = {
  success: 'bg-equi-green-500/10',
  warning: 'bg-equi-amber-500/10',
  danger: 'bg-equi-red-500/10',
  neutral: 'bg-equi-gray-500/10',
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  status = 'neutral',
  sparkline,
  loading = false,
}) => {
  const getTrendIcon = () => {
    if (!change) return Minus
    return change > 0 ? TrendingUp : TrendingDown
  }

  const TrendIcon = getTrendIcon()
  const trendStatus = change && change > 0 ? 'success' : change && change < 0 ? 'danger' : 'neutral'

  return (
    <motion.div
      className="metric-card group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-equi-gray-400 text-sm font-medium">{title}</p>
          {loading ? (
            <div className="skeleton h-8 w-24 mt-1" />
          ) : (
            <motion.p
              className="text-2xl font-bold text-equi-gray-100 mt-1 number-animate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {typeof value === 'number' ? formatNumber(value) : value}
            </motion.p>
          )}
        </div>
        {Icon && (
          <div className={cn('p-3 rounded-xl', statusBgColors[status])}>
            <Icon className={cn('w-5 h-5', statusColors[status])} />
          </div>
        )}
      </div>

      {sparkline && !loading && (
        <div className="h-12 mb-3">
          <svg className="w-full h-full" viewBox="0 0 100 40">
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
              points={sparkline
                .map((val, i) => `${(i / (sparkline.length - 1)) * 100},${40 - (val / Math.max(...sparkline)) * 35}`)
                .join(' ')}
            />
            <polygon
              fill={`url(#gradient-${title})`}
              points={`0,40 ${sparkline
                .map((val, i) => `${(i / (sparkline.length - 1)) * 100},${40 - (val / Math.max(...sparkline)) * 35}`)
                .join(' ')} 100,40`}
            />
          </svg>
        </div>
      )}

      {change !== undefined && !loading && (
        <div className="flex items-center gap-2">
          <div className={cn('flex items-center gap-1', statusColors[trendStatus])}>
            <TrendIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{formatPercentage(Math.abs(change))}</span>
          </div>
          {changeLabel && (
            <span className="text-equi-gray-500 text-sm">{changeLabel}</span>
          )}
        </div>
      )}
    </motion.div>
  )
}