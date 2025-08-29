import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary ha catturato un errore:', error, errorInfo)
    
    // Qui puoi inviare l'errore a un servizio di monitoring
    // come Sentry, LogRocket, etc.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-dark-950 text-text-primary">
          <h1 className="text-3xl md:text-4xl font-bold text-gold-400 mb-4">
            😕 Qualcosa è andato storto
          </h1>
          <p className="text-lg mb-8 text-text-primary/70 max-w-md">
            Si è verificato un errore imprevisto. Prova a ricaricare la pagina.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-300 text-dark-950 font-semibold rounded-2xl hover:from-gold-300 hover:to-gold-400 transition-all duration-300 transform hover:-translate-y-1"
          >
            Ricarica Pagina
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
