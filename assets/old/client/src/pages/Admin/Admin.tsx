import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import * as Api from "./Api";

export default function Admin() {
    const [devices, setDevices] = useState([]);
    // Alert Message
    const [state, setState]: any = useState(null);
    const [alert, setAlert] = useState({ visible: false, type: null, status: null, url: null });
    useEffect(() => {
        Api.getDevices(setDevices, setState);
    },[]);
    
    return(
        <div className="mx-8">
            <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
                <div className="flex pb-4 justify-between mx-6 ">
                    <div className="text-classic ">Admin</div>
                </div>
                <div className="grid grid-cols-1 gap-4 bg-gray-300 p-6 rounded-2xl">
                    <p className="text-classic bg-gray-400 rounded-2xl p-2 align-center">Add Device</p>
                    <div className="grid grid-cols-2">
                        <p className="text-classic">Value</p>
                        <p className="text-classic">Input</p>
                    </div>
                </div>
            </div>
            <Alert alert={alert}/>
        </div>
    );
}
