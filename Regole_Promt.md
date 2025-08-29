# 🚀 REGOLE PROGETTO ARENA STILENUOVO

## 📋 **REGOLE OBBLIGATORIE - SEMPRE APPLICARE:**

### **1. 🎨 STYLING**
- ✅ **SOLO Tailwind CSS** - Mai CSS inline o custom
- ✅ **Tema scuro** - Sempre applicato
- ✅ **Paletta nero/gold** - Mantenere quella attuale
- ✅ **Mobile-first** - Design responsive sempre

### **2. 🌍 LINGUAGGIO**
- ✅ **Sempre in italiano** - Tutte le risposte e il codice
- ✅ **Commenti semplici** - Spiegazioni chiare e concise

### **3. 📦 GESTIONE PACCHETTI**
- ✅ **Sempre pnpm** - Mai npm o yarn
- ✅ **Comandi corretti**: `pnpm add`, `pnpm dev`, `pnpm build`

### **4. 🎯 DESIGN SYSTEM**
- ✅ **Colori attuali**:
  - `dark-950` (nero profondo)
  - `dark-900` (nero)
  - `gold-400` (gold primario)
  - `gold-300` (gold hover)
  - `surface-secondary` (superfici)
  - `text-primary` (testo bianco)

### **4. ⚡ SETUP PROGETTO REACT + VITE**
- ✅ **Sempre JavaScript + SWC** - Mai TypeScript per questo progetto
- ✅ **Comando creazione**: `pnpm create vite@latest nome-progetto -- --template react`
- ✅ **Dependencies minime**: Solo pacchetti essenziali
- ✅ **Vite config ottimizzato** per performance massime
- ✅ **Build ottimizzata** con compressione e tree-shaking

### **5. 📱 RESPONSIVE**
- ✅ **Mobile-first** sempre
- ✅ **Breakpoints**: `sm:`, `md:`, `lg:`, `xl:`
- ✅ **Touch-friendly** per mobile

### **6. 🔧 CODICE**
- ✅ **Componenti React** funzionali
- ✅ **Hooks personalizzati** solo se necessario
- ✅ **Codice leggero** - Evitare over-engineering
- ✅ **Performance first** - Lazy loading e ottimizzazioni

### **7. 🚀 VELOCITÀ E ROBUSTEZZA**
- ✅ **Bundle splitting** automatico con Vite
- ✅ **HMR (Hot Module Replacement)** sempre attivo
- ✅ **Error boundaries** per gestione errori
- ✅ **Lazy loading** per componenti pesanti
- ✅ **Preload critici** per performance

### **8. 🛣️ ROUTING E NAVIGAZIONE**
- ✅ **Sempre React Router** - Mai routing manuale o custom
- ✅ **Route protette** per pagine autenticate
- ✅ **Redirect automatici** dopo login/logout
- ✅ **Layout consistenti** per tutte le pagine
- ✅ **404 page** per route non trovate

---

## 🚫 **MAI FARE:**
- ❌ CSS inline o custom
- ❌ npm o yarn
- ❌ Tema chiaro
- ❌ Design desktop-first
- ❌ Commenti complessi
- ❌ Risposte in inglese
- ❌ TypeScript (per questo progetto)
- ❌ Pacchetti non necessari
- ❌ Over-engineering del codice
- ❌ Routing manuale o custom
- ❌ Navigazione senza React Router

---

## 📝 **ESEMPIO APPLICAZIONE:**
```jsx
// ✅ CORRETTO
<div className="min-h-screen bg-dark-950 text-text-primary p-4 md:p-6">
  <h1 className="text-2xl md:text-4xl font-bold text-gold-400">
    Titolo in Italiano
  </h1>
</div>

// ❌ SBAGLIATO
<div style={{minHeight: '100vh', backgroundColor: '#fff'}}>
  <h1 style={{fontSize: '24px', color: 'blue'}}>
    English Title
  </h1>
</div>
```

---

## 🛠️ **COMANDI PROGETTO BASE:**
```bash
# Creazione progetto
pnpm create vite@latest nome-progetto -- --template react

# Installazione dipendenze
pnpm install

# Sviluppo
pnpm dev

# Build produzione
pnpm build

# Preview build
pnpm preview

# Aggiunta pacchetti
pnpm add nome-pacchetto

# Rimozione pacchetti
pnpm remove nome-pacchetto
```

---

**Queste regole sono FISSE e DEVONO essere applicate SEMPRE!** 🎯
