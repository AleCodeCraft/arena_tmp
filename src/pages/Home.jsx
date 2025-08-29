import { useNavigate } from 'react-router-dom'
import { supabase } from '../authentication/supabaseClient'

export default function Home() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Errore logout:', error)
      } else {
        navigate('/login')
      }
    } catch (err) {
      console.error('Errore imprevisto:', err)
    }
  }

  const handleProfile = () => {
    navigate('/profile')
  }

  return (
    <div className="min-h-screen bg-dark-950 text-text-primary">
      {/* Header */}
      <header className="bg-surface-secondary border-b border-gold-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gold-400">
              🏟️ Arena
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleProfile}
                className="px-4 py-2 bg-gold-400 text-dark-950 font-semibold rounded-lg hover:bg-gold-300 transition-colors duration-200"
              >
                👤 Profilo
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-transparent text-gold-400 border border-gold-400 rounded-lg hover:bg-gold-400 hover:text-dark-950 transition-colors duration-200"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gold-400 mb-6">
            Benvenuto nell'Arena! 🎯
          </h2>
          <p className="text-xl md:text-2xl text-text-primary/80 mb-12 max-w-3xl mx-auto">
            La tua piattaforma per gestire eventi, tornei e competizioni in modo semplice ed efficace.
          </p>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="bg-surface-secondary rounded-2xl p-8 border border-gold-400/20 hover:border-gold-400/40 transition-all duration-300">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gold-400 mb-3">Gestione Tornei</h3>
              <p className="text-text-primary/70">
                Crea e gestisci tornei con bracket automatici e statistiche in tempo reale.
              </p>
            </div>
            
            <div className="bg-surface-secondary rounded-2xl p-8 border border-gold-400/20 hover:border-gold-400/40 transition-all duration-300">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gold-400 mb-3">Squadre e Giocatori</h3>
              <p className="text-text-primary/70">
                Gestisci squadre, giocatori e le loro performance con dashboard dettagliate.
              </p>
            </div>
            
            <div className="bg-surface-secondary rounded-2xl p-8 border border-gold-400/20 hover:border-gold-400/40 transition-all duration-300">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gold-400 mb-3">Statistiche Avanzate</h3>
              <p className="text-text-primary/70">
                Analizza performance, trend e risultati con grafici interattivi e report dettagliati.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16">
            <button
              onClick={handleProfile}
              className="px-8 py-4 bg-gradient-to-r from-gold-400 to-gold-300 text-dark-950 font-bold text-lg rounded-2xl hover:from-gold-300 hover:to-gold-400 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl"
            >
              🚀 Inizia Ora
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
