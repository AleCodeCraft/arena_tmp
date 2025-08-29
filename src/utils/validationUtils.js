// Utility per validazione input avanzata e robusta

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return { isValid: false, error: 'Email richiesta' }
  if (!emailRegex.test(email)) return { isValid: false, error: 'Formato email non valido' }
  if (email.length > 254) return { isValid: false, error: 'Email troppo lunga' }
  return { isValid: true, error: null }
}

export const validatePassword = (password) => {
  if (!password) return { isValid: false, error: 'Password richiesta' }
  if (password.length < 8) return { isValid: false, error: 'Password deve essere di almeno 8 caratteri' }
  if (password.length > 128) return { isValid: false, error: 'Password troppo lunga' }
  
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    return { 
      isValid: false, 
      error: 'Password deve contenere maiuscole, minuscole, numeri e caratteri speciali' 
    }
  }
  
  return { isValid: true, error: null }
}

export const validateFullName = (fullName) => {
  if (!fullName) return { isValid: false, error: 'Nome completo richiesto' }
  if (fullName.length < 2) return { isValid: false, error: 'Nome troppo corto' }
  if (fullName.length > 100) return { isValid: false, error: 'Nome troppo lungo' }
  if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(fullName)) {
    return { isValid: false, error: 'Nome contiene caratteri non validi' }
  }
  return { isValid: true, error: null }
}

export const validateForm = (formData, validators) => {
  const errors = {}
  let isValid = true
  
  Object.keys(validators).forEach(field => {
    const validator = validators[field]
    const value = formData[field]
    const result = validator(value)
    
    if (!result.isValid) {
      errors[field] = result.error
      isValid = false
    }
  })
  
  return { isValid, errors }
}

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Rimuove tag HTML base
    .replace(/javascript:/gi, '') // Rimuove javascript: protocol
    .replace(/on\w+=/gi, '') // Rimuove event handlers
}
