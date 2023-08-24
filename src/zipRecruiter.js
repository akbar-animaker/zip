/* eslint-disable no-undef */

import { proceedClick, proceedWait } from "./profile";
import { getData } from "./storage";

const processValue = async (data) => {
    await proceedWait(5000);

    let scriptElement;
    let i = 0;
    while (!scriptElement && i < 4) {
        scriptElement = document.querySelector('main script');
        if (scriptElement) {
            const scriptContent = scriptElement.textContent.trim();
            const jsonStartIndex = scriptContent.indexOf('{');
            const jsonEndIndex = scriptContent.lastIndexOf('}');
            const jsonData = scriptContent.slice(jsonStartIndex, jsonEndIndex + 1);
            try {
                const eventProperties = JSON.parse(jsonData);
                console.log("Proceed API Call", eventProperties);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            } finally {
                data.splice(0, 1);
                if (data.length) {
                    setData("urlLinks", { data });
                    window.location.href = data[0];
                }
            }
        } else {
            await proceedWait(5000)
        }

    }
}


getData("urlLinks", async ({
    data
}) => {
    if (data.length) {
        let element;
        let element1;
        await proceedWait(5000);
        while (!element && !element1) {
            element = document.querySelector('.ApplyButton button');
            element1 = document.querySelector('.job_apply_button_portal_target');
            if (element) {
                proceedClick(element);
                await proceedWait(5000);
                processValue(data);
            }
        }
    }
});