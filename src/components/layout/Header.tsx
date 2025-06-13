import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Settings, User, Search, Menu } from 'lucide-react'

interface HeaderProps {
  onMenuClick?: () => void
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="glass border-b border-equi-gray-800 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-equi-gray-800 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-equi-blue-600 to-equi-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-equi-green-500 rounded-full border-2 border-equi-dark" />
              </div>
              <div>
                <h1 className="text-lg font-semibold gradient-text">Operations Command Center</h1>
                <p className="text-xs text-equi-gray-500">Real-time operational intelligence</p>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-equi-gray-500" />
              <input
                type="text"
                placeholder="Search departments, metrics, or priorities..."
                className="w-full pl-10 pr-4 py-2 bg-equi-gray-900/50 border border-equi-gray-800 rounded-lg text-sm focus:outline-none focus:border-equi-blue-500/50 focus:ring-1 focus:ring-equi-blue-500/20 transition-all"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 hover:bg-equi-gray-800 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-equi-red-500 rounded-full" />
            </motion.button>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-equi-gray-800 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </motion.button>

            {/* User Menu */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 p-2 hover:bg-equi-gray-800 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-equi-gray-700 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-equi-gray-500">Head of Operations</p>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  )
}