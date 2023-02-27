import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import * as Api from './Api';
import Alert from "../../components/Alert";
import ListBox from "../../components/ListBox";
import {useParams} from "react-router-dom";
import Paper from "../../components/Paper";

export default function Functions() {
    let { name } = useParams();
    const [modalAdd, setModalAdd] = useState(false);

    const [services, setServices]: any = useState(null);
    const [device, setDevice]: any = useState(null);
    // Alert Message
    const [state, setState]: any = useState(null);
    const [alert, setAlert] = useState({ visible: false, type: null, status: null, url: null });

    const [render, setRender] = useState(false);

    // Render device functions name
    useEffect(() => {
        Api.getDevice(setDevice, name, setState);
    }, [render, name]);
    // Get all functions Once
    useEffect(() => {
        Api.getServices(setServices, setState);
    }, []);
    // Render alert
    useEffect(() => {
        if (state) {
            setAlert({ visible: true, type: state.state, status: null, url: state.url });
            setTimeout(() => setAlert({ visible: false, type: null, status: null, url: null }), 2000);
        }
    }, [state]);

    return(
        <div className="mx-8">
            <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
                <div className="flex pb-4 justify-between mx-6 ">
                    {name && <div className="font-bold text-2xl color-classic ">Functions of {name}</div>}
                    <button className=' btn btn-classic h-8 w-24 ' onClick={() => setModalAdd(true)}>+ ADD</button>
                </div>
                <div className="grid grid-cols-3  gap-4 justify-items-center mx-6">
                    {device && device.length > 0 && device.map((service: any,index: number) => 
                        <Item 
                        key={index}
                        service={service}
                        device={device}
                        setState={setState}
                        index={index}
                        setRender={setRender}
                        render={render} />
                    )}
                </div>
            </div>
            {services && <>
                <AddModal 
                modal={modalAdd}
                setModal={setModalAdd} 

                services={services}
                device={device}

                setState={setState}
                setRender={setRender}
                render={render} />
            </>}
            <Alert alert={alert}/>
        </div>
        
    );
}

function Item(props: any) {
    const [modalRun, setModalRun] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    
    return(
        <div className='w-full'>
            {props.service !== null && (
                <div className=''>
                    <Paper title={"Function : "+props.service.service} deleted={setModalDelete} removable={true} className='w-full'>
                        <p className="text-classic pb-1">{"Device : " + props.service.device}</p>
                        <p className="text-classic pb-1">{"Communication : " + props.service.communication}</p>
                        <button onClick={() => setModalRun(true)} className="w-full btn btn-classic ">Run</button>
                    </Paper>
                    <RunModal modal={modalRun} setModal={setModalRun} item={props}/>
                    <DeleteModal modal={modalDelete} setModal={setModalDelete} item={props}/>
                </div>
            )}
        </div>
    );
}

function AddModal(props: any) {
    let { name } = useParams();
    const [inputName, setInputName] = useState();
    const [created, setCreated] = useState(false);
    useEffect(() => {
        if(created) {
            let id_service;
            for (const item of props.services) {
                if (item.service === inputName) {
                    id_service = item.id;
                }
            }
            let body = {id_service:id_service,id_device:props.device[0].id};
            
            Api.addDeviceService(body,props.setState);
            props.setRender(!props.render);
            props.setModal(false);
            setCreated(false);
        }
    }, [created, inputName, name, props]);
    // Function selection
    useEffect(() => {
        if (!inputName && props.services) {
            setInputName(props.services[0].service);
        }
    }, [inputName,props.services]);
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
                        {props.services.length > 0  && <ListBox data={props.services} extension='service' setSelected={setInputName} selected={inputName} />}
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Device :</p>
                    {name && <p className="text-lg font-semibold text-gray-800">{name}</p>}
                </div>
                <button className='btn btn-open w-32 mx-auto' disabled={inputName === ''} onClick={() => setCreated(true)}>Send</button>
            </div>
        </Modal>
    );
}
function DeleteModal(props: any) {
    let { name } = useParams();
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        if (deleted) {
            let body = {id_service:props.item.service.id_service,id_device:props.item.service.id};
            Api.deleteDeviceService(body,props.item.setState);
            props.item.setRender(!props.item.render);
            props.setModal(false)
            setDeleted(false);
        }
    }, [deleted,props,name]);
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
function RunModal(props: any) {
    const [ran, setRan] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [args, setArguments]: any = useState(null);
    useEffect(() => {
        if (props.modal) {
            Api.getServiceArguments(setArguments, props.item.service.service, props.item.setState);
        }
    }, [props.modal]);
    // Function selection
    useEffect(() => {
        if (!inputValue && args) {
            setInputValue(args[0].argument);
        }
    }, [inputValue,args]);

    useEffect(() => {
        if(ran) {
            Api.service(props.item.service.service, props.item.device[0].ip, inputValue, props.item.setState);
            props.setModal(false);
            setRan(false);
        }
    }, [ran, inputValue, props]);
    return (
        <>
            {props.item.service && args && <Modal
                open={props.modal}
                setOpen={props.setModal}
                title="Update"
                subtitle={"Run the service : " + props.item.service.service}>
                <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                    <ListBox data={args} extension='argument' setSelected={setInputValue} selected={inputValue}/>
                    <button className='btn btn-open w-full mx-auto'  disabled={inputValue === ''} onClick={() => setRan(true)}>{"Run : "+inputValue}</button>
                </div>
            </Modal>}
        </>
    );
}