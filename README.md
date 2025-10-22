# GM v10 - Assistente Personale AI

Un'applicazione web multiutente per la gestione intelligente di eventi, documenti e promemoria, potenziata da Google Calendar e Gemini AI 2.0 Flash.

## 🌐 URLs Produzione

- **Frontend**: `http://www.gruppogea.net/gm_v10/`
- **API Backend**: `http://www.gruppogea.net/gm_v10/api/` (proxy verso localhost:5000)
- **Health Check**: `http://www.gruppogea.net/gm_v10/api/health`

## Caratteristiche

- **Autenticazione sicura** con email e password
- **Integrazione Google Calendar** per sincronizzazione eventi
- **AI-powered OCR** per estrazione automatica di dati da foto/documenti
- **Vettorializzazione intelligente** per ricerche semantiche
- **Chat AI** per interrogazioni in linguaggio naturale
- **Due piani**: FREE (20 AI calls/giorno) e PRO (100 AI calls/giorno, €9/mese)

## Stack Tecnologico

### Frontend
- React 18 con Vite
- React Router per navigazione
- Axios per chiamate API
- CSS vanilla con variabili custom

### Backend
- Node.js + Express
- MySQL/MariaDB
- JWT per autenticazione
- Multer per upload file
- Google Gemini AI 2.0 Flash
- Google Calendar API

## Installazione su Netson (cPanel)

### 1. Preparazione Database

1. Accedi al cPanel di Netson
2. Vai su **MySQL Database Wizard**
3. Crea un nuovo database: `gm_v10`
4. Crea un nuovo utente con password sicura
5. Assegna **tutti i privilegi** all'utente sul database
6. Vai su **phpMyAdmin**
7. Seleziona il database `gm_v10`
8. Importa il file `database/schema.sql`

### 2. Configurazione Backend

1. Accedi via SSH al terminale cPanel
2. Naviga nella directory: `cd public_html/gm_v10`
3. Clona il repository (se non già fatto):
   ```bash
   git clone <repository-url> .
   ```
4. Installa le dipendenze backend:
   ```bash
   cd backend
   npm install
   ```
5. Crea il file `.env` nella cartella `backend`:
   ```bash
   cp ../.env.example .env
   nano .env
   ```
6. Configura le variabili d'ambiente (vedi sezione sotto)

### 3. Configurazione Frontend

1. Installa le dipendenze frontend:
   ```bash
   cd ../frontend
   npm install
   ```
2. Build per produzione:
   ```bash
   npm run build
   ```
3. I file statici saranno in `frontend/dist/`

### 4. Configurazione Variabili d'Ambiente (.env)

Modifica il file `backend/.env` con i tuoi dati:

```env
# Database (dal cPanel MySQL)
DB_HOST=localhost
DB_USER=il_tuo_user_mysql
DB_PASSWORD=la_tua_password_mysql
DB_NAME=gm_v10

# JWT Secret (genera una stringa casuale)
JWT_SECRET=genera_una_stringa_casuale_molto_lunga

# Google Gemini AI
GEMINI_API_KEY=la_tua_api_key_gemini

# Google Calendar
GOOGLE_CLIENT_ID=il_tuo_client_id
GOOGLE_CLIENT_SECRET=il_tuo_client_secret
GOOGLE_REDIRECT_URI=http://www.gruppogea.net/gm_v10/api/auth/google/callback

# Frontend URL
FRONTEND_URL=http://www.gruppogea.net
```

### 5. Avvio Server Backend

Per avviare il server in produzione:

```bash
cd backend
node server.js
```

Per mantenerlo attivo in background, usa `pm2` o `nohup`:

```bash
nohup node server.js > server.log 2>&1 &
```

Oppure con pm2 (se disponibile):
```bash
npm install -g pm2
pm2 start server.js --name gm-v10
pm2 save
```

### 6. Deploy Frontend

Configura il tuo web server (Apache/Nginx) per servire i file da `frontend/dist/` come root della tua applicazione.

**Esempio per Apache (.htaccess in frontend/dist/):**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Workflow di Sviluppo

1. **Sviluppo**: Claude scrive codice e lo pusha su GitHub
2. **Deploy**: Tu fai "update from remote" dal cPanel
3. **Test**: Testi l'applicazione dal browser
4. **Feedback**: Comunichi eventuali problemi o richieste

## Ottenere le API Keys

### Google Gemini AI

1. Vai su [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Clicca "Get API key"
3. Copia la chiave e inseriscila nel `.env`

### Google Calendar API

1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuovo progetto
3. Abilita "Google Calendar API"
4. Vai su "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configura il consenso screen
6. Crea credenziali OAuth 2.0 per "Web Application"
7. Aggiungi redirect URI: `https://tuodominio.com/api/auth/google/callback`
8. Copia Client ID e Client Secret nel `.env`

## Struttura Progetto

```
gm_v10/
├── frontend/              # React app
│   ├── src/
│   │   ├── components/   # Componenti riutilizzabili
│   │   ├── pages/        # Pagine principali
│   │   ├── services/     # API services
│   │   └── styles/       # CSS globali
│   ├── package.json
│   └── vite.config.js
├── backend/              # Node.js API
│   ├── config/          # Configurazioni (DB, etc)
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth, validation, etc
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── package.json
│   └── server.js        # Entry point
├── database/
│   └── schema.sql       # Database schema
├── .env.example         # Template variabili ambiente
├── .gitignore
└── README.md
```

## Piani Utente

| Feature | FREE | PRO (€9/mese) |
|---------|------|---------------|
| Storage | 100 MB | 1 GB |
| AI Calls/giorno | 20 | 100 |
| Eventi illimitati | ✅ | ✅ |
| Documenti illimitati | ✅ | ✅ |
| Google Calendar | ✅ | ✅ |
| Supporto prioritario | ❌ | ✅ |

## Supporto

Per problemi o domande, apri un issue su GitHub.

## License

Proprietario - Tutti i diritti riservati
