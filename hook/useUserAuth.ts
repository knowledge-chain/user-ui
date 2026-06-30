'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useUserAuth() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isUser = localStorage.getItem('knowledge-token')

    if (!isUser) {
      router.replace('/auth/login')
    } else {
      setLoading(false)
    }
  }, [router])

  return { loading }
}
