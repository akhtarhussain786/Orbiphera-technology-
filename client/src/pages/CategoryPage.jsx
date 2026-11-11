import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function CategoryPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      navigate(`/marketplace?category=${encodeURIComponent(slug)}`, { replace: true })
    } else {
      navigate('/categories', { replace: true })
    }
  }, [slug, navigate])

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#111827] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
