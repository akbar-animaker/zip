/* eslint-disable no-undef */

const processValue = (obj) => {

    Object.keys(obj).map((key) => {
        let element;
        try {
            element = document.querySelector(`input[name*="${key}"], input[autocomplete*="${key}"], input[aria-label*="${key}"], input[aria-labelledby*="${key}"]`)
        }
        catch (e) {
            element = null
        }
        if (element) {
            element.value = obj[key]['value']
        }
        return true;
    })

}

// document.addEventListener('DOMContentLoaded', function() {
// Delay execution to ensure the form elements are loaded
// setTimeout(function() {
chrome.storage.local.get("profile", (result) => {
    let data = JSON.parse(result["profile"] || '{}');
    processValue(data)
});
    // }, 2000); // Adjust the delay as needed (milliseconds)
//   });