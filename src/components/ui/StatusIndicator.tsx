import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface StatusIndicatorProps {
  status: 'green' | 'yellow' | 'red'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  pulse?: boolean
}

const sizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
}

const statusClasses = {
  green: 'status-green',
  yellow: 'status-yellow',
  red: 'status-red',
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  label,
  pulse = true,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <motion.div
          className={cn(sizeClasses[size], statusClasses[status])}
          animate={pulse ? { scale: [1, 1.2, 1] } : undefined}
          transition={pulse ? { duration: 2, repeat: Infinity } : undefined}
        />
        {pulse && (
          <motion.div
            className={cn(
              sizeClasses[size],
              statusClasses[status],
              'absolute inset-0 animate-ping'
            )}
            style={{ animationDuration: '2s' }}
          />
        )}
      </div>
      {label && (
        <span className="text-sm text-equi-gray-400">{label}</span>
      )}
    </div>
  )
}