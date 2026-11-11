import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function Search() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''

  useEffect(() => {
    navigate(`/marketplace?q=${encodeURIComponent(query)}`, { replace: true })
  }, [query, navigate])

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#111827] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
