import React from 'react';

interface ModalAlertaProps {
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const ModalAlerta: React.FC<ModalAlertaProps> = ({ title, message, onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-[#fff] bg-opacity-50 flex items-center justify-center z-50 top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] p-[2rem] rounded-[1rem] w-[35rem]" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>
                <div className="flex gap-[1rem] justify-end space-x-4">
                    <button onClick={onCancel} className="rounded-[0.3rem] bg-[#fff] border-[1px] border-[#E2E8EF] p-[0.5rem] inline-flex items-center justify-center hover:bg-[#E2E8EF] transition-colors duration-200">
                        <span className="font-semibold text-sm">Cancelar</span>
                    </button>
                    <button onClick={onConfirm} className="rounded-[0.3rem] bg-[#307dfd] text-[#fff] border-none p-[0.5rem] inline-flex items-center justify-center hover:bg-[#4687f2] transition-colors duration-200">
                        <span className="font-semibold text-sm">Continuar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAlerta;