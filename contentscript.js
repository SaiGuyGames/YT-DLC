// contentscript.js

// Function to extract video duration from the page
function extractVideoDuration() {
    const durationElement = document.querySelector('.ytp-time-duration'); // Replace with the correct selector
  
    if (durationElement) {
      const durationText = durationElement.textContent;
      return durationText;
    }
  
    return 'Duration not found';
  }
  
  // Listen for messages from popup.js
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'extractVideoDuration') {
      const videoDuration = extractVideoDuration();
      sendResponse({ duration: videoDuration });
    }
  });
  