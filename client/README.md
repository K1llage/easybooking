# EasyBooking

EasyBooking è un progetto full stack sviluppato a scopo didattico per simulare una piattaforma di gestione appuntamenti.

L’applicazione permette agli utenti di prenotare servizi disponibili e a un amministratore di gestire le prenotazioni tramite un pannello dedicato.

---

## Descrizione del progetto

Questo progetto è stato realizzato come esercizio di portfolio per mettere in pratica:

- sviluppo backend con API REST
- gestione database relazionale
- autenticazione tramite JWT
- integrazione frontend-backend
- gestione dello stato lato client
- progettazione di un flusso di prenotazione completo

Il sistema è progettato in modo generico, adattabile a diversi contesti (personal trainer, studi medici, consulenti, ecc.).

---

## Funzionalità

### Lato utente
- visualizzazione dei servizi disponibili (caricati dal backend)
- selezione data e orario
- gestione automatica degli slot già prenotati
- prenotazione senza registrazione
- inserimento dati cliente (nome, email, telefono, note)

---

### Lato amministratore
- login con autenticazione JWT
- visualizzazione elenco prenotazioni
- filtri per stato:
  - pending
  - confirmed
  - completed
  - cancelled
- gestione prenotazioni:
  - conferma
  - completamento
  - cancellazione

---

## Stack tecnologico

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- Prisma ORM

### Database
- PostgreSQL (Docker)

### Autenticazione
- JSON Web Token (JWT)

---

## Setup del progetto
1. Clonare il repository
git clone <repo-url>
cd easybooking

2. Avviare il database
docker compose up -d

3. Setup backend
cd server
npm install

Creare file .env:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/booking"
JWT_SECRET="supersegreto123"

4. Setup database (Prisma)
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts

5. Avviare il backend
npx ts-node src/server.ts

6. Setup frontend
cd client
npm install
npm run dev

7. Credenziali admin (test)

Email: admin@test.com
Password: admin123

## Flusso applicativo
1. L’utente seleziona un servizio
2. Sceglie una data disponibile
3. Seleziona uno slot orario
4. Inserisce i dati richiesti
5. Il backend salva la prenotazione nel database
6. L’amministratore può gestire lo stato della prenotazione

## Struttura del progetto
easybooking/
├── client/     # frontend React
├── server/     # backend Node.js + Express
├── prisma/     # schema e seed database
├── docker-compose.yml

## Limitazioni attuali
-nessuna autenticazione lato utente
-nessuna integrazione email o notifiche
-gestione disponibilità semplificata
-nessuna gestione multi-utente lato admin

## Possibili miglioramenti
-autenticazione utenti (login / registrazione)
-accesso con provider esterni (Google OAuth)
-notifiche email automatiche
-gestione disponibilità avanzata (orari, ferie, slot dinamici)
-supporto multi-operatore
-dashboard admin più avanzata
-validazione dati più robusta

## Obiettivo del progetto

Questo progetto ha lo scopo di dimostrare competenze pratiche nello sviluppo full stack, in particolare:

-progettazione API REST
-gestione database con ORM
-autenticazione JWT
-integrazione frontend-backend
-sviluppo UI moderna e responsive

Licenza

Progetto sviluppato a scopo didattico e di portfolio.

```bash
git clone <repo-url>
cd easybooking