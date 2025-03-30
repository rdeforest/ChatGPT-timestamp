log = (s, args...) ->
  console.log "[cGPTts Content]: " + s, args...

findChatInput = ->


# Function to insert timestamps
insertTimestamp = (location) ->
  inputField = document.querySelector "#prompt-textarea"

  prependText = (text) -> inputField.innerText = text + inputField.innerText
  appendText  = (text) -> inputField.innerText =        inputField.innerText + text
  
  timestamp = new Date().toISOString()

  switch location
    when "start"
      fn = prependText
      text = "[#{timestamp} response received]\n\n"
    when "end"
      fn = appendText
      text = "\n\n[#{timestamp} query sent]"

  fn text


# Wait for the input field to exist before adding listeners
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
      setTimeout check, 500  # Try again in 500ms
    else
      log "Gave up finding #prompt-textarea"

  check()

waitForInputField (inputField) ->
  inputField.addEventListener "input", (event) ->
    log "Input detected! Current content: #{inputField.innerText}"

  inputField.addEventListener "keypress", (event) ->
    if event.key is "Enter" and not event.shiftKey
      log "Enter key detected"
      insertTimestamp "end"

browser.runtime.onMessage.addListener (message, sender, sendResponse) ->
  if message.action is "insertTimestamp"
    insertTimestamp "start"

log "doc loaded"
