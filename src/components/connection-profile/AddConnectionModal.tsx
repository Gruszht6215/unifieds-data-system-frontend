import React, { useState, useEffect, Dispatch } from "react";
import AddConnectionForm from "./AddConnectionForm";
import { ConnectionProfile } from "../../interfaces/ConnectionProfile";

type Props = {
    actionType: string;
    connectionProfile: ConnectionProfile | null;
    isOpenEditModal: boolean | null;
    setIsOpenEditModal: Dispatch<boolean>;
}

// type FormEvent = React.FormEvent<HTMLFormElement>;

export default function AddConnectionModal({ actionType, connectionProfile, isOpenEditModal, setIsOpenEditModal }: Props) {
    const [showModal, setShowModal] = useState(false);

    const closeModalHandler = (stat: boolean) => {
        setIsOpenEditModal(stat);
        setShowModal(false);
    }

    return (
        <>
            {actionType === "Add" &&
                <button
                    className="flex rounded-xl secondary-bg-color hover:to-purple-900 text-white font-bold px-6 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150
                    shadow-lg shadow-purple-500/50"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="animate-bounce w-6 h-6 mr-1">
                        <path fillRule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V10.5z" clipRule="evenodd" />
                    </svg>
                    Add Connection
                </button>
            }
            {showModal || isOpenEditModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-6xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Connection Profile
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    {actionType === "Add" &&
                                        <AddConnectionForm setShowModal={setShowModal} connectionProfile={null} />
                                    }
                                    {actionType === "Edit" &&
                                        <AddConnectionForm setShowModal={closeModalHandler} connectionProfile={connectionProfile} />
                                    }
                                </div>
                                {/*footer*/}
                                {/* <div></div> */}
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black" />
                </>
            ) : null}
        </>
    );
}