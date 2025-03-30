// Generated by CoffeeScript 2.7.0
var INPUT_QUERY_SELECTOR, e, getInputElement, insertTimestamp, log;

INPUT_QUERY_SELECTOR = "#prompt-textarea";

log = function(s, ...args) {
  return console.log("[cGPTts Background]: " + s, ...args);
};

browser.webRequest.onCompleted.addListener(function(details) {
  log("Response received at:", new Date().toISOString());
  return browser.tabs.query({
    active: true,
    currentWindow: true
  }).then(function(tabs) {
    if (tabs.length > 0) {
      return browser.tabs.sendMessage(tabs[0].id, {
        action: "insertTimestamp"
      });
    }
  });
}, {
  urls: ["*://chatgpt.com/*"]
});

getInputElement = function() {
  var attempt, check;
  attempt = 0;
  check = function() {
    var inputField;
    inputField = document.querySelector(INPUT_QUERY_SELECTOR);
    if (inputField != null) {
      log("Found input field!");
      return callback(inputField);
    } else if (attempt < 10) {
      attempt++;
      log(`Retrying to find input field... attempt ${attempt}`);
      return setTimeout(check, 500);
    } else {
      return log(`Gave up waiting for '${INPUT_QUERY_SELECTOR}'`);
    }
  };
  return check();
};

log('Hello from the background script!');

insertTimestamp = function() {
  return getInputElement(function(inputField) {
    var timestamp;
    timestamp = new Date().toISOString();
    return inputField.value = `[${timestamp}] ` + inputField.value;
  });
};

try {
  // document.addEventListener "DOMContentLoaded", insertTimestamp
  browser.webRequest.onCompleted.addListener(function(details) {
    log("Response received at:", new Date().toISOString());
    return insertTimestamp();
  }, {
    urls: ["*://chat.openai.com/*"] // Adjust if needed
  });
  document.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      log("Enter key detected");
      return insertTimestamp();
    }
  });
  log("added listeners");
} catch (error) {
  e = error;
  log("Error adding listener:\n\n" + e.toString());
}

