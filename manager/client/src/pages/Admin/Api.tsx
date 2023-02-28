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
export function getScenarios(setValue: any, setState: any) {
    try {
        let result = fetch("/api/scenario/all/basic/", {
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
export function getServices(setValue: any, setState: any) {
    try {
        let result = fetch("/api/service/all/basic/", {
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
export function getServiceArguments(setValue: any,name: any, setState: any) {
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
// =========================================================== //
export function addDevice(body: any, setState: any) {
    try {
        let result = fetch("/api/device/add/single/", {
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
export function updateDevice(body: any,name: any, setState: any) {
    try {
        let result = fetch("/api/device/update/single/"+name, {
            method: 'PATCH',
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
export function deleteDevice(name: any, setState: any) {
    try {
        let result = fetch("/api/device/delete/single/"+name, {
            method: 'DELETE'
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
// =========================================================== //
export function addService(body: any, setState: any) {
    try {
        let result = fetch("/api/service/add/single/", {
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
export function updateService(body: any,name: any, setState: any) {
    try {
        let result = fetch("/api/service/update/single/"+name, {
            method: 'PATCH',
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
export function deleteService(name: any, setState: any) {
    try {
        let result = fetch("/api/service/delete/single/"+name, {
            method: 'DELETE'
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
// =========================================================== //
export function addScenario(body: any, setState: any) {
    try {
        let result = fetch("/api/scenario/add/single/", {
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
export function updateScenario(body: any,name: any, setState: any) {
    try {
        let result = fetch("/api/scenario/update/single/"+name, {
            method: 'PATCH',
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
export function deleteScenario(name: any, setState: any) {
    try {
        let result = fetch("/api/scenario/delete/single/"+name, {
            method: 'DELETE'
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
// =========================================================== //
export function addArgument(body: any, setState: any) {
    try {
        let result = fetch("/api/argument/add/single/", {
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
export function updateArgument(body: any,name: any, setState: any) {
    console.log(body);
    
    try {
        let result = fetch("/api/argument/update/single/"+name, {
            method: 'PATCH',
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
export function deleteArgument(name: any, setState: any) {
    console.log(name);
    
    try {
        let result = fetch("/api/argument/delete/single/"+name, {
            method: 'DELETE'
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