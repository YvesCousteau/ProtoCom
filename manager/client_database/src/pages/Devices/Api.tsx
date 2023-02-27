export function getDevices(setValue: any, setState: any) {
    try {
        let result = fetch("/api/device/all", {
            method: 'GET'
        })
        result.then((sucess) => {
            console.log(sucess);
            if (sucess.ok) { 
                setState({ state: 'Success', url: sucess.url }) 
            } else { 
                setState({ state: 'Error', url: sucess.url }) 
            }
        })
        result.then((res) => res.json()).then((data) => setValue(data.data));
    } catch (error) {
        console.log(error);
    }
}

export function getDeviceState(setValue: any,ip:number, setState: any) {
    try {
        let result = fetch("/api/ping/"+ip, {
            method: 'GET'
        })
        result.then((sucess) => {
            console.log(sucess);
            if (sucess.ok) { 
                setState({ state: 'Success', url: sucess.url }) 
            } else { 
                setState({ state: 'Error', url: sucess.url }) 
            }
        })
        result.then((res) => res.json()).then((data) => setValue(data.data));
    } catch (error) {
        console.log(error);
    }
}

export function getDiagram(setState: any) {
    try {
        let result = fetch("/api/diagram/", {
            method: 'GET'
        })
        result.then((sucess) => {
            console.log(sucess);
            if (sucess.ok) { 
                setState({ state: 'Success', url: sucess.url }) 
            } else { 
                setState({ state: 'Error', url: sucess.url }) 
            }
        })
    } catch (error) {
        console.log(error);
    }
}
