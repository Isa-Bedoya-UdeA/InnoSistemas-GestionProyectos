import React from 'react';
import type { Project } from '../types/Project';
import {
    EllipsisVerticalIcon
} from "lucide-react";

interface ProjectCardProps {
    proyecto: Project;
    onContextMenu: (event: React.MouseEvent<HTMLButtonElement>, buttonElement: HTMLButtonElement) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ proyecto, onContextMenu }) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (buttonRef.current) {
            onContextMenu(event, buttonRef.current);
        }
    };

    return (
        <div className="flex flex-col gap-[1.2rem] bg-[#fff] rounded-[0.5rem] p-[1rem] rounded max-w-[23rem]" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <div className='h-[2rem] flex flex-row justify-between items-center mb-2'>
                <p className={`text-[0.9rem] p-[0.5rem] rounded-full ${proyecto.estado === 'Terminado' ? 'text-[#059569] bg-[#D1F9E4]' : ''} ${proyecto.estado === 'En progreso' ? 'text-[#307dfd] bg-[#C1D8FE]' : ''} ${proyecto.estado === 'Pendiente' ? 'text-[#D87705] bg-[#FDF2C6]' : ''}`}>{proyecto.estado}</p>
                <button
                    ref={buttonRef}
                    className="h-[2rem] w-[2rem] bg-[transparent] border-none cursor-pointer rounded-full hover:bg-[#E2E8EF] p-[0.5rem] flex items-center justify-center"
                    onClick={handleButtonClick}
                >
                    <EllipsisVerticalIcon className="h-full w-full" /> {/* Icono ocupa todo el botón */}
                </button>
            </div>
            <h3 className="font-bold text-lg m-[0px]">{proyecto.nombre}</h3>
            <div className="mt-2 flex justify-between">
                <span>{proyecto.fechaInicio} - {proyecto.fechaFin}</span>
            </div>
            <div className='flex flex-col gap-[0.2rem]'>
                <p className='text-[#a6a6a6] m-[0px]'>Progreso</p>
                <div className="w-full h-[0.5rem] bg-[#E2E8EF] rounded-full dark:bg-gray-700 mt-2">
                    <div className={`h-[0.5rem] rounded-full ${proyecto.estado === 'Terminado' ? 'bg-[#059569]' : ''} ${proyecto.estado === 'En progreso' ? 'bg-[#307dfd]' : ''} ${proyecto.estado === 'Pendiente' ? 'bg-[#D87705]' : ''}`} style={{ width: `${proyecto.progreso}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;