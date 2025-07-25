import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalExito from '../components/ModalExito';
import ModalError from '../components/ModalError';
import type { Project } from '../types/Project';
import { TeamContext } from '../context/TeamContext';
import { AuthContext } from '../context/AuthContext';
import { XIcon, PlusIcon } from "lucide-react";

function convertirFormatoFecha(fecha: string) {
    return fecha.replace(/\//g, "-");
}

function revertirFormatoFecha(fecha: string) {
    return fecha.replace(/-/g, "/");
}

const CrearProyecto: React.FC = () => {
    const teamContext = useContext(TeamContext)!;
    const { selectedTeam, setSelectedTeam, teams, setTeams } = teamContext;
    const auth = useContext(AuthContext) as { user?: { nombre?: string } };
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const [formData, setFormData] = useState<Omit<Project, 'id'>>({
        nombre: '',
        estado: 'Pendiente',
        fechaInicio: '',
        fechaFin: '',
        progreso: 0,
        miembros: auth?.user?.nombre ? [auth.user.nombre] : [],
        equipo: selectedTeam?.id ?? 1,
        descripcion: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        if (showSuccessModal) {
            const timeout = setTimeout(() => {
                setShowSuccessModal(false);
                navigate('/proyectos');
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [showSuccessModal, navigate]);

    // Sincroniza el equipo en formData cuando cambia el equipo seleccionado
    useEffect(() => {
        if (selectedTeam) {
            setFormData(prev => ({
                ...prev,
                equipo: selectedTeam.id
            }));
        }
    }, [selectedTeam]);

    useEffect(() => {
        if (showSuccessModal) {
            const timeout = setTimeout(() => {
                setShowSuccessModal(false);
                navigate('/proyectos');
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [showSuccessModal, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre del proyecto es obligatorio.';
        }

        if (!formData.fechaInicio) {
            newErrors.fechaInicio = 'La fecha de inicio es obligatoria.';
        }

        if (!formData.fechaFin) {
            newErrors.fechaFin = 'La fecha de fin es obligatoria.';
        }

        if (formData.fechaInicio && formData.fechaFin) {
            const start = new Date(convertirFormatoFecha(formData.fechaInicio));
            const end = new Date(convertirFormatoFecha(formData.fechaFin));
            if (start > end) {
                newErrors.fechaFin = 'La fecha de fin debe ser posterior a la fecha de inicio.';
            }
        }

        if (!formData.miembros || formData.miembros.length === 0) {
            newErrors.miembros = 'Debe asignar al menos un miembro al proyecto.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
        navigate('/proyectos');
    };

    const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    const crearProyecto = (datos: Omit<Project, 'id'>) => {
        const equipoId = datos.equipo;
        const nuevoProyecto: Project = {
            ...datos,
            id: Date.now(), // O usa otro generador de ID
            fechaInicio: revertirFormatoFecha(datos.fechaInicio),
            fechaFin: revertirFormatoFecha(datos.fechaFin),
        };
        setTeams(teams.map(team =>
            team.id === equipoId
                ? { ...team, proyectos: [...team.proyectos, nuevoProyecto] }
                : team
        ));
        // Actualiza el selectedTeam si corresponde
        if (selectedTeam && selectedTeam.id === equipoId) {
            setSelectedTeam({
                ...selectedTeam,
                proyectos: [...selectedTeam.proyectos, nuevoProyecto],
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            crearProyecto(formData);
            setShowSuccessModal(true);
        } else {
            setShowErrorModal(true);
        }
    };

    const miembrosEquipo = selectedTeam?.miembros || [];

    return (
        <div>
            <p className='m-[0px]'><a href='/proyectos' className='no-underline text-[#a6a6a6]'>Proyectos / </a><span className='text-[#307dfd]'>Crear Proyecto</span></p>
            <h1 className="mb-[0px] mt-[0.3rem] font-bold">Crear Proyecto</h1>
            <p className='text-[#a6a6a6] mb-[0px] mt-[0.3rem]'>Completa los datos para tu nuevo proyecto</p>

            <form onSubmit={handleSubmit} className='mt-[1rem] bg-[#fff] p-[2rem] rounded-[1rem] flex flex-col gap-[1rem]'>
                <div>
                    <label className="block font-[500] mb-[0.5rem]" htmlFor="nombre">
                        Nombre del Proyecto <span className='text-[#FF5A71]'>*</span>
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={`w-full p-[0.5rem] border rounded-[0.5rem] ${errors.nombre ? 'border-red-500' : ''}`}
                    />
                    {errors.nombre && <p className="text-[#FF5A71]">{errors.nombre}</p>}
                </div>

                <div>
                    <label className="block font-[500] mb-[0.5rem]" htmlFor="descripcion">
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className="w-full p-[0.5rem] border rounded-[0.5rem]"
                    />
                </div>

                <div className='flex justify-between gap-[1rem]'>
                    <div className='w-[50%]'>
                        <label className="block font-[500] mb-[0.5rem]" htmlFor="fechaInicio">
                            Fecha de Inicio <span className='text-[#FF5A71]'>*</span>
                        </label>
                        <input
                            type="date"
                            id="fechaInicio"
                            name="fechaInicio"
                            value={formData.fechaInicio ? convertirFormatoFecha(formData.fechaInicio) : ''}
                            onChange={handleChange}
                            className={`w-full p-[0.5rem] border rounded-[0.5rem] ${errors.fechaInicio ? 'border-red-500' : ''}`}
                        />
                        {errors.fechaInicio && <p className="text-[#FF5A71]">{errors.fechaInicio}</p>}
                    </div>

                    <div className='w-[50%]'>
                        <label className="block font-[500] mb-[0.5rem]" htmlFor="fechaFin">
                            Fecha de Fin <span className='text-[#FF5A71]'>*</span>
                        </label>
                        <input
                            type="date"
                            id="fechaFin"
                            name="fechaFin"
                            value={formData.fechaFin ? convertirFormatoFecha(formData.fechaFin) : ''}
                            onChange={handleChange}
                            className={`w-full p-[0.5rem] border rounded-[0.5rem] ${errors.fechaFin ? 'border-red-500' : ''}`}
                        />
                        {errors.fechaFin && <p className="text-[#FF5A71]">{errors.fechaFin}</p>}
                    </div>
                </div>

                <div>
                    <label className="block font-[500] mb-[0.5rem]" htmlFor="estado">
                        Estado <span className='text-[#FF5A71]'>*</span>
                    </label>
                    <div className="flex gap-[1rem]">
                        {(["Pendiente", "En progreso", "Terminado"] as Array<"Pendiente" | "En progreso" | "Terminado">).map((estado) => (
                            <button
                                type="button"
                                key={estado}
                                className={`bg-[#fff] flex items-center p-[0.5rem] rounded-[0.5rem] border ${formData.estado === estado ? ' ' : 'border-[#E2E8EF] bg-white'} transition-colors ${estado === 'Pendiente' ? 'border-[#D87705]' : ''} ${estado === 'En progreso' ? 'border-[#307dfd]' : ''} ${estado === 'Terminado' ? 'border-[#059569]' : ''}`}
                                onClick={() => setFormData({ ...formData, estado })}
                            >
                                <span className="inline-flex items-center justify-center">
                                    <span
                                        className={`w-[1rem] h-[1rem] rounded-full border-2 flex items-center justify-center ${estado === 'Pendiente' ? 'border-[#D87705]' : ''} ${estado === 'En progreso' ? 'border-[#307dfd]' : ''} ${estado === 'Terminado' ? 'border-[#059569]' : ''}`}
                                    >
                                        {formData.estado === estado && (
                                            <span className={`w-[0.5rem] h-[0.5rem] bg-[#307dfd] rounded-full block ${estado === 'Pendiente' ? 'bg-[#D87705]' : ''} ${estado === 'En progreso' ? 'bg-[#307dfd]' : ''} ${estado === 'Terminado' ? 'bg-[#059569]' : ''}`}></span>
                                        )}
                                    </span>
                                </span>
                                <span className={`text-sm ml-[0.5rem] ${estado === 'Pendiente' ? 'text-[#D87705]' : ''} ${estado === 'En progreso' ? 'text-[#307dfd]' : ''} ${estado === 'Terminado' ? 'text-[#059569]' : ''}`}>{estado}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block font-[500] mb-[0.5rem]" htmlFor="miembros">
                        Miembros del Equipo Asignados <span className='text-[#FF5A71]'>*</span>
                    </label>
                    <div className="flex flex-wrap gap-[1rem]">
                        {formData.miembros.length === 0 && (
                            <span className="text-[#a6a6a6] text-sm">No hay miembros asignados.</span>
                        )}
                        {formData.miembros.map((miembro, idx) => {
                            const partes = miembro.trim().split(' ');
                            const iniciales = (partes[0]?.[0] || '') + (partes[1]?.[0] || '');
                            return (
                                <span
                                    key={miembro + idx}
                                    className="bg-[#C1D8FE] flex items-center border border-[#E2E8EF] rounded-full p-[0.2rem]"
                                >
                                    <span className="text-[#fff] flex items-center justify-center w-[2rem] h-[2rem] rounded-full bg-[#307dfd] text-white font-bold mr-2 text-xs">
                                        {iniciales.toUpperCase()}
                                    </span>
                                    <span className="ml-[0.5rem] mr-[0.5rem]">{miembro}</span>
                                    <button
                                        type="button"
                                        className="bg-[transparent] border-none focus:outline-none"
                                        aria-label={`Eliminar ${miembro}`}
                                        onClick={() => {
                                            setFormData({
                                                ...formData,
                                                miembros: formData.miembros.filter((_m, i) => i !== idx),
                                            });
                                        }}
                                    >
                                        <XIcon className='h-[1.3rem] w-[1.3rem]' />
                                    </button>
                                </span>
                            );
                        })}
                    </div>
                    <div className="relative inline-block mt-[1rem]" ref={selectRef}>
                        <div
                            className="flex items-center p-[0.5rem] text-[#307dfd] border border-[#307dfd] rounded-full cursor-pointer bg-white"
                            onClick={() => setOpen(!open)}
                        >
                            <PlusIcon className="h-[1.3rem] w-[1.3rem]" />
                            <span className="flex-1 text-gray-500">
                                Agregar miembro...
                            </span>
                        </div>
                        {open && (
                            <div className="absolute left-[1rem] top-[3rem] mt-1 bg-[#fff] border border-[#a6a6a6] rounded-[1rem] shadow-lg z-10 p-[1rem]">
                                {miembrosEquipo
                                    .filter(m => !formData.miembros.includes(m))
                                    .map(m => (
                                        <div
                                            key={m}
                                            className="p-[0.5rem] hover:bg-[#E2E8EF] cursor-pointer"
                                            onClick={() => {
                                                setFormData({
                                                    ...formData,
                                                    miembros: [...formData.miembros, m],
                                                });
                                                setOpen(false);
                                            }}
                                        >
                                            {m}
                                        </div>
                                    ))}
                                {miembrosEquipo.filter(m => !formData.miembros.includes(m)).length === 0 && (
                                    <div className="px-4 py-2 text-gray-400">Sin miembros disponibles</div>
                                )}
                            </div>
                        )}
                    </div>
                    {errors.miembros && <p className="text-[#FF5A71]">{errors.miembros}</p>}
                </div>

                <div className="flex gap-[1rem] justify-end space-x-4">
                    <button type="button"
                        onClick={() => navigate('/proyectos')} className="rounded-[0.3rem] bg-[#fff] border-[1px] border-[#E2E8EF] p-[0.5rem] inline-flex items-center justify-center hover:bg-[#E2E8EF] transition-colors duration-200">
                        <span className="font-semibold text-sm">Cancelar</span>
                    </button>
                    <button type="submit" className="rounded-[0.3rem] bg-[#307dfd] text-[#fff] border-none p-[0.5rem] inline-flex items-center justify-center hover:bg-[#4687f2] transition-colors duration-200">
                        <span className="font-semibold text-sm">Crear Proyecto</span>
                    </button>
                </div>
                {showSuccessModal && <ModalExito message="Proyecto creado exitosamente" onClose={closeSuccessModal} />}
                {showErrorModal && <ModalError message="Por favor, corrige los errores antes de continuar." onClose={closeErrorModal} />}
            </form>
        </div>
    );
};

export default CrearProyecto;

