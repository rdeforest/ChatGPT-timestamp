console.log 'Hello from the background script!'

insertTimestamp = ->
  inputField = document.querySelector("prompt-textarea")

  if inputField
    timestamp = new Date().toISOString()
    inputField.value = "[#{timestamp}] " + inputField.value

document.addEventListener "DOMContentLoaded", insertTimestamp

browser
  .webRequest
  .onCompleted
  .addListener(
    (details) ->
      console.log "Response received at:", new Date().toISOString()
      insertTimestamp()

    { urls: ["*://chat.openai.com/*"] }  # Adjust if needed
  )



