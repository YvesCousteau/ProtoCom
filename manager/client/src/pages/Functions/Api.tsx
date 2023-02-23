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

export function power(ip: string, option: string, setState: any) {
    try {
        let result = fetch("/api/service/power/"+option+"/"+ip, {
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

export function max7219(ip: string, intput: string, setState: any) {
    try {
        let result = fetch("/api/service/max7219/"+intput+"/"+ip, {
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

export function cluster(ip: string, option: string, setState: any) {
    try {
        let result = fetch("/api/service/cluster/"+option+"/"+ip, {
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

export function ivi(ip: string, option: string, setState: any) {
    try {
        let result = fetch("/api/service/ivi/"+option+"/"+ip, {
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

export function sound(ip: string, option: string, setState: any) {
    try {
        let result = fetch("/api/service/sound/"+option+"/"+ip, {
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