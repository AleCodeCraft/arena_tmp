import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import SignUp from './SignUp'
import Account from './Account'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const [session, setSession] = useState(null)
  const [currentPage, setCurrentPage] = useState('login')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  // Se l'utente è autenticato, mostra il profilo
  if (session) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-dark-950 text-text-primary p-4 md:p-6">
          <Account key={session.user.id} session={session} />
        </div>
      </ErrorBoundary>
    )
  }

  // Se l'utente non è autenticato, mostra login o registrazione
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-dark-950 text-text-primary p-4 md:p-6">
        {currentPage === 'login' ? (
          <Auth onSwitchToSignUp={() => setCurrentPage('signup')} />
        ) : (
          <SignUp onSwitchToLogin={() => setCurrentPage('login')} />
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App