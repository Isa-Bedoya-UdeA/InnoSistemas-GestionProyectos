import type { Project } from './Project';

export interface Team {
    id: number;
    nombre: string;
    proyectos: Project[];
    miembros: string[];
}