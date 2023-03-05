import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import * as Api from './Api';
import * as io from "socket.io-client";

const socket = io.connect('http://192.168.1.23:6001');

const Navbar = () => {
    /* Not rendered */
    const location = useLocation();
    const list = [
        {name:"Devices",path:"/"},
        {name:"Scenarios",path:"/scenarios"},
        {name:"Admin",path:"/admin"},
    ]
    const logo = require("../../assets/logo512.png")

    const [speed, setSpeed] = useState(0)
    const [isConnected, setIsConnected] = useState(socket.connected);
    useEffect(() => {
        socket.on('connect', () => {
          socket.emit('speed::subscribe')
          setIsConnected(true);
        });
    
        socket.on('speed::update', (timestamp: any) => {
          console.log(timestamp)
          setSpeed(timestamp)
        });
    
        socket.on('disconnect', () => {
          setIsConnected(false);
        });
    
        return () => {
          socket.off('connect');
          socket.off('disconnect');
          socket.off('speed::update');
        };
    }, []);
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
                            <p className="btn - btn-classic">{"Speed : "+ speed}</p>
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