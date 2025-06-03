// ContextMenu.tsx (no necesita cambios, está bien como está)
import React, { useRef, useEffect } from 'react';
import {
    PencilIcon,
    TrashIcon
} from "lucide-react";

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onEdit, onDelete }) => {
    const contextMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-40" onClick={onClose}>
            <div
                ref={contextMenuRef}
                className="flex flex-col rounded-[5rem] absolute bg-[#fff] border border-none z-50 min-w-[120px]"
                style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', top: `${y}px`, left: `${x}px` }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="hover:bg-[#E2E8EF] bg-[#fff] border-none flex items-center w-full text-left text-gray-700 hover:bg-gray-100 rounded-md p-[0.5rem]"
                    onClick={onEdit}
                >
                    <PencilIcon className="h-[1.3rem] w-[1.3rem]" />
                    <span className='ml-[0.5rem]'>Editar</span>
                </button>
                <button
                    className="hover:bg-[#E2E8EF] bg-[#fff] border-none flex items-center w-full text-left text-red-600 hover:bg-red-50 rounded-md mt-1 text-[#FF5A71] p-[0.5rem]"
                    onClick={onDelete}
                >
                    <TrashIcon className="h-[1.3rem] w-[1.3rem]" />
                    <span className='ml-[0.5rem]'>Eliminar</span>
                </button>
            </div>
        </div>
    );
};

export default ContextMenu;