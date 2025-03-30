// Generated by CoffeeScript 2.7.0
var findChatInput, insertTimestamp, log, waitForInputField;

log = function(s, ...args) {
  return console.log("[cGPTts Content]: " + s, ...args);
};

findChatInput = function() {};

// Function to insert timestamps
insertTimestamp = function(location) {
  var appendText, fn, inputField, prependText, text, timestamp;
  inputField = document.querySelector("#prompt-textarea");
  prependText = function(text) {
    return inputField.innerText = text + inputField.innerText;
  };
  appendText = function(text) {
    return inputField.innerText = inputField.innerText + text;
  };
  timestamp = new Date().toISOString();
  switch (location) {
    case "start":
      fn = prependText;
      text = `[${timestamp} response received]\n\n`;
      break;
    case "end":
      fn = appendText;
      text = `\n\n[${timestamp} query sent]`;
  }
  return fn(text);
};

// Wait for the input field to exist before adding listeners
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
      return setTimeout(check, 500); // Try again in 500ms
    } else {
      return log("Gave up finding #prompt-textarea");
    }
  };
  return check();
};

waitForInputField(function(inputField) {
  inputField.addEventListener("input", function(event) {
    return log(`Input detected! Current content: ${inputField.innerText}`);
  });
  return inputField.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      log("Enter key detected");
      return insertTimestamp("end");
    }
  });
});

browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "insertTimestamp") {
    return insertTimestamp("start");
  }
});

