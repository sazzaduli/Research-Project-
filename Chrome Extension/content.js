function replaceImages() {
    const images = document.getElementsByTagName('img');
    for (let img of images) {
      img.src = `https://placekitten.com/${img.width}/${img.height}`;
    }
  }
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "replaceImages") {
      replaceImages();
      sendResponse({status: "Images replaced"});
    }
  });
  