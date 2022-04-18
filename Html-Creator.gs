function UpdateTable() {
  // Importing price-list page and cutting it in two pieces.
  var rawHtml = UrlFetchApp.fetch("https://steelmittal-test.pages.dev/rebar/").getContentText();
  var head = rawHtml.split("                                                                                        ");
  var tail = rawHtml.split("</tbody><!--ninja_tobody_rendering_done-->")

  // Converting current oppen spreadsheet to html table
  var sheet = SpreadsheetApp.getActiveSheet();
  var values = sheet.getRange(1,7,42,1).getValues();  
  var columnn2text = values.map(function (a) {return a.join('\t');}).join('\n');
  var NewTable = (columnn2text.toString())

  // defining file and folder
  var fileName="index.html";
  var folderName="Rebar";

  // get list of folders with matching name
  var folderList = DriveApp.getFoldersByName(folderName);  
  if (folderList.hasNext()) {
    // found matching folder
    var folder = folderList.next();

    // search for files with matching name
    var fileList = folder.getFilesByName(fileName);

    if (fileList.hasNext()) {
      // found matching file - append text
      var file = fileList.next();

      var NewHtml = head[0] + NewTable + tail[1]
      file.setContent(NewHtml);
    }
    else {
      // file not found - create new
      folder.createFile(fileName, content);
    }
  }
  Logger.log(folder.getName())

  
}







