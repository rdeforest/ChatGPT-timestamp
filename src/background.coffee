INPUT_QUERY_SELECTOR = "#prompt-textarea"

log = (s, args...) ->
  console.log "[cGPTts Background]: " + s, args...

browser.webRequest.onCompleted.addListener(
  (details) ->
    log "Response received at:", new Date().toISOString()

    browser
      .tabs.query {active: true, currentWindow: true}
      .then (tabs) ->
        if tabs.length > 0
          browser.tabs.sendMessage tabs[0].id, { action: "insertTimestamp" }
  { urls: ["*://chatgpt.com/*"] }
)

getInputElement = ->
  attempt = 0

  check = ->
    inputField = document.querySelector INPUT_QUERY_SELECTOR

    if inputField?
      log "Found input field!"
      callback inputField

    else if attempt < 10
      attempt++
      log "Retrying to find input field... attempt #{attempt}"
      setTimeout check, 500

    else
      log "Gave up waiting for '#{INPUT_QUERY_SELECTOR}'"

  check()

log 'Hello from the background script!'

insertTimestamp = ->
  getInputElement (inputField) ->
    timestamp = new Date().toISOString()

    inputField.value = "[#{timestamp}] " + inputField.value

# document.addEventListener "DOMContentLoaded", insertTimestamp

try
  browser
    .webRequest
    .onCompleted
    .addListener(
      (details) ->
        log "Response received at:", new Date().toISOString()
        insertTimestamp()

      { urls: ["*://chat.openai.com/*"] }  # Adjust if needed
    )

  document
    .addEventListener "keypress", (event) ->
      if event.key is "Enter" and not event.shiftKey
        log "Enter key detected"
        insertTimestamp()

  log "added listeners"
catch e
  log "Error adding listener:\n\n" + e.toString()



try
  log "`background.coffee` load complete at #{new Date().toISOString()}"
catch e
  log "Error logging success?!\n\n" + e.toString()

