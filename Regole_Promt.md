# REGOLE PROGETTO ARENA - GUIDA IMPLEMENTAZIONE AI

## REGOLE FONDAMENTALI - SEMPRE APPLICARE

### 1. ⚡ VELOCITÀ - PRIORITÀ ASSOLUTA
- L'app DEVE essere VELOCISSIMA - Prima di tutto
- Tempo di caricamento < 2 secondi su connessioni lente
- Tempo di risposta UI < 100ms per interazioni
- Bundle size < 500KB gzippato
- Lazy loading SEMPRE per componenti non critici

#### 1.1. OTTIMIZZAZIONI PERFORMANCE OBBLIGATORIE
```
VELOCITÀ CRITICA:
- React.memo() SEMPRE per componenti che si ri-renderizzano
- useCallback() SEMPRE per event handlers e funzioni props
- useMemo() SEMPRE per calcoli costosi e oggetti
- React.lazy() SEMPRE per route e componenti pesanti
- Suspense SEMPRE per gestire loading lazy
- Intersection Observer per componenti non visibili
- Debouncing per input e validazioni (min 500ms)
- Timeout ridotti (max 8s per operazioni critiche)
- Intervalli ridotti (min 2 minuti per check non critici)

VIETATO ASSOLUTAMENTE:
- setInterval < 2 minuti per operazioni non critiche
- Validazione real-time su ogni keystroke
- Check API più frequenti di 5 minuti
- Operazioni senza timeout
- Re-render non necessari
- Bundle size > 500KB
```

### 2. 🎨 STYLING OBBLIGATORIO
- SOLO Tailwind CSS - Mai CSS inline o custom
- Tema scuro - Sempre applicato
- Paletta nero/gold - Mantenere quella attuale
- Mobile-first - Design responsive sempre

#### 2.1. SPAZIATURE E LAYOUT - REGOLE FISSE
```
SPAZIATURE STANDARD (sempre usare questi valori):
- p-4, m-4, gap-4     → Spazi piccoli
- p-6, m-6, gap-6     → Spazi medi  
- p-8, m-8, gap-8     → Spazi grandi
- py-8, my-12         → Spazi sezionali

LAYOUT RESPONSIVE (sempre implementare):
- p-4 md:p-6 lg:p-8   → Padding che cresce
- px-4 md:px-6 lg:px-8 → Container principali
- gap-4 md:gap-6 lg:gap-8 → Gap responsive

MAI USARE:
- p-1, m-1, gap-1     → Troppo piccoli
- p-20, m-16          → Troppo grandi
- Mix di numeri non standard (p-3, m-5, gap-7)
```

### 3. 🌍 LINGUAGGIO E COMUNICAZIONE
- Sempre in italiano - Tutte le risposte e il codice
- Commenti semplici - Spiegazioni chiare e concise

### 4. 📦 GESTIONE PACCHETTI - SOLO PNPM
```
COMANDI CORRETTI:
- pnpm add nome-pacchetto
- pnpm dev
- pnpm build
- pnpm preview

MAI USARE:
- npm install
- yarn add
```

### 5. 🎯 DESIGN SYSTEM - COLORI FISSI
```
PALETTA OBBLIGATORIA:
- bg-dark-950         → Nero profondo (sfondo principale)
- bg-dark-900         → Nero (superfici secondarie)
- text-gold-400       → Gold primario (titoli, accenti)
- text-gold-300       → Gold hover (interazioni)
- bg-surface-secondary → Superfici secondarie
- text-text-primary   → Testo bianco (contenuto)
```

### 6. ⚡ SETUP PROGETTO - REACT + VITE
```
CREAZIONE PROGETTO:
pnpm create vite@latest nome-progetto -- --template react

DEPENDENCIES:
- Solo pacchetti essenziali
- Vite config ottimizzato per performance massime
- Build ottimizzata con compressione e tree-shaking
- Bundle analyzer sempre attivo
```

### 7. 📱 RESPONSIVE DESIGN - MOBILE FIRST
```
BREAKPOINTS SEMPRE IMPLEMENTARE:
- sm: 640px+         → Tablet piccolo
- md: 768px+         → Tablet
- lg: 1024px+        → Desktop
- xl: 1280px+        → Desktop grande

MOBILE FIRST:
- Iniziare sempre con design mobile
- Aggiungere breakpoints per schermi più grandi
- Touch-friendly per mobile
```

