import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import ListBox from "../../components/ListBox";
import * as Api from "./Api";

export default function Admin() {
    const [devices, setDevices]: any = useState([]);
    const [services, setServices]: any = useState([]);
    const [scenarios, setScenarios]: any = useState([]);

    const [inputDevice, setInputDevice] = useState(null);
    const [inputService, setInputService] = useState(null);
    const [inputScenario, setInputScenario] = useState(null);

    const [added, setAdded] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [deleted, setDeleted] = useState(false);

    // Alert Message
    const [state, setState]: any = useState(null);
    const [alert, setAlert] = useState({ visible: false, type: null, status: null, url: null });
    useEffect(() => {
        Api.getDevices(setDevices, setState);
        Api.getServices(setServices, setState);
        Api.getScenarios(setScenarios, setState);
    },[]);
    useEffect(() => {
        if (state) {
            setAlert({ visible: true, type: state.state, status: null, url: state.url });
            setTimeout(() => setAlert({ visible: false, type: null, status: null, url: null }), 2000);
        }
    }, [state]);
    useEffect(() => {
        if (!inputDevice && devices && devices.length > 0 ) {
            setInputDevice(devices[0].device);
        }
    }, [inputDevice,devices]);
    useEffect(() => {
        if (!inputService && services && services.length > 0 ) {
            setInputService(services[0].service);
        }
    }, [inputService,services]);
    useEffect(() => {
        if (!inputScenario && scenarios && scenarios.length > 0 ) {
            setInputScenario(scenarios[0].scenario);
        }
    }, [inputScenario,scenarios]);

    useEffect(() => {
        if (added) {
            console.log('added');
            setAdded(false);
        }
    }, [added]);
    useEffect(() => {
        if (updated) {
            console.log('updated');
            setUpdated(false);
        }
    }, [updated]);
    useEffect(() => {
        if (deleted) {
            console.log('deleted');
            setDeleted(false);
        }
    }, [deleted]);
    return(
        <div className="mx-8">
            <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
                <div className="flex pb-4 justify-between mx-6 ">
                    <div className="text-classic ">Admin</div>
                </div>
                <div className="grid grid-cols-1 gap-4 bg-gray-300 mb-4 p-6 rounded-2xl">
                    <p className="text-classic">Device</p>
                    <div className="grid grid-cols-7">
                        <p className="self-center text-classic">Selection :&nbsp;</p>
                        <div className=" col-span-4 relative rounded-md shadow-sm h-full">
                            {devices && devices.length > 0 && <ListBox data={devices} extension='device' setSelected={setInputDevice} selected={inputDevice}/>}
                        </div>
                        <Buttons setAdded={setAdded} setUpdated={setUpdated} setDeleted={setDeleted}/>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 bg-gray-300 mb-4 p-6 rounded-2xl">
                    <p className="text-classic">Service</p>
                    <div className="grid grid-cols-7">
                        <p className="self-center text-classic">Selection :&nbsp;</p>
                        <div className=" col-span-4 relative rounded-md shadow-sm h-full">
                            {services && services.length > 0 && <ListBox data={services} extension='service' setSelected={setInputService} selected={inputService}/>}
                        </div>
                        <Buttons />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 bg-gray-300 mb-4 p-6 rounded-2xl">
                    <p className="text-classic">Scenario</p>
                    <div className="grid grid-cols-7">
                        <p className="self-center text-classic">Selection :&nbsp;</p>
                        <div className=" col-span-4 relative rounded-md shadow-sm h-full">
                            {scenarios && scenarios.length > 0 && <ListBox data={scenarios} extension='scenario' setSelected={setInputScenario} selected={inputScenario}/>}
                        </div>
                        <Buttons />
                    </div>
                </div>
            </div>
            <Alert alert={alert}/>
        </div>
    );
}

function Buttons(props: any) {
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