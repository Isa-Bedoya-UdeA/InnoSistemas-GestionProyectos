export interface Project {
    id: number;
    nombre: string;
    descripcion: string;
    estado: 'En progreso' | 'Pendiente' | 'Terminado';
    fechaInicio: string;
    fechaFin: string;
    progreso: number;
    miembros: string[];
    equipo: number;
}