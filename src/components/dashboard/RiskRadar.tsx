import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { cn } from '../../lib/utils'

interface Risk {
  id: string
  title: string
  category: 'compliance' | 'market' | 'operations' | 'legal'
  severity: 'critical' | 'moderate' | 'low'
  description: string
  impact: string
  mitigation: string
}

interface RiskRadarProps {
  risks: Risk[]
}

const categoryPositions = {
  compliance: { x: -50, y: -50 },
  market: { x: 50, y: -50 },
  operations: { x: -50, y: 50 },
  legal: { x: 50, y: 50 },
}

const severityColors = {
  critical: 'bg-equi-red-500',
  moderate: 'bg-equi-amber-500',
  low: 'bg-equi-green-500',
}

const severitySizes = {
  critical: 'w-4 h-4',
  moderate: 'w-3 h-3',
  low: 'w-2 h-2',
}

export const RiskRadar: React.FC<RiskRadarProps> = ({ risks }) => {
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null)

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Risk Radar</CardTitle>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-equi-red-500" />
              <span className="text-equi-gray-400">Critical</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-equi-amber-500" />
              <span className="text-equi-gray-400">Moderate</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-equi-green-500" />
              <span className="text-equi-gray-400">Low</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-64">
          {/* Radar Grid */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <radialGradient id="radarGradient">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Background circles */}
            <circle cx="50%" cy="50%" r="30%" fill="none" stroke="rgb(31, 41, 55)" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="50%" cy="50%" r="60%" fill="none" stroke="rgb(31, 41, 55)" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="50%" cy="50%" r="90%" fill="none" stroke="rgb(31, 41, 55)" strokeWidth="1" strokeDasharray="2 2" />
            
            {/* Cross lines */}
            <line x1="50%" y1="5%" x2="50%" y2="95%" stroke="rgb(31, 41, 55)" strokeWidth="1" />
            <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="rgb(31, 41, 55)" strokeWidth="1" />
            
            {/* Center gradient */}
            <circle cx="50%" cy="50%" r="90%" fill="url(#radarGradient)" />
          </svg>

          {/* Category Labels */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-equi-gray-500 font-medium">
            Market
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-equi-gray-500 font-medium">
            Operations
          </div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-equi-gray-500 font-medium">
            Compliance
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-equi-gray-500 font-medium">
            Legal
          </div>

          {/* Risk Points */}
          <div className="absolute inset-0 flex items-center justify-center">
            {risks.map((risk, index) => {
              const position = categoryPositions[risk.category]
              const offset = {
                x: position.x + (Math.random() - 0.5) * 20,
                y: position.y + (Math.random() - 0.5) * 20,
              }

              return (
                <motion.button
                  key={risk.id}
                  className={cn(
                    'absolute rounded-full cursor-pointer hover:scale-125 transition-transform',
                    severityColors[risk.severity],
                    severitySizes[risk.severity]
                  )}
                  style={{
                    left: `calc(50% + ${offset.x}px)`,
                    top: `calc(50% + ${offset.y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedRisk(risk)}
                  whileHover={{ boxShadow: '0 0 20px currentColor' }}
                >
                  <span className="sr-only">{risk.title}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Risk Details */}
        <AnimatePresence mode="wait">
          {selectedRisk && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 glass rounded-xl"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className={cn(
                    'w-4 h-4 mt-0.5',
                    selectedRisk.severity === 'critical' && 'text-equi-red-400',
                    selectedRisk.severity === 'moderate' && 'text-equi-amber-400',
                    selectedRisk.severity === 'low' && 'text-equi-green-400'
                  )} />
                  <div>
                    <h4 className="font-medium text-sm">{selectedRisk.title}</h4>
                    <p className="text-xs text-equi-gray-400 mt-1">{selectedRisk.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRisk(null)}
                  className="text-equi-gray-500 hover:text-equi-gray-300"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div>
                  <span className="text-equi-gray-500">Impact:</span>
                  <p className="text-equi-gray-300 mt-0.5">{selectedRisk.impact}</p>
                </div>
                <div>
                  <span className="text-equi-gray-500">Mitigation:</span>
                  <p className="text-equi-gray-300 mt-0.5">{selectedRisk.mitigation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}