try {
  log(`\`background.coffee\` load complete at ${new Date().toISOString()}`);
} catch (error) {
  e = error;
  log("Error logging success?!\n\n" + e.toString());
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlcyI6WyJzcmMvYmFja2dyb3VuZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUEsb0JBQUEsRUFBQSxDQUFBLEVBQUEsZUFBQSxFQUFBLGVBQUEsRUFBQTs7QUFBQSxvQkFBQSxHQUF1Qjs7QUFFdkIsR0FBQSxHQUFNLFFBQUEsQ0FBQyxDQUFELEVBQUEsR0FBSSxJQUFKLENBQUE7U0FDSixPQUFPLENBQUMsR0FBUixDQUFZLHVCQUFBLEdBQTBCLENBQXRDLEVBQXlDLEdBQUEsSUFBekM7QUFESTs7QUFHTixPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUEvQixDQUNFLFFBQUEsQ0FBQyxPQUFELENBQUE7RUFDRSxHQUFBLENBQUksdUJBQUosRUFBNkIsSUFBSSxJQUFKLENBQUEsQ0FBVSxDQUFDLFdBQVgsQ0FBQSxDQUE3QjtTQUVBLE9BQ0UsQ0FBQyxJQUFJLENBQUMsS0FEUixDQUNjO0lBQUMsTUFBQSxFQUFRLElBQVQ7SUFBZSxhQUFBLEVBQWU7RUFBOUIsQ0FEZCxDQUVFLENBQUMsSUFGSCxDQUVRLFFBQUEsQ0FBQyxJQUFELENBQUE7SUFDSixJQUFHLElBQUksQ0FBQyxNQUFMLEdBQWMsQ0FBakI7YUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQWIsQ0FBeUIsSUFBSSxDQUFDLENBQUQsQ0FBRyxDQUFDLEVBQWpDLEVBQXFDO1FBQUUsTUFBQSxFQUFRO01BQVYsQ0FBckMsRUFERjs7RUFESSxDQUZSO0FBSEYsQ0FERixFQVNFO0VBQUUsSUFBQSxFQUFNLENBQUMsbUJBQUQ7QUFBUixDQVRGOztBQVlBLGVBQUEsR0FBa0IsUUFBQSxDQUFBLENBQUE7QUFDbEIsTUFBQSxPQUFBLEVBQUE7RUFBRSxPQUFBLEdBQVU7RUFFVixLQUFBLEdBQVEsUUFBQSxDQUFBLENBQUE7QUFDVixRQUFBO0lBQUksVUFBQSxHQUFhLFFBQVEsQ0FBQyxhQUFULENBQXVCLG9CQUF2QjtJQUViLElBQUcsa0JBQUg7TUFDRSxHQUFBLENBQUksb0JBQUo7YUFDQSxRQUFBLENBQVMsVUFBVCxFQUZGO0tBQUEsTUFJSyxJQUFHLE9BQUEsR0FBVSxFQUFiO01BQ0gsT0FBQTtNQUNBLEdBQUEsQ0FBSSxDQUFBLHdDQUFBLENBQUEsQ0FBMkMsT0FBM0MsQ0FBQSxDQUFKO2FBQ0EsVUFBQSxDQUFXLEtBQVgsRUFBa0IsR0FBbEIsRUFIRztLQUFBLE1BQUE7YUFNSCxHQUFBLENBQUksQ0FBQSxxQkFBQSxDQUFBLENBQXdCLG9CQUF4QixDQUFBLENBQUEsQ0FBSixFQU5HOztFQVBDO1NBZVIsS0FBQSxDQUFBO0FBbEJnQjs7QUFvQmxCLEdBQUEsQ0FBSSxtQ0FBSjs7QUFFQSxlQUFBLEdBQWtCLFFBQUEsQ0FBQSxDQUFBO1NBQ2hCLGVBQUEsQ0FBZ0IsUUFBQSxDQUFDLFVBQUQsQ0FBQTtBQUNsQixRQUFBO0lBQUksU0FBQSxHQUFZLElBQUksSUFBSixDQUFBLENBQVUsQ0FBQyxXQUFYLENBQUE7V0FFWixVQUFVLENBQUMsS0FBWCxHQUFtQixDQUFBLENBQUEsQ0FBQSxDQUFJLFNBQUosQ0FBQSxFQUFBLENBQUEsR0FBb0IsVUFBVSxDQUFDO0VBSHBDLENBQWhCO0FBRGdCOztBQVFsQjs7RUFDRSxPQUNFLENBQUMsVUFDRCxDQUFDLFdBQ0QsQ0FBQyxXQUhILENBSUksUUFBQSxDQUFDLE9BQUQsQ0FBQTtJQUNFLEdBQUEsQ0FBSSx1QkFBSixFQUE2QixJQUFJLElBQUosQ0FBQSxDQUFVLENBQUMsV0FBWCxDQUFBLENBQTdCO1dBQ0EsZUFBQSxDQUFBO0VBRkYsQ0FKSixFQVFJO0lBQUUsSUFBQSxFQUFNLENBQUMsdUJBQUQsQ0FBUjtFQUFBLENBUko7RUFXQSxRQUNFLENBQUMsZ0JBREgsQ0FDb0IsVUFEcEIsRUFDZ0MsUUFBQSxDQUFDLEtBQUQsQ0FBQTtJQUM1QixJQUFHLEtBQUssQ0FBQyxHQUFOLEtBQWEsT0FBYixJQUF5QixDQUFJLEtBQUssQ0FBQyxRQUF0QztNQUNFLEdBQUEsQ0FBSSxvQkFBSjthQUNBLGVBQUEsQ0FBQSxFQUZGOztFQUQ0QixDQURoQztFQU1BLEdBQUEsQ0FBSSxpQkFBSixFQWxCRjtDQW1CQSxhQUFBO0VBQU07RUFDSixHQUFBLENBQUksNEJBQUEsR0FBK0IsQ0FBQyxDQUFDLFFBQUYsQ0FBQSxDQUFuQyxFQURGOzs7QUFLQTtFQUNFLEdBQUEsQ0FBSSxDQUFBLHVDQUFBLENBQUEsQ0FBd0MsSUFBSSxJQUFKLENBQUEsQ0FBVSxDQUFDLFdBQVgsQ0FBQSxDQUF4QyxDQUFBLENBQUosRUFERjtDQUVBLGFBQUE7RUFBTTtFQUNKLEdBQUEsQ0FBSSw2QkFBQSxHQUFnQyxDQUFDLENBQUMsUUFBRixDQUFBLENBQXBDLEVBREYiLCJzb3VyY2VzQ29udGVudCI6WyJJTlBVVF9RVUVSWV9TRUxFQ1RPUiA9IFwiI3Byb21wdC10ZXh0YXJlYVwiXG5cbmxvZyA9IChzLCBhcmdzLi4uKSAtPlxuICBjb25zb2xlLmxvZyBcIltjR1BUdHMgQmFja2dyb3VuZF06IFwiICsgcywgYXJncy4uLlxuXG5icm93c2VyLndlYlJlcXVlc3Qub25Db21wbGV0ZWQuYWRkTGlzdGVuZXIoXG4gIChkZXRhaWxzKSAtPlxuICAgIGxvZyBcIlJlc3BvbnNlIHJlY2VpdmVkIGF0OlwiLCBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcblxuICAgIGJyb3dzZXJcbiAgICAgIC50YWJzLnF1ZXJ5IHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9XG4gICAgICAudGhlbiAodGFicykgLT5cbiAgICAgICAgaWYgdGFicy5sZW5ndGggPiAwXG4gICAgICAgICAgYnJvd3Nlci50YWJzLnNlbmRNZXNzYWdlIHRhYnNbMF0uaWQsIHsgYWN0aW9uOiBcImluc2VydFRpbWVzdGFtcFwiIH1cbiAgeyB1cmxzOiBbXCIqOi8vY2hhdGdwdC5jb20vKlwiXSB9XG4pXG5cbmdldElucHV0RWxlbWVudCA9IC0+XG4gIGF0dGVtcHQgPSAwXG5cbiAgY2hlY2sgPSAtPlxuICAgIGlucHV0RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIElOUFVUX1FVRVJZX1NFTEVDVE9SXG5cbiAgICBpZiBpbnB1dEZpZWxkP1xuICAgICAgbG9nIFwiRm91bmQgaW5wdXQgZmllbGQhXCJcbiAgICAgIGNhbGxiYWNrIGlucHV0RmllbGRcblxuICAgIGVsc2UgaWYgYXR0ZW1wdCA8IDEwXG4gICAgICBhdHRlbXB0KytcbiAgICAgIGxvZyBcIlJldHJ5aW5nIHRvIGZpbmQgaW5wdXQgZmllbGQuLi4gYXR0ZW1wdCAje2F0dGVtcHR9XCJcbiAgICAgIHNldFRpbWVvdXQgY2hlY2ssIDUwMFxuXG4gICAgZWxzZVxuICAgICAgbG9nIFwiR2F2ZSB1cCB3YWl0aW5nIGZvciAnI3tJTlBVVF9RVUVSWV9TRUxFQ1RPUn0nXCJcblxuICBjaGVjaygpXG5cbmxvZyAnSGVsbG8gZnJvbSB0aGUgYmFja2dyb3VuZCBzY3JpcHQhJ1xuXG5pbnNlcnRUaW1lc3RhbXAgPSAtPlxuICBnZXRJbnB1dEVsZW1lbnQgKGlucHV0RmllbGQpIC0+XG4gICAgdGltZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG5cbiAgICBpbnB1dEZpZWxkLnZhbHVlID0gXCJbI3t0aW1lc3RhbXB9XSBcIiArIGlucHV0RmllbGQudmFsdWVcblxuIyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyIFwiRE9NQ29udGVudExvYWRlZFwiLCBpbnNlcnRUaW1lc3RhbXBcblxudHJ5XG4gIGJyb3dzZXJcbiAgICAud2ViUmVxdWVzdFxuICAgIC5vbkNvbXBsZXRlZFxuICAgIC5hZGRMaXN0ZW5lcihcbiAgICAgIChkZXRhaWxzKSAtPlxuICAgICAgICBsb2cgXCJSZXNwb25zZSByZWNlaXZlZCBhdDpcIiwgbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgIGluc2VydFRpbWVzdGFtcCgpXG5cbiAgICAgIHsgdXJsczogW1wiKjovL2NoYXQub3BlbmFpLmNvbS8qXCJdIH0gICMgQWRqdXN0IGlmIG5lZWRlZFxuICAgIClcblxuICBkb2N1bWVudFxuICAgIC5hZGRFdmVudExpc3RlbmVyIFwia2V5cHJlc3NcIiwgKGV2ZW50KSAtPlxuICAgICAgaWYgZXZlbnQua2V5IGlzIFwiRW50ZXJcIiBhbmQgbm90IGV2ZW50LnNoaWZ0S2V5XG4gICAgICAgIGxvZyBcIkVudGVyIGtleSBkZXRlY3RlZFwiXG4gICAgICAgIGluc2VydFRpbWVzdGFtcCgpXG5cbiAgbG9nIFwiYWRkZWQgbGlzdGVuZXJzXCJcbmNhdGNoIGVcbiAgbG9nIFwiRXJyb3IgYWRkaW5nIGxpc3RlbmVyOlxcblxcblwiICsgZS50b1N0cmluZygpXG5cblxuXG50cnlcbiAgbG9nIFwiYGJhY2tncm91bmQuY29mZmVlYCBsb2FkIGNvbXBsZXRlIGF0ICN7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfVwiXG5jYXRjaCBlXG4gIGxvZyBcIkVycm9yIGxvZ2dpbmcgc3VjY2Vzcz8hXFxuXFxuXCIgKyBlLnRvU3RyaW5nKClcblxuIl19
//# sourceURL=/Users/robert/git/github/rdeforest/ChatGPT-timestamp/src/background.coffee