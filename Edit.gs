function createOrAppendFile() {
  var fileName="index.html";
  var folderName="Rebar";
  var content = "this is text data to be written in text file";
  var sheet = SpreadsheetApp.getActiveSheet();

  Logger.log(sheet.getLastColumn())


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


      var combinedContent = file.getBlob().getDataAsString() + content;
      file.setContent(combinedContent);
    }
    else {
      // file not found - create new
      folder.createFile(fileName, content);
    }
  }
  Logger.log(folder.getName())
  Logger.log(file.getName())
}



