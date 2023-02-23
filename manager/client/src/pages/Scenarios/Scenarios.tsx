import { useEffect, useState } from "react";
import Paper from "../../components/Paper";
import * as Api from "./Api";
import Alert from "../../components/Alert";
import Modal from "../../components/Modal";
import ListBox from "../../components/ListBox";

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
    useEffect(() => {
        Api.getScenarios(setScenarios, setState);
    }, []);
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
                        <Item  key={index} scenario={scenario}/>
                    )}
                </div>
            </div>
            {devicesName && devicesName.length > 0 && <AddModal 
            modal={modalAdd}
            setModal={setModalAdd} 
            functions={functionsName}
            devices={devicesName}
            setState={setState}

            />}
            <Alert alert={alert}/>
        </div>
    );
}
function Item(props: any) {
    return(
        <div className='w-full'>
            <Paper title={"Scenario : "+props.scenario.name} removable={true}>
                {props.scenario.scenario.map((item: any, index: number) => 
                    <div key={index} className="grid grid-cols-3 gap-2 border-4 p-2 my-2 rounded-2xl">
                        <p className="text-classic pb-1">{"Device: "+item.device}</p>
                        <p className="text-classic pb-1">{"Function: "+item.function}</p>
                        <p className="text-classic pb-1">{"Argument: "+item.function}</p>
                    </div> 
                )}
                <div className="flex justify-center">
                    <button onClick={() => console.log('Run scenario here')} className="mt-4 btn btn-classic w-80">
                        Run
                    </button>
                </div>
            </Paper>
        </div>
    );
}

function AddModal(props: any) {
    const [created, setCreated] = useState(false);
    const [optionsName, setOptionsName]: any = useState(null);
    const [optionFirst, setOptionFirst]: any = useState(null);
    const [inputDevice, setInputDevice] = useState(null);
    const [inputFct, setInputFct] = useState(null);
    const [inputOption, setInputOption] = useState(null);
    useEffect(() => {
        if(created) {
            console.log(inputDevice,inputFct,inputOption);
        }
    }, [created,inputDevice,inputFct,inputOption]);

    useEffect(() => {
        if(!inputOption) {
            Api.getOptions(setOptionsName, props.functions[0],props.setState);
        } else {
            Api.getOptions(setOptionsName, inputFct,props.setState);
        }
    }, [inputFct,inputOption,props.setState,props.functions]);

    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title="Add"
            subtitle="Setup your device">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        {props.devices.length > 0  && <ListBox data={props.devices} setSelected={setInputDevice} init={props.devices[0]}/>}
                    </div>
                </div>

                
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        {props.functions.length > 0  && <ListBox data={props.functions} setSelected={setInputFct} init={props.functions[0]}/>}
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        {optionsName && optionsName.length > 0  && <ListBox data={optionsName} setSelected={setInputOption} init={optionsName[0]}/>}
                    </div>
                </div>
                <button className='btn btn-open w-32 mx-auto' onClick={() => setCreated(true)}>Send</button>
            </div>
        </Modal>
    );
}

// function DeleteModal(props: any) {
//     const [deleted, setDeleted] = useState(false);
//     useEffect(() => {
//         if(deleted) {
            
//         }
//     }, [deleted]);
//     return (
//         <Modal
//             open={props.modal}
//             setOpen={props.setModal}
//             title="Remove"
//             subtitle="All functions associated with this devices will be remove">
//             <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
//                 <button className='btn btn-open w-32 mx-auto' onClick={() => setDeleted(true)}>Remove</button>
//             </div>
//         </Modal>
//     );
// }