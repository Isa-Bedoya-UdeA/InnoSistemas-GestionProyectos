import React from 'react';

interface MiembroEquipoProps {
    nombre: string;
    apellido: string;
}

const MiembroEquipoCard: React.FC<MiembroEquipoProps> = ({ nombre, apellido }) => {
    return (
        <div className="bg-gray-200 px-2 py-1 rounded text-xs flex items-center">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">
                {nombre.charAt(0) + apellido.charAt(0)}
            </div>
            <span>{nombre} {apellido}</span>
        </div>
    );
};

export default MiembroEquipoCard;