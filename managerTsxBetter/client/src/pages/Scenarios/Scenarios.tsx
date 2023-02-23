import { useEffect, useState } from "react";
import Paper from "../../components/Paper";
import * as Api from "./Api";
import Alert from "../../components/Alert";

export default function Scenarios() {
    const [scenarios, setScenarios] = useState([]);
    // Alert Message
    const [state, setState]: any = useState(null);
    const [alert, setAlert] = useState({ visible: false, type: null, status: null, url: null });
    useEffect(() => {
        Api.getScenarios(setScenarios, setState);
    }, []);
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
                    <div className="text-classic ">Scenarios</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4  gap-4 justify-items-center mx-6">
                    {scenarios && scenarios.length > 0 && scenarios.map((scenario: any, index: number) => 
                        <Item  key={index} scenario={scenario}/>
                    )}
                </div>
            </div>
            <Alert alert={alert}/>
        </div>
    );
}
function Item(props: any) {
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
