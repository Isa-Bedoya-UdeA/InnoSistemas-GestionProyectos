import {
    PlusIcon,
    SearchIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "lucide-react";
import React, { useContext, useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ContextMenu from '../components/ContextMenu';
import ModalAlerta from '../components/ModalAlerta';
import ModalExito from '../components/ModalExito';
import { TeamContext } from '../context/TeamContext';
import type { Project } from "../types/Project";

type ContextMenuPosition = { x: number; y: number };

function getButtonPosition(button: HTMLElement): ContextMenuPosition {
    const rect = button.getBoundingClientRect();

    const x = rect.right - 350;
    const y = rect.top - 100;
    console.log(x, y);

    return { x, y };
}

const VerProyectos: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEstado, setSelectedEstado] = useState('Todos los estados');
    const [selectedFecha, setSelectedFecha] = useState('Todas las fechas');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 10;

    const { selectedTeam, teams, setTeams } = useContext(TeamContext)!;
    const { proyectos } = selectedTeam || { proyectos: [] };
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

    const handleContextMenu = (event: React.MouseEvent<HTMLButtonElement>, buttonElement: HTMLButtonElement, projectId: number) => {
        event.preventDefault();
        const position = getButtonPosition(buttonElement);
        setContextMenuPosition(position);
        setSelectedProjectId(projectId);
        setShowContextMenu(true);
    };

    const handleCloseContextMenu = () => {
        setShowContextMenu(false);
        setSelectedProjectId(null);
    };

    const handleEditProject = () => {
        if (selectedProjectId !== null) {
            window.location.href = `/proyectos/editar/${selectedProjectId}`;
        }
        handleCloseContextMenu();
    };

    const handleCreateProject = () => {
        window.location.href = `/proyectos/crear`;
        handleCloseContextMenu();
    };

    const handleDeleteProject = () => {
        setShowDeleteModal(true);
        setShowContextMenu(false);
    };

    const handleConfirmDeleteProject = () => {
        if (selectedProjectId !== null && selectedTeam) {
            // Actualiza el array global de equipos
            setTeams(teams.map(team =>
                team.id === selectedTeam.id
                    ? {
                        ...team,
                        proyectos: team.proyectos.filter(
                            (proyecto: Project) => proyecto.id !== selectedProjectId
                        )
                    }
                    : team
            ));
        }
        setShowDeleteModal(false);
        setShowSuccessModal(true);
        setSelectedProjectId(null);
    };

    useEffect(() => {
        if (selectedTeam) {
            setCurrentPage(1);
        }
    }, [selectedTeam]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEstado(e.target.value);
    };

    const handleFechaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFecha(e.target.value);
    };

    function filtrarPorFecha(proyecto: Project) {
        if (selectedFecha === 'Todas las fechas') return true;
        const fecha = new Date(proyecto.fechaInicio);
        const ahora = new Date();
        if (selectedFecha === 'Este mes') {
            return (
                fecha.getMonth() === ahora.getMonth() &&
                fecha.getFullYear() === ahora.getFullYear()
            );
        }
        if (selectedFecha === 'Este semestre') {
            const semestreActual = Math.floor(ahora.getMonth() / 6);
            const semestreProyecto = Math.floor(fecha.getMonth() / 6);
            return (
                semestreActual === semestreProyecto &&
                fecha.getFullYear() === ahora.getFullYear()
            );
        }
        if (selectedFecha === 'Este año') {
            return fecha.getFullYear() === ahora.getFullYear();
        }
        return true;
    }

    const filteredProjects = proyectos
        .filter((proyecto) => proyecto.equipo === selectedTeam?.id)
        .filter((proyecto) =>
            proyecto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((proyecto) =>
            selectedEstado === 'Todos los estados'
                ? true
                : proyecto.estado === selectedEstado
        )
        .filter(filtrarPorFecha);

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * projectsPerPage,
        currentPage * projectsPerPage
    );
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <section className="flex flex-col w-full h-full items-start gap-[30px] relative"> {/* Añadimos relative aquí para posicionar el ContextMenu */}
            <div className="flex items-center justify-between w-full">
                <h1 className="font-bold text-black text-[28px] leading-[33.6px] m-[0px]">
                    Equipo {selectedTeam?.nombre || 'Sin equipo seleccionado'}
                </h1>

                <div className="flex items-center gap-[1rem]">
                    <div className="relative flex items-center w-[15rem] rounded-[0.5rem] p-[0.5rem] border-[#a6a6a6] bg-[#fff]">
                        <SearchIcon className="text-[#a6a6a6]" />
                        <input
                            className="ml-[1rem] w-full h-full border-none text-sm font-normal focus:outline-none focus:ring-0"
                            placeholder="Buscar proyectos..." onChange={handleSearchChange} value={searchTerm} />
                    </div>

                    <button className="rounded-[0.5rem] bg-[#307dfd] text-[#fff] border-none p-[0.5rem] inline-flex items-center justify-center hover:bg-[#4687f2] transition-colors duration-200" onClick={handleCreateProject}>
                        <PlusIcon />
                        <span className="ml-[0.5rem] font-semibold text-sm">Nuevo Proyecto</span>
                    </button>
                </div>
            </div>

            <div className="flex p-[1rem] gap-[1rem] space-x-4">
                <select className="border-none outline-[1px] outline-[#a6a6a6] border-r-[1rem] border-r-[#fff] p-[0.5rem] pr-[1rem] rounded-[0.5rem]" onChange={handleEstadoChange}
                    value={selectedEstado}>
                    <option>Todos los estados</option>
                    <option>Pendiente</option>
                    <option>En progreso</option>
                    <option>Terminado</option>
                </select>

                <select
                    className="border-none outline-[1px] outline-[#a6a6a6] border-r-[1rem] border-r-[#fff] p-[0.5rem] pr-[1rem] rounded-[0.5rem]"
                    onChange={handleFechaChange}
                    value={selectedFecha}
                >
                    <option>Todas las fechas</option>
                    <option>Este mes</option>
                    <option>Este semestre</option>
                    <option>Este año</option>
                </select>
            </div>

            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-3 gap-[2rem] w-full p-[0.5rem]">
                    {paginatedProjects.map((proyecto) => (
                        <ProjectCard
                            key={proyecto.id}
                            proyecto={proyecto}
                            onContextMenu={(event, buttonElement) => handleContextMenu(event, buttonElement, proyecto.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center w-full h-full p-[1rem] text-gray-500">
                    <p>No hay proyectos.</p>
                </div>
            )}

            {showContextMenu && (
                <ContextMenu
                    x={contextMenuPosition.x}
                    y={contextMenuPosition.y}
                    onClose={handleCloseContextMenu}
                    onEdit={handleEditProject}
                    onDelete={handleDeleteProject}
                />
            )}

            {showDeleteModal && (
                <ModalAlerta
                    title="¿Estás seguro de eliminar el proyecto Website Redesign?"
                    message="Esta acción no se puede deshacer. Eliminará permanentemente el proyecto de nuestros servidores."
                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={handleConfirmDeleteProject}
                />
            )}

            {showSuccessModal && (
                <ModalExito
                    message="Proyecto eliminado exitosamente"
                    onClose={() => setShowSuccessModal(false)}
                />
            )}

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="flex items-center gap-[0.5rem] pb-[2rem] mx-auto">
                    <button
                        className="w-[2.5rem] h-[2.5rem] rounded-[0.8rem] bg-[#fff] border border-[#E2E8EF] hover:bg-[#E2E8EF] disabled:hover:bg-[#fff]"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeftIcon className="w-[1rem] h-[1rem]" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`w-[2.5rem] h-[2.5rem] rounded-[0.8rem] border border-[#E2E8EF] ${currentPage === i + 1 ? 'bg-[#307dfd] text-[#fff]' : 'bg-[#fff] hover:bg-[#E2E8EF]'}`}
                            onClick={() => goToPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className="w-[2.5rem] h-[2.5rem] rounded-[0.8rem] bg-[#fff] border border-[#E2E8EF] hover:bg-[#E2E8EF] disabled:hover:bg-[#fff]"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRightIcon className="w-[1rem] h-[1rem]" />
                    </button>
                </div>
            )}
        </section>
    );
};

export default VerProyectos;

