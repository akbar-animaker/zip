import React, { useState, Fragment } from 'react';
import { getData, setCommonData, setData } from './storage';

export const proceedClick = (element) => {
    element.click();
    element.dispatchEvent(new Event("click"));
}

export const proceedWait = (timer) => new Promise((resolve) => setTimeout(resolve, timer));

const Profile = () => {
    let [value, setValue] = useState(5);
    let [isProcessing, setProcessing] = useState(false)

    const onSubmit = async () => {
        setProcessing(true);
        let jobs = [];
        while (jobs.length < value) {
            jobs = [
                ...document.querySelectorAll(".job_actions > .quick_apply_btn[data-quick-apply='one_click']"),
                ...document.querySelectorAll("article[data-applied-status='0'] .job_link")
            ];
            proceedClick(document.querySelector(".load_more_btn"));
            await proceedWait(5000);
        }
        let urlLinks = jobs.map((e) => {
            return e.getAttribute("data-href") || e.getAttribute("href")
        });
        setData("urlLinks", {data: urlLinks});
        alert(`We Found Total ${jobs.length}. So Proceeding to scrap`);
        window.location.href = urlLinks[0];
    }


    return (
        <Fragment>
            <div className="padding-horizontal--12">
                <div className="field padding-bottom--24">
                    <label htmlFor={"job"}>Total Job to Scrap</label>
                    <input type="text" name={"jon"} value={value} onChange={(e) => {
                        setValue(+e.target.value)
                    }} />
                </div>
            </div>
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%'
            }}>
                <button class="button" onClick={onSubmit}><span>{`${isProcessing ? "Loading" : "Scrap"}`}</span>
                </button>
            </div>
        </Fragment>
    )
}

export default Profile;