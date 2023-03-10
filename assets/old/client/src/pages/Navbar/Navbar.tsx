import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import * as Api from './Api';

const Navbar = () => {
    /* Not rendered */
    const location = useLocation();
    const list = [
        {name:"Devices",path:"/"},
        {name:"Scenarios",path:"/scenarios"},
        {name:"Admin",path:"/admin"},
    ]
    const logo = require("../../assets/logo512.png")
    return(
    <div>
        <nav>
            <ul>
                <div className="px-4 mb-4 py-4 bg-gray-800 flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                        <img className="block h-8 w-auto lg:hidden" src={logo} alt="compagny"/>
                        <img className="hidden h-8 w-auto lg:block" src={logo} alt="compagny" />
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4 items-center">
                            {list.map((item: any,index: number) => (
                                <li key={index}>
                                    <Link to={item.path} className={`flex justify-center btn btn-primary w-44 ${item.path === location.pathname && "btn-secondary"}`}>{item.name}</Link>
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
            </ul>
        </nav>
        <Header />
        <Outlet />
    </div>
  )
};

function Header() {
    const [server, setServer] = useState(null);
    useEffect(() => {
        Api.getApi(setServer);
    }, []);
    return (
        <div className="mx-8">
            <p className="text-3xl font-bold color-classic pb-1">Communication Manager</p>
            <p className="text-gray-500 text-lg">Test your communication with me.</p>
            <p className='text-lg font-semibold pb-2'>{!server ? "Server is Down !" : server}</p>
        </div>
    );
}

export default Navbar;