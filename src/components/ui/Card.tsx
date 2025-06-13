import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  gradient?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hover = false, glow = false, gradient = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'glass rounded-2xl p-6 relative overflow-hidden',
          hover && 'card-hover cursor-pointer',
          glow && 'hover-glow',
          gradient && 'gradient-border',
          className
        )}
        whileHover={hover ? { y: -4 } : undefined}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-br from-equi-blue-500/10 to-purple-500/10 pointer-events-none" />
        )}
        <div className="relative z-10">{children}</div>
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mb-4', className)} {...props}>
        {children}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  className?: string
  gradient?: boolean
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, gradient = false, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          'text-lg font-semibold',
          gradient && 'gradient-text',
          className
        )}
        {...props}
      >
        {children}
      </h3>
    )
  }
)

CardTitle.displayName = 'CardTitle'

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('', className)} {...props}>
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'CardContent'