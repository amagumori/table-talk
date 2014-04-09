function saveSelection() {
  if (!selectionSaved) { 
    rangy.saveSelectionCookie();
    selectionSaved = true;
  }
}

var sel = window.getSelection();


