// ------------------------------------------------------------------
// CODE COMPLET POUR GOOGLE APPS SCRIPT (CORRIGÉ POUR FORCER LES EN-TÊTES)
// ------------------------------------------------------------------

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('Inscriptions');

    // Si la feuille 'Inscriptions' n'existe pas, on prend la première feuille
    if (!sheet) {
      sheet = doc.getSheets()[0];
      sheet.setName('Inscriptions'); // On la renomme proprement
    }

    // --- MAGIE ICI : VÉRIFICATION INTELLIGENTE DES EN-TÊTES ---
    // S'il n'y a rien dans la cellule A1 (ou pas le mot "Date"), c'est qu'il manque les en-têtes
    if (sheet.getLastRow() === 0 || sheet.getRange(1, 1).getValue() !== "Date") {
      var headers = [
        "Date", "Nom Complet", "Genre", "Age", "Téléphone", "Email", "Pays", "Ville",
        "Statut", "Domaine", "Organisation", "Poste", "Expérience Data", "Niveau", "Outils",
        "Dashboard créé ?", "Connaît DAX ?", "Enquête créée ?", "Motivation", "Attentes", "Usage prévu",
        "Mode Participation", "Dispo Samedis", "A un PC ?", "A Internet ?", "Prêt à installer ?",
        "Paiement", "Veut Certificat ?", "Source", "Contact Futur ?", "GDPR", "Commentaires"
      ];

      if (sheet.getLastRow() > 0) {
        // S'il y a déjà de la donnée (votre ligne sans en-tête), on insère une ligne vide au-dessus
        sheet.insertRowBefore(1);
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      } else {
        // Si elle est totalement vide
        sheet.appendRow(headers);
      }

      // On met en gras et on fige la première ligne
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    // -------------------------------------------------------------

    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    var newRow = [
      new Date(),                 // A: Date
      data.fullName,              // B: Nom Complet
      data.gender,                // C: Genre
      data.age,                   // D: Age
      "'" + data.phone,           // E: Téléphone
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

    sheet.appendRow(newRow);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// ------------------------------------------------------------------
// NOUVEAU : FONCTION POUR RÉCUPÉRER LES DERNIERS INSCRITS (TICKER)
// ------------------------------------------------------------------
function doGet(e) {
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName('Inscriptions') || doc.getSheets()[0];

    var lastRow = sheet.getLastRow();

    // Si la feuille n'a que les en-têtes (ou est vide), retourner une liste vide
    if (lastRow <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ 'names': [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Récupérer les 20 dernières lignes (ou moins s'il y en a moins de 20)
    var startRow = Math.max(2, lastRow - 19);
    var numRows = lastRow - startRow + 1;

    // On suppose que le "Nom Complet" est dans la colonne B (colonne 2)
    var data = sheet.getRange(startRow, 2, numRows, 1).getValues();

    // Extraire juste le texte ("F. Youm", etc.)
    var names = data.map(function (row) { return row[0]; }).filter(function (name) { return name !== ""; });

    // Pour des raisons de sécurité liées au CORS avec fetch(),
    // il est essentiel de retourner du texte formaté en JSONP ou JSON simple
    return ContentService
      .createTextOutput(JSON.stringify({ 'names': names.reverse() })) // Renverser pour avoir le plus récent en premier
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'error': err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
