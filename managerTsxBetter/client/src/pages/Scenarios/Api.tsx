export function getScenarios(setValue: any, setAlertData: any, alertData: any) {
    try {
        let result = fetch("/api/scenarios/", {
            method: 'GET'
        })
        result.then((sucess) => { 
            console.log(sucess);
            let type;
            if(sucess.ok){type = 'Success'}else{type = 'Error'}
            setAlertData({...alertData,...{active:true,type:type,status:sucess.status,url:sucess.url}});
        })
        result.then((res) => res.json()).then((data) => setValue(data.data));
    } catch (error) {
        console.log(error);
    }
}





