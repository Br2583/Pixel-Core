import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/components/Toast'

interface AuthModalProps {
  open: boolean
  onClose: () => void
  defaultTab?: 'signin' | 'register'
}

type Tab = 'signin' | 'register'

export default function AuthModal({ open, onClose, defaultTab = 'signin' }: AuthModalProps) {
  const [tab,     setTab]     = useState<Tab>(defaultTab)
  const { login, register }   = useAuth()
  const { showToast }         = useToast()

  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const [signInForm, setSignInForm] = useState({ email: '', password: '' })
  const [regForm,    setRegForm]    = useState({
    name: '', email: '', password: '', confirm: '', subscribe: false,
  })

  useEffect(() => {
    if (open) {
      setTab(defaultTab)
      setError('')
    }
  }, [open, defaultTab])

  useEffect(() => { setError('') }, [tab])

  if (!open) return null

  const inputCls =
    'w-full px-4 py-3 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition'

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!signInForm.email || !signInForm.password) return
    setLoading(true)
    try {
      await login(signInForm.email, signInForm.password)
      showToast('Welcome back!', 'success')
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (regForm.password !== regForm.confirm) { setError('Passwords do not match'); return }
    if (regForm.password.length < 6)          { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await register(regForm.name, regForm.email, regForm.password)
      showToast('Welcome to Pixel Core! Your 15% discount is active.', 'success')
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">
            {tab === 'signin' ? 'Welcome back' : 'Create your account'}
          </h2>
          {tab === 'register' && (
            <p className="text-sm text-primary font-medium mt-1">✦ Get 15% off your first project</p>
          )}
        </div>

        {/* Tab switcher */}
        <div className="relative flex rounded-lg bg-gray-100 p-1 mb-6">
          <div
            className="absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-all duration-200"
            style={{ left: tab === 'signin' ? '4px' : '50%', width: 'calc(50% - 4px)' }}
          />
          {(['signin', 'register'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-medium relative z-10 transition-colors ${
                tab === t ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {t === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {tab === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email" required placeholder="your@email.com"
                value={signInForm.email}
                onChange={e => setSignInForm(s => ({ ...s, email: e.target.value }))}
                className={inputCls}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-foreground">Password</label>
                <button
                  type="button"
                  onClick={() => showToast('Feature coming soon', 'info')}
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password" required placeholder="••••••••"
                value={signInForm.password}
                onChange={e => setSignInForm(s => ({ ...s, password: e.target.value }))}
                className={inputCls}
              />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button type="button" onClick={() => setTab('register')} className="text-primary font-medium hover:underline">
                Sign up free
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
              <input
                type="text" required placeholder="Your full name"
                value={regForm.name}
                onChange={e => setRegForm(r => ({ ...r, name: e.target.value }))}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email" required placeholder="your@email.com"
                value={regForm.email}
                onChange={e => setRegForm(r => ({ ...r, email: e.target.value }))}
                className={inputCls}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                <input
                  type="password" required placeholder="Min. 6 chars"
                  value={regForm.password}
                  onChange={e => setRegForm(r => ({ ...r, password: e.target.value }))}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Confirm</label>
                <input
                  type="password" required placeholder="Repeat"
                  value={regForm.confirm}
                  onChange={e => setRegForm(r => ({ ...r, confirm: e.target.value }))}
                  className={inputCls}
                />
              </div>
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={regForm.subscribe}
                onChange={e => setRegForm(r => ({ ...r, subscribe: e.target.checked }))}
                className="mt-0.5 accent-primary"
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                I agree to receive project updates and exclusive offers
              </span>
            </label>
            {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create Account →'}
            </button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <button type="button" onClick={() => setTab('signin')} className="text-primary font-medium hover:underline">
                Sign in
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
