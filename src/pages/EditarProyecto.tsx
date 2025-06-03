import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ModalExito from '../components/ModalExito';
import ModalError from '../components/ModalError';
import type { Project } from '../types/Project';
import { TeamContext } from '../context/TeamContext';

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
            const start = new Date(formData.fechaInicio);
            const end = new Date(formData.fechaFin);
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
                    <label className="block text-gray-700 mb-[0.5rem]" htmlFor="nombre">
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
                    <label className="block text-gray-700 mb-[0.5rem]" htmlFor="descripcion">
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
                        <label className="block text-gray-700 mb-[0.5rem]" htmlFor="fechaInicio">
                            Fecha de Inicio <span className='text-[#FF5A71]'>*</span>
                        </label>
                        <input
                            type="date"
                            id="fechaInicio"
                            name="fechaInicio"
                            value={formData.fechaInicio}
                            onChange={handleChange}
                            className={`w-full p-[0.5rem] border rounded-[0.5rem] ${errors.fechaInicio ? 'border-red-500' : ''}`}
                        />
                        {errors.fechaInicio && <p className="text-red-500 text-sm mt-1">{errors.fechaInicio}</p>}
                    </div>

                    <div className='w-[50%]'>
                        <label className="block text-gray-700 mb-[0.5rem]" htmlFor="fechaFin">
                            Fecha de Fin <span className='text-[#FF5A71]'>*</span>
                        </label>
                        <input
                            type="date"
                            id="fechaFin"
                            name="fechaFin"
                            value={formData.fechaFin}
                            onChange={handleChange}
                            className={`w-full p-[0.5rem] border rounded-[0.5rem] ${errors.fechaFin ? 'border-red-500' : ''}`}
                        />
                        {errors.fechaFin && <p className="text-red-500 text-sm mt-1">{errors.fechaFin}</p>}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-[0.5rem]" htmlFor="estado">
                        Estado <span className='text-[#FF5A71]'>*</span>
                    </label>
                    <select
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        className="w-full p-[0.5rem] border rounded-[0.5rem]"
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En progreso">En progreso</option>
                        <option value="Terminado">Terminado</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-[0.5rem]" htmlFor="miembros">
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

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/proyectos')}
                        className="px-4 p-[0.5rem] bg-gray-300 rounded-[0.5rem]"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 p-[0.5rem] bg-blue-500 text-white rounded-[0.5rem] hover:bg-blue-600"
                    >
                        Actualizar Proyecto
                    </button>
                </div>
            </form>
            {showSuccessModal && <ModalExito title="Proyecto actualizado exitosamente" message="El proyecto ha sido actualizado correctamente." onClose={closeModal} />}
            {showErrorModal && <ModalError title="Error al actualizar el proyecto" message="Por favor, corrige los errores antes de continuar." onClose={closeModal} />}
        </div>
    );
};

export default EditarProyecto;