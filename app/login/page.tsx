'use client'

import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'twitter',
    })
    if (error) console.error('Login error:', error)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login to FPL LMS</h1>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Sign in with Twitter
      </button>
    </main>
  )
}
