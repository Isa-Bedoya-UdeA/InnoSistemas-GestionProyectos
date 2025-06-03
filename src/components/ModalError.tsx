// src/components/ModalError.tsx
import React from 'react';

interface ModalErrorProps {
    title: string;
    message: string;
    onClose: () => void;
}

const ModalError: React.FC<ModalErrorProps> = ({ title, message, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalError;