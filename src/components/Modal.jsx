import { CircleX } from 'lucide-react'
import React, { useState } from 'react'

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };
    return (
        <>
            <div
                className="fixed inset-0 bg-gray-600 bg-opacity-50 justify-center items-center z-50 flex"
                onClick={''}
            >
                <div
                    className="bg-white rounded-lg shadow-lg w-96 p-6"
                    onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Popup Title</h2>
                        <button
                            onClick={closeModal}
                            className="text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            <CircleX />
                        </button>
                    </div>
                    <p className="mt-4 text-gray-700">
                        This is a sample popup content. You can add any content here.
                    </p>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={''}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal