'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestPage() {
  useEffect(() => {
    const testSupabase = async () => {
      const { data, error } = await supabase.from('test').select('*')
      console.log('✅ Supabase working!', { data, error })
    }

    testSupabase()
  }, [])

  return (
    <main>
      <h1>Testing Supabase...</h1>
      <p>Check your browser console.</p>
    </main>
  )
}
