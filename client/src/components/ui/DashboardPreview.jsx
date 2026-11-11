import React from 'react'
import { BarChart3, Users, Calendar, TrendingUp, Activity } from 'lucide-react'

const DashboardPreview = ({ type = 'crm', className = '' }) => {
  const renderDashboard = () => {
    switch (type) {
      case 'hospital':
        return (
          <div className="w-full h-full bg-white p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-2 bg-[#FFC800] rounded w-16"></div>
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="bg-[#111827]/10 rounded p-1">
                <Users className="w-2 h-2 text-[#111827] mb-0.5" />
                <div className="h-1 bg-[#111827]/60 rounded w-full"></div>
              </div>
              <div className="bg-[#FFC800]/20 rounded p-1">
                <Calendar className="w-2 h-2 text-[#E6B400] mb-0.5" />
                <div className="h-1 bg-[#111827]/60 rounded w-full"></div>
              </div>
              <div className="bg-[#111827]/10 rounded p-1">
                <Activity className="w-2 h-2 text-[#111827] mb-0.5" />
                <div className="h-1 bg-[#111827]/60 rounded w-full"></div>
              </div>
            </div>
            <div className="space-y-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex space-x-1 items-center">
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 h-1 bg-gray-200 rounded"></div>
                  <div className="w-3 h-1 bg-[#111827]/40 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        )
      case 'crm':
        return (
          <div className="w-full h-full bg-white p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-2 bg-[#FFC800] rounded w-12"></div>
              <BarChart3 className="w-3 h-3 text-[#111827]" />
            </div>
            <div className="flex items-end space-x-0.5 h-8">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-[#111827] to-[#FFC800] rounded-t" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <div className="h-1 bg-gray-200 rounded w-8"></div>
                <div className="h-1 bg-[#111827]/60 rounded w-6"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-1 bg-gray-200 rounded w-10"></div>
                <div className="h-1 bg-[#FFC800] rounded w-5"></div>
              </div>
            </div>
          </div>
        )
      case 'inventory':
        return (
          <div className="w-full h-full bg-white p-3 space-y-2">
            <div className="h-2 bg-[#FFC800] rounded w-14"></div>
            <div className="grid grid-cols-2 gap-1">
              <div className="bg-gray-100 rounded p-1">
                <div className="h-1 bg-[#111827]/60 rounded mb-0.5"></div>
                <div className="h-1.5 bg-[#111827]/40 rounded w-1/2"></div>
              </div>
              <div className="bg-gray-100 rounded p-1">
                <div className="h-1 bg-[#111827]/60 rounded mb-0.5"></div>
                <div className="h-1.5 bg-[#FFC800] rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-0.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-[#111827]/30 rounded"></div>
                  <div className="flex-1 h-1 bg-gray-200 rounded"></div>
                  <div className="w-2 h-1 bg-gray-400 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return (
          <div className="w-full h-full bg-white p-3 flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-6 h-6 text-[#111827] mx-auto mb-1" />
              <div className="h-1 bg-gray-400 rounded w-8 mx-auto"></div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-lg border border-gray-200 ${className}`}>
      {renderDashboard()}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}

export default DashboardPreview
