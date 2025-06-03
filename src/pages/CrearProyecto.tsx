import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalExito from '../components/ModalExito';
import ModalError from '../components/ModalError';

interface FormData {
    nombre: string;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    estado: 'En progreso' | 'Pendiente' | 'Terminado';
    miembros: string[];
}

const CrearProyecto: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
        estado: 'En progreso',
        miembros: [],
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const navigate = useNavigate();

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
            // Aquí iría la lógica de guardar el proyecto
            console.log('Proyecto creado:', formData);
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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Crear Proyecto</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="nombre">
                        Nombre del Proyecto *
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.nombre ? 'border-red-500' : ''}`}
                    />
                    {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="descripcion">
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="fechaInicio">
                        Fecha de Inicio *
                    </label>
                    <input
                        type="date"
                        id="fechaInicio"
                        name="fechaInicio"
                        value={formData.fechaInicio}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.fechaInicio ? 'border-red-500' : ''}`}
                    />
                    {errors.fechaInicio && <p className="text-red-500 text-sm mt-1">{errors.fechaInicio}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="fechaFin">
                        Fecha de Fin *
                    </label>
                    <input
                        type="date"
                        id="fechaFin"
                        name="fechaFin"
                        value={formData.fechaFin}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.fechaFin ? 'border-red-500' : ''}`}
                    />
                    {errors.fechaFin && <p className="text-red-500 text-sm mt-1">{errors.fechaFin}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="estado">
                        Estado
                    </label>
                    <select
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="En progreso">En progreso</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Terminado">Terminado</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="miembros">
                        Miembros del Equipo Asignados
                    </label>
                    <select
                        id="miembros"
                        name="miembros"
                        multiple
                        value={formData.miembros}
                        onChange={handleMiembroChange}
                        className="w-full p-2 border rounded"
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
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Crear Proyecto
                    </button>
                </div>
            </form>
            {showSuccessModal && <ModalExito title="Proyecto creado exitosamente" message="El proyecto ha sido creado correctamente." onClose={closeModal} />}
            {showErrorModal && <ModalError title="Error al crear el proyecto" message="Por favor, corrige los errores antes de continuar." onClose={closeModal} />}
        </div>
    );
};

export default CrearProyecto;