import { useEffect, useState } from "react";
import Input from "../../components/Input";
import ListBox from "../../components/ListBox";
import { AddModal, Buttons, DeleteModal, UpdateModal } from "./Admin";
import * as Api from "./Api";

export function Scenarios(props: any) {
    const [scenarios, setScenarios]: any = useState([]);
    
    const [inputScenario, setInputScenario] = useState(null);
    const [inputScenarioUpdated, setInputScenarioUpdated] = useState(null);
    useEffect(() => {
        if (!inputScenario && scenarios && scenarios.length > 0 ) {
            setInputScenario(scenarios[0].scenario);
        }
    }, [inputScenario,scenarios]);

    const [added, setAdded] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        if (added) {
            console.log('added');
            let body = {scenario:inputScenario};
            Api.addScenario(body,props.setState);
            setAddModal(false);
            setAdded(false);
        }
    }, [added]);
    useEffect(() => {
        if (updated) {
            console.log('updated');
            let body = {scenario:inputScenarioUpdated};
            Api.updateScenario(body,inputScenario,props.setState);
            setUpdateModal(false);
            setUpdated(false);
        }
    }, [updated]);
    useEffect(() => {
        if (deleted) {
            console.log('deleted');
            Api.deleteScenario(inputScenario,props.setState);
            setDeletModal(false);
            setDeleted(false);
        }
    }, [deleted]);

    useEffect(() => {
        setInputScenario(null);
        Api.getScenarios(setScenarios, props.setState);
    },[deleted,updated,added]);

    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeletModal] = useState(false);

    return(
        <div className="grid grid-cols-1 gap-4 bg-gray-300 mb-4 p-6 rounded-2xl">
            <p className="text-classic">Scenario</p>
            <div className="grid grid-cols-7">
                <p className="self-center text-classic">Selection :&nbsp;</p>
                <div className=" col-span-4 relative rounded-md shadow-sm h-full">
                    {scenarios && scenarios.length > 0 && <ListBox data={scenarios} extension='scenario' setSelected={setInputScenario} selected={inputScenario}/>}
                </div>
                <Buttons setAdded={setAddModal} setUpdated={setUpdateModal} setDeleted={setDeletModal}/>
            </div>
            <AddModal modal={addModal} setModal={setAddModal} setAdded={setAdded} title={'Scenario '+ inputScenario}>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        <Input type='text' placeholder='name' onChange={setInputScenario} />
                    </div>
                </div>
            </AddModal>
            <UpdateModal modal={updateModal} setModal={setUpdateModal} setUpdated={setUpdated} title={'Scenario '+ inputScenario}>
                <div className="grid grid-cols-4">
                    <p className="self-center text-classic">Name :&nbsp;</p>
                    <div className=" col-span-3 relative rounded-md shadow-sm h-full">
                        <Input type='text' placeholder='name' onChange={setInputScenarioUpdated} />
                    </div>
                </div>
            </UpdateModal>
            <DeleteModal modal={deleteModal} setModal={setDeletModal} setDeleted={setDeleted} title={'Scenario '+ inputScenario}/>
        </div>
    );
}