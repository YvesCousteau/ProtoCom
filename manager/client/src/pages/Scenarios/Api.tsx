export function getScenarios(setValue: any, setState: any) {
    try {
        let result = fetch("/api/scenario/all/basic", {
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

export function getScenario(setValue: any,name: any, setState: any) {
    try {
        let result = fetch("/api/scenario/single/full/"+name, {
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

// export function getScenarioActions(setValue: any,name: any, setState: any) {
//     try {
//         let result = fetch("/api/scenario/single/action/all"+id, {
//             method: 'GET'
//         })
//         result.then((sucess) => { 
//             console.log(sucess);
//             if (sucess.ok) {
//                 setState({ state: 'Success', url: sucess.url })
//             } else {
//                 setState({ state: 'Error', url: sucess.url })
//             }
//         })
//         result.then((res) => res.json()).then((data) => setValue(data.data));
//     } catch (error) {
//         console.log(error);
//     }
// }

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

export function addAction(body: any, setState: any) {
    try {
        let result = fetch("/api/action/add/single", {
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

export function deleteAction(id: any, setState: any) {
    try {
        let result = fetch("/api/action/delete/single/"+id, {
            method: 'DELETE',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            }
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