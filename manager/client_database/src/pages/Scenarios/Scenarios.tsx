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
    const [scenarios, setScenarios] = useState([]);
    // Alert Message
    const [state, setState]: any = useState(null);
    const [alert, setAlert] = useState({ visible: false, type: null, status: null, url: null });

    const [render, setRender] = useState(false);

    useEffect(() => {
        Api.getScenarios(setScenarios, setState);
    }, [render]);

    useEffect(() => {
        if (state) {
            setAlert({ visible: true, type: state.state, status: null, url: state.url });
            setTimeout(() => setAlert({ visible: false, type: null, status: null, url: null }), 2000);
        }
    }, [state]);
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
            <AddModal 
            modal={modalAdd}
            setModal={setModalAdd} 
            scenarios={scenarios}
            setState={setState}
            setRender={setRender} 
            render={render}
            />
            <Alert alert={alert}/>
        </div>
    );
}
function Item(props: any) {
    const [modalDelete, setModalDelete] = useState(false);
    const [ran, setRan] = useState(false);
    const [idAction, setIdAction]: any = useState(null);
    function DeleteAction(deleted: boolean,id_action: number) {
        setModalDelete(deleted);
        setIdAction(id_action);
    }
    useEffect(() => {
        if (ran) {
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

    const [actions, setActions]: any = useState([]);
    useEffect(() => {
        Api.getScenario(setActions,props.scenario.scenario, props.setState);
    },[props.render]);
    return(
        <div className='w-full'>
            {actions && actions.length > 0 && <Paper title={"Scenario : " + actions[0].scenario} >
                {actions.map((item: any, index: number) => 
                    <div key={index} className="grid grid-cols-4 gap-2 border-4 p-2 my-2 rounded-2xl">
                        <p className="text-classic pb-1">{"Device: "+item.device}</p>
                        <p className="text-classic pb-1">{"Function: "+item.service}</p>
                        <p className="text-classic pb-1">{"Argument: " + item.argument}</p>
                        <button className='place-self-end ml-2 text-center btn btn-close w-14' onClick={() => DeleteAction(true,item.id_action)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div> 
                )}
                <div className="flex justify-center">
                    <button onClick={() => setRan(true)} className="mt-4 btn btn-classic w-80">
                        Run
                    </button>
                </div>
            </Paper>}
            <DeleteModal modal={modalDelete} setModal={setModalDelete} item={props} idAction={idAction} />
        </div>
    );
}

function AddModal(props: any) {
    const [created, setCreated] = useState(false);
    const [added, setAdded] = useState(false);
    
    const [inputDevice, setInputDevice] = useState(null);
    const [inputService, setInputService] = useState(null);
    const [inputArgument, setInputArgument] = useState(null);
    const [inputScenario, setInputScenario] = useState(null);

    const [actions, setActions]: any = useState([]);
    const [devices, setDevices]: any = useState(null);
    const [deviceServices, setDeviceServices]: any = useState(null);
    const [serviceArguments, setServiceArguments]: any = useState(null);


    // Device selection
    useEffect(() => {
        if (!inputScenario && props.scenarios && props.scenarios.length > 0 ) {
            setInputScenario(props.scenarios[0].scenario);
        }
    }, [inputScenario,props.scenarios]);

    useEffect(() => {
        if (props.modal) {
            Api.getDevices(setDevices, props.setState);
        }
        if (!props.modal) {
            setActions([]);
        }
    }, [props.modal]);
    // Device selection
    useEffect(() => {
        if (!inputDevice && devices && devices.length > 0 ) {
            setInputDevice(devices[0].device);
        }
    }, [inputDevice,devices]);

    useEffect(() => {
        if(!inputDevice && devices && devices.length > 0) {
            Api.getDeviceServices(setDeviceServices, devices[0].device,props.setState);
        } 
        else if(props.modal) {
            console.log("la on change les options");
            Api.getDeviceServices(setDeviceServices, inputDevice,props.setState);
        }
    }, [inputDevice,props.setState,devices]);

    // Service selection
    useEffect(() => {
        console.log(deviceServices);
        
        if (deviceServices && deviceServices.length > 0) {
            setInputService(deviceServices[0].service);
        }
    }, [deviceServices]);
    
    useEffect(() => {
        if(!inputService && deviceServices && deviceServices.length > 0) {
            Api.getServiceArguments(setServiceArguments, deviceServices[0].device,props.setState);
        } 
        else if(props.modal) {
            Api.getServiceArguments(setServiceArguments, inputService,props.setState);
        }
    }, [inputService,props.setState,deviceServices]);

    // Argument selection
    useEffect(() => {
        if (serviceArguments && serviceArguments.length > 0) {
            setInputArgument(serviceArguments[0].argument);
        }
    }, [serviceArguments]);

    useEffect(() => {
        if(created && actions) {
            for (const item of actions) {
                const body = { 
                    id_device:item.id_device, 
                    id_service:item.id_service, 
                    id_argument:item.id_argument, 
                    id_scenario:item.id_scenario
                }
                console.log(body);
                
                Api.addAction(body,props.setState);
            }
            props.setModal(false);
            props.setRender(!props.render);
            setCreated(false)
        }
    }, [created, inputDevice, inputService, inputArgument, actions, props]);

    useEffect(() => {
        if (added && inputDevice && inputService && inputArgument) {
            let id_device;
            for (const item of devices) {
                if (item.device === inputDevice) {
                    id_device = item.id;
                }
            }
            let id_service;
            for (const item of deviceServices) {
                if (item.service === inputService) {
                    id_service = item.id_service;
                }
            }
            let id_argument;
            for (const item of serviceArguments) {
                if (item.argument === inputArgument) {
                    id_argument = item.id_argument;
                }
            } 
            let id_scenario;
            for (const item of props.scenarios) {
                console.log(item);
                
                if (item.scenario === inputScenario) {
                    id_scenario = item.id;
                }
            } 
            setActions([...actions,{ 
                scenario: inputScenario, 
                id_scenario: id_scenario,
                device: inputDevice,
                id_device: id_device, 
                service: inputService, 
                id_service: id_service, 
                arg: inputArgument, 
                id_argument: id_argument }])
            setAdded(false);
        }
    }, [added, inputDevice, inputService, inputArgument, actions]);

    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title="Add"
            subtitle="Setup your scenario">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Scenario :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        {props.scenarios && props.scenarios.length > 0  && <ListBox data={props.scenarios} extension='scenario' setSelected={setInputScenario} selected={inputScenario}/>}
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Device :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        {devices && devices.length > 0  && <ListBox data={devices} extension='device' setSelected={setInputDevice} selected={inputDevice}/>}
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Service :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        {deviceServices && deviceServices.length > 0 && <ListBox data={deviceServices} extension='service' setSelected={setInputService} selected={inputService}/>}
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Argument :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        {serviceArguments && serviceArguments.length > 0 && <ListBox data={serviceArguments} extension='argument' setSelected={setInputArgument} selected={inputArgument}/>}
                    </div>
                </div>
                <div className="ml-40 grid grid-cols-2 gap-4">
                    <button className='btn btn-classic w-32 mx-auto' onClick={() => setAdded(true)}>Add Item</button>
                    <button className='btn btn-open w-32 mx-auto' onClick={() => setCreated(true)} disabled={actions === null}>Send</button>
                </div>
                {actions && actions.length > 0 && actions.map((item: any, index: number) =>
                    <div key={index} className="grid grid-cols-3 gap-2 border-4 p-2 my-2 rounded-2xl">
                        <p className="text-classic pb-1">{"Device: " + item.device + '| ip: '+item.id_device}</p>
                        <p className="text-classic pb-1">{"Function: " + item.service + '| ip: '+item.id_service}</p>
                        <p className="text-classic pb-1">{"Argument: " + item.arg + '| ip: '+item.id_argument}</p>
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
            Api.deleteAction(props.idAction, props.item.setState)
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