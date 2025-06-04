import React, { useEffect } from 'react';
import {
    CircleAlertIcon
} from "lucide-react";

interface ModalErrorProps {
    message: string;
    onClose: () => void;
}

const ModalError: React.FC<ModalErrorProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 text-[#FF405A] bg-[#FFCCD3] border-[1px] border-[#FF405A] flex items-center justify-center z-50 top-[0.2rem] right-[0.2rem] rounded-[1rem] p-[1rem]" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <CircleAlertIcon className="h-[2rem] w-[2rem] mr-[0.5rem]" />
            <p className='m-[0px]'>{message}</p>
        </div>
    );
};

export default ModalError;