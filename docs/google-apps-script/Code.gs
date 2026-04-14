/**
 * Auto-list files from Google Drive — flat list OR grouped by subfolders.
 *
 * Structure in Drive:
 *   Client docs (FOLDER_ID)
 *     ├── Papers/          → section "Papers"
 *     ├── Study material/  → section "Study material"
 *     └── file.pdf         → if you ALSO have subfolders, root files go under "General"
 *
 * If there are NO subfolders, response is { files: [...] } (same as before).
 * If there ARE subfolders, response is { folders: [ { name, files: [...] } ] }.
 *
 * Share the root folder as "Anyone with the link" = Viewer.
 */

var FOLDER_ID = 'PASTE_YOUR_FOLDER_ID_HERE';

function fileToJson_(f) {
  var id = f.getId();
  var size = 0;
  try {
    size = f.getSize();
  } catch (e) {
    size = 0;
  }
  return {
    name: f.getName(),
    id: id,
    url: 'https://drive.google.com/uc?export=download&id=' + id,
    viewUrl: 'https://drive.google.com/file/d/' + id + '/view',
    type: f.getMimeType(),
    size: size,
    date: f.getLastUpdated().toISOString()
  };
}

function collectFilesInFolder_(folder) {
  var rows = [];
  var it = folder.getFiles();
  while (it.hasNext()) {
    var f = it.next();
    if (f.isTrashed()) continue;
    rows.push({ file: f, updated: f.getLastUpdated() });
  }
  rows.sort(function (a, b) {
    return b.updated - a.updated;
  });
  return rows.map(function (r) {
    return fileToJson_(r.file);
  });
}

function doGet() {
  if (!FOLDER_ID || FOLDER_ID === 'PASTE_YOUR_FOLDER_ID_HERE') {
    return jsonOut({ files: [], error: 'Set FOLDER_ID in the script project.' });
  }
  try {
    var root = DriveApp.getFolderById(FOLDER_ID);
    var subIt = root.getFolders();
    var subfolders = [];
    while (subIt.hasNext()) {
      subfolders.push(subIt.next());
    }

    if (subfolders.length === 0) {
      return jsonOut({ files: collectFilesInFolder_(root) });
    }

    subfolders.sort(function (a, b) {
      return a.getName().localeCompare(b.getName(), undefined, { sensitivity: 'base' });
    });

    var folders = [];
    var rootFiles = collectFilesInFolder_(root);
    if (rootFiles.length > 0) {
      folders.push({ name: 'General', files: rootFiles });
    }
    for (var i = 0; i < subfolders.length; i++) {
      var sub = subfolders[i];
      var files = collectFilesInFolder_(sub);
      if (files.length > 0) {
        folders.push({ name: sub.getName(), files: files });
      }
    }

    return jsonOut({ folders: folders });
  } catch (err) {
    return jsonOut({ files: [], error: String(err) });
  }
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
