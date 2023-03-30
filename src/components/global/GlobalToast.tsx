import React from 'react'
import { useSelector } from 'react-redux'
import { GlobalModalPropsType, GlobalModalType } from '../../interfaces/GlobalModal'
import { globalToastSelector } from '../../redux/slices/globalToastSlice'

type Props = {}

export default function GlobalToast({ }: Props) {
    const { modalState } = useSelector(globalToastSelector)

    const iconTypeHandler = () => {
        switch (modalState.modalProps.type) {
            case GlobalModalPropsType.SUCCESS:
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    className="w-6 h-6 text-green-500 mx-auto mb-4 fill-current mr-4">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
            case GlobalModalPropsType.ERROR:
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    className="w-6 h-6 text-red-500 mx-auto mb-4 fill-current mr-4">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                </svg>
            case GlobalModalPropsType.WARNING:
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    className="w-6 h-6 text-yellow-400 mx-auto mb-4 fill-current mr-4">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
            case GlobalModalPropsType.INFO:
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    className="w-6 h-6 text-blue-600 mx-auto mb-4 fill-current mr-4">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
            default:
                return <></>
        }
    }

    const modalTypeHandler = () => {
        switch (modalState.modalProps.type) {
            case GlobalModalPropsType.SUCCESS:
                return "min-w-[400px] bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
            case GlobalModalPropsType.ERROR:
                return "min-w-[400px] bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
            case GlobalModalPropsType.WARNING:
                return "min-w-[400px] bg-yellow-100 border-t-4 border-yellow-500 rounded-b text-yellow-900 px-4 py-3 shadow-md"
            case GlobalModalPropsType.INFO:
                return "min-w-[400px] bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md"
            default:
                return "min-w-[400px] bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
        }
    }
    return (
        <div className="fixed bottom-0 right-0 m-6 z-50">
            <div className={modalTypeHandler()} role="alert">
                <div className="flex">
                    <div className="py-1">
                        {iconTypeHandler()}
                    </div>
                    <div className=''>
                        <p className="font-bold">{modalState.modalProps?.title}</p>
                        <p className="text-sm">{modalState.modalProps?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}