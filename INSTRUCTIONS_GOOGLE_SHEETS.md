# 🚀 Guide de Configuration : Google Sheets & Apps Script

Pour que les inscriptions soient enregistrées automatiquement dans votre Google Sheet, suivez ces étapes précises.

## Étape 1 : Préparer le Google Sheet

1. Créez un nouveau **Google Sheet**.
2. Nommez-le (ex: `Inscriptions PowerBI`).
3. Renommez la première feuille (onglet en bas) en `Inscriptions` (important pour le script).
4. Ajoutez les en-têtes suivants dans la première ligne (A1, B1, C1, etc.) :
   - **A1** : Date
   - **B1** : Nom Complet
   - **C1** : Email
   - **D1** : Téléphone
   - **E1** : Genre
   - **F1** : Ville/Pays
   - **G1** : Statut Pro
   - **H1** : Niveau Data
   - **I1** : Outils
   - **J1** : Mode Participation
   - **K1** : Paiement
   - **L1** : Motivation
   - **M1** : Commentaires

## Étape 2 : Créer le Script

1. Dans votre Google Sheet, allez dans le menu **Extensions** > **Apps Script**.
2. Supprimez tout le code présent dans le fichier `Code.gs`.
3. Copiez et collez le code ci-dessous :

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Inscriptions');
    
    // Si la feuille n'existe pas, on prend la première
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    }

    // Récupération des données envoyées par le formulaire
    var data = JSON.parse(e.postData.contents);

    // Formatage de la date
    var date = new Date();
    
    // Ajout de la ligne
    sheet.appendRow([
      date,
      data.fullName,
      data.email,
      data.phone,
      data.gender,
      data.city + ", " + data.country,
      data.status + " (" + (data.position || "") + ")",
      data.dataLevel,
      Array.isArray(data.tools) ? data.tools.join(", ") : data.tools,
      data.participationMode,
      data.paymentMode,
      data.motivation,
      data.comments
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Fonction pour tester les permissions (optionnel)
function setup() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(doc.getSheets()[0]);
}
```

4. Sauvegardez le projet (icône disquette) sous le nom "API Inscription".

## Étape 3 : Déployer en tant qu'Application Web

C'est l'étape cruciale pour que le formulaire puisse envoyer des données.

1. Cliquez sur le bouton bleu **Déployer** (en haut à droite) > **Nouveau déploiement**.
2. Cliquez sur la roue dentée (⚙️) à côté de "Sélectionner le type" et choisissez **Application Web**.
3. Configurez exactement comme suit :
   - **Description** : `v1` (ou ce que vous voulez)
   - **Exécuter en tant que** : `Moi` (votre adresse email)
   - **Qui a accès** : `Tout le monde` (Anyone) ⚠️ **Très important**
4. Cliquez sur **Déployer**.
5. Google va vous demander d'autoriser l'accès.
   - Cliquez sur **Autoriser l'accès**.
   - Choisissez votre compte Google.
   - Si vous voyez un écran "Google n'a pas validé cette application", cliquez sur **Advanced (Paramètres avancés)** > **Go to API Inscription (unsafe) / Accéder à... (non sécurisé)**.
   - Cliquez sur **Allow (Autoriser)**.

## Étape 4 : Récupérer l'URL et Configurer l'App

1. Une fois déployé, copiez l'URL de l'application Web (elle commence par `https://script.google.com/macros/s/...`).
2. Revenez dans votre projet (AI Studio ou Code).
3. Ouvrez le fichier `.env` (ou ajoutez la variable dans votre hébergeur/Netlify).
4. Ajoutez ou modifiez la ligne suivante :

```env
VITE_GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/VOTRE_URL_ICI/exec"
```

## Étape 5 : Tester

1. Lancez votre application.
2. Remplissez le formulaire d'inscription.
3. Vérifiez que la nouvelle ligne apparaît bien dans votre Google Sheet !

---

### Dépannage

- **Erreur CORS / Network Error** : Vérifiez bien que "Qui a accès" est réglé sur "Tout le monde" lors du déploiement.
- **Rien ne se passe** : Vérifiez que l'URL dans `.env` est correcte et que vous avez redémarré le serveur de développement (`npm run dev` ou `restart_dev_server`).
