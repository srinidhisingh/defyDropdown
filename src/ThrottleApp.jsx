import axios from "axios";
import React, { useEffect, useState } from "react";

const ThrottleApp = () => {
    const [medsList, setMedsList] = useState([]);
    const [lastCall, setLastCall] = useState(0);
    const [loader, setLoader] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const delay = 2000;
    
    const callService = (searchText) => { 
        setLoader("Loading...")
        axios.get('http://localhost:8090/defy/medicine-list', { "params": { "searchText": searchText , "type": "THROTTLE"} })
                .then(response => {
                    setLoader("");
                     let listToRender = [];
       
                    response.data.map((med) => { 
                        listToRender.push(<option value={med.name}  key={med.id} >{ med.name}</option>)
                    });
                    setMedsList(listToRender);
                    setErrorMsg("");
                })
            .catch(error => {
                    setLoader("");
                    setErrorMsg("ERROR!! You might have forgotton to run the stub server");
                });
    }

    const throttle = (searchText)=> {
            const now = new Date().getTime();
            if (now - lastCall >= delay) {
                callService(searchText);
                setLastCall(now) ;
            }
    }


    
    const onInputChange = (e) => { 
        if (e.currentTarget.value) {
            throttle(
              e.currentTarget.value
          ) 
        }
       
    }
    const onDropdownSelect = (e) => {
        alert(e.currentTarget.value + " is the prescibed medicine for you!")
    }
    return (
        <div id="app">
            <h1>Throttle Example</h1>
            <h3>waits for {delay} miliseconds</h3>
            <div>{ loader }</div>
            <input type="text" name="meds" list="medicineList" onChange={onInputChange} />
            <datalist id="medicineList"  onChange={onDropdownSelect}>
                { medsList}
            </datalist>
            <div style={ {"padding-top": "15px", "color":"red"}}>{ errorMsg}</div>
        </div>
    );
}

export default ThrottleApp;