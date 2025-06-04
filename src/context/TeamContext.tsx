import React, { createContext, useState, useEffect } from 'react';
import type { Team } from '../types/Team';
import type { Project } from '../types/Project';

interface TeamContextType {
    selectedTeamId: number;
    setSelectedTeamId: (id: number) => void;
    selectedTeam: Team | null;
    setSelectedTeam: React.Dispatch<React.SetStateAction<Team | null>>;
    teams: Team[];
    setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
}

const project1: Project = {
    id: 1,
    nombre: "Website Redesign",
    estado: "En progreso",
    fechaInicio: "2025/01/15",
    fechaFin: "2025/03/30",
    progreso: 65,
    miembros: ["John Doe", "Anna Smith"],
    equipo: 1,
    descripcion: 'Diseño y desarrollo de un nuevo sitio web corporativo.'
};

const project2: Project = {
    id: 2,
    nombre: "Mobile App Development",
    estado: "Terminado",
    fechaInicio: "2024/11/10",
    fechaFin: "2025/02/20",
    progreso: 100,
    miembros: ["John Doe", "Anna Smith", "Laura Morales"],
    equipo: 1,
    descripcion: 'Desarrollo de una aplicación móvil para iOS y Android.'
};

const project3: Project = {
    id: 3,
    nombre: "API Integration Project",
    estado: "Pendiente",
    fechaInicio: "2026/03/05",
    fechaFin: "2026/04/15",
    progreso: 5,
    miembros: ["Maria Martinez"],
    equipo: 2, // Este proyecto pertenece a "equipo-b"
    descripcion: 'Integración de nuevas APIs para funcionalidades de terceros.'
};

const project4: Project = {
    id: 4,
    nombre: "Database Optimization",
    estado: "En progreso",
    fechaInicio: "2025/05/01",
    fechaFin: "2025/06/30",
    progreso: 40,
    miembros: ["Roberto Torres"],
    equipo: 2,
    descripcion: 'Optimización de las consultas y estructuras de la base de datos principal.'
};

const project5: Project = {
    id: 5,
    nombre: "Cloud Migration",
    estado: "Pendiente",
    fechaInicio: "2025/01/07",
    fechaFin: "2025/08/31",
    progreso: 10,
    miembros: ["Victor Morales"],
    equipo: 3,
    descripcion: 'Migración de la infraestructura actual a la nube AWS.'
};

