import { useEffect, useState } from "react";
import Paper from "../../components/Paper";
import Alert from "../../components/Alert";
import * as Api from "./Api";
import { Link } from "react-router-dom";
import {saveAs} from "file-saver";
import photo from '../../assets/diagram.gv.png';
import { time } from "console";

export default function Device() {
    const [devices, setDevices] = useState([]);
    useEffect(() => {
        Api.getDevices(setDevices, setState);
    },[]);
    const [state, setState]: any = useState(null);
    const [alert, setAlert] = useState({ visible: false, type: null, status: null, url: null });
    useEffect(() => {
        if (state) {
            setAlert({ visible: true, type: state.state, status: null, url: state.url });
            setTimeout(() => setAlert({ visible: false, type: null, status: null, url: null }), 2000);
        }
    }, [state]);

    const [diagram, setDiagram] = useState(false);
    useEffect(() => {
        if (diagram) {
            Api.getDiagram(setState);
            setTimeout(() => setDiagramSave(true), 2000);
            
            setDiagram(false);
        }
    }, [diagram]);

    const [diagramSave, setDiagramSave] = useState(false);
    useEffect(() => {
        if (diagramSave) {
            saveAs(photo, "diagram.png");
            setDiagramSave(false);
        }
    }, [diagramSave]);
    
    return(
        <div className="mx-8">
            <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
                <div className="flex pb-4 justify-between mx-6 ">
                    <div className="text-classic ">Devices</div>
                    <button className=' btn btn-classic h-8 ' onClick={() => setDiagram(true)}>Download Project Diagram</button>
                </div>
                <div className="grid grid-cols-3 gap-4 justify-items-center mx-6">
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
        <div className='w-full'>
            {props.device !== null && (
                <div className=''>
                    <Paper title={"Device : "+props.device.device} removable={false} className='w-full'>
                        <p className="text-classic pb-1">{"IP : "+props.device.ip}</p>
                        <p className="text-classic pb-1">{"Voltage : "+props.device.voltage}</p>
                        <p className="text-classic pb-1">{"Amperage : "+props.device.amperage}</p>
                        <p className="text-classic pb-1">{"ID : "+props.device.id}</p>
                        <Link to={'device/'+props.device.device+'/'+props.device.id} className="flex justify-center btn btn-classic ">Functions</Link>
                        <button className={`btn ${state === 'unknow' && 'btn-classic'} ${state === false && 'btn-close'} ${state === true && 'btn-open'} mt-4 w-full`} onClick={() => setPing(true)}>{"Ping : "+state}</button>
                    </Paper>
                </div>
            )}
        </div>
    );
}
