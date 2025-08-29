import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [message, setMessage] = useState('')

  const handleSignUp = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    // Validazione password
    if (password !== confirmPassword) {
      setMessage('Le password non coincidono')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage('La password deve essere di almeno 6 caratteri')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName || 'Nome Utente',
            avatar_url: null
          }
        }
      })
      
      if (error) {
        setMessage(`Errore: ${error.message}`)
      } else {
        setMessage('Registrazione riuscita! Controlla la tua email per confermare l\'account.')
        // Reset form
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setFullName('')
      }
    } catch (err) {
      setMessage(`Errore imprevisto: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-surface-secondary rounded-3xl p-8 md:p-12 shadow-2xl border border-gold-400/20">
          <h1 className="text-3xl md:text-4xl font-bold text-gold-400 text-center mb-4">
            Registrazione
          </h1>
          <p className="text-text-primary/70 text-center mb-8 text-lg">
            Crea il tuo account
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

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <input
                className="w-full px-6 py-4 bg-dark-900 border-2 border-dark-900 rounded-2xl text-text-primary placeholder-text-primary/50 focus:border-gold-400 focus:outline-none transition-all duration-300"
                type="text"
                placeholder="Nome completo"
                value={fullName}
                required={true}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
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
                placeholder="Password"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                className="w-full px-6 py-4 bg-dark-900 border-2 border-dark-900 rounded-2xl text-text-primary placeholder-text-primary/50 focus:border-gold-400 focus:outline-none transition-all duration-300"
                type="password"
                placeholder="Conferma password"
                value={confirmPassword}
                required={true}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <button 
                className="w-full px-6 py-4 bg-gradient-to-r from-gold-400 to-gold-300 text-dark-950 font-semibold rounded-2xl hover:from-gold-300 hover:to-gold-400 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loading}
              >
                {loading ? <span>Caricamento...</span> : <span>Registrati</span>}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-text-primary/70 mb-4">
              Hai già un account?
            </p>
            <a 
              href="/login"
              className="inline-block px-6 py-3 bg-transparent text-gold-400 border-2 border-gold-400 rounded-2xl font-semibold hover:bg-gold-400 hover:text-dark-950 transition-all duration-300"
            >
              Accedi
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
