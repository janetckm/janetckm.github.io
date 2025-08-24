chrome.runtime.onInstalled.addListener(() => {
    console.log('Text Reader extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'HIGHLIGHTED_TEXT_CHANGED') {
        // Forward message to popup if it's open
        chrome.runtime.sendMessage(message);
    }
});
