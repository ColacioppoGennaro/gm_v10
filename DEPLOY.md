# 🚀 GUIDA DEPLOY GM v10

## 📍 URLs Produzione
- **Frontend**: https://gruppogea.net/gm_v10/
- **API**: https://gruppogea.net/gm_v10/api/
- **Health Check**: https://gruppogea.net/gm_v10/api/health

---

## ✅ CHECKLIST DEPLOY

### 1️⃣ Accedi al Terminale cPanel
- cPanel → **Terminal**
- Si apre in `/home/username/`

### 2️⃣ Vai nella directory progetto
```bash
cd public_html/gm_v10
```

### 3️⃣ Update dal Repository GitHub
**Opzione A - cPanel GUI:**
- cPanel → **Git™ Version Control**
- Seleziona `gm_v10`
- Click **"Pull or Deploy"** → **"Update from Remote"**

**Opzione B - Terminale:**
```bash
git pull origin claude/gm-v10-web-app-011CUMpktzpGSDvtsyUr9pfW
```

### 4️⃣ Verifica che il file .env esista
```bash
ls -la backend/.env
```

Se esiste, vai avanti. Se non esiste:
```bash
cd backend
cp ../.env.example .env
nano .env
# Inserisci i tuoi dati e salva (CTRL+X, Y, ENTER)
```

### 5️⃣ Installa dipendenze Backend
```bash
cd /home/username/public_html/gm_v10/backend
npm install
```

### 6️⃣ Installa dipendenze Frontend
```bash
cd /home/username/public_html/gm_v10/frontend
npm install
```

### 7️⃣ Build Frontend
```bash
npm run build
```
Questo crea la cartella `frontend/dist/` con i file pronti per produzione.

### 8️⃣ Importa Database (SOLO LA PRIMA VOLTA)
1. cPanel → **phpMyAdmin**
2. Seleziona database `ywrloefq_gm_v10`
3. Tab **"Import"**
4. Carica file `database/schema.sql`
5. Click **"Go"**

### 9️⃣ Avvia Backend
```bash
cd /home/username/public_html/gm_v10/backend
nohup node server.js > ../backend.log 2>&1 &
```

Oppure con **pm2** (se installato):
```bash
pm2 start server.js --name gm-v10
pm2 save
pm2 list  # Verifica che sia running
```

### 🔟 Verifica che tutto funzioni

**Test 1 - Backend locale:**
```bash
curl http://localhost:5000/api/health
# Output atteso: {"status":"ok","message":"GM v10 API is running"}
```

**Test 2 - Frontend:**
Apri browser:
```
https://gruppogea.net/gm_v10/
```
Dovresti vedere la pagina di **Login**.

**Test 3 - API pubblica:**
```
https://gruppogea.net/gm_v10/api/health
```
Dovrebbe mostrare lo stesso JSON del test 1.

---

## 🔧 COMANDI UTILI

### Vedere i log del backend
```bash
tail -f /home/username/public_html/gm_v10/backend.log
```

### Riavviare il backend
```bash
# Trova il processo
ps aux | grep node

# Uccidi il processo (usa il PID dalla colonna 2)
kill <PID>

# Riavvia
cd /home/username/public_html/gm_v10/backend
nohup node server.js > ../backend.log 2>&1 &
```

### Rebuild frontend dopo modifiche
```bash
cd /home/username/public_html/gm_v10/frontend
npm run build
```

---

## ⚠️ PROBLEMI COMUNI

### Errore: "Cannot connect to database"
- Verifica che le credenziali in `backend/.env` siano corrette
- Verifica che il database esista in phpMyAdmin

### Errore: "Port 5000 already in use"
```bash
# Trova e uccidi il processo sulla porta 5000
lsof -ti:5000 | xargs kill -9

# Oppure
pkill -f "node server.js"
```

### Frontend non si carica
- Verifica che `frontend/dist/` esista e contenga files
- Verifica che `.htaccess` esista in `frontend/dist/`
- Controlla i log Apache in cPanel

### API non risponde
- Verifica che il backend sia running: `ps aux | grep node`
- Controlla i log: `tail -f backend.log`
- Verifica che Apache abbia `mod_proxy` abilitato

---

## 📞 Supporto

Se hai problemi, controlla:
1. Log backend: `backend.log`
2. Log Apache: cPanel → **Errors**
3. Console browser: F12 → Console

---

✅ **Deploy completato!** Ora puoi testare l'app!
