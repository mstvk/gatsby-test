/** --------------------- */
/** AUTO FIRING FUNCTIONS */
/** --------------------- */

function onOpen() {
  /**
  Establish the UI on document open
  */

  // Instantiate the UI object
  var ui = SpreadsheetApp.getUi();
  
  // Create the menu
  ui.createMenu("SteelMittal")
  .addItem("Update Site", "UpdateTable")
  .addToUi();
}
