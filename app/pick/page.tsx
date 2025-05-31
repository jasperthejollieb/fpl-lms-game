'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function PickPage() {
  const [user, setUser] = useState<User | null>(null)
  const [playerId, setPlayerId] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()
  }, [])

  const handleSubmit = async () => {
    if (!playerId) return
    setLoading(true)

    if (!user) {
      console.error('User is not available during submission.')
      return // or handle the error appropriately
    }

    const { error } = await supabase.from('picks').insert({
      user_id: user.id,
      gw: 38, // placeholder, replace with current GW
      player_id: playerId,
    })

    setLoading(false)
    if (!error) setSubmitted(true)
    else console.error('Submit error:', error)
  }

  if (!user) return <p>Loading...</p>
  if (submitted) return <p>✅ Pick submitted!</p>

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Make Your Pick</h1>
      <input
        type="text"
        placeholder="Enter FPL Player ID"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
        className="border px-3 py-2 rounded mr-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Pick'}
      </button>
    </main>
  )
}
