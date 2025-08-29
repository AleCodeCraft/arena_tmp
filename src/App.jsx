
import { useState, useEffect } from 'react'
import { supabase } from './authentication/supabaseClient'
import Login from './authentication/Login'
import SignUp from './authentication/SignUp'
import Account from './components/Account'
import ErrorBoundary from './utils/ErrorBoundary'

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
          <Login onSwitchToSignUp={() => setCurrentPage('signup')} />
        ) : (
          <SignUp onSwitchToLogin={() => setCurrentPage('login')} />
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App