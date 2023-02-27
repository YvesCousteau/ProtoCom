export function getScenarios(setValue: any, setState: any) {
    try {
        let result = fetch("/api/scenario/all/full", {
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

export function getDevices(setValue: any, setState: any) {
    try {
        let result = fetch("/api/device/all/basic", {
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

export function getDeviceServices(setValue: any, name: any, setState: any) {
    try {
        let result = fetch("/api/device/single/full/"+name, {
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
export function getServiceArguments(setValue: any, name: any, setState: any) {
    try {
        let result = fetch("/api/service/single/full/"+name, {
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

export function addScenario(body: any, setState: any) {
    try {
        let result = fetch("/api/scenario", {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
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

export function deleteScenario(body: any, setState: any) {
    try {
        let result = fetch("/api/scenario", {
            method: 'DELETE',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
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
export function service(api: string, ip: string, option: string, setState: any) {
    try {
        let result = fetch('/api/execution/'+api+'/'+ option + "/" + ip, {
            method: 'POST',
        })
        result.then((sucess) => {
            console.log(sucess)
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