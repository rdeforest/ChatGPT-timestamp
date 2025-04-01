// Generated by CoffeeScript 2.7.0
var META_KEY, addOrUpdateTimestamp, getOrSetInputElement, inputElement, insertTimestamp, log, metaData, metaDataElement, resetMetaData, setMetaHTML, updateEndTimestamp, updateMetaData, waitForInputField;

META_KEY = "cgptihkv1";

log = function(s, ...args) {
  return console.log("[cGPTts Content]: " + s, ...args);
};

metaData = {};

inputElement = null;

metaDataElement = null;

getOrSetInputElement = function() {
  var currentInputElement;
  if (!(currentInputElement = document.querySelector("#prompt-textarea"))) {
    log("error locating inputElement");
    return;
  }
  if (inputElement !== currentInputElement) {
    log("inputElement updating");
    inputElement = currentInputElement;
    return resetMetaData();
  }
};

setMetaHTML = function() {
  return metaElement.innerHTML = JSON.stringify(metaData);
};

resetMetaData = function() {
  var metaElement;
  metaData = Object.assign({
    key: META_KEY,
    start: Date.now()
  });
  metaElement = document.createElement('p');
  inputElement.prepend(metaElement);
  return setMetaHTML();
};

updateMetaData = function(changes) {
  log("updateMetaData: " + JSON.stringify(changes));
  getOrSetInputElement();
  Object.assign(metaData, changes);
  return setMetaHTML();
};

addOrUpdateTimestamp = function(stampName) {
  return updateMetaData({
    [stampName]: Date.now()
  });
};

insertTimestamp = function(location) {
  var inputField, newParagraph, prefix, timestamp;
  log(`insertTimestamp (${location})`);
  if (!(inputField = document.querySelector("#prompt-textarea"))) {
    log("error locating inputField");
    return;
  }
  log("inputField HTML contents: " + inputField.getHTML());
  timestamp = new Date().toISOString();
  (newParagraph = document.createElement("p")).classList.add("timestamp", location);
  [newParagraph.textContent, prefix] = location === "start" ? [`[${timestamp} response received]`, "pre"] : [`[${timestamp} query sent]`, "ap"];
  return addIfAbsent(prefix, "timestamp", newParagraph, inputField);
};

waitForInputField = function(callback) {
  var attempt, check;
  attempt = 0;
  check = function() {
    var inputField;
    inputField = document.querySelector("#prompt-textarea");
    if (inputField != null) {
      log("Found input field!");
      return callback(inputField);
    } else if (attempt < 10) {
      attempt++;
      log(`Retrying to find input field... Attempt ${attempt}`);
      return setTimeout(check, 500);
    } else {
      return log("Gave up finding #prompt-textarea");
    }
  };
  return check();
};

waitForInputField(function(inputField) {
  if (!inputField.dataset.tsListenersAdded) {
    inputField.dataset.tsListenersAdded = "true";
    inputField.addEventListener("input", function(event) {
      return log(`Input detected! Current content: ${inputField.value}`);
    });
    return inputField.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        if (event.shiftKey) {
          return log("Ignoring shift-enter");
        } else {
          log("Enter key detected");
          return updateTimestamp("querySent");
        }
      }
    });
  }
});

updateEndTimestamp = function() {
  var pid;
  log("updateEndTimestamp");
  if (pid = updateEndTimestamp.pid) {
    clearTimeout(pid);
  }
  addOrUpdateTimestamp("querySent");
  return updateEndTimestamp.pid = setTimeout(100, updateEndTimestamp);
};

browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  log("Message received from background");
  if (message.action === "insertTimestamp") {
    getOrSetInputElement();
    if (!metaData.responseReceived) {
      addOrUpdateTimestamp("responseReceived");
    }
  }
  return updateEndTimestamp();
});

