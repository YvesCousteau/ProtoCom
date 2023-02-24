import { useEffect, useState } from "react";
import Paper from "../../components/Paper";
import * as Api from "./Api";
import Alert from "../../components/Alert";
import Modal from "../../components/Modal";
import ListBox from "../../components/ListBox";
import Input from "../../components/Input";

export default function Scenarios() {
    const [modalAdd, setModalAdd] = useState(false);
    const [devices, setDevices]: any = useState([]);
    const [devicesName, setDevicesName]: any = useState(null);
    const [functions, setFunctions]: any = useState([]);
    const [functionsName, setFunctionsName]: any = useState(null);
    const [scenarios, setScenarios] = useState([]);
    // Alert Message
    const [state, setState]: any = useState(null);
    const [alert, setAlert] = useState({ visible: false, type: null, status: null, url: null });

    const [render, setRender] = useState(false);

    useEffect(() => {
        Api.getScenarios(setScenarios, setState);
    }, [render]);
    useEffect(() => {
        Api.getDevices(setDevices, setState);
        Api.getFunctions(setFunctions, setState);
    }, []);
    useEffect(() => {
        if (state) {
            setAlert({ visible: true, type: state.state, status: null, url: state.url });
            setTimeout(() => setAlert({ visible: false, type: null, status: null, url: null }), 2000);
        }
    }, [state]);
    // Get Functions Name
    useEffect(() => {
        if(functions) {
            const listFunctions: any = [];
            for(const item of functions) {
                listFunctions.push(item.name);
            }
            setFunctionsName(listFunctions);
        }
    }, [functions]);
    // Get Devices Name
    useEffect(() => {
        if(devices) {
            const listDevices: any = [];
            for(const item of devices) {
                listDevices.push(item.name);
            }
            console.log(listDevices);
            
            setDevicesName(listDevices);
        }
    }, [devices]);

    useEffect(() => {
        console.log(modalAdd);
    }, [modalAdd]);
    return(
        <div className="mx-8">
            <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
                <div className="flex pb-4 justify-between mx-6 ">
                    <div className="text-classic ">Scenarios</div>
                    <button className=' btn btn-classic h-8 w-24 ' onClick={() => setModalAdd(true)}>+ ADD</button>
                </div>
                <div className="grid grid-cols-1 gap-4 justify-items-center mx-6">
                    {scenarios && scenarios.length > 0 && scenarios.map((scenario: any, index: number) => 
                        <Item 
                        key={index} 
                        scenario={scenario} 
                        index={index}
                        devices={devices}
                        setState={setState}
                        setRender={setRender} 
                        render={render}/>
                    )}
                </div>
            </div>
            {devicesName && devicesName.length > 0 && <AddModal 
            modal={modalAdd}
            setModal={setModalAdd} 
            functions={functionsName}
            devices={devicesName}
            setState={setState}
            setRender={setRender} 
            render={render}
            />}
            <Alert alert={alert}/>
        </div>
    );
}
function Item(props: any) {
    const [modalDelete, setModalDelete] = useState(false);
    const [ran, setRan] = useState(false);
    useEffect(() => {
        if (ran) {
            console.log("Run");
            for (const item of props.scenario.scenario) {
                let ip;
                for(const device of props.devices) {
                    if (device.name === item.device) {
                        ip = device.ip;
                    }
                }
                Api.service("api/service/" + item.function, ip, item.arg, props.setState);
            }
            setRan(false)   
        }
    }, [ran]);
    return(
        <div className='w-full'>
            <Paper title={"Scenario : " + props.scenario.name} deleted={setModalDelete}  removable={true}>
                {props.scenario.scenario.map((item: any, index: number) => 
                    <div key={index} className="grid grid-cols-3 gap-2 border-4 p-2 my-2 rounded-2xl">
                        <p className="text-classic pb-1">{"Device: "+item.device}</p>
                        <p className="text-classic pb-1">{"Function: "+item.function}</p>
                        <p className="text-classic pb-1">{"Argument: " + item.arg}</p>
                    </div> 
                )}
                <div className="flex justify-center">
                    <button onClick={() => setRan(true)} className="mt-4 btn btn-classic w-80">
                        Run
                    </button>
                </div>
            </Paper>
            <DeleteModal modal={modalDelete} setModal={setModalDelete} item={props} />
        </div>
    );
}

