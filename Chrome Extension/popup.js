document.getElementById('replaceButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs.length === 0) {
      console.error("No active tab found.");
      return;
    }

    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ['content.js']
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Error injecting script:", chrome.runtime.lastError);
        } else {
          chrome.tabs.sendMessage(tabs[0].id, {action: "replaceImages"}, (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error sending message:", chrome.runtime.lastError);
            } else if (response && response.status) {
              console.log(response.status);
            } else {
              console.log("No response or response is undefined.");
            }
          });
        }
      }
    );
  });
});

  
  