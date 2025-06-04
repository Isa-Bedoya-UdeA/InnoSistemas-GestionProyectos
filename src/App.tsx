import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./styles.css"
import { TeamProvider } from './context/TeamContext';
import MenuLateral from './components/MenuLateral';
import VerProyectos from './pages/VerProyectos';
import CrearProyecto from './pages/CrearProyecto';
import EditarProyecto from './pages/EditarProyecto';


const App: React.FC = () => {
	return (
		<TeamProvider>
			<Router>
				<div className="flex w-full h-screen max-w-full max-h-max [font-family:'Inter',Helvetica] relative box-border">
					<MenuLateral/>
					<main className="bg-[#f8f9fa] flex-1 ml-[17rem] h-full w-full p-[5rem] overflow-y-scroll">
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