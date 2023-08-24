/* eslint-disable no-console */
/* global chrome */

const sendMessage = (
    message,
    payload = null,
    _callbackAction
) => {
    try {
        // eslint-disable-next-line consistent-return
        chrome.runtime.sendMessage({ message, payload }, (response) => {
            const lastErr = chrome.runtime.lastError;
            if (lastErr) {
                return lastErr
            }
            if (_callbackAction) {
                _callbackAction(response);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}

export const sendTabMessage = (
    tabId,
    message,
    payload = null,
    _callbackAction
    // eslint-disable-next-line consistent-return
) => {
    try {
        if (!tabId) {
            sendMessage(message, payload, _callbackAction)
            return false
        }
        // eslint-disable-next-line consistent-return
        chrome.tabs.sendMessage(tabId, { message, payload, tabId }, (response) => {
            const lastErr = chrome.runtime.lastError;
            if (lastErr) {
                return lastErr
            }
            if (_callbackAction) {
                _callbackAction(response);
            }
        });
        return true;
    }
    catch (err) {
        console.log(err);
    }
}
export default sendMessage