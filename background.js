chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    
    if (changeInfo.status === "complete") 
    {
        const url = new URL(tab.url);            
        
                if (url.hostname === "https://www.google.com/*") {                            
                chrome.tabs.executeScript(tabId, {file: "searchResult.js"});
                } else {
                    return;
                }

    }
});
