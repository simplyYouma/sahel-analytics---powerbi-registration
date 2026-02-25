// ------------------------------------------------------------------
// CODE COMPLET POUR GOOGLE APPS SCRIPT
// ------------------------------------------------------------------
// 1. Copiez ce code dans votre projet Apps Script (Extensions > Apps Script)
// 2. Sauvegardez (Ctrl+S)
// 3. Déployez : Bouton bleu "Déployer" > "Nouveau déploiement"
//    - Type : Application Web
//    - Description : v2 (ou autre)
//    - Exécuter en tant que : Moi
//    - Qui a accès : Tout le monde (Anyone) -> CRUCIAL !!!
// 4. Copiez la nouvelle URL et mettez-la dans votre code/env.

function doPost(e) {
  // Verrou pour éviter les conflits si plusieurs inscriptions arrivent en même temps
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // Sélection du classeur et de la feuille
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('Inscriptions');
    
    // Si la feuille 'Inscriptions' n'existe pas, on prend la première feuille
    if (!sheet) {
      sheet = doc.getSheets()[0];
    }

    // --- AJOUT AUTOMATIQUE DES EN-TÊTES SI LA FEUILLE EST VIDE ---
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Date", "Nom Complet", "Genre", "Age", "Téléphone", "Email", "Pays", "Ville", 
        "Statut", "Domaine", "Organisation", "Poste", "Expérience Data", "Niveau", "Outils", 
        "Dashboard créé ?", "Connaît DAX ?", "Enquête créée ?", "Motivation", "Attentes", "Usage prévu", 
        "Mode Participation", "Dispo Samedis", "A un PC ?", "A Internet ?", "Prêt à installer ?", 
        "Paiement", "Veut Certificat ?", "Source", "Contact Futur ?", "GDPR", "Commentaires"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    // -------------------------------------------------------------

    // Analyse des données reçues (JSON)
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    // Préparation de la ligne à ajouter
    // L'ordre ici doit correspondre à l'ordre de vos colonnes dans le Sheet
    var newRow = [
      new Date(),                 // A: Date
      data.fullName,              // B: Nom Complet
      data.gender,                // C: Genre
      data.age,                   // D: Age
      "'"+data.phone,             // E: Téléphone (avec ' pour forcer le format texte)
      data.email,                 // F: Email
      data.country,               // G: Pays
      data.city,                  // H: Ville
      data.status,                // I: Statut
      data.domain,                // J: Domaine
      data.organization,          // K: Organisation
      data.position,              // L: Poste
      data.workedWithData,        // M: Expérience Data
      data.dataLevel,             // N: Niveau
      Array.isArray(data.tools) ? data.tools.join(', ') : data.tools, // O: Outils
      data.createdDashboard,      // P: Dashboard créé ?
      data.knowsDax,              // Q: Connaît DAX ?
      data.createdSurvey,         // R: Enquête créée ?
      data.motivation,            // S: Motivation
      data.expectations,          // T: Attentes
      data.usage,                 // U: Usage prévu
      data.participationMode,     // V: Mode Participation
      data.availableSaturdays,    // W: Dispo Samedis
      data.hasLaptop,             // X: A un PC ?
      data.hasInternet,           // Y: A Internet ?
      data.readyToInstall,        // Z: Prêt à installer ?
      data.paymentMode,           // AA: Paiement
      data.wantCertificate,       // AB: Veut Certificat ?
      data.source,                // AC: Source
      data.contactFuture,         // AD: Contact Futur ?
      data.gdprAccepted,          // AE: GDPR
      data.comments               // AF: Commentaires
    ];

    // Ajout de la ligne à la fin du tableau
    sheet.appendRow(newRow);

    // Retourne un succès (JSON)
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    // En cas d'erreur, on la retourne
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    // Libération du verrou
    lock.releaseLock();
  }
}

// Fonction utilitaire pour configurer les en-têtes automatiquement (à lancer une fois manuellement)
function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Inscriptions');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Inscriptions');
  }
  
  var headers = [
    "Date", "Nom Complet", "Genre", "Age", "Téléphone", "Email", "Pays", "Ville", 
    "Statut", "Domaine", "Organisation", "Poste", "Expérience Data", "Niveau", "Outils", 
    "Dashboard créé ?", "Connaît DAX ?", "Enquête créée ?", "Motivation", "Attentes", "Usage prévu", 
    "Mode Participation", "Dispo Samedis", "A un PC ?", "A Internet ?", "Prêt à installer ?", 
    "Paiement", "Veut Certificat ?", "Source", "Contact Futur ?", "GDPR", "Commentaires"
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
}
