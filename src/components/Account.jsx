import { useState, useEffect } from 'react'
import { supabase } from '../authentication/supabaseClient'
import Avatar from './Avatar'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.username)
          setWebsite(data.website)
          setAvatarUrl(data.avatar_url)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])

  async function updateProfile(event, avatarUrl) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <div className="bg-surface-secondary rounded-3xl p-8 md:p-12 shadow-2xl border border-gold-400/20">
          <h1 className="text-3xl md:text-4xl font-bold text-gold-400 text-center mb-8">
            Profilo Utente
          </h1>
          
          <form onSubmit={updateProfile} className="space-y-6">
            <div className="flex justify-center mb-8">
              <Avatar
                url={avatar_url}
                size={150}
                onUpload={(event, url) => {
                  updateProfile(event, url)
                }}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-text-primary font-semibold mb-2">
                Email
              </label>
              <input 
                id="email" 
                type="text" 
                value={session.user.email} 
                disabled 
                className="w-full px-6 py-4 bg-dark-900/50 border-2 border-dark-900 rounded-2xl text-text-primary/50 cursor-not-allowed"
              />
            </div>
            
            <div>
              <label htmlFor="username" className="block text-text-primary font-semibold mb-2">
                Nome
              </label>
              <input
                id="username"
                type="text"
                required
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-4 bg-dark-900 border-2 border-dark-900 rounded-2xl text-text-primary placeholder-text-primary/50 focus:border-gold-400 focus:outline-none transition-all duration-300"
                placeholder="Il tuo nome"
              />
            </div>
            
            <div>
              <label htmlFor="website" className="block text-text-primary font-semibold mb-2">
                Website
              </label>
              <input
                id="website"
                type="url"
                value={website || ''}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-6 py-4 bg-dark-900 border-2 border-dark-900 rounded-2xl text-text-primary placeholder-text-primary/50 focus:border-gold-400 focus:outline-none transition-all duration-300"
                placeholder="https://tuosito.com"
              />
            </div>

            <div>
              <button 
                className="w-full px-6 py-4 bg-gradient-to-r from-gold-400 to-gold-300 text-dark-950 font-semibold rounded-2xl hover:from-gold-300 hover:to-gold-400 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                type="submit" 
                disabled={loading}
              >
                {loading ? 'Caricamento...' : 'Aggiorna Profilo'}
              </button>
            </div>

            <div>
              <button 
                className="w-full px-6 py-4 bg-transparent text-red-400 border-2 border-red-400 rounded-2xl font-semibold hover:bg-red-400 hover:text-dark-950 transition-all duration-300"
                type="button" 
                onClick={async () => {
                  try {
                    const { error } = await supabase.auth.signOut()
                    if (error) {
                      console.error('Errore logout:', error.message)
                    }
                  } catch (err) {
                    console.error('Errore imprevisto logout:', err.message)
                  }
                }}
              >
                Disconnetti
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}