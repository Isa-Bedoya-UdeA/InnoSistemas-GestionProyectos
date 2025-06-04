import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ModalExito from '../components/ModalExito';
import ModalError from '../components/ModalError';
import type { Project } from '../types/Project';
import { TeamContext } from '../context/TeamContext';

function convertirFormatoFecha(fecha: string) {
    return fecha.replace(/\//g, "-");
}

const EditarProyecto: React.FC = () => {
    const { selectedTeam } = useContext(TeamContext)!;
    const { proyectos } = selectedTeam || { proyectos: [] };
    const params = useParams();
    const id = params.id;

    React.useEffect(() => {
        const found = proyectos.find(p => p.id === Number(id)) || null;
        setProject(found);
    }, [proyectos, id]);

    const [project, setProject] = useState<Project | null>(
        proyectos.find(p => p.id === Number(id)) || null
    );
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Omit<Project, 'id'>>({
        nombre: project ? project?.nombre : '',
        estado: project ? project?.estado : 'En progreso',
        fechaInicio: project ? project?.fechaInicio : '',
        fechaFin: project ? project?.fechaFin : '',
        progreso: project ? project?.progreso : 0,
        miembros: project ? project?.miembros : [],
        equipo: project ? project?.equipo : 1,
        descripcion: project ? project?.descripcion : '',
    });

    React.useEffect(() => {
        if (project) {
            setFormData({
                nombre: project.nombre || '',
                estado: project.estado || 'En progreso',
                fechaInicio: project.fechaInicio || '',
                fechaFin: project.fechaFin || '',
                progreso: project.progreso || 0,
                miembros: project.miembros || [],
                equipo: project.equipo || 1,
                descripcion: project.descripcion || '',
            });
        }
    }, [project]);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleMiembroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setFormData({
            ...formData,
            miembros: selectedOptions,
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Aquí iría la lógica de actualizar el proyecto
            console.log('Proyecto actualizado:', formData);
            setShowSuccessModal(true);
        } else {
            setShowErrorModal(true);
        }
    };

    const closeModal = () => {
        setShowSuccessModal(false);
        setShowErrorModal(false);
        navigate('/proyectos');
    };

    if (!project) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <p className='m-[0px]'><a href='/proyectos' className='no-underline text-[#a6a6a6]'>Proyectos / </a><span className='text-[#307dfd]'>Editar Proyecto</span></p>

            <h1 className="mb-[0px] mt-[0.3rem] font-bold">Editar Proyecto {project?.nombre}</h1>
            <p className='text-[#a6a6a6] mb-[0px] mt-[0.3rem]'>Actualiza los datos de tu proyecto a continuación</p>

            <form onSubmit={handleSubmit} className='mt-[1rem] bg-[#fff] p-[2rem] rounded-[1rem] flex flex-col gap-[1rem]'>
                <div className="mb-4">
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
                    {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                </div>

                <div className="mb-4">
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
                        {errors.fechaInicio && <p className="text-red-500 text-sm mt-1">{errors.fechaInicio}</p>}
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
                        {errors.fechaFin && <p className="text-red-500 text-sm mt-1">{errors.fechaFin}</p>}
                    </div>
                </div>
                
                <div className="mb-4">
                    <label className="block font-[500] mb-[0.5rem]" htmlFor="estado">
                        Estado <span className='text-[#FF5A71]'>*</span>
                    </label>
                    <div className="flex gap-4">
                        {(["Pendiente", "En progreso", "Terminado"] as Array<"Pendiente" | "En progreso" | "Terminado">).map((estado) => (
                            <button
                                type="button"
                                key={estado}
                                className={`flex items-center gap-[1rem] px-3 py-2 rounded-[0.5rem] border ${formData.estado === estado ? 'border-[#307dfd] bg-[#eaf1ff]' : 'border-[#E2E8EF] bg-white'} transition-colors`}
                                onClick={() => setFormData({ ...formData, estado })}
                            >
                                <span className="inline-flex items-center justify-center">
                                    <span
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.estado === estado ? 'border-[#307dfd]' : 'border-[#a6a6a6]'}`}
                                    >
                                        {formData.estado === estado && (
                                            <span className="w-2 h-2 bg-[#307dfd] rounded-full block"></span>
                                        )}
                                    </span>
                                </span>
                                <span className="text-sm">{estado}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block font-[500] mb-[0.5rem]" htmlFor="miembros">
                        Miembros del Equipo Asignados <span className='text-[#FF5A71]'>*</span>
                    </label>
                    <select
                        id="miembros"
                        name="miembros"
                        multiple
                        value={formData.miembros}
                        onChange={handleMiembroChange}
                        className="w-full p-[0.5rem] border rounded-[0.5rem]"
                    >
                        <option value="JD John Doe">JD John Doe</option>
                        <option value="AS Anna Smith">AS Anna Smith</option>
                        <option value="MC Maria Cervantes">MC Maria Cervantes</option>
                    </select>
                </div>

                <div className="flex gap-[1rem] justify-end space-x-4">
                    <button type="button"
                        onClick={() => navigate('/proyectos')} className="rounded-[0.3rem] bg-[#fff] border-[1px] border-[#E2E8EF] p-[0.5rem] inline-flex items-center justify-center hover:bg-[#E2E8EF] transition-colors duration-200">
                        <span className="font-semibold text-sm">Cancelar</span>
                    </button>
                    <button type="submit" className="rounded-[0.3rem] bg-[#307dfd] text-[#fff] border-none p-[0.5rem] inline-flex items-center justify-center hover:bg-[#4687f2] transition-colors duration-200">
                        <span className="font-semibold text-sm">Actualizar</span>
                    </button>
                </div>
            </form>
            {showSuccessModal && <ModalExito title="Proyecto actualizado exitosamente" message="El proyecto ha sido actualizado correctamente." onClose={closeModal} />}
            {showErrorModal && <ModalError title="Error al actualizar el proyecto" message="Por favor, corrige los errores antes de continuar." onClose={closeModal} />}
        </div>
    );
};

export default EditarProyecto;