import React, { createContext, useState, useEffect } from 'react';
import type { Team } from '../types/Team';

interface TeamContextType {
    selectedTeamId: number;
    setSelectedTeamId: (id: number) => void;
    selectedTeam: Team | null;
    setSelectedTeam: React.Dispatch<React.SetStateAction<Team | null>>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

interface TeamProviderProps {
    children: React.ReactNode;
    teams: Team[];
}

const TeamProvider: React.FC<TeamProviderProps> = ({ children, teams }) => {
    const [selectedTeamId, setSelectedTeamId] = useState<number>(() => {
        const savedTeam = parseInt(localStorage.getItem('selectedTeam') || '');
        return savedTeam ? savedTeam : 1;
    });

    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    
    useEffect(() => {
        localStorage.setItem('selectedTeam', selectedTeamId.toString());

        const savedTeam = teams.find((team) => team.id === selectedTeamId) || null;
        setSelectedTeam(savedTeam);
    }, [selectedTeamId, teams]);

    return (
        <TeamContext.Provider value={{ selectedTeamId, setSelectedTeamId, selectedTeam, setSelectedTeam }}>
            {children}
        </TeamContext.Provider>
    );
};

export { TeamContext, TeamProvider };