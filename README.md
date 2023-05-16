# Exam #2: "Indovinelli"
Made for Politecnico di Torino - Web Application I Course

## ANDRIANO DAVIDE

## React Client Application Routes

- Route `/`: Route principale, se l'utente non è autenticato coincide con la pagina di Login dove eventualmente autenticarsi e dove ha la possibilità di vedere gli indovinelli. Una volta autenticato diventa la Home dove è possibile interagire con l'applicazione e quindi vedere/filtrare indovinelli, crearne di nuovi, visualizzare il dettaglio di quelli chiusi o rispondere a quelli aperti
- Route `/riddles/:filter`: Route parametrica specifica per i filtri, in base al parametro passato, la home viene filtrata in base al filtro selezionato.
  Nel caso di utente autenticato è in più presente il filtro riguardante gli indovinelli pubblicati come Autore.
- Route `/view-answer/:answerId`: Route protetta parametrica che consente all'utente(una volta autenticato) di vedere i dettagli dell'indovinello. Nel caso in cui sia l'autore stesso dell'indovinello a voler visionare il dettaglio sul proprio indovinello verranno mostrate le risposte fornite dagli utenti in tempo reale.
- Route `/add-riddle` Route protetta che consente all'utente autenticato di inserire un nuovo indovinello inserendo tutti i campi richiesti.
- Route `/answer-riddle/:answerId` Route protetta parametrica che consente all'utente autenticato di rispondere ad un indovinello aperto

## API Server

Di seguito sono riportate le API HTTP progettate ed implementate.

#### **`POST /api/sessions`**

Esegue l'autenticazione utente creando una nuova sessione.

**Request header:**

`Content-Type: application/json`

**Request body:**

JSON object contenente username e password.

```
{
    "username": "user1@p.com" ,
    "password": "password"
}
```

**Response body**

`HTTP status code 200 OK`

```
{
    "id": 1,
    "email": "user1@p.com",
    "name": "User1"
}
```

**Error responses**

- `HTTP status code 401 Unauthorized` (credentials error)
- `HTTP status code 422 Unprocessable Entity` (validation error)
- `HTTP status code 500 Internal Server Error` (generic server error)

#### **`DELETE /api/sessions/current`**

Esegue il logout dell'utente eliminando la sessione corrente.

**Request header:**

`Session: req.user per ottenere l'id dell'utente loggato`

**Response body**

`HTTP status code 200 OK`

**Error responses**

- `HTTP status code 500 Internal Server Error` (generic server error)

#### **`GET /api/sessions/current`**

Ottiene le informazioni dell'utente se è autenticato.

**Request header:**

`Session: req.user.id per ottenere l'id dell'utente loggato`

**Response body**

`HTTP status code 200 OK`

```
{
    "id": 1,
    "email": "user1@p.com",
    "name": "User1"
}
```

**Error responses**

- `HTTP status code 401 Unauthorized` (authentication error)
- `HTTP status code 404 Not Found` (user not found error)
- `HTTP status code 500 Internal Server Error` (generic server error)

#### **`GET /api/user/winners`**

Restituisce un array con le informazioni degli utenti che sono nella Top-3 ordinati in ordine di punteggio decrescente.

**Response body**
[
{
{
"ID": 3,
"Nome": "Mario ",
"Cognome": "Rossi",
"Email": "user1@p.it",
"Punteggio": 18
},
},
....,
....
]
**Error responses**

- `HTTP status code 500 Internal Server Error` (generic server error)
- `HTTP status code 404 Not Found` ("Non sono stati trovati utenti")

#### **`GET /api/riddle/all`**

Restituisce un array con le informazioni su tutti gli indovinelli.

**Response body**
[
{
"ID": 10,
"Nome": "Mario ",
"Cognome": "Rossi",
"Domanda": "Di che colore era il cavallo bianco di Napoleone?",
"DataFine": null,
"Difficolta": 2,
"Durata": 45,
"Autore": 3,
"Active": 1,
"Soluzione": "Bianco",
"Suggerimento1": "B....",
"Suggerimento2": "L'opposto di Nero",
"Vincitore": null,
"Punteggio": 18
},
...
]

