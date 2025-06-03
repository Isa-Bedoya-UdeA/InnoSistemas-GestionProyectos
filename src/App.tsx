import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./styles.css"
import { TeamProvider } from './context/TeamContext';
import MenuLateral from './components/MenuLateral';
import VerProyectos from './pages/VerProyectos';
import CrearProyecto from './pages/CrearProyecto';
import EditarProyecto from './pages/EditarProyecto';
import type { Team } from './types/Team';
import type { Project } from './types/Project';

const project1: Project = {
    id: 1,
    nombre: "Website Redesign",
    estado: "En progreso",
    fechaInicio: "Ene 15, 2025",
    fechaFin: "Mar 30, 2025",
    progreso: 65,
    miembros: ["JD John Doe", "AS Anna Smith"],
    equipo: 1,
    descripcion: 'Diseño y desarrollo de un nuevo sitio web corporativo.'
};

const project2: Project = {
    id: 2,
    nombre: "Mobile App Development",
    estado: "Terminado",
    fechaInicio: "Nov 10, 2024",
    fechaFin: "Feb 20, 2025",
    progreso: 100,
    miembros: ["JD John Doe", "AS Anna Smith", "LM Laura Morales"],
    equipo: 1,
    descripcion: 'Desarrollo de una aplicación móvil para iOS y Android.'
};

const project3: Project = {
    id: 3,
    nombre: "API Integration Project",
    estado: "Pendiente",
    fechaInicio: "Mar 5, 2026",
    fechaFin: "Abr 15, 2026",
    progreso: 5,
    miembros: ["MM Maria Martinez"],
    equipo: 2, // Este proyecto pertenece a "equipo-b"
    descripcion: 'Integración de nuevas APIs para funcionalidades de terceros.'
};

const project4: Project = {
    id: 4,
    nombre: "Database Optimization",
    estado: "En progreso",
    fechaInicio: "Abr 1, 2025",
    fechaFin: "Jun 30, 2025",
    progreso: 40,
    miembros: ["RT Roberto Torres"],
    equipo: 2,
    descripcion: 'Optimización de las consultas y estructuras de la base de datos principal.'
};

const project5: Project = {
    id: 5,
    nombre: "Cloud Migration",
    estado: "Pendiente",
    fechaInicio: "Jul 1, 2025",
    fechaFin: "Dic 31, 2025",
    progreso: 10,
    miembros: ["VM Victor Morales"],
    equipo: 3,
    descripcion: 'Migración de la infraestructura actual a la nube AWS.'
};

const teams: Team[] = [
    {
        id: 1,
        nombre: 'Soluciones Digitales',
        proyectos: [project1, project2],
        miembros: ['JD John Doe', 'AS Anna Smith', 'LM Laura Morales'],
    },
    {
        id: 2,
        nombre: 'Tech Lead',
        proyectos: [project3, project4],
        miembros: ['JD John Doe', 'AS Anna Smith', 'MM Maria Martinez', 'RT Roberto Torres'],
    },
    {
        id: 3,
        nombre: 'Boomerang',
        proyectos: [project5],
        miembros: ['JD John Doe', 'AS Anna Smith', 'VM Victor Morales'],
    },
];

const App: React.FC = () => {
	return (
		<TeamProvider teams={teams}>
			<Router>
				<div className="flex w-full h-screen max-w-full max-h-max [font-family:'Inter',Helvetica] relative box-border">
					<MenuLateral teams={teams} />
					<main className="bg-[#f8f9fa] flex-1 ml-[17rem] h-full w-full p-[5rem]">
                        <Routes>
                            <Route path="/proyectos" element={<VerProyectos />} />
                            <Route path="/proyectos/crear" element={<CrearProyecto />} />
                            <Route path="/proyectos/editar/:id" element={<EditarProyecto />} />
                            <Route path="/" element={<Navigate to="/proyectos" replace />} />
                        </Routes>
					</main>
				</div>
				
			</Router>
		</TeamProvider>
	);
};

export default App;