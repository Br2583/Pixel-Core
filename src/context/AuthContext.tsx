// TODO: replace with real auth backend (Supabase/Firebase) for production.
import { createContext, useContext, useState, type ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  hasDiscount: boolean
  createdAt: string
}

interface StoredUser extends User {
  passwordHash: string
}

interface AuthContextValue {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

const SESSION_KEY = 'pixelcore_user'
const USERS_KEY   = 'pixelcore_users'

function hash(pw: string): string { return btoa(pw) }

function readSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch { return null }
}

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as StoredUser[]) : []
  } catch { return [] }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readSession)

  function persist(u: User | null) {
    setUser(u)
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u))
    else    localStorage.removeItem(SESSION_KEY)
  }

  async function login(email: string, password: string) {
    const users  = readUsers()
    const stored = users.find(u => u.email === email && u.passwordHash === hash(password))
    if (!stored) throw new Error('Invalid email or password')
    const session: User = {
      id:          stored.id,
      name:        stored.name,
      email:       stored.email,
      hasDiscount: stored.hasDiscount,
      createdAt:   stored.createdAt,
    }
    persist(session)
  }

  async function register(name: string, email: string, password: string) {
    const users = readUsers()
    if (users.find(u => u.email === email)) throw new Error('Email already registered')
    const newUser: StoredUser = {
      id:           Date.now().toString(),
      name,
      email,
      hasDiscount:  true,
      createdAt:    new Date().toISOString(),
      passwordHash: hash(password),
    }
    users.push(newUser)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    const session: User = {
      id:          newUser.id,
      name:        newUser.name,
      email:       newUser.email,
      hasDiscount: newUser.hasDiscount,
      createdAt:   newUser.createdAt,
    }
    persist(session)
  }

  function logout() { persist(null) }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