**Error responses**

- `HTTP status code 404 Not Found` ("Non sono stati trovati indovinelli")
- `HTTP status code 500 Internal Server Error` (generic server error)

#### **`GET /api/riddle/:id`**

Restituisce un oggetto contente con le informazioni sull'indovinello
**Request header:**

- `Params: req.params.id per ottenere l'id dell'indovinello per ottenere le informazioni d'interesse`
- `Session: req.user.id per ottenere l'id dell'utente loggato`

**Response body**
{
"ID": 15,
"Domanda": "Che composto chimico è NaCl?",
"Autore": 4,
"Difficolta": 2,
"Durata": 210,
"Soluzione": "Sale",
"Suggerimento1": "Lo usa massivamente Nusr Et",
"Suggerimento2": "Si usa per dare sapore ai piatti",
"Active": 1,
"DataFine": null,
"Vincitore": null
}

**Error responses**

- `HTTP status code 401 Unauthorized` (authentication error)
- `HTTP status code 404 Not Found` ("Indovinello non trovato")
- `HTTP status code 422 Unprocessable Entity` ("Request Format Input)
- `HTTP status code 500 Internal Server Error` (generic server error)

#### **`GET /api/answers/:id`**

Restituisce un oggetto con le informazioni sull'indovinello al cui interno possiede un array con le risposte fornite dagli utenti per l'indovinello.

**Request header:**

- `Session: req.user.id per ottenere l'id dell'utente loggato`
- `Params: req.params.id per ottenere le risposte all'indovinello del quale è stato passato l'id`

**Response body**
{
"Domanda": "Di chi è il film "Pulp Fiction"? Inserisci solo il Cognome",
"DataFine": "12-07-2022 12:52:48",
"Soluzione": "Tarantino",
"Autore": 3,
"Active": 0,
"Vincitore": "Lucia D'Anna",
"RisposteFornite": ["Scorsese","Tarantino"]
}

**Error responses**

- `HTTP status code 401 Unauthorized` (authentication error)
- `HTTP status code 422 Unprocessable Entity` ("Request Format Input)
- `HTTP status code 500 Internal Server Error` (generic server error)

#### **`POST /api/riddle/`**

Permette all'utente autenticato di inserire un nuovo indovinello.

**Request header:**

- `Session: req.user.id per ottenere l'id dell'utente loggato`
- `Content-Type: application/json`

  **Request body:**

Un oggetto JSON contentente i dati dell'indovinello.

```
{
  "Domanda": "Dove si trova la Francia?",
  "Difficolta": "1",
  "Durata": "500" ,
  "Soluzione": "Francia",
  "Suggerimento1": "Non sono previsti suggerimenti",
  "Suggerimento2": "Non sono previsti suggerimenti"
}
```

**Response body**

`HTTP status code 200 OK`

**Error responses**

- `HTTP status code 401 Unauthorized` (authentication error)
- `HTTP status code 422 Unprocessable Entity` (validation error)
- `HTTP status code 500 Internal Server Error` (generic server error)

#### **`POST /api/indovinello/:idI/user`**

Permette all'utente autenticato di rispondere ad un indovinello, gestisce inoltre tutto il funzionamento interno relativo all'indovinello verificando che sia la prima risposta all'indovinello, e nel caso lo sia, aggiorna la data di fine in base alla durata specificata, chiudendolo nel momento in cui quest'ultimo scade ed inserisce la risposta dell'utente avendo prima verificato che quest'ultimo non abbia già risposto, nel caso in cui non abbia ancora risposto e la risposta sia corretta imposta lo stato dell'indovinello a chiuso, aggiorna il punteggio dell'utente ed aggiorna il vincitore dell'indovinello.

**Request header:**

- `Content-Type: application/json`
- `Session: req.user per ottenere l'id dell'utente loggato`
- `Params: req.params.id per l'inserimento della risposta per il relativo indovinello`

  **Request body:**

Un oggetto JSON contentente i dati della risposta all'indovinello.

```
{
  "Risposta": "Qualcosa"
}
```

**Response body**

`HTTP status code 200 OK`

**Error responses**

- `HTTP status code 401 Unauthorized` (authentication error)
- `HTTP status code 422 Unprocessable Entity` (validation error)
- `HTTP status code 500 Internal Server Error` (generic server error)

## Database Tables

- **USER**: contiene le informazioni sugli utenti.

```
 User (
  ID,
  Nome,
  Cognome,
  Email,
  Password
  Punteggio,
  Salt
  Primary key("ID, AUTOINCREMENT,UNIQUE)
);
```

- **Risposte**: contiene le risposte fornite dagli utenti.

```
 Risposte (
  ID,
  UserID,
  IndovinelloID,
  RispostaFornita,
  Primary key("ID, AUTOINCREMENT,NOT NULL,UNIQUE),
  Foreign key("UserID") REFERENCES "User"(ID),
  Foreign key("IndovinelloID") REFERENCES "Indovinello"(ID);
);
```

- **Indovinello**: contiene le informazioni sugli indovinelli.

```
 Risposte (
  ID,
  Domanda,
  Autore,
  Difficolta,
  Durata,
  Soluzione,
  Suggerimento1,
  Suggerimento2,
  Active,
  DataFine,
  Vincitore,
  Primary key("ID, AUTOINCREMENT,NOT NULL,UNIQUE),
  Foreign key("Autore") REFERENCES "User"(ID),
  Foreign key("Vincitore") REFERENCES "User"(ID);
  (ID,Vincitore UNIQUE)
);
```

## Main React Components

### **Components**

- `Classifica` (in `components/Classifica.jsx`): componente che gestisce la visualizzazione dei punteggi degli utenti e mostra la Top-3 degli utenti con più punti ordinati in ordine decrescente.
- `LoginForm` (in `components/LoginForm.jsx`): componente che gestisce il form per il login e chiama l'api associata per l'autenticazione dell'utente.
- `RiddleCard` (in `components/RiddleCard.jsx`): componente che gestisce la visualizzazione dell'anteprima dell'indovinello con la gestione dei casi in cui sia aperto o chiuso mostrando il bottone "Rispondi" o "Visualizza Dettagli".
- `RiddleList` (in `components/RiddleList.jsx`): componente che gestisce la visualizzazione degli indovinelli e la visualizzazione del bottone per l'inserimento di un nuovo indovinello.
- `AnswerDetails` (in `components/AnswerDetails.jsx`): componente che contiene il form con validazione per l'inserimento della risposta e chiamata all'api associata per l'inserimento della risposta.

### **Views**

- `AnswerRiddle` (in `views/AnswerRiddle.jsx`): componente che mostra le informazioni sull'indovinello ed il campo per la risposta e si occupa, nel caso in cui la prima risposta sia già stata inviata, di mostrare il timer con il tempo rimanente mostrando anche i suggerimenti una volta raggiunta la condizione per la visualizzazione di quest'ultimi.
- `Home` (in `views/Home.jsx`): componente che si occupa della visualizzazione della schermata principale con gli indovinelli, classifica e filtri che aggiorna gli indovinelli nel caso in cui, nel frattempo, quest'ultimi si chiudano. Valido se l'utente è autenticato.
- `ViewDetails` (in `views/ViewDetails.jsx`): componente che si occupa della visualizzazione lato utente ed autore delle informazioni sull'indovinello selezionato. Gestendo sia il caso in cui l'indovinello sia chiuso o aperto. Per quest'ultimo caso, nel caso in cui l'utente che sta guardando l'indovinello sia l'autore stesso dell'indovinello, il componente si occupa della visualizzazione in tempo reale delle riposte fornite dagli utenti che rispondono all'indovinello ed il countdown per la chiusura dell'indovinello. Nel caso in cui, invece, l'indovinello sia chiuso si occupa della visualizzazione dei dettagli dell'indovinello con Vincitore, soluzione e risposte fornite dagli utenti.

## Screenshot

![Screenshot](./img/Schermata%202022-07-12%20alle%2012.52.06.png)

## Users Credentials

| Email            | Password |
| ---------------- | -------- |
| user1@polito.com | password |
| user2@polito.com | password |
| user3@polito.com | password |
| user4@polito.com | password |
| user5@polito.com | password |
