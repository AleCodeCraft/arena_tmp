import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-dark-950 text-text-primary flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="text-8xl md:text-9xl font-bold text-gold-400 mb-6">
          404
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gold-400 mb-4">
          Pagina Non Trovata! 😵
        </h1>
        
        <p className="text-xl text-text-primary/80 mb-8">
          Ops! La pagina che stai cercando non esiste o è stata spostata.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-300 text-dark-950 font-semibold rounded-xl hover:from-gold-300 hover:to-gold-400 transition-all duration-300 transform hover:-translate-y-1"
          >
            🏠 Torna alla Home
          </button>
          
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-transparent text-gold-400 border border-gold-400 rounded-xl hover:bg-gold-400 hover:text-dark-950 transition-all duration-300"
          >
            ⬅️ Torna Indietro
          </button>
        </div>
      </div>
    </div>
  )
}
