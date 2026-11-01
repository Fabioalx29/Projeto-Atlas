import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { CircleAlert, CircleCheck } from 'lucide-react'

type ToastTone = 'success' | 'error'

interface ToastItem {
  id: number
  message: string
  tone: ToastTone
}

interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const TOAST_DURATION_MS = 3500
const MAX_TOASTS = 3

/** Mensagens curtas e discretas ("Adicionado aos favoritos"), anunciadas a leitores de tela. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(1)
  const timers = useRef(new Set<number>())

  useEffect(() => {
    const active = timers.current
    return () => active.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const showToast = useCallback((message: string, tone: ToastTone = 'success') => {
    const id = nextId.current++
    setToasts((current) => [...current.slice(-(MAX_TOASTS - 1)), { id, message, tone }])
    const timer = window.setTimeout(() => {
      timers.current.delete(timer)
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, TOAST_DURATION_MS)
    timers.current.add(timer)
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4"
      >
        {toasts.map(({ id, message, tone }) => {
          const Icon = tone === 'error' ? CircleAlert : CircleCheck
          return (
            <div
              key={id}
              className="animate-rise pointer-events-auto flex max-w-md items-center gap-3 rounded-full bg-forest px-5 py-3 text-sm text-ivory shadow-card"
            >
              <Icon
                size={18}
                aria-hidden="true"
                className={tone === 'error' ? 'text-red-300' : 'text-gold'}
              />
              {message}
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast deve ser usado dentro de <ToastProvider>')
  return context
}
