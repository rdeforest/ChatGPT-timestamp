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

log "load complete at #{new Date().toISOString()}"