function AddModal(props: any) {
    const [created, setCreated] = useState(false);
    const [added, setAdded] = useState(false);
    const [optionsName, setOptionsName]: any = useState(null);

    const [inputDevice, setInputDevice] = useState(null);
    const [inputFct, setInputFct] = useState(null);
    const [inputOption, setInputOption] = useState(null);
    const [inputName, setInputName] = useState(null);

    const [scenario, setScenario]: any = useState([]);

    useEffect(() => {
        if(created && scenario) {
            console.log(scenario);
            const body = { name: inputName, scenario: scenario }
            Api.addScenario(body,props.setState);
            props.setModal(false);
            props.setRender(!props.render);
            setCreated(false)
        }
    }, [created, inputDevice, inputFct, inputOption, inputName, scenario, props]);

    // Device selection
    useEffect(() => {
        if (!inputDevice && props.devices) {
            setInputDevice(props.devices[0]);
        }
    }, [inputDevice,props.devices]);

    // Function selection
    useEffect(() => {
        if (!inputFct && props.functions) {
            setInputFct(props.functions[0]);
        }
    }, [inputFct,props.functions]);

    useEffect(() => {
        if(!inputFct) {
            Api.getOptions(setOptionsName, props.functions[0],props.setState);
        } 
        else {
            console.log("la on change les options");
            Api.getOptions(setOptionsName, inputFct,props.setState);
        }
    }, [inputFct,props.setState,props.functions]);

    // Option selection
    useEffect(() => {
        if (optionsName) {
            setInputOption(optionsName[0]);
        } 
    }, [optionsName]);

    useEffect(() => {
        if (added && inputDevice && inputFct && inputOption) {
            setScenario([...scenario,{ device: inputDevice, function: inputFct, arg: inputOption }])
            setAdded(false);
        }
    }, [added, inputDevice, inputFct, inputOption, scenario]);

    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title="Add"
            subtitle="Setup your scenario">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <Input label="Name :" placeholder="Text..." onChange={setInputName} />
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        {props.devices.length > 0  && <ListBox data={props.devices} setSelected={setInputDevice} selected={inputDevice}/>}
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        {props.functions  && <ListBox data={props.functions} setSelected={setInputFct} selected={inputFct}/>}
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        {optionsName && <ListBox data={optionsName} setSelected={setInputOption} selected={inputOption}/>}
                    </div>
                </div>
                <div className="ml-40 grid grid-cols-2 gap-4">
                    <button className='btn btn-classic w-32 mx-auto' onClick={() => setAdded(true)}>Add Item</button>
                    <button className='btn btn-open w-32 mx-auto' onClick={() => setCreated(true)} disabled={scenario === null}>Send</button>
                </div>
                {scenario && scenario.length > 0 && scenario.map((item: any, index: number) =>
                    <div key={index} className="grid grid-cols-3 gap-2 border-4 p-2 my-2 rounded-2xl">
                        <p className="text-classic pb-1">{"Device: " + item.device}</p>
                        <p className="text-classic pb-1">{"Function: " + item.function}</p>
                        <p className="text-classic pb-1">{"Argument: " + item.arg}</p>
                    </div>
                )}
            </div>
        </Modal>
    );
}

function DeleteModal(props: any) {
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        if(deleted) {
            const body = {id: props.item.index};
            Api.deleteScenario(body, props.item.setState)
            props.setModal(false);
            props.item.setRender(!props.item.render);
            setDeleted(false);
        }
    }, [deleted, props]);
    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title="Remove"
            subtitle="All functions associated with this devices will be remove">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <button className='btn btn-open w-32 mx-auto' onClick={() => setDeleted(true)}>Remove</button>
            </div>
        </Modal>
    );
}