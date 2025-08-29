import { useState, memo, useCallback, useMemo } from 'react'
import { supabase } from './supabaseClient'
import { Button } from '../../shared/components/Button'
import { Input } from '../../shared/components/Button'
import { validateForm, validateEmail, validatePassword, validateFullName } from '../../utils/validationUtils'
import { createRetryableOperation } from '../../utils/retryUtils'
import { AppError, errorCodes } from '../../utils/errorHandler'

const SignUp = memo(() => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setConfirmPassword] = useState('')
  const [confirmPassword, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  // Validatori per il form
  const validators = useMemo(() => ({
    email: validateEmail,
    password: validatePassword,
    confirmPassword: (value) => {
      if (value !== password) {
        return { isValid: false, error: 'Le password non coincidono' }
      }
      return validatePassword(value)
    },
    fullName: validateFullName
  }), [password])

  // Operazione di registrazione con retry automatico
  const retryableSignUp = useMemo(() => 
    createRetryableOperation(async (email, password, userData) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: userData }
      })
      
      if (error) throw new AppError(error.message, errorCodes.AUTH_ERROR)
      return data
    }, { maxRetries: 3, timeout: 15000 })
  , [])

  const handleSignUp = useCallback(async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    setErrors({})

    // Validazione form
    const formData = { email, password, confirmPassword, fullName }
    const validationResult = validateForm(formData, validators)
    
    if (!validationResult.isValid) {
      setErrors(validationResult.errors)
      setLoading(false)
      return
    }

    try {
      const userData = {
        full_name: fullName || 'Nome Utente',
        avatar_url: null
      }
      
      await retryableSignUp(email, password, userData)
      
      setMessage('Registrazione riuscita! Controlla la tua email per confermare l\'account.')
      
      // Reset form
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setFullName('')
      setErrors({})
      
    } catch (error) {
      const errorMessage = error instanceof AppError 
        ? error.message 
        : 'Errore imprevisto durante la registrazione'
      
      setMessage(`Errore: ${errorMessage}`)
      
      // Log dell'errore per debugging
      console.error('Errore registrazione:', error)
    } finally {
      setLoading(false)
    }
  }, [email, password, confirmPassword, fullName, validators, retryableSignUp])

  const handleFullNameChange = useCallback((e) => setFullName(e.target.value), [])
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), [])
  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), [])
  const handleConfirmPasswordChange = useCallback((e) => setConfirmPassword(e.target.value), [])

  return (
    <div className="flex justify-center items-center min-h-screen p-4 md:p-6 lg:p-8">
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
              <Input
                type="text"
                placeholder="Nome completo"
                value={fullName}
                required={true}
                onChange={handleFullNameChange}
                validation="fullName"
                showValidation={true}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="La tua email"
                value={email}
                required={true}
                onChange={handleEmailChange}
                validation="email"
                showValidation={true}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                required={true}
                onChange={handlePasswordChange}
                validation="password"
                showValidation={true}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Conferma password"
                value={confirmPassword}
                required={true}
                onChange={handleConfirmPasswordChange}
                validation="confirmPassword"
                showValidation={true}
              />
            </div>
            <div>
              <Button 
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Caricamento...' : 'Registrati'}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-text-primary/70 mb-4">
              Hai già un account?
            </p>
            <a 
              href="/login"
              className="inline-block"
            >
              <Button variant="secondary" size="md">
                Accedi
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
})

SignUp.displayName = 'SignUp'

export default SignUp