const extraProjects: Project[] = [
    {
        id: 6,
        nombre: "E-commerce Platform",
        estado: "En progreso",
        fechaInicio: "2025/02/01",
        fechaFin: "2025/06/30",
        progreso: 30,
        miembros: ["John Doe", "Anna Smith"],
        equipo: 1,
        descripcion: "Desarrollo de una plataforma de comercio electrónico."
    },
    {
        id: 7,
        nombre: "SEO Optimization",
        estado: "Pendiente",
        fechaInicio: "2025/03/10",
        fechaFin: "2025/04/15",
        progreso: 0,
        miembros: ["Laura Morales"],
        equipo: 1,
        descripcion: "Optimización SEO para el sitio web corporativo."
    },
    {
        id: 8,
        nombre: "Landing Page Spring",
        estado: "Terminado",
        fechaInicio: "2024/12/01",
        fechaFin: "2025/01/10",
        progreso: 100,
        miembros: ["Anna Smith"],
        equipo: 1,
        descripcion: "Diseño de landing page para campaña de primavera."
    },
    {
        id: 9,
        nombre: "Newsletter Automation",
        estado: "En progreso",
        fechaInicio: "2025/02/20",
        fechaFin: "2025/03/20",
        progreso: 60,
        miembros: ["John Doe"],
        equipo: 1,
        descripcion: "Automatización del envío de newsletters mensuales."
    },
    {
        id: 10,
        nombre: "Chatbot Integration",
        estado: "Pendiente",
        fechaInicio: "2025/04/01",
        fechaFin: "2025/05/15",
        progreso: 0,
        miembros: ["Laura Morales", "Anna Smith"],
        equipo: 1,
        descripcion: "Integración de chatbot para atención al cliente."
    },
    {
        id: 11,
        nombre: "User Feedback System",
        estado: "En progreso",
        fechaInicio: "2025/03/05",
        fechaFin: "2025/04/25",
        progreso: 45,
        miembros: ["John Doe"],
        equipo: 1,
        descripcion: "Sistema para recolectar feedback de usuarios."
    },
    {
        id: 12,
        nombre: "Performance Audit",
        estado: "Pendiente",
        fechaInicio: "2025/05/01",
        fechaFin: "2025/05/30",
        progreso: 0,
        miembros: ["Anna Smith"],
        equipo: 1,
        descripcion: "Auditoría de rendimiento de la web."
    },
    {
        id: 13,
        nombre: "Security Update",
        estado: "En progreso",
        fechaInicio: "2025/04/10",
        fechaFin: "2025/05/10",
        progreso: 20,
        miembros: ["John Doe", "Laura Morales"],
        equipo: 1,
        descripcion: "Actualización de seguridad en servidores."
    },
    {
        id: 14,
        nombre: "UX Redesign",
        estado: "Pendiente",
        fechaInicio: "2025/06/01",
        fechaFin: "2025/07/15",
        progreso: 0,
        miembros: ["Anna Smith"],
        equipo: 1,
        descripcion: "Rediseño de experiencia de usuario."
    },
    {
        id: 15,
        nombre: "Mobile Responsiveness",
        estado: "Terminado",
        fechaInicio: "2024/10/01",
        fechaFin: "2024/11/15",
        progreso: 100,
        miembros: ["John Doe"],
        equipo: 1,
        descripcion: "Adaptación móvil del sitio web."
    },
    {
        id: 16,
        nombre: "Analytics Dashboard",
        estado: "En progreso",
        fechaInicio: "2025/03/15",
        fechaFin: "2025/06/01",
        progreso: 50,
        miembros: ["Laura Morales"],
        equipo: 1,
        descripcion: "Panel de analíticas para clientes."
    },
    {
        id: 17,
        nombre: "API Documentation",
        estado: "Pendiente",
        fechaInicio: "2025/05/20",
        fechaFin: "2025/06/10",
        progreso: 0,
        miembros: ["Anna Smith"],
        equipo: 1,
        descripcion: "Documentación de APIs internas."
    },
    {
        id: 18,
        nombre: "Onboarding Flow",
        estado: "En progreso",
        fechaInicio: "2025/04/05",
        fechaFin: "2025/05/05",
        progreso: 70,
        miembros: ["John Doe", "Laura Morales"],
        equipo: 1,
        descripcion: "Flujo de onboarding para nuevos usuarios."
    },
    {
        id: 19,
        nombre: "Push Notifications",
        estado: "Pendiente",
        fechaInicio: "2025/06/10",
        fechaFin: "2025/07/10",
        progreso: 0,
        miembros: ["Anna Smith"],
        equipo: 1,
        descripcion: "Implementación de notificaciones push."
    },
    {
        id: 20,
        nombre: "Content Migration",
        estado: "En progreso",
        fechaInicio: "2025/03/25",
        fechaFin: "2025/04/30",
        progreso: 35,
        miembros: ["John Doe"],
        equipo: 1,
        descripcion: "Migración de contenido antiguo."
    },
    {
        id: 21,
        nombre: "Social Media Integration",
        estado: "Pendiente",
        fechaInicio: "2025/05/15",
        fechaFin: "2025/06/20",
        progreso: 0,
        miembros: ["Laura Morales"],
        equipo: 1,
        descripcion: "Integración con redes sociales."
    },
    {
        id: 22,
        nombre: "A/B Testing",
        estado: "En progreso",
        fechaInicio: "2025/04/15",
        fechaFin: "2025/05/30",
        progreso: 55,
        miembros: ["Anna Smith"],
        equipo: 1,
        descripcion: "Implementación de pruebas A/B."
    },
    {
        id: 23,
        nombre: "Accessibility Improvements",
        estado: "Pendiente",
        fechaInicio: "2025/06/05",
        fechaFin: "2025/07/05",
        progreso: 0,
        miembros: ["John Doe"],
        equipo: 1,
        descripcion: "Mejoras de accesibilidad web."
    },
    {
        id: 24,
        nombre: "Client Portal",
        estado: "En progreso",
        fechaInicio: "2025/03/10",
        fechaFin: "2025/06/10",
        progreso: 40,
        miembros: ["Laura Morales", "Anna Smith"],
        equipo: 1,
        descripcion: "Portal de clientes para gestión de servicios."
    },
    {
        id: 25,
        nombre: "Brand Refresh",
        estado: "Pendiente",
        fechaInicio: "2025/07/01",
        fechaFin: "2025/08/15",
        progreso: 0,
        miembros: ["John Doe"],
        equipo: 1,
        descripcion: "Actualización de imagen de marca."
    }
];

const initialTeams: Team[] = [
    {
        id: 1,
        nombre: 'Soluciones Digitales',
        proyectos: [project1, project2, ...extraProjects],
        miembros: ['John Doe', 'Anna Smith', 'Laura Morales'],
    },
    {
        id: 2,
        nombre: 'Tech Lead',
        proyectos: [project3, project4],
        miembros: ['John Doe', 'Anna Smith', 'Maria Martinez', 'Roberto Torres'],
    },
    {
        id: 3,
        nombre: 'Boomerang',
        proyectos: [project5],
        miembros: ['John Doe', 'Anna Smith', 'Victor Morales'],
    },
];

const TeamContext = createContext<TeamContextType | undefined>(undefined);

interface TeamProviderProps {
    children: React.ReactNode;
}

const LOCAL_STORAGE_KEY = 'teamsData';

const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
    const [selectedTeamId, setSelectedTeamId] = useState<number>(() => {
        const savedTeam = parseInt(localStorage.getItem('selectedTeam') || '');
        return savedTeam ? savedTeam : 1;
    });

    // Cargar equipos desde localStorage o usar los iniciales
    const [teams, setTeams] = useState<Team[]>(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored) as Team[];
            } catch {
                return initialTeams;
            }
        }
        return initialTeams;
    });

    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

    // Guardar equipos en localStorage cuando cambian
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(teams));
    }, [teams]);

    useEffect(() => {
        localStorage.setItem('selectedTeam', selectedTeamId.toString());
        const savedTeam = teams.find((team) => team.id === selectedTeamId) || null;
        setSelectedTeam(savedTeam);
    }, [selectedTeamId, teams]);

    return (
        <TeamContext.Provider value={{ selectedTeamId, setSelectedTeamId, selectedTeam, setSelectedTeam, teams, setTeams }}>
            {children}
        </TeamContext.Provider>
    );
};

export { TeamContext, TeamProvider };