// initialize
/* http://www.sitepoint.com/html5-file-drag-and-drop/
 * <form id='uploadform', action='/api/articles/',etc>
 *   <div class='filedrop'>
 * </form> 
 */

if (window.file && window.FileList && window.FileReader) { 
  init()  // bruv
}

function init() {
  var filedrop = $("filedrop")
  var xhr = new XMLHttpRequest()
  if (xhr.upload) {
    filedrop.addEventListener("dragover", FileDragHover, false)
    filedrop.addEventListener("dragleave", FileDragHover, false)
    filedrop.addEventListener("drop", FileSelectHandler, false)
    filedrop.style.display = "block"
  }
}

function fileDragHover(el) { 
  el.stopPropagation()
  el.preventDefault()
  el.target.classname = (e.type == "dragover" ? "hover" : "")
}

function fileSelectHandler(el) { 
  fileDragHover(el) 
  var files = el.target.files || el.dataTransfer.files
  for (var i=0, f; f = files[i]; i < files.length; i++) {
    parseAndUpload(f)
  }
}

/* http://stackoverflow.com/questions/7431365/filereader-readasbinarystring-to-upload-files */

function parseAndUpload(file) { 

  console.log('filename : ' + file.name + '\n' + 'filetype : ' + file.type + '\n' + 'size : ' + file.size + '\n')

  var reader = new FileReader()
  reader.onload = function(e) {
    var xhr = new XMLHttpRequest()

    xhr.addEventListener("progress", updateProgress, false)
    xhr.addEventListener("load", transferComplete, false)
    xhr.addEventListener("error", transferError, false)
    xhr.addEventListener("abort", transferCanceled, false)

    if (xhr.upload) { 
      xhr.open('POST', $("#uploadform").action, true)   // async = true
      xhr.setRequestHeader("X_FILENAME", file.name)
      /* other headers? */
      xhr.send(file)
    }
  }
  reader.readAsArrayBuffer(file)
}

function updateProgress(ev) {
  if (ev.lengthComputable) { 
    var loaded = (evt.loaded / evt.total)
    if (loaded < 1) {
      /* do some progress bar jquery business */
    }
  }
}

function transferComplete(ev) {
  /* jquery thing when file upload completes. */
}

function transferError(ev) {
  /* jquery error if file upload breaks. */
}

function transferCanceled(ev) {
  /* some sort of transition if file upload breaks. */
}
