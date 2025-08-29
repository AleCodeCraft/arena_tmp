
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './authentication/supabaseClient'
import Login from './authentication/Login'
import SignUp from './authentication/SignUp'
import Home from './pages/Home'
import Profile from './components/Account'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorBoundary from './utils/ErrorBoundary'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Controlla la sessione attuale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Ascolta i cambiamenti di autenticazione
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold-400 mx-auto mb-4"></div>
          <p className="text-gold-400 text-lg">Caricamento...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Route pubbliche */}
          <Route 
            path="/login" 
            element={session ? <Navigate to="/" replace /> : <Login />} 
          />
          <Route 
            path="/signup" 
            element={session ? <Navigate to="/" replace /> : <SignUp />} 
          />
          
          {/* Route protette */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App