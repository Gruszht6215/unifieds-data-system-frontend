import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, ChangeEvent } from 'react'
import { useAppDispatch } from '../../redux/store'
import { createClusterDispatch } from '../../redux/slices/clusterSlice'
import { Cluster } from '../../interfaces/Cluster'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

export default function AddClusterFormModal({ isOpen, closeModal }: Props) {
  const dispatch = useAppDispatch()
  const [clusterName, setClusterName] = useState('')

  const setClusterNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setClusterName(e.target.value);
  };

  const onClickConfirmHandler = () => {
    let payloadBody:any = {
      name: clusterName
    }
    dispatch(createClusterDispatch(payloadBody))
    closeModal()
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Cluster
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="w-full">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Cluster Name
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="clusterName" placeholder="Cluster Name"
                        value={clusterName}
                        onChange={setClusterNameHandler} />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onClickConfirmHandler}
                    >
                      Confirm
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
