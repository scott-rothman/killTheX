chrome.webNavigation.onCompleted.addListener((details) => {
    console.log('fetch');
    if (details.url.indexOf('chrome://' < 0)) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            // Use the Scripting API to execute a script
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: setFavicon
            });
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: findXs
            });
        });	
    }
});

function setFavicon() {
    let url = chrome.runtime.getURL("images/icon.png");
    const favicon = document.querySelector('link[rel*="shortcut icon"]');
    if (favicon) {
        favicon.href = url;	
    }
}

function findXs() {
    let counter = 0;
    const paths = document.querySelectorAll('path[d~="M14.258"]');
    //const filename = "https://pbs.twimg.com/profile_images/1683352940466061313/ROqzFNVh_bigger.jpg";
    //const profileXs = document.querySelectorAll(`a[href="${filename}"`);
    console.log(`${paths.length} Xs found...`);
    for (const path of paths) {
        path.remove();
        counter++;
    }

    // console.log(`${profileXs.length} icons found...`);
    // for (const xs of profileXs) {
    //     xs.remove();
    // }

    console.log(`${counter} removed`);
}