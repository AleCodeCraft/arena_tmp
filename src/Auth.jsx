import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth({ onSwitchToSignUp }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      
      if (error) {
        setMessage(`Errore: ${error.message}`)
      } else {
        setMessage('Login riuscito! Reindirizzamento...')
        // Il componente App si aggiornerà automaticamente
      }
    } catch (err) {
      setMessage(`Errore imprevisto: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      })
      
      if (error) {
        setMessage(`Errore Google: ${error.message}`)
        setLoading(false)
      }
      // Se non c'è errore, l'utente verrà reindirizzato automaticamente
    } catch (err) {
      setMessage(`Errore imprevisto: ${err.message}`)
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-surface-secondary rounded-3xl p-8 md:p-12 shadow-2xl border border-gold-400/20">
          <h1 className="text-3xl md:text-4xl font-bold text-gold-400 text-center mb-4">
            Benvenuto
          </h1>
          <p className="text-text-primary/70 text-center mb-8 text-lg">
            Accedi al tuo account
          </p>
          
          {message && (
            <div className={`p-4 rounded-2xl mb-6 text-sm ${
              message.includes('Errore') 
                ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                : 'bg-green-500/10 text-green-400 border border-green-500/20'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                className="w-full px-6 py-4 bg-dark-900 border-2 border-dark-900 rounded-2xl text-text-primary placeholder-text-primary/50 focus:border-gold-400 focus:outline-none transition-all duration-300"
                type="email"
                placeholder="La tua email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                className="w-full px-6 py-4 bg-dark-900 border-2 border-dark-900 rounded-2xl text-text-primary placeholder-text-primary/50 focus:border-gold-400 focus:outline-none transition-all duration-300"
                type="password"
                placeholder="La tua password"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button 
                className="w-full px-6 py-4 bg-gradient-to-r from-gold-400 to-gold-300 text-dark-950 font-semibold rounded-2xl hover:from-gold-300 hover:to-gold-400 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loading}
              >
                {loading ? <span>Caricamento...</span> : <span>Accedi</span>}
              </button>
            </div>
          </form>

          {/* Separatore */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-dark-900"></div>
            <span className="px-4 text-text-primary/50 text-sm">oppure</span>
            <div className="flex-1 border-t border-dark-900"></div>
          </div>

          {/* Bottone Google */}
          <button 
            className="w-full px-6 py-4 bg-white text-gray-800 border-2 border-gray-200 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            onClick={handleGoogleLogin}
            disabled={loading}
            type="button"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Accedi con Google</span>
          </button>

          <div className="mt-8 text-center">
            <p className="text-text-primary/70 mb-4">
              Non hai ancora un account?
            </p>
            <button 
              className="px-6 py-3 bg-transparent text-gold-400 border-2 border-gold-400 rounded-2xl font-semibold hover:bg-gold-400 hover:text-dark-950 transition-all duration-300"
              type="button" 
              onClick={onSwitchToSignUp}
            >
              Registrati
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}