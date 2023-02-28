import { useEffect, useState } from "react";
import Input from "../../components/Input";
import ListBox from "../../components/ListBox";
import { AddModal, Buttons, DeleteModal, UpdateModal } from "./Admin";
import * as Api from "./Api";

export function Services(props: any) {
    const [services, setServices]: any = useState([]);
    
    const [inputService, setInputService] = useState(null);
    const [inputCommunication, setInputCommunication] = useState(null);
    const [inputRemovable, setInputRemovable] = useState(null);
    useEffect(() => {
        if (!inputService && services && services.length > 0 ) {
            setInputService(services[0].service);
        }
    }, [inputService,services]);
    
    const [added, setAdded] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        if (added) {
            console.log('added');
            let body = {
                service:inputService,
                communication:inputCommunication,
                removable:inputRemovable
            };
            Api.addService(body,props.setState);
            setAddModal(false);
            setAdded(false);
        }
    }, [added]);
    useEffect(() => {
        if (updated) {
            console.log('updated');
            // let body = {scenario:inputScenarioUpdated};
            // Api.updateService(body,inputService,props.setState);
            setUpdateModal(false);
            setUpdated(false);
        }
    }, [updated]);
    useEffect(() => {
        if (deleted) {
            console.log('deleted');
            Api.deleteService(inputService,props.setState);
            setDeletModal(false);
            setDeleted(false);
        }
    }, [deleted]);

    useEffect(() => {
        setInputService(null);
        Api.getServices(setServices, props.setState);
    },[deleted,updated,added]);

    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeletModal] = useState(false);
    return(
        <div className="grid grid-cols-1 gap-4 bg-gray-300 mb-4 p-6 rounded-2xl">
            <p className="text-classic">Service</p>
            <div className="grid grid-cols-7">
                <p className="self-center text-classic">Selection :&nbsp;</p>
                <div className=" col-span-4 relative rounded-md shadow-sm h-full">
                    {services && services.length > 0 && <ListBox data={services} extension='service' setSelected={setInputService} selected={inputService}/>}
                </div>
                <Buttons setAdded={setAddModal} setUpdated={setUpdateModal} setDeleted={setDeletModal}/>
            </div>
            <AddModal modal={addModal} setModal={setAddModal} setAdded={setAdded} title={'Service '+ inputService}>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        <Input type='text' placeholder='name' onChange={setInputService} />
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Communication :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        <Input type='text' placeholder='name' onChange={setInputCommunication} />
                    </div>
                </div>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Removable :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        <Input type='number' placeholder='name' onChange={setInputRemovable} />
                    </div>
                </div>
            </AddModal>
            <UpdateModal modal={updateModal} setModal={setUpdateModal} setUpdated={setUpdated} title={'Service '+ inputService}>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        {/* <Input type='text' placeholder='name' onChange={setInputServiceUpdated} /> */}
                    </div>
                </div>
            </UpdateModal>
            <DeleteModal modal={deleteModal} setModal={setDeletModal} setDeleted={setDeleted} title={'Service '+ inputService}/>
        </div>
    );
}