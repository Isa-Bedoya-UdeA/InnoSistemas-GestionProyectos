// src/components/ModalExito.tsx
import React from 'react';
import { useEffect } from 'react';

interface ModalExitoProps {
    message: string;
    onClose: () => void;
}

const ModalExito: React.FC<ModalExitoProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-[#D1F9E4] text-[#059569] border-[1px] border-[#059569] flex items-center justify-center z-50 top-[0.2rem] right-[0.2rem] rounded-[1rem] p-[1rem]" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <p className='m-[0px]'>{message}</p>
        </div>
    );
};

export default ModalExito;