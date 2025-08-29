import React, { memo, useState, useCallback, useMemo, useRef } from 'react'
import { validateEmail, validatePassword, validateFullName } from '../../utils/validationUtils'

export const Input = memo(({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false,
  disabled = false,
  className = '',
  validation = null,
  showValidation = false,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasBlurred, setHasBlurred] = useState(false)
  const validationTimeoutRef = useRef(null)
  
  const baseClasses = "w-full px-6 py-4 bg-dark-900 border-2 rounded-2xl text-text-primary placeholder-text-primary/50 focus:outline-none transition-all duration-300"
  const disabledClasses = disabled ? "bg-dark-900/50 text-text-primary/50 cursor-not-allowed" : ""
  
  // Validazione debounced per performance - solo dopo 500ms di inattività
  const getValidationResult = useMemo(() => {
    if (!validation || !value || !hasBlurred) return null
    
    switch (validation) {
      case 'email':
        return validateEmail(value)
      case 'password':
        return validatePassword(value)
      case 'fullName':
        return validateFullName(value)
      default:
        return null
    }
  }, [validation, value, hasBlurred])
  
  const getBorderClasses = useMemo(() => {
    if (disabled) return "border-dark-900/50"
    if (getValidationResult && !getValidationResult.isValid) return "border-red-500"
    if (isFocused) return "border-gold-400"
    return "border-dark-900"
  }, [disabled, getValidationResult, isFocused])
  
  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])
  
  const handleBlur = useCallback(() => {
    setIsFocused(false)
    setHasBlurred(true)
  }, [])
  
  const handleChange = useCallback((e) => {
    onChange(e)
    
    // Clear timeout precedente per debouncing
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current)
    }
    
    // Validazione debounced solo se necessario
    if (validation && showValidation) {
      validationTimeoutRef.current = setTimeout(() => {
        setHasBlurred(true)
      }, 500) // 500ms di delay per performance
    }
  }, [onChange, validation, showValidation])

  // Cleanup timeout
  React.useEffect(() => {
    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-2">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        disabled={disabled}
        className={`${baseClasses} ${getBorderClasses} ${disabledClasses} ${className}`}
        {...props}
      />
      
      {showValidation && getValidationResult && !getValidationResult.isValid && (
        <div className="text-red-400 text-sm px-2">
          {getValidationResult.error}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'
