function myFunction() {
  var sheet = SpreadsheetApp.getActiveSheet();

  var values = sheet.getRange(1,7,42,1).getValues();  
  var newTable = values.map(function (a) {return a.join('\t');}).join('\n');

  Logger.log(newTable.toString())
}
