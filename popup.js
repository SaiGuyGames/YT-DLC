// Function to handle the download button click
function handleDownloadClick() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab && (activeTab.url.includes('youtube.com') || activeTab.url.includes('youtu.be'))) {
      const videoURLInput = document.getElementById('video-url');
      videoURLInput.value = activeTab.url;

      // Send a message to content script to request video duration
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: extractVideoDuration
      });
    } else {
      alert('Please visit a YouTube page to use this extension.');
    }
  });
}

// Function to handle the refresh button click
function handleRefreshClick() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab && (activeTab.url.includes('youtube.com') || activeTab.url.includes('youtu.be'))) {
      // Send a message to content script to request video duration
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: extractVideoDuration
      });
    } else {
      alert('Please visit a YouTube page to use this extension.');
    }
  });
}

// Attach the handleDownloadClick function to the download button
document.getElementById('download-button').addEventListener('click', handleDownloadClick);

// Attach the handleRefreshClick function to the refresh button
document.getElementById('refresh-button').addEventListener('click', handleRefreshClick);

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'videoDuration') {
    const videoDuration = message.duration;
    // Update the HTML to display the video duration
    document.getElementById('video-length').textContent = videoDuration;
  }
});

// Function to extract video duration from the page
function extractVideoDuration() {
  const durationElement = document.querySelector('.ytp-time-duration'); // Replace with the correct selector
  if (durationElement) {
    const durationText = durationElement.textContent;
    // Send the video duration back to the popup script
    chrome.runtime.sendMessage({ action: 'videoDuration', duration: durationText });
  }
}