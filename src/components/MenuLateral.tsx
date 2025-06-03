import React, { useContext, useState } from 'react';
import { TeamContext } from '../context/TeamContext';
import {
    ChevronDownIcon,
    LogOutIcon,
    SettingsIcon,
    UserIcon
} from "lucide-react";
import type { Team } from '../types/Team';

interface MenuLateralProps {
    teams: Team[];
}

const MenuLateral: React.FC<MenuLateralProps> = ({ teams }) => {
    const { selectedTeamId, setSelectedTeamId } = useContext(TeamContext)!;

    const [isEquipoMenuOpen, setIsEquipoMenuOpen] = useState(true);

    const handleTeamClick = (id: number) => {
        setSelectedTeamId(id);
    };

    return (
        <header className="flex flex-col w-[17rem] h-full bg-white fixed top-0 left-0 z-99 shadow-lg text-[0.9rem] pb-[3rem] pl-[2rem] pt-[1rem] pr-[2rem]">
            {/* Logo y Nombre*/}
            <div className="flex items-center w-full pt-[1rem] pl-[1rem]">
                <div className="flex h-10 items-center justify-center gap-[1rem] bg-white">
                    <img
                        className="w-[29.64px] h-[29.64px]"
                        alt="InnoSistemas Logo"
                        src="https://c.animaapp.com/I8bYeMMr/img/vector.svg"
                    />
                    <div className="[font-family:'Signika',Helvetica] font-semibold text-[#307dfd] text-base tracking-[0] leading-[19.2px] whitespace-nowrap">
                        InnoSistemas
                    </div>
                </div>
            </div>

            {/* Equipos */}
            <nav className="w-full flex-grow overflow-y-auto mt-[2rem]">
                <div
                    onClick={() => setIsEquipoMenuOpen(!isEquipoMenuOpen)}
                    className="cursor-pointer flex items-center mb-2"
                >
                    <span className="font-[700] text-black text-sm">
                        Equipos
                    </span>
                    <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isEquipoMenuOpen ? 'rotate-0' : '-rotate-90'}`} />
                </div>
                {isEquipoMenuOpen && (
                    <ul className="pl-[0.5rem] flex flex-col gap-[1rem]">
                        {teams.map((team: Team) => (
                            <li
                                key={team.id}
                                className={`flex items-center gap-2 rounded-md cursor-pointer text-sm font-medium transition-colors duration-200`} // Estilos mejorados
                                onClick={() => handleTeamClick(team.id)}
                            >
                                <div
                                    className={`w-[0.5rem] h-[0.5rem] rounded-full ${team.id === selectedTeamId ? "bg-[#307dfd]" : "bg-[#c1d8fe]"}`}
                                />
                                <span className={`ml-[0.5rem] w-2 h-2 rounded-full ${team.id === selectedTeamId ? "font-[600]" : ""}`}>{team.nombre}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>

            {/* Extras */}
            <div>
                <p className="flex items-center gap-2 py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer text-sm font-medium">
                    <SettingsIcon className="h-4 w-4" />
                    <span className='pl-[0.5rem]'>Ajustes</span>
                </p>
                <p className="flex items-center gap-2 py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer text-sm font-medium mt-1">
                    <LogOutIcon className="h-4 w-4" />
                    <span className='pl-[0.5rem]'>Cerrar Sesión</span>
                </p>
                <div className="flex items-center gap-3 mt-4 py-2 px-3 bg-gray-50 rounded-md"> {/* Añadimos fondo y padding */}
                    <UserIcon className="w-[2.5rem] h-[2.5rem] text-gray-500 bg-[#c1d8fe] rounded-full p-[0.3rem]" />
                    <div className="pl-[0.5rem] flex flex-col items-start gap-0">
                        <div className="font-semibold text-gray-900 text-sm font-[600]">
                            John Doe
                        </div>
                        <div className="font-normal text-gray-500 text-xs">
                            credenciales
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default MenuLateral;