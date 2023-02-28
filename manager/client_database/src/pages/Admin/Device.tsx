import { useEffect, useState } from "react";
import Input from "../../components/Input";
import ListBox from "../../components/ListBox";
import { AddModal, Buttons, DeleteModal, UpdateModal } from "./Admin";
import * as Api from "./Api";

export function Devices(props: any) {
    const [devices, setDevices]: any = useState([]);
    
    const [inputDevice, setInputDevice] = useState(null);
    const [inputIP, setInputIP] = useState(null);
    const [inputVoltage, setInputVoltage] = useState(null);
    const [inputAmperage, setInputAmperage] = useState(null);

    useEffect(() => {
        if (!inputDevice && devices && devices.length > 0 ) {
            setInputDevice(devices[0].device);
        }
    }, [inputDevice,devices]);
    
    const [added, setAdded] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        if (added) {
            console.log('added');
            let body = {
                device:inputDevice,
                ip:inputIP,
                voltage:inputVoltage,
                amperage:inputAmperage
            };
            Api.addDevice(body,props.setState);
            setAddModal(false);
            setAdded(false);
        }
    }, [added]);
    useEffect(() => {
        if (updated) {
            console.log('updated');
            // let body = {scenario:inputScenarioUpdated};
            // Api.updateDevice(body,inputDevice,props.setState);
            setUpdateModal(false);
            setUpdated(false);
        }
    }, [updated]);
    useEffect(() => {
        if (deleted) {
            console.log('deleted');
            Api.deleteDevice(inputDevice,props.setState);
            setDeletModal(false);
            setDeleted(false);
        }
    }, [deleted]);

    useEffect(() => {
        setInputDevice(null);
        Api.getDevices(setDevices, props.setState);
    },[deleted,updated,added]);
    
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeletModal] = useState(false);
    return(
        <div className="grid grid-cols-1 gap-4 bg-gray-300 mb-4 p-6 rounded-2xl">
            <p className="text-classic">Device</p>
            <div className="grid grid-cols-7">
                <p className="self-center text-classic">Selection :&nbsp;</p>
                <div className=" col-span-4 relative rounded-md shadow-sm h-full">
                    {devices && devices.length > 0 && <ListBox data={devices} extension='device' setSelected={setInputDevice} selected={inputDevice}/>}
                </div>
                <Buttons setAdded={setAddModal} setUpdated={setUpdateModal} setDeleted={setDeletModal}/>
            </div>
            <AddModal modal={addModal} setModal={setAddModal} setAdded={setAdded} title={'Device '+ inputDevice}>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        <Input type='text' placeholder='name' onChange={setInputDevice} />
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">IP :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        <Input type='text' placeholder='name' onChange={setInputIP} />
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Voltage :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        <Input type='number' placeholder='number' onChange={setInputVoltage} />
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Amperage :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        <Input type='number' placeholder='number' onChange={setInputAmperage} />
                    </div>
                </div>
            </AddModal>
            <UpdateModal modal={updateModal} setModal={setUpdateModal} setUpdated={setUpdated} title={'Device '+ inputDevice}>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        {/* <Input type='text' placeholder='name' onChange={setInputServiceUpdated} /> */}
                    </div>
                </div>
            </UpdateModal>
            <DeleteModal modal={deleteModal} setModal={setDeletModal} setDeleted={setDeleted} title={'Device '+ inputDevice}/>
        </div>
    );
}