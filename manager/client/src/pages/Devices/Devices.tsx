import { useEffect, useState } from "react";
import Paper from "../../components/Paper";
import Alert from "../../components/Alert";
import * as Api from "./Api";
import { Link } from "react-router-dom";

export default function Device() {
    const [devices, setDevices] = useState([]);
    const [diagram, setDiagram] = useState(false);
    // Alert Message
    const [state, setState]: any = useState(null);
    const [alert, setAlert] = useState({ visible: false, type: null, status: null, url: null });
    useEffect(() => {
        Api.getDevices(setDevices, setState);
    },[]);
    useEffect(() => {
        if (state) {
            setAlert({ visible: true, type: state.state, status: null, url: state.url });
            setTimeout(() => setAlert({ visible: false, type: null, status: null, url: null }), 2000);
        }
    }, [state]);

    useEffect(() => {
        if (diagram) {
            Api.getDiagram(setState);
            setDiagram(false);
        }
    }, [diagram]);
    
    return(
        <div className="mx-8">
            <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
                <div className="flex pb-4 justify-between mx-6 ">
                    <div className="text-classic ">Devices</div>
                    <button className=' btn btn-classic h-8 w-24 ' onClick={() => setDiagram(true)}>Diagram</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4  gap-4 justify-items-center mx-6">
                    {devices && devices.map((device: any, index: number) => 
                        <Item key={index} device={device} setState={setState}/>
                    )}
                </div>
            </div>
            <Alert alert={alert}/>
        </div>
    );
}
function Item(props: any) {
    const [state, setState]: any = useState("unknow");
    const [ping, setPing]: any = useState(false);
    useEffect(() => {
        if (ping) {
            Api.getDeviceState(setState, props.device.ip ,props.setState);
            setPing(false);
        }
    },[ping,props.device.ip]);
    return(
        <div className=''>
            {props.device !== null && (
                <div className=''>
                    <Paper title={"Device : "+props.device.name} removable={false}>
                        <p className="text-classic pb-1">{"IP : "+props.device.ip}</p>
                        <p className="text-classic pb-2">
                            {props.device && "Functions Numbers : "+props.device.functions.length}
                        </p>
                        <Link to={'device/'+props.device.name} className="flex justify-center btn btn-classic ">Functions</Link>
                        <button className='btn btn-open mx-auto mt-4 flex justify-center' onClick={() => setPing(true)}>{"Ping : "+state}</button>
                    </Paper>
                </div>
            )}
        </div>
    );
}