log("doc loaded (v1.2)");

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlcyI6WyJzcmMvY29udGVudC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsUUFBQSxFQUFBLG9CQUFBLEVBQUEsb0JBQUEsRUFBQSxZQUFBLEVBQUEsZUFBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUEsZUFBQSxFQUFBLGFBQUEsRUFBQSxXQUFBLEVBQUEsa0JBQUEsRUFBQSxjQUFBLEVBQUE7O0FBQUEsUUFBQSxHQUFXOztBQUVYLEdBQUEsR0FBTSxRQUFBLENBQUMsQ0FBRCxFQUFBLEdBQUksSUFBSixDQUFBO1NBQWdCLE9BQU8sQ0FBQyxHQUFSLENBQVksb0JBQUEsR0FBdUIsQ0FBbkMsRUFBc0MsR0FBQSxJQUF0QztBQUFoQjs7QUFFTixRQUFBLEdBQWtCLENBQUE7O0FBQ2xCLFlBQUEsR0FBa0I7O0FBQ2xCLGVBQUEsR0FBa0I7O0FBRWxCLG9CQUFBLEdBQXVCLFFBQUEsQ0FBQSxDQUFBO0FBQ3ZCLE1BQUE7RUFBRSxJQUFHLENBQUksQ0FBQSxtQkFBQSxHQUFzQixRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsQ0FBdEIsQ0FBUDtJQUNFLEdBQUEsQ0FBSSw2QkFBSjtBQUNBLFdBRkY7O0VBSUEsSUFBRyxZQUFBLEtBQWtCLG1CQUFyQjtJQUNFLEdBQUEsQ0FBSSx1QkFBSjtJQUNBLFlBQUEsR0FBZTtXQUNmLGFBQUEsQ0FBQSxFQUhGOztBQUxxQjs7QUFVdkIsV0FBQSxHQUFjLFFBQUEsQ0FBQSxDQUFBO1NBQ1osV0FBVyxDQUFDLFNBQVosR0FBd0IsSUFBSSxDQUFDLFNBQUwsQ0FBZSxRQUFmO0FBRFo7O0FBR2QsYUFBQSxHQUFnQixRQUFBLENBQUEsQ0FBQTtBQUNoQixNQUFBO0VBQUUsUUFBQSxHQUFXLE1BQU0sQ0FBQyxNQUFQLENBQWM7SUFBQSxHQUFBLEVBQUssUUFBTDtJQUFlLEtBQUEsRUFBTyxJQUFJLENBQUMsR0FBTCxDQUFBO0VBQXRCLENB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QUMsS0FBRCxDQUFBO01BQ3JDLElBQUcsS0FBSyxDQUFDLEdBQU4sS0FBYSxPQUFoQjtRQUNFLElBQUcsS0FBSyxDQUFDLFFBQVQ7aUJBQ0UsR0FBQSxDQUFJLHNCQUFKLEVBREY7U0FBQSxNQUFBO1VBR0UsR0FBQSxDQUFJLG9CQUFKO2lCQUNBLGVBQUEsQ0FBZ0IsV0FBaEIsRUFKRjtTQURGOztJQURxQyxDQUF2QyxFQU5GOztBQURnQixDQUFsQjs7QUFnQkEsa0JBQUEsR0FBcUIsUUFBQSxDQUFBLENBQUE7QUFDckIsTUFBQTtFQUFFLEdBQUEsQ0FBSSxvQkFBSjtFQUVBLElBQUcsR0FBQSxHQUFNLGtCQUFrQixDQUFDLEdBQTVCO0lBQ0UsWUFBQSxDQUFhLEdBQWIsRUFERjs7RUFHQSxvQkFBQSxDQUFxQixXQUFyQjtTQUNBLGtCQUFrQixDQUFDLEdBQW5CLEdBQXlCLFVBQUEsQ0FBVyxHQUFYLEVBQWdCLGtCQUFoQjtBQVBOOztBQVNyQixPQUNFLENBQUMsT0FDRCxDQUFDLFNBQ0QsQ0FBQyxXQUhILENBR2UsUUFBQSxDQUFDLE9BQUQsRUFBVSxNQUFWLEVBQWtCLFlBQWxCLENBQUE7RUFDWCxHQUFBLENBQUksa0NBQUo7RUFFQSxJQUFHLE9BQU8sQ0FBQyxNQUFSLEtBQWtCLGlCQUFyQjtJQUNFLG9CQUFBLENBQUE7SUFFQSxJQUFHLENBQUksUUFBUSxDQUFDLGdCQUFoQjtNQUNFLG9CQUFBLENBQXFCLGtCQUFyQixFQURGO0tBSEY7O1NBTUEsa0JBQUEsQ0FBQTtBQVRXLENBSGY7O0FBZUEsR0FBQSxDQUFJLG1CQUFKIiwic291cmNlc0NvbnRlbnQiOlsiTUVUQV9LRVkgPSBcImNncHRpaGt2MVwiXG5cbmxvZyA9IChzLCBhcmdzLi4uKSAtPiBjb25zb2xlLmxvZyBcIltjR1BUdHMgQ29udGVudF06IFwiICsgcywgYXJncy4uLlxuXG5tZXRhRGF0YSAgICAgICAgPSB7fVxuaW5wdXRFbGVtZW50ICAgID0gbnVsbFxubWV0YURhdGFFbGVtZW50ID0gbnVsbFxuXG5nZXRPclNldElucHV0RWxlbWVudCA9IC0+XG4gIGlmIG5vdCBjdXJyZW50SW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBcIiNwcm9tcHQtdGV4dGFyZWFcIlxuICAgIGxvZyBcImVycm9yIGxvY2F0aW5nIGlucHV0RWxlbWVudFwiXG4gICAgcmV0dXJuXG5cbiAgaWYgaW5wdXRFbGVtZW50IGlzbnQgY3VycmVudElucHV0RWxlbWVudFxuICAgIGxvZyBcImlucHV0RWxlbWVudCB1cGRhdGluZ1wiXG4gICAgaW5wdXRFbGVtZW50ID0gY3VycmVudElucHV0RWxlbWVudFxuICAgIHJlc2V0TWV0YURhdGEoKVxuXG5zZXRNZXRhSFRNTCA9IC0+XG4gIG1ldGFFbGVtZW50LmlubmVySFRNTCA9IEpTT04uc3RyaW5naWZ5IG1ldGFEYXRhXG5cbnJlc2V0TWV0YURhdGEgPSAtPlxuICBtZXRhRGF0YSA9IE9iamVjdC5hc3NpZ24ga2V5OiBNRVRBX0tFWSwgc3RhcnQ6IERhdGUubm93KClcbiAgbWV0YUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdwJ1xuICBpbnB1dEVsZW1lbnQucHJlcGVuZCBtZXRhRWxlbWVudFxuICBzZXRNZXRhSFRNTCgpXG5cblxudXBkYXRlTWV0YURhdGEgPSAoY2hhbmdlcykgLT5cbiAgbG9nIFwidXBkYXRlTWV0YURhdGE6IFwiICsgSlNPTi5zdHJpbmdpZnkgY2hhbmdlc1xuICBnZXRPclNldElucHV0RWxlbWVudCgpXG5cbiAgT2JqZWN0LmFzc2lnbiBtZXRhRGF0YSwgY2hhbmdlc1xuICBzZXRNZXRhSFRNTCgpXG5cblxuYWRkT3JVcGRhdGVUaW1lc3RhbXAgPSAoc3RhbXBOYW1lKSAtPiB1cGRhdGVNZXRhRGF0YSBbc3RhbXBOYW1lXTogRGF0ZS5ub3coKVxuXG5cbmluc2VydFRpbWVzdGFtcCA9IChsb2NhdGlvbikgLT5cbiAgbG9nIFwiaW5zZXJ0VGltZXN0YW1wICgje2xvY2F0aW9ufSlcIlxuXG4gIGlmIG5vdCBpbnB1dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBcIiNwcm9tcHQtdGV4dGFyZWFcIlxuICAgIGxvZyBcImVycm9yIGxvY2F0aW5nIGlucHV0RmllbGRcIlxuICAgIHJldHVyblxuXG4gIGxvZyBcImlucHV0RmllbGQgSFRNTCBjb250ZW50czogXCIgKyBpbnB1dEZpZWxkLmdldEhUTUwoKVxuXG4gIHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuXG4gIChuZXdQYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwicFwiKVxuICAgIC5jbGFzc0xpc3QuYWRkIFwidGltZXN0YW1wXCIsIGxvY2F0aW9uXG5cbiAgW25ld1BhcmFncmFwaC50ZXh0Q29udGVudCwgcHJlZml4XSA9XG4gICAgaWYgbG9jYXRpb24gaXMgXCJzdGFydFwiXG4gICAgICBbIFwiWyN7dGltZXN0YW1wfSByZXNwb25zZSByZWNlaXZlZF1cIiwgXCJwcmVcIiBdXG4gICAgZWxzZVxuICAgICAgWyBcIlsje3RpbWVzdGFtcH0gcXVlcnkgc2VudF1cIiwgICAgICAgIFwiYXBcIiBdXG5cbiAgYWRkSWZBYnNlbnQgcHJlZml4LCBcInRpbWVzdGFtcFwiLCBuZXdQYXJhZ3JhcGgsIGlucHV0RmllbGRcblxuXG53YWl0Rm9ySW5wdXRGaWVsZCA9IChjYWxsYmFjaykgLT5cbiAgYXR0ZW1wdCA9IDBcbiAgY2hlY2sgPSAtPlxuICAgIGlucHV0RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIFwiI3Byb21wdC10ZXh0YXJlYVwiXG4gICAgaWYgaW5wdXRGaWVsZD9cbiAgICAgIGxvZyBcIkZvdW5kIGlucHV0IGZpZWxkIVwiXG5cbiAgICAgIGNhbGxiYWNrKGlucHV0RmllbGQpXG4gICAgZWxzZSBpZiBhdHRlbXB0IDwgMTBcbiAgICAgIGF0dGVtcHQrK1xuICAgICAgbG9nIFwiUmV0cnlpbmcgdG8gZmluZCBpbnB1dCBmaWVsZC4uLiBBdHRlbXB0ICN7YXR0ZW1wdH1cIlxuXG4gICAgICBzZXRUaW1lb3V0IGNoZWNrLCA1MDBcbiAgICBlbHNlXG4gICAgICBsb2cgXCJHYXZlIHVwIGZpbmRpbmcgI3Byb21wdC10ZXh0YXJlYVwiXG5cbiAgY2hlY2soKVxuXG53YWl0Rm9ySW5wdXRGaWVsZCAoaW5wdXRGaWVsZCkgLT5cbiAgaWYgbm90IGlucHV0RmllbGQuZGF0YXNldC50c0xpc3RlbmVyc0FkZGVkXG4gICAgaW5wdXRGaWVsZC5kYXRhc2V0LnRzTGlzdGVuZXJzQWRkZWQgPSBcInRydWVcIlxuXG4gICAgaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyIFwiaW5wdXRcIiwgKGV2ZW50KSAtPlxuICAgICAgbG9nIFwiSW5wdXQgZGV0ZWN0ZWQhIEN1cnJlbnQgY29udGVudDogI3tpbnB1dEZpZWxkLnZhbHVlfVwiXG5cbiAgICBpbnB1dEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIgXCJrZXlkb3duXCIsIChldmVudCkgLT5cbiAgICAgIGlmIGV2ZW50LmtleSBpcyBcIkVudGVyXCJcbiAgICAgICAgaWYgZXZlbnQuc2hpZnRLZXlcbiAgICAgICAgICBsb2cgXCJJZ25vcmluZyBzaGlmdC1lbnRlclwiXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBsb2cgXCJFbnRlciBrZXkgZGV0ZWN0ZWRcIlxuICAgICAgICAgIHVwZGF0ZVRpbWVzdGFtcCBcInF1ZXJ5U2VudFwiXG5cblxudXBkYXRlRW5kVGltZXN0YW1wID0gLT5cbiAgbG9nIFwidXBkYXRlRW5kVGltZXN0YW1wXCJcblxuICBpZiBwaWQgPSB1cGRhdGVFbmRUaW1lc3RhbXAucGlkXG4gICAgY2xlYXJUaW1lb3V0IHBpZFxuXG4gIGFkZE9yVXBkYXRlVGltZXN0YW1wIFwicXVlcnlTZW50XCJcbiAgdXBkYXRlRW5kVGltZXN0YW1wLnBpZCA9IHNldFRpbWVvdXQgMTAwLCB1cGRhdGVFbmRUaW1lc3RhbXBcblxuYnJvd3NlclxuICAucnVudGltZVxuICAub25NZXNzYWdlXG4gIC5hZGRMaXN0ZW5lciAobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIC0+XG4gICAgbG9nIFwiTWVzc2FnZSByZWNlaXZlZCBmcm9tIGJhY2tncm91bmRcIlxuXG4gICAgaWYgbWVzc2FnZS5hY3Rpb24gaXMgXCJpbnNlcnRUaW1lc3RhbXBcIlxuICAgICAgZ2V0T3JTZXRJbnB1dEVsZW1lbnQoKVxuXG4gICAgICBpZiBub3QgbWV0YURhdGEucmVzcG9uc2VSZWNlaXZlZFxuICAgICAgICBhZGRPclVwZGF0ZVRpbWVzdGFtcCBcInJlc3BvbnNlUmVjZWl2ZWRcIlxuXG4gICAgdXBkYXRlRW5kVGltZXN0YW1wKClcblxuXG5sb2cgXCJkb2MgbG9hZGVkICh2MS4yKVwiXG4iXX0=
//# sourceURL=/Users/robert/git/github/rdeforest/ChatGPT-timestamp/src/content.coffee