log("doc loaded");

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlcyI6WyJzcmMvY29udGVudC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsYUFBQSxFQUFBLGVBQUEsRUFBQSxHQUFBLEVBQUE7O0FBQUEsR0FBQSxHQUFNLFFBQUEsQ0FBQyxDQUFELEVBQUEsR0FBSSxJQUFKLENBQUE7U0FDSixPQUFPLENBQUMsR0FBUixDQUFZLG9CQUFBLEdBQXVCLENBQW5DLEVBQXNDLEdBQUEsSUFBdEM7QUFESTs7QUFHTixhQUFBLEdBQWdCLFFBQUEsQ0FBQSxDQUFBLEVBQUEsRUFIaEI7OztBQU9BLGVBQUEsR0FBa0IsUUFBQSxDQUFDLFFBQUQsQ0FBQTtBQUNsQixNQUFBLFVBQUEsRUFBQSxFQUFBLEVBQUEsVUFBQSxFQUFBLFdBQUEsRUFBQSxJQUFBLEVBQUE7RUFBRSxVQUFBLEdBQWEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCO0VBRWIsV0FBQSxHQUFjLFFBQUEsQ0FBQyxJQUFELENBQUE7V0FBVSxVQUFVLENBQUMsU0FBWCxHQUF1QixJQUFBLEdBQU8sVUFBVSxDQUFDO0VBQW5EO0VBQ2QsVUFBQSxHQUFjLFFBQUEsQ0FBQyxJQUFELENBQUE7V0FBVSxVQUFVLENBQUMsU0FBWCxHQUE4QixVQUFVLENBQUMsU0FBWCxHQUF1QjtFQUEvRDtFQUVkLFNBQUEsR0FBWSxJQUFJLElBQUosQ0FBQSxDQUFVLENBQUMsV0FBWCxDQUFBO0FBRVosVUFBTyxRQUFQO0FBQUEsU0FDTyxPQURQO01BRUksRUFBQSxHQUFLO01BQ0wsSUFBQSxHQUFPLENBQUEsQ0FBQSxDQUFBLENBQUksU0FBSixDQUFBLHVCQUFBO0FBRko7QUFEUCxTQUlPLEtBSlA7TUFLSSxFQUFBLEdBQUs7TUFDTCxJQUFBLEdBQU8sQ0FBQSxLQUFBLENBQUEsQ0FBUSxTQUFSLENBQUEsWUFBQTtBQU5YO1NBUUEsRUFBQSxDQUFHLElBQUg7QUFoQmdCLEVBUGxCOzs7QUEyQkEsaUJBQUEsR0FBb0IsUUFBQSxDQUFDLFFBQUQsQ0FBQTtBQUNwQixNQUFBLE9BQUEsRUFBQTtFQUFFLE9BQUEsR0FBVTtFQUNWLEtBQUEsR0FBUSxRQUFBLENBQUEsQ0FBQTtBQUNWLFFBQUE7SUFBSSxVQUFBLEdBQWEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsa0JBQXZCO0lBQ2IsSUFBRyxrQkFBSDtNQUNFLEdBQUEsQ0FBSSxvQkFBSjthQUNBLFFBQUEsQ0FBUyxVQUFULEVBRkY7S0FBQSxNQUdLLElBQUcsT0FBQSxHQUFVLEVBQWI7TUFDSCxPQUFBO01BQ0EsR0FBQSxDQUFJLENBQUEsd0NBQUEsQ0FBQSxDQUEyQyxPQUEzQyxDQUFBLENBQUo7YUFDQSxVQUFBLENBQVcsS0FBWCxFQUFrQixHQUFsQixFQUhHO0tBQUEsTUFBQTthQUtILEdBQUEsQ0FBSSxrQ0FBSixFQUxHOztFQUxDO1NBWVIsS0FBQSxDQUFBO0FBZGtCOztBQWdCcEIsaUJBQUEsQ0FBa0IsUUFBQSxDQUFDLFVBQUQsQ0FBQTtFQUNoQixVQUFVLENBQUMsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsUUFBQSxDQUFDLEtBQUQsQ0FBQTtXQUNuQyxHQUFBLENBQUksQ0FBQSxpQ0FBQSxDQUFBLENBQW9DLFVBQVUsQ0FBQyxTQUEvQyxDQUFBLENBQUo7RUFEbUMsQ0FBckM7U0FHQSxVQUFVLENBQUMsZ0JBQVgsQ0FBNEIsVUFBNUIsRUFBd0MsUUFBQSxDQUFDLEtBQUQsQ0FBQTtJQUN0QyxJQUFHLEtBQUssQ0FBQyxHQUFOLEtBQWEsT0FBYixJQUF5QixDQUFJLEtBQUssQ0FBQyxRQUF0QztNQUNFLEdBQUEsQ0FBSSxvQkFBSjthQUNBLGVBQUEsQ0FBZ0IsS0FBaEIsRUFGRjs7RUFEc0MsQ0FBeEM7QUFKZ0IsQ0FBbEI7O0FBU0EsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBMUIsQ0FBc0MsUUFBQSxDQUFDLE9BQUQsRUFBVSxNQUFWLEVBQWtCLFlBQWxCLENBQUE7RUFDcEMsSUFBRyxPQUFPLENBQUMsTUFBUixLQUFrQixpQkFBckI7V0FDRSxlQUFBLENBQWdCLE9BQWhCLEVBREY7O0FBRG9DLENBQXRDOztBQUlBLEdBQUEsQ0FBSSxZQUFKIiwic291cmNlc0NvbnRlbnQiOlsibG9nID0gKHMsIGFyZ3MuLi4pIC0+XG4gIGNvbnNvbGUubG9nIFwiW2NHUFR0cyBDb250ZW50XTogXCIgKyBzLCBhcmdzLi4uXG5cbmZpbmRDaGF0SW5wdXQgPSAtPlxuXG5cbiMgRnVuY3Rpb24gdG8gaW5zZXJ0IHRpbWVzdGFtcHNcbmluc2VydFRpbWVzdGFtcCA9IChsb2NhdGlvbikgLT5cbiAgaW5wdXRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgXCIjcHJvbXB0LXRleHRhcmVhXCJcblxuICBwcmVwZW5kVGV4dCA9ICh0ZXh0KSAtPiBpbnB1dEZpZWxkLmlubmVyVGV4dCA9IHRleHQgKyBpbnB1dEZpZWxkLmlubmVyVGV4dFxuICBhcHBlbmRUZXh0ICA9ICh0ZXh0KSAtPiBpbnB1dEZpZWxkLmlubmVyVGV4dCA9ICAgICAgICBpbnB1dEZpZWxkLmlubmVyVGV4dCArIHRleHRcbiAgXG4gIHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKVxuXG4gIHN3aXRjaCBsb2NhdGlvblxuICAgIHdoZW4gXCJzdGFydFwiXG4gICAgICBmbiA9IHByZXBlbmRUZXh0XG4gICAgICB0ZXh0ID0gXCJbI3t0aW1lc3RhbXB9IHJlc3BvbnNlIHJlY2VpdmVkXVxcblxcblwiXG4gICAgd2hlbiBcImVuZFwiXG4gICAgICBmbiA9IGFwcGVuZFRleHRcbiAgICAgIHRleHQgPSBcIlxcblxcblsje3RpbWVzdGFtcH0gcXVlcnkgc2VudF1cIlxuXG4gIGZuIHRleHRcblxuXG4jIFdhaXQgZm9yIHRoZSBpbnB1dCBmaWVsZCB0byBleGlzdCBiZWZvcmUgYWRkaW5nIGxpc3RlbmVyc1xud2FpdEZvcklucHV0RmllbGQgPSAoY2FsbGJhY2spIC0+XG4gIGF0dGVtcHQgPSAwXG4gIGNoZWNrID0gLT5cbiAgICBpbnB1dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBcIiNwcm9tcHQtdGV4dGFyZWFcIlxuICAgIGlmIGlucHV0RmllbGQ/XG4gICAgICBsb2cgXCJGb3VuZCBpbnB1dCBmaWVsZCFcIlxuICAgICAgY2FsbGJhY2soaW5wdXRGaWVsZClcbiAgICBlbHNlIGlmIGF0dGVtcHQgPCAxMFxuICAgICAgYXR0ZW1wdCsrXG4gICAgICBsb2cgXCJSZXRyeWluZyB0byBmaW5kIGlucHV0IGZpZWxkLi4uIEF0dGVtcHQgI3thdHRlbXB0fVwiXG4gICAgICBzZXRUaW1lb3V0IGNoZWNrLCA1MDAgICMgVHJ5IGFnYWluIGluIDUwMG1zXG4gICAgZWxzZVxuICAgICAgbG9nIFwiR2F2ZSB1cCBmaW5kaW5nICNwcm9tcHQtdGV4dGFyZWFcIlxuXG4gIGNoZWNrKClcblxud2FpdEZvcklucHV0RmllbGQgKGlucHV0RmllbGQpIC0+XG4gIGlucHV0RmllbGQuYWRkRXZlbnRMaXN0ZW5lciBcImlucHV0XCIsIChldmVudCkgLT5cbiAgICBsb2cgXCJJbnB1dCBkZXRlY3RlZCEgQ3VycmVudCBjb250ZW50OiAje2lucHV0RmllbGQuaW5uZXJUZXh0fVwiXG5cbiAgaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyIFwia2V5cHJlc3NcIiwgKGV2ZW50KSAtPlxuICAgIGlmIGV2ZW50LmtleSBpcyBcIkVudGVyXCIgYW5kIG5vdCBldmVudC5zaGlmdEtleVxuICAgICAgbG9nIFwiRW50ZXIga2V5IGRldGVjdGVkXCJcbiAgICAgIGluc2VydFRpbWVzdGFtcCBcImVuZFwiXG5cbmJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIgKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSAtPlxuICBpZiBtZXNzYWdlLmFjdGlvbiBpcyBcImluc2VydFRpbWVzdGFtcFwiXG4gICAgaW5zZXJ0VGltZXN0YW1wIFwic3RhcnRcIlxuXG5sb2cgXCJkb2MgbG9hZGVkXCJcbiJdfQ==
//# sourceURL=/Users/robert/git/github/rdeforest/ChatGPT-timestamp/src/content.coffee