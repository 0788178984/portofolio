/**
 * Auto-list files from a Google Drive folder for your portfolio (no paid API).
 *
 * Setup:
 * 1. In Drive, create a folder for client docs. Open it and copy the ID from the URL:
 *    https://drive.google.com/drive/folders/THIS_IS_THE_FOLDER_ID
 * 2. Go to https://script.google.com → New project → paste this file → set FOLDER_ID below.
 * 3. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone (or Anyone with Google account if you prefer)
 * 4. Copy the Web app URL (ends with /exec).
 * 5. In your site, set "driveFeedUrl" in docs/documents.json to that URL.
 *
 * Upload files into the folder; refresh the site to see them (adds a cache-bust query automatically).
 *
 * CORS: If the browser blocks fetch() to script.google.com, proxy the URL through your host
 * (e.g. Netlify redirect from /api/drive-list to the script URL) and set driveFeedUrl to that path.
 */

var FOLDER_ID = 'PASTE_YOUR_FOLDER_ID_HERE';

function doGet() {
  if (!FOLDER_ID || FOLDER_ID === 'PASTE_YOUR_FOLDER_ID_HERE') {
    return jsonOut({ documents: [], error: 'Set FOLDER_ID in the script project.' });
  }
  try {
    var folder = DriveApp.getFolderById(FOLDER_ID);
    var it = folder.getFiles();
    var rows = [];
    while (it.hasNext()) {
      var f = it.next();
      if (f.isTrashed()) continue;
      rows.push({ file: f, updated: f.getLastUpdated() });
    }
    rows.sort(function (a, b) {
      return b.updated - a.updated;
    });
    var documents = rows.map(function (row) {
      var f = row.file;
      var id = f.getId();
      return {
        title: f.getName(),
        description: f.getMimeType(),
        url: 'https://drive.google.com/uc?export=download&id=' + id
      };
    });
    return jsonOut({ documents: documents });
  } catch (err) {
    return jsonOut({ documents: [], error: String(err) });
  }
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
