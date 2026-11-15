import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled runtime error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07090E] text-white flex items-center justify-center p-6 selection:bg-[#FFC800] selection:text-[#111827]">
          <div className="bg-[#10151E] border border-red-500/30 rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/30 mx-auto flex items-center justify-center text-red-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-white">Application Runtime Notice</h2>
              <p className="text-xs text-gray-400">
                An unexpected interface issue occurred. The application state has been safely isolated.
              </p>
            </div>
            {this.state.error && (
              <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-left">
                <p className="font-mono text-[11px] text-red-300 break-words">
                  {this.state.error?.message || 'Unknown error'}
                </p>
              </div>
            )}
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex items-center space-x-2 px-5 py-2.5 bg-[#FFC800] hover:bg-[#E6B400] text-[#111827] font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(255,200,0,0.25)] transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
              <a
                href="/"
                className="flex items-center space-x-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 font-semibold text-xs rounded-xl border border-white/10 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
