import React, { useEffect, useState } from 'react';

const SetVisitorStalluserDetailsHandler = () => {
    const [renderCount, setRenderCount] = useState(0);
    const [executionCount, setExecutionCount] = useState(0);

    useEffect(() => {
        setRenderCount(prevCount => prevCount + 1);
        // console.log("Component rendered", renderCount, "times");

        if (stallid && userid && Event_ID) {
            setExecutionCount(prevCount => prevCount + 1);
            // console.log("Function executed", executionCount, "times");
            
            let data = {
                visitorid: userid,
                eventid: Event_ID,
                stallid: stallid,
                name: currentuser.displayName,
                companyname: currentuser.companyName,
                mobilenumber: currentuser.mobileNo,
                emailid: currentuser.email
            };

            // console.log("Data for checking", data);

            ScannedVisitorStallCreate("POST", data).then(response => {
                // console.log('Response visitor stall created', response);
            });

            ScannedUserStallCreate("POST", data).then(response => {
                // console.log('Response user stall created', response);
            });
        }
    }, [stallid, userid, Event_ID, currentuser]);

    return null;
};

export default SetVisitorStalluserDetailsHandler;
