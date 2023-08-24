/* eslint-disable no-undef */

const sendMessage = (message, payload) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message,
      payload
    });
  });
}
 

/**
 * Remove the data from chrome local storage
 * @param {*} key 
 * @param {*} callbackAction 
 */

const removeLocalData = (key, callbackAction) => {
  try {
    chrome.storage.local.remove([key], () => {
      if (callbackAction) {
        callbackAction()
      }
    });
  } catch (e) {
    localStorage.removeItem(key);
    if (callbackAction) {
      callbackAction()
    }

  }
}


/**
 * Retreive the data from chrome local storage
 * @param {*} key
 * @param {*} data
 */
const getSyncLocalData = (key) => {
  return new Promise((resolve) => {
    try {
      chrome.storage.local.get(key, (result) => {
        let data = JSON.parse(result[key] || '{}');
        resolve(data);
      });
    } catch (e) {
      resolve({});
    }
  });
}

/**
 * Store the data in chrome local storage
 * @param {*} key
 * @param {*} data
 */
const setLocalData = (key, data) => {
  try {
    chrome.storage.local.set({ [key]: JSON.stringify(data) }, () => {
    });
  } catch (e) {

  }
}

chrome.runtime.onMessage.addListener(async (data, sender, sendResponse) => {
  switch (data.message) {
    case 'SET_USER_PROFILE':
      setLocalData('profile', data.payload)
      break;
    default:
      break;
  }
})

// Called when the user clicks on the browser action
chrome.action.onClicked.addListener(function (tab) {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
    var activeTab = tabs[0];
    const payload = await getSyncLocalData('profile')
    chrome.tabs.sendMessage(activeTab.id, {
      message: "CLICKED_BROWSER_ACTION",
      payload
    });
  });
});