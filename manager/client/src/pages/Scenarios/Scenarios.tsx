import { useEffect, useState } from "react";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import Paper from "../../components/Paper";
import Alert from "../../components/Alert";
import * as Api from "./Api";
import { Link } from "react-router-dom";

export default function Scenarios(props) {
    const [scenarios, setScenarios] = useState(null);
    // Alert Message
    const [alertData, setAlertData] = useState({
        active:false,
        type:null,
        status:null,
        url:null
    });
    useEffect(() => {
        Api.getScenarios(setScenarios,setAlertData,alertData);
    }, []);
    return(
        <div className="mx-8">
            <div className="rounded-[14px] shadow-md bg-gray-200 px-4 py-4 mx-auto">
                <div className="flex pb-4 justify-between mx-6 ">
                    <div className="text-classic ">Scenarios</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4  gap-4 justify-items-center mx-6">
                    {scenarios && scenarios.length > 0 && scenarios.map((scenario) => 
                        <Item  scenario={scenario} alertData={alertData} setAlertData={setAlertData}/>
                    )}
                </div>
            </div>
        </div>
    );
}
function Item(props) {
    return(
        <div className=''>
            {props.scenario !== null && (
                <div className=''>
                    <Paper title={"Scenario : "+props.scenario.name} removable={true}>
                        <p className="text-classic pb-1">{"IP : "}</p>
                    </Paper>
                </div>
            )}
        </div>
    );
}
