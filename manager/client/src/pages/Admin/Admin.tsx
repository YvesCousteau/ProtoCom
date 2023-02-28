import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import Input from "../../components/Input";
import ListBox from "../../components/ListBox";
import Modal from "../../components/Modal";
import * as Api from "./Api";
import { Devices } from "./Device";
import { Scenarios } from "./Scenario";
import { Services } from "./Service";

export default function Admin() {
    // Alert Message
    const [state, setState]: any = useState(null);
    const [alert, setAlert] = useState({ visible: false, type: null, status: null, url: null });
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
                    <div className="text-classic ">Admin</div>
                </div>
                <Devices setState={setState}/>
                <Services setState={setState}/>
                <Scenarios setState={setState}/>
            </div>
            <Alert alert={alert}/>
        </div>
    );
}

export function Buttons(props: any) {
    return(
        <div className="h-full col-span-2 place-self-end ">
            <button className='h-full ml-2 text-center btn btn-close w-14' onClick={() => props.setDeleted(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <button className='h-full ml-2 text-center btn btn-open w-14' onClick={() => props.setUpdated(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
            <button className='h-full ml-2 text-center btn btn-classic w-14' onClick={() => props.setAdded(true)}>
                <svg viewBox="0 0 512 512" fill="none" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M256 112v288M400 256H112" />
                </svg>
            </button>
        </div>
    );
}

export function AddModal(props: any) {
    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title={"Add "+props.title}
            subtitle="All functions associated with this devices will be remove">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                {props.children}
                <button className='btn btn-open w-32 mx-auto' onClick={() => props.setAdded(true)}>Add</button>
            </div>
        </Modal>
    );
}

export function UpdateModal(props: any) {
    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title={"Update "+props.title}
            subtitle="All functions associated with this devices will be remove">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                {props.children}
                <button className='btn btn-open w-32 mx-auto' onClick={() => props.setUpdated(true)}>Update</button>
            </div>
        </Modal>
    );
}

export function DeleteModal(props: any) {
    return (
        <Modal
            open={props.modal}
            setOpen={props.setModal}
            title={"Remove "+props.title}
            subtitle="All functions associated with this devices will be remove">
            <div className='bg-gray-300 py-4 rounded-[12px] px-4 mx-6 grid grid-cols-1 gap-4'>
                <button className='btn btn-open w-32 mx-auto' onClick={() => props.setDeleted(true)}>Remove</button>
            </div>
        </Modal>
    );
}