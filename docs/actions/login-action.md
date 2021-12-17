# LoginAction

La login action fornisce un'interfaccia per accedere ai metodi di autenticazione di portofino.

## Gestione della sessione

### Observer sullo stato di autenticazione

Il metodo `onAuthStateChanged` consente di registrare degli observer sullo stato di autenticazione dell'utente.
La callback prende come primo parametro un oggetto contenente i dati sulla sessione dell'utente ritornati dalla chiamata `GET /api/login` oppure null se la sessione scade.

```ts
Portofino.auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
  }
});
```

### Login

Il metodo login consente effettuare una richiesta di login, prende come parametri lo username e la password e, in caso di successo, ritorna l'utente.
Nel caso in cui le credenziali fossero errate la chiamata lancia eccezione.

La sessione non viene persa in caso di aggiornamento della pagina in quanto la token JWT viene memorizzata sul localStorage del browser.

```ts
async login(username: string, password: string): Promise<UserInfo>
```

### Logout

Per eliminare la token JWT dal localStorage è sufficente chiamare il metodo logout

```ts
async logout()
```

## Recupero della password

Con Portofino JS la progedura di recupero della password diventa un gioco da ragazzi!
Per inviare la mail di recupero basta chiamare il metodo `passwordReset`, passandogli:

- La **email** dell'utente che vuole recuperare la password
- Il **nome del sito** che verrà mostrato nel corpo della mail
- L'url della pagina di reset che l'utente riceverà via mail, l'url deve contenere la stringa `TOKEN` che verrà sostituita con la reset token

```ts
const resetURL = `${window.location.origin}/login/do-reset?token=TOKEN`;
passwordReset(email, 'My Site Name', resetURL).then(() => {
  // Reset email sent
});
```

La pagina di recupero si occuperà di chiamare il metodo `doPasswordReset` passandogli la reset token presente nell'url e la nuova password

```ts
async doPasswordReset(resetToken: String, newPassword: String)
```