### 8. 🔧 CODICE REACT - PATTERN OBBLIGATORI
```
COMPONENTI:
- Sempre function components con hooks
- Props destructuring all'inizio
- Default props per props opzionali
- Nomi PascalCase e descrittivi

FILE STRUCTURE:
- Nome file = nome componente
- Export default per componenti principali
- Named exports per utilities
- Import order: React → librerie → interni → utilities
```

### 9. 🚀 PERFORMANCE - OTTIMIZZAZIONI OBBLIGATORIE
```
SEMPRE IMPLEMENTARE:
- React.memo()        → Per componenti che si ri-renderizzano
- useCallback()       → Per event handlers e funzioni props
- useMemo()           → Per calcoli costosi
- React.lazy()        → Per componenti pesanti
- Suspense           → Per gestire loading lazy
- displayName        → Per componenti memoizzati

PATTERN PERFORMANCE:
- Evitare funzioni inline negli eventi
- Minimizzare re-render non necessari
- Lazy loading per route e componenti grandi
- Bundle splitting automatico con Vite
- Debouncing per input (min 500ms)
- Intersection Observer per componenti non visibili
```

### 10. 🛣️ ROUTING - SOLO REACT ROUTER
```
IMPLEMENTAZIONE:
- Sempre React Router (mai routing manuale)
- Route protette per pagine autenticate
- Redirect automatici dopo login/logout
- Layout consistenti per tutte le pagine
- 404 page per route non trovate
```

### 11. 🏗️ ARCHITETTURA - STRUTTURA OBBLIGATORIA
```
ORGANIZZAZIONE CARTELLE:
src/
├── features/           → Funzionalità specifiche
│   ├── auth/         → Autenticazione
│   ├── dashboard/    → Dashboard
│   └── profile/      → Profilo
├── shared/            → Componenti condivisi
│   ├── components/   → UI components
│   ├── hooks/        → Hooks personalizzati
│   └── utils/        → Utilities
└── utils/             → Utilities globali

PRINCIPI:
- Feature-based structure
- Componenti centralizzati
- Logica sempre in utils/hooks
- DRY (Don't Repeat Yourself)
- Single Responsibility
```

### 12. 🛡️ ROBUSTEZZA - GESTIONE ERRORI AVANZATA
```
UTILITY IMPLEMENTATE:
- retryUtils.js       → Retry automatico con delay esponenziale
- validationUtils.js  → Validazione input robusta e sicura
- errorHandler.js     → Gestione centralizzata errori e logging
- networkUtils.js     → Health check e monitoring rete
- useNetworkOperation → Hook per operazioni di rete robuste

PATTERN ROBUSTEZZA:
- Retry automatico per operazioni fallite
- Timeout configurabili per tutte le operazioni
- Validazione input lato client e sanitizzazione
- Error boundaries con logging strutturato
- Health monitoring continuo API e rete
- Fallback automatici per errori critici
- Gestione stati offline/online
- Abort controller per cancellazione operazioni
```

## VIETATO ASSOLUTAMENTE
```
VELOCITÀ:
- Operazioni senza timeout
- setInterval < 2 minuti per operazioni non critiche
- Validazione real-time su ogni keystroke
- Check API più frequenti di 5 minuti
- Bundle size > 500KB
- Re-render non necessari
- Componenti senza memo/callback

STYLING:
- CSS inline o custom
- Tema chiaro
- Design desktop-first

PACCHETTI:
- npm o yarn
- Pacchetti non necessari

CODICE:
- TypeScript (per questo progetto)
- Over-engineering
- Routing manuale o custom
- Logica nei componenti UI
- Duplicazione di codice
- Componenti monolitici

SPAZIATURE:
- Mix di numeri non standard
- Padding eccessivo
- Margini sovrapposti
- Layout non bilanciato

ROBUSTEZZA:
- Operazioni senza retry automatico
- Input senza validazione
- Errori senza logging strutturato
- Operazioni senza timeout
- Nessun health check
```

## COMANDI GIT - SEQUENZA OBBLIGATORIA
```
SEQUENZA SEMPRE DA SEGUIRE:
1. git status                    → Controlla stato modifiche
2. git add .                    → Aggiungi tutte le modifiche  
3. git commit -m "Messaggio"    → Commit con messaggio conciso
4. git push origin main         → Push al repository remoto

VERIFICA PUSH:
- git status → Dovrebbe mostrare "up to date"
- git log --oneline -5 → Verifica ultimi commit

MAI FARE:
- Commit senza git status prima
- Messaggi vaghi come "fix" o "update"
- Push senza commit
- Commit multipli insieme
```

## ESEMPI IMPLEMENTAZIONE CORRETTA

