export function getDevice(setValue: any, name: any, setState: any) {
    try {
        let result = fetch("/api/device/"+name, {
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

export function getFunctions(setValue: any, setState: any) {
    try {
        let result = fetch("/api/functions/", {
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

export function getFunction(setValue: any, name: string, setState: any) {
    try {
        let result = fetch("/api/function/"+name, {
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

export function addDeviceFunction(body: any, name: any, setState: any) {
    try {
        let result = fetch("/api/device/"+name, {
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
export function deleteDeviceFunction(body: any, name: any, setState: any) {
    try {
        let result = fetch("/api/device/"+name, {
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
        let result = fetch(api + option + "/" + ip, {
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