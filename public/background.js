
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["blockedSites"], (storage) => {
    if (!Array.isArray(storage.blockedSites)) {
      chrome.storage.sync.set({ blockedSites: [] });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  chrome.storage.sync.get(["focusSetting"], (storage) => {
    if (storage.focusSetting) {
      const url =
        changeInfo.pendingUrl || changeInfo.url || changeInfo.favIconUrl;
      if (!url || !url.startsWith("http")) {
        return;
      }

      const hostname = new URL(url).hostname;

      chrome.storage.sync.get(["blockedSites"], (storage) => {
        const { blockedSites } = storage;
        if (
          Array.isArray(blockedSites) &&
          blockedSites.find((domain) => hostname.includes(domain))
        ) {
          chrome.tabs.remove(tabId);
        }
      });
    }
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {

  chrome.notifications.create('Notification!', {
    type: 'basic',
    iconUrl: './logo192.png',
    title: 'Alarm!',
    message: 'You have set an alarm for now.',
    priority: 2
})
  //* Doesn't work atm since mv3 does not support audio in service worker
  // const sound = new Audio('./alarm.mp3');
  // sound.play();
})
