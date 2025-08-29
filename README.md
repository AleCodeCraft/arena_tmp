# 🏟️ Arena - App di Autenticazione React

> **App moderna di autenticazione** costruita con React, Vite e Supabase

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-purple.svg)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-2.56.0-green.svg)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC.svg)](https://tailwindcss.com)

## ✨ Caratteristiche

### 🔐 Autenticazione
- ✅ **Email/Password** - Login e registrazione tradizionale
- ✅ **Google OAuth** - Accesso con un click
- ✅ **Gestione sessioni** - Automatica e persistente
- ✅ **Logout sicuro** - Terminazione completa

### 👤 Gestione Utente
- ✅ **Profilo utente** - Aggiorna nome, website, avatar
- ✅ **Upload avatar** - Carica e gestisci foto profilo
- ✅ **Aggiornamenti real-time** - Sincronizzazione istantanea
- ✅ **Design responsive** - Funziona su tutti i dispositivi

### 🛠️ Tecnologie
- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Sicurezza**: Row Level Security + JWT
- **Performance**: Lazy loading + Bundle splitting

## 🚀 Quick Start

### 1. **Clona il repository**
```bash
git clone https://github.com/yourusername/arena.git
cd arena
```

### 2. **Installa dipendenze**
```bash
pnpm install
```

### 3. **Configura Supabase**
```bash
# Crea file .env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### 4. **Avvia sviluppo**
```bash
pnpm dev
```

> 🌐 App disponibile su `http://localhost:5173`

## 📁 Struttura Progetto

```
arena/
├── src/
│   ├── authentication/
│   │   ├── Login.jsx         # Login/Signup
│   │   ├── SignUp.jsx        # Registrazione
│   │   └── supabaseClient.js # Configurazione Supabase
│   ├── components/
│   │   ├── Account.jsx       # Profilo utente
│   │   └── Avatar.jsx        # Upload avatar
│   ├── utils/
│   │   ├── storage.js        # Gestione file storage
│   │   ├── OptimizedImage.jsx # Componente immagine ottimizzata
│   │   └── ErrorBoundary.jsx # Gestione errori app
│   ├── App.jsx               # Componente principale
│   ├── index.css             # Stili globali
│   └── main.jsx              # Entry point
├── cypress_test/             # Test E2E Cypress
│   ├── e2e/                  # Test end-to-end
│   ├── support/              # File di supporto
│   └── fixtures/             # Dati di test
├── public/                   # Asset statici
└── script_SQL/              # Schema database
```

## 🎨 Design System

### **Paletta Colori**
- `dark-950` - Nero profondo (#0a0a0a)
- `dark-900` - Nero (#1a1a1a)
- `gold-400` - Gold primario (#fbbf24)
- `gold-300` - Gold hover (#fcd34d)
- `surface-secondary` - Superfici (#2a2a2a)
- `text-primary` - Testo bianco (#ffffff)

### **Responsive**
- 📱 **Mobile-first** design
- 💻 **Breakpoints**: `sm:`, `md:`, `lg:`, `xl:`
- 🎯 **Touch-friendly** per mobile

## 🔧 Configurazione

### **Variabili Ambiente**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### **Database Schema**
```sql
-- Tabella profili
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  updated_at TIMESTAMP WITH TIME ZONE
);
```

## 📱 Screenshots

| Login | Registrazione | Profilo |
|-------|---------------|---------|
| ![Login](screenshots/login.png) | ![Signup](screenshots/signup.png) | ![Profile](screenshots/profile.png) |

## 🧪 Testing

### **Test E2E con Cypress**
```bash
# Avvia Cypress UI
pnpm cypress:open

# Esegui test in headless
pnpm cypress:run

# Test specifici
npx cypress run --spec "cypress_test/e2e/auth.cy.js"
```

### **Test Disponibili**
- ✅ **Authentication** - Login, registrazione, validazione
- ✅ **User Profile** - Gestione profilo, avatar, logout
- ✅ **Responsive Design** - Mobile, tablet, desktop
- ✅ **Error Handling** - Gestione errori e stati

### **Struttura Componenti**
- 🔐 **Authentication** - Login, SignUp, supabaseClient
- 👤 **Components** - Account, Avatar
- 🛠️ **Utils** - Storage, ErrorBoundary, OptimizedImage

> 📖 Vedi [cypress_test/README.md](cypress_test/README.md) per dettagli completi

## 🚀 Deploy

### **Build Produzione**
```bash
pnpm build
```

### **Piattaforme Supportate**
- ✅ **Vercel** - Deploy automatico
- ✅ **Netlify** - Drag & drop
- ✅ **Firebase** - CLI deployment
- ✅ **GitHub Pages** - Actions workflow

## 🤝 Contribuire

1. **Fork** il repository
2. **Crea** branch feature (`git checkout -b feature/nuova-feature`)
3. **Commit** modifiche (`git commit -m 'Aggiungi feature'`)
4. **Push** al branch (`git push origin feature/nuova-feature`)
5. **Apri** Pull Request

## 📄 Licenza

MIT License - vedi [LICENSE](LICENSE) per dettagli

## 🔗 Link Utili

- 📚 [Supabase Docs](https://supabase.com/docs)
- ⚛️ [React Docs](https://react.dev)
- ⚡ [Vite Docs](https://vitejs.dev)
- 🎨 [Tailwind CSS](https://tailwindcss.com)

---

<div align="center">

**Costruito con ❤️ usando React, Vite e Supabase**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/arena?style=social)](https://github.com/yourusername/arena)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/arena?style=social)](https://github.com/yourusername/arena)

</div>