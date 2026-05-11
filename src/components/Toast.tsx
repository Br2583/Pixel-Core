import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  message: string
  type: ToastType
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let _nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++_nextId
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4200)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 pointer-events-none" aria-live="polite">
        {toasts.map(t => (
          <ToastBubble
            key={t.id}
            {...t}
            onDismiss={() => setToasts(ts => ts.filter(x => x.id !== t.id))}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastBubble({
  message,
  type,
  onDismiss,
}: {
  message: string
  type: ToastType
  onDismiss: () => void
}) {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const iv = setInterval(() => setProgress(p => Math.max(0, p - (100 / 42))), 100)
    return () => clearInterval(iv)
  }, [])

  const border = type === 'success' ? 'border-green-200' : type === 'error' ? 'border-red-200' : 'border-blue-200'
  const bar    = type === 'success' ? 'bg-green-500'    : type === 'error' ? 'bg-red-500'    : 'bg-blue-500'
  const text   = type === 'success' ? 'text-green-800'  : type === 'error' ? 'text-red-800'  : 'text-blue-800'

  return (
    <div className={`pointer-events-auto w-80 bg-white rounded-xl border shadow-xl overflow-hidden animate-slide-up ${border}`}>
      <div className={`flex items-start gap-3 px-4 py-3 ${text}`}>
        <span className="text-sm font-medium flex-1 leading-snug">{message}</span>
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600 transition-colors text-xs mt-0.5 flex-shrink-0"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
      <div className="h-0.5 bg-gray-100">
        <div className={`h-full transition-all duration-100 ${bar}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
