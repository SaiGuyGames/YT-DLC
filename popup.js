// popup.js

// Function to handle the download button click
function handleDownloadClick() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab && isYouTubeURL(activeTab.url)) {
      const videoURLInput = document.getElementById('video-url');
      videoURLInput.value = activeTab.url;
    } else {
      alert('Please visit a YouTube page to use this extension.');
    }
  });
}

// Function to check if a URL is from YouTube
function isYouTubeURL(url) {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

// Attach the handleDownloadClick function to the download button
document.getElementById('download-button').addEventListener('click', handleDownloadClick);
