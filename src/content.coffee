META_KEY = "cgptihkv1"

log = (s, args...) -> console.log "[cGPTts Content]: " + s, args...

metaData        = {}
inputElement    = null
metaDataElement = null

getOrSetInputElement = ->
  if not currentInputElement = document.querySelector "#prompt-textarea"
    log "error locating inputElement"
    return

  if inputElement isnt currentInputElement
    log "inputElement updating"
    inputElement = currentInputElement
    resetMetaData()

setMetaHTML = ->
  metaElement.innerHTML = JSON.stringify metaData

resetMetaData = ->
  metaData = Object.assign key: META_KEY, start: Date.now()
  metaElement = document.createElement 'p'
  inputElement.prepend metaElement
  setMetaHTML()


updateMetaData = (changes) ->
  log "updateMetaData: " + JSON.stringify changes
  getOrSetInputElement()

  Object.assign metaData, changes
  setMetaHTML()


addOrUpdateTimestamp = (stampName) -> updateMetaData [stampName]: Date.now()


insertTimestamp = (location) ->
  log "insertTimestamp (#{location})"

  if not inputField = document.querySelector "#prompt-textarea"
    log "error locating inputField"
    return

  log "inputField HTML contents: " + inputField.getHTML()

  timestamp = new Date().toISOString()

  (newParagraph = document.createElement "p")
    .classList.add "timestamp", location

  [newParagraph.textContent, prefix] =
    if location is "start"
      [ "[#{timestamp} response received]", "pre" ]
    else
      [ "[#{timestamp} query sent]",        "ap" ]

  addIfAbsent prefix, "timestamp", newParagraph, inputField


waitForInputField = (callback) ->
  attempt = 0
  check = ->
    inputField = document.querySelector "#prompt-textarea"
    if inputField?
      log "Found input field!"

      callback(inputField)
    else if attempt < 10
      attempt++
      log "Retrying to find input field... Attempt #{attempt}"

      setTimeout check, 500
    else
      log "Gave up finding #prompt-textarea"

  check()

waitForInputField (inputField) ->
  if not inputField.dataset.tsListenersAdded
    inputField.dataset.tsListenersAdded = "true"

    inputField.addEventListener "input", (event) ->
      log "Input detected! Current content: #{inputField.value}"

    inputField.addEventListener "keydown", (event) ->
      if event.key is "Enter"
        if event.shiftKey
          log "Ignoring shift-enter"
        else
          log "Enter key detected"
          updateTimestamp "querySent"


updateEndTimestamp = ->
  log "updateEndTimestamp"

  if pid = updateEndTimestamp.pid
    clearTimeout pid

  addOrUpdateTimestamp "querySent"
  updateEndTimestamp.pid = setTimeout 100, updateEndTimestamp

browser
  .runtime
  .onMessage
  .addListener (message, sender, sendResponse) ->
    log "Message received from background"

    if message.action is "insertTimestamp"
      getOrSetInputElement()

      if not metaData.responseReceived
        addOrUpdateTimestamp "responseReceived"

    updateEndTimestamp()


log "doc loaded (v1.2)"
