'use client'

import { Check } from 'lucide-react'

interface RegisterStepperProps {
  currentStep: number
  steps: string[]
}

export function RegisterStepper({ currentStep, steps }: RegisterStepperProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((label, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${isCompleted
                    ? 'bg-[var(--color-primary)] text-white'
                    : isCurrent
                      ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30'
                      : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
              </div>
              <span
                className={`
                  text-xs mt-2 font-medium whitespace-nowrap
                  ${isCurrent ? 'text-[var(--color-primary)]' : isCompleted ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}
                `}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`
                  w-16 sm:w-24 h-0.5 mx-2 mb-6 transition-all duration-300
                  ${stepNumber < currentStep ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
