import { useEffect, useState } from "react";
import Input from "../../components/Input";
import ListBox from "../../components/ListBox";
import { AddModal, Buttons, DeleteModal, UpdateModal } from "./Admin";
import * as Api from "./Api";

export function Arguments(props: any) {
    const [args, setArguments]: any = useState([]);
    
    const [inputArgument, setInputArgument] = useState(null);

    const [inputArgumentUpdated, setInputArgumentUpdated] = useState(null);

    useEffect(() => {
        if (!inputArgument && args && args.length > 0 ) {
            setInputArgument(args[0].argument);
        }
    }, [inputArgument,args]);
    
    const [added, setAdded] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        if (added) {
            console.log('added');
            let body = {
                argument:inputArgument,
                id_service:props.service.id
            };
            Api.addArgument(body,props.setState);
            setAddModal(false);
            setAdded(false);
        }
    }, [added]);
    useEffect(() => {
        if (updated) {
            console.log('updated');
            let body = {
                argument:inputArgumentUpdated,
                id_service:props.service.id
            };
            Api.updateArgument(body,inputArgument,props.setState);
            setUpdateModal(false);
            setUpdated(false);
        }
    }, [updated]);
    useEffect(() => {
        if (deleted) {
            console.log('deleted');
            Api.deleteArgument(inputArgument,props.setState);
            setDeletModal(false);
            setDeleted(false);
        }
    }, [deleted]);

    useEffect(() => {
        setInputArgument(null);
        Api.getServiceArguments(setArguments,props.service.name, props.setState);
    },[deleted,updated,added,props.service]);

    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeletModal] = useState(false);
    return(
        <div className="grid grid-cols-1 gap-4 bg-gray-300 mb-4 p-6 rounded-2xl">
            <p className="text-classic">{'Argument of '+ props.service.name}</p>
            <div className="grid grid-cols-7">
                <p className="self-center text-classic">Selection :&nbsp;</p>
                <div className=" col-span-4 relative rounded-md shadow-sm h-10">
                    {args && args.length > 0 && <ListBox data={args} extension='argument' setSelected={setInputArgument} selected={inputArgument}/>}
                </div>
                <Buttons setAdded={setAddModal} setUpdated={setUpdateModal} setDeleted={setDeletModal}/>
            </div>
            <AddModal modal={addModal} setModal={setAddModal} setAdded={setAdded} title={'Argument '+ inputArgument}>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        <Input type='text' placeholder='name' onChange={setInputArgument} />
                    </div>
                </div>
            </AddModal>
            <UpdateModal modal={updateModal} setModal={setUpdateModal} setUpdated={setUpdated} title={'Argument '+ inputArgument}>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        <Input type='text' placeholder='name' onChange={setInputArgumentUpdated} />
                    </div>
                </div>
            </UpdateModal>
            <DeleteModal modal={deleteModal} setModal={setDeletModal} setDeleted={setDeleted} title={'Argument '+ inputArgument}/>
        </div>
    );
}