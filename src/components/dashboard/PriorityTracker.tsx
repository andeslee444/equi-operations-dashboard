import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Clock, User } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { cn } from '../../lib/utils'

interface Priority {
  id: string
  title: string
  progress: number
  owner: {
    name: string
    avatar?: string
  }
  dueDate: string
  status: 'on-track' | 'at-risk' | 'delayed'
}

interface PriorityTrackerProps {
  priorities: Priority[]
  onViewAll?: () => void
}

const statusColors = {
  'on-track': 'bg-equi-green-500',
  'at-risk': 'bg-equi-amber-500',
  'delayed': 'bg-equi-red-500',
}

const statusBgColors = {
  'on-track': 'bg-equi-green-500/20',
  'at-risk': 'bg-equi-amber-500/20',
  'delayed': 'bg-equi-red-500/20',
}

export const PriorityTracker: React.FC<PriorityTrackerProps> = ({ priorities, onViewAll }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Weekly Priorities</CardTitle>
          <button
            onClick={onViewAll}
            className="text-sm text-equi-blue-400 hover:text-equi-blue-300 transition-colors flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {priorities.map((priority, index) => (
            <motion.div
              key={priority.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <span className="text-xs font-medium text-equi-gray-500">
                    {index + 1}.
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-medium text-equi-gray-200 truncate group-hover:text-equi-gray-100 transition-colors">
                      {priority.title}
                    </h4>
                    <div className={cn(
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      statusBgColors[priority.status],
                      priority.status === 'on-track' && 'text-equi-green-400',
                      priority.status === 'at-risk' && 'text-equi-amber-400',
                      priority.status === 'delayed' && 'text-equi-red-400'
                    )}>
                      {priority.status.replace('-', ' ')}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 bg-equi-gray-800 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className={cn('h-full', statusColors[priority.status])}
                      initial={{ width: 0 }}
                      animate={{ width: `${priority.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 + 0.2 }}
                    />
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {priority.owner.avatar ? (
                        <img
                          src={priority.owner.avatar}
                          alt={priority.owner.name}
                          className="w-5 h-5 rounded-full"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-equi-gray-700 flex items-center justify-center">
                          <User className="w-3 h-3 text-equi-gray-400" />
                        </div>
                      )}
                      <span className="text-xs text-equi-gray-400">
                        {priority.owner.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-equi-gray-500">
                      <Clock className="w-3 h-3" />
                      {priority.dueDate}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}