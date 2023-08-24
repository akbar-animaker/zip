/* global chrome */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */


/**
 * Store the data in chrome local storage
 * @param {*} key
 * @param {*} data
 */
export function setData(key, data) {
    // localStorage.setItem(key, JSON.stringify(data));
    try {
      chrome.storage.local.set({ [key]: JSON.stringify(data) }, () => {
        // console.log(`data is set to ${JSON.stringify(data)}`);
      });
    } catch (e) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
  
  /**
   * Retreive the data from chrome local storage
   * @param {*} key
   * @param {*} data
   */
  export function getData(key, callBackAction) {
    try {
      chrome.storage.local.get([key], (result) => {
        let data = JSON.parse(result[key] || '{}');
        if (data.expiry) {
          const now = new Date();
          if (now.getTime() > data.expiry) {
            chrome.storage.local.remove([key], () => { });
            data = {};
          }
        }
        callBackAction(data || {});
      });
    } catch (e) {
      const data = JSON.parse(localStorage.getItem(key));
      callBackAction(data || {});
    }
  }
  
  
  export function setCommonData(key, data) {
    getData(key, (jsonData) => {
      const commonData = {
        ...jsonData,
        ...data
      }
      setData(key, commonData);
    })
  }
  
  /**
   * Remove the data from chrome local storage
   * @param {*} key 
   * @param {*} callbackAction 
   */
  
  export function removeData(key, callbackAction) {
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