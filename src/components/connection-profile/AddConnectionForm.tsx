import React, { Dispatch, useState, ChangeEvent, useEffect } from 'react'
import { ConnectionProfile } from '../../interfaces/ConnectionProfile'
import { useAppDispatch } from '../../redux/store'
import { createConnectionProfileDispatch, updateConnectionProfileDispatch } from '../../redux/slices/connectionProfileSlice'

type Props = {
    setShowModal: Dispatch<boolean>
    connectionProfile: ConnectionProfile | null
}

export default function AddConnectionForm({ setShowModal, connectionProfile }: Props) {
    const dispatch = useAppDispatch()

    const [dbms, setDbms] = useState("");
    const [connectionName, setConnectionName] = useState("");
    const [host, setHost] = useState("");
    const [port, setPort] = useState("");
    const [databaseName, setDatabaseName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    useEffect(() => {
        if (connectionProfile) {
            setDbms(connectionProfile.dbms);
            setConnectionName(connectionProfile.connectionName);
            setHost(connectionProfile.host);
            setPort(connectionProfile.port);
            setDatabaseName(connectionProfile.databaseName);
            setUsername(connectionProfile.username);
            setPassword(connectionProfile.password);
        }
    }, [connectionProfile])

    //create onSubmit handler
    const submitConnectionFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!dbms || !connectionName || !host || !port || !databaseName) {
            alert("Please fill out all fields");
            return;
        }
        setShowModal(false);
        let payloadBody: ConnectionProfile = {
            id: '',
            dbms: dbms,
            connectionName: connectionName,
            host: host,
            port: port,
            databaseName: databaseName,
            username: username,
            password: password,
            importedDatabase: null
        };
        if (connectionProfile) {
            payloadBody.id = connectionProfile.id;
            let isPasswordNotInput = checkInputPassword(payloadBody.password)
            if (isPasswordNotInput) {
                let updatePayloadBody = {
                    id: payloadBody.id,
                    dbms: dbms,
                    connectionName: connectionName,
                    host: host,
                    port: port,
                    databaseName: databaseName,
                    username: username,
                    importedDatabase: null
                }
                dispatch(updateConnectionProfileDispatch(updatePayloadBody));
                return
            }
            dispatch(updateConnectionProfileDispatch(payloadBody));
        } else {
            dispatch(createConnectionProfileDispatch(payloadBody));
        }
    };

    //create onChange handlers for each input
    const setDbmsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setDbms(e.target.value);
    };
    const setConnectionNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setConnectionName(e.target.value);
    };
    const setHostHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setHost(e.target.value);
    };
    const setPortHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPort(e.target.value);
    };
    const setDatabaseHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDatabaseName(e.target.value);
    };
    const setUsernameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const setPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const checkInputPassword = (password: String) => {
        for (var i = 1; i < password.length; i++) {
            if (password[i] != "*") {
                return false;
            }
        }
        return true;
    }

    return (
        <>
            <div className='flex items-center justify-center'>
                <form className="w-full max-w-lg"
                    onSubmit={submitConnectionFormHandler}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                DBMS
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="dbms"
                                    value={dbms}
                                    onChange={setDbmsHandler}
                                    placeholder="DBMS"
                                >
                                    <option value="" disabled hidden>--Choose DBMS--</option>
                                    <option>Mysql</option>
                                    <option>Mariadb</option>
                                    <option>Postgresql</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w- md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Connection Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="connection-name"
                                type="text"
                                placeholder="Server"
                                value={connectionName}
                                onChange={setConnectionNameHandler} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Server Host
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-first-name" type="text" placeholder="localhost"
                                value={host}
                                onChange={setHostHandler} />
                            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Port
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="port" type="text" placeholder="3306"
                                value={port}
                                onChange={setPortHandler} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Database
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="databaseName" placeholder="Database Name"
                                value={databaseName}
                                onChange={setDatabaseHandler} />
                            {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Username
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="username" placeholder="Username"
                                value={username}
                                onChange={setUsernameHandler} />
                            {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                        </div>
                        <div className="relative w-full mx-3">
                            <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                <label className="hover:bg-gray-300 rounded px-2 text-sm text-gray-600 cursor-pointer "
                                    onClick={() => setIsShowPassword(!isShowPassword)} >
                                    {isShowPassword ?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    }
                                </label>
                            </div>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="password" type={isShowPassword ? "text" : "password"}
                                value={password}
                                onChange={setPasswordHandler}
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end pt-6 border-t border-solid border-slate-200 rounded-b">
                        { }
                        <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Cancle
                        </button>
                        <button className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}