### Componente Base Ottimizzato
```jsx
import React, { memo, useCallback, useMemo } from 'react'

const OptimizedComponent = memo(({ 
  title, 
  onAction, 
  variant = 'primary',
  disabled = false 
}) => {
  const handleClick = useCallback(() => {
    if (!disabled) onAction()
  }, [onAction, disabled])

  const componentClass = useMemo(() => {
    return `p-4 md:p-6 bg-surface-secondary rounded-lg`
  }, [])

  return (
    <div className={componentClass}>
      <h3 className="text-xl font-bold text-gold-400 mb-4">{title}</h3>
      <button 
        onClick={handleClick}
        disabled={disabled}
        className="px-6 py-2 bg-gold-400 hover:bg-gold-300 rounded"
      >
        Azione
      </button>
    </div>
  )
})

OptimizedComponent.displayName = 'OptimizedComponent'
export default OptimizedComponent
```

### Layout Responsive Perfetto
```jsx
// CORRETTO - Layout e spaziature perfette
<div className="min-h-screen bg-dark-950 text-text-primary p-4 md:p-6 lg:p-8">
  <div className="max-w-4xl mx-auto space-y-8">
    <h1 className="text-2xl md:text-4xl font-bold text-gold-400 text-center">
      Titolo in Italiano
    </h1>
    <div className="grid gap-6 md:gap-8">
      <p className="text-lg leading-relaxed">
        Contenuto ben spaziato e leggibile
      </p>
    </div>
  </div>
</div>
```

### Operazione di Rete Robusta
```jsx
import { useNetworkOperation } from '../hooks/useNetworkOperation'

const MyComponent = () => {
  const { loading, error, execute, retry } = useNetworkOperation(
    async (data) => {
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      return response.json()
    },
    { maxRetries: 3, timeout: 10000 }
  )

  const handleSubmit = async (formData) => {
    const result = await execute(formData)
    if (result.success) {
      // Gestione successo
    }
  }

  return (
    <div>
      {error && (
        <div className="p-4 bg-red-500/10 text-red-400 rounded">
          {error.message}
          <button onClick={() => retry()}>Riprova</button>
        </div>
      )}
      {/* Form e altri elementi */}
    </div>
  )
}
```

## COMANDI PROGETTO ESSENZIALI
```bash
# Creazione e setup
pnpm create vite@latest nome-progetto -- --template react
pnpm install
pnpm dev

# Build e produzione  
pnpm build
pnpm preview

# Gestione pacchetti
pnpm add nome-pacchetto
pnpm remove nome-pacchetto

# Performance e debugging
pnpm build --analyze
pnpm add -D @lhci/cli
pnpm lhci autorun
```

## CHECKLIST IMPLEMENTAZIONE
```
PRIMA DI OGNI MODIFICA:
- Verificare regole styling (solo Tailwind)
- Controllare palette colori (nero/gold)
- Pianificare layout responsive (mobile-first)
- VERIFICARE IMPATTO PERFORMANCE

DURANTE SVILUPPO:
- Usare solo spaziature standard (4, 6, 8)
- Implementare SEMPRE React.memo, useCallback, useMemo
- Seguire struttura cartelle feature-based
- Commenti in italiano
- Implementare retry automatico per operazioni critiche
- Validare tutti gli input utente
- Gestire errori con logging strutturato
- OTTIMIZZARE PERFORMANCE OGNI COMPONENTE

PRIMA DI COMMIT:
- git status
- Verificare responsive design
- Controllare performance optimizations
- Testare su mobile e desktop
- Verificare gestione errori robusta
- Controllare validazione input
- VERIFICARE BUNDLE SIZE E VELOCITÀ

DOPO COMMIT:
- git push origin main
- Verificare push completato
- Controllare deploy automatico
```

## PRIORITÀ IMPLEMENTAZIONE
```
1. ⚡ VELOCITÀ - Priorità assoluta (sempre primo)
2. 🎨 STYLING E DESIGN - Sempre secondo
3. 🚀 PERFORMANCE - Implementare sempre
4. 📱 RESPONSIVE - Mobile-first sempre
5. 🛡️ ROBUSTEZZA - Gestione errori e retry
6. 🔧 CODICE PULITO - Struttura corretta
7. 📚 GIT WORKFLOW - Sequenza corretta
```

---

Queste regole sono FISSE e DEVONO essere applicate SEMPRE!

La VELOCITÀ è la priorità assoluta - ogni violazione compromette la user experience e la competitività dell'app.

Ogni violazione compromette la qualità del progetto e la user experience.
