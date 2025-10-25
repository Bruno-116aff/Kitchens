import React, { useState, useCallback } from 'react';
import ModernPlannerCanvas from '../components/planner/ModernPlannerCanvas/ModernPlannerCanvas';
import ModernModuleLibrary from '../components/planner/ModernModuleLibrary/ModernModuleLibrary';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { PlannerProject, KitchenModule } from '../types';
import './PlannerPage.css';

const PlannerPage: React.FC = () => {
	const [currentProject, setCurrentProject] = useState<PlannerProject>({
		id: `project-${Date.now()}`,
		name: 'My Dream Kitchen',
		modules: [],
		roomSize: { width: 400, height: 300 },
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	});
	const [selectedModule, setSelectedModule] = useState<string | null>(null);
	const [showLibrary, setShowLibrary] = useState(true);

	const handleProjectChange = useCallback((project: PlannerProject) => {
		setCurrentProject(project);
	}, []);

	const handleModuleAdd = useCallback(
		(moduleData: Omit<KitchenModule, 'id'>) => {
			const newModule: KitchenModule = {
				...moduleData,
				id: `module-${Date.now()}`,
			};

			const updatedProject: PlannerProject = {
				...currentProject,
				modules: [...currentProject.modules, newModule],
				updatedAt: new Date().toISOString(),
			};

			setCurrentProject(updatedProject);
			setSelectedModule(newModule.id);
		},
		[currentProject]
	);

	const handleSaveProject = useCallback(() => {
		// Save to localStorage
		localStorage.setItem('kitchen-project', JSON.stringify(currentProject));
		alert('Project saved successfully!');
	}, [currentProject]);

	const handleExportProject = useCallback(() => {
		const dataStr = JSON.stringify(currentProject, null, 2);
		const dataUri =
			'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
		const exportFileDefaultName = `${currentProject.name
			.replace(/\s+/g, '-')
			.toLowerCase()}.json`;

		const linkElement = document.createElement('a');
		linkElement.setAttribute('href', dataUri);
		linkElement.setAttribute('download', exportFileDefaultName);
		linkElement.click();
	}, [currentProject]);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className='planner-page'>
				<div className='planner-page__header'>
					<h1>🎨 Kitchen Designer</h1>
					<p>Create your perfect kitchen in minutes</p>
					<div className='planner-page__actions'>
						<button onClick={handleSaveProject} className='btn btn-primary'>
							💾 Save Project
						</button>
						<button onClick={handleExportProject} className='btn btn-secondary'>
							📤 Export
						</button>
						<button
							onClick={() => setShowLibrary(!showLibrary)}
							className='btn btn-outline'
						>
							{showLibrary ? '📚 Hide Library' : '📖 Show Library'}
						</button>
					</div>
				</div>

				<div className='planner-page__content'>
					{showLibrary && (
						<div className='planner-page__library'>
							<ModernModuleLibrary onModuleAdd={handleModuleAdd} />
						</div>
					)}

					<div className='planner-page__workspace'>
						<ModernPlannerCanvas
							project={currentProject}
							onProjectChange={handleProjectChange}
							onSave={handleSaveProject}
							onExport={handleExportProject}
						/>
					</div>
				</div>

				<div className='planner-page__info'>
					<div className='planner-page__stats'>
						<span>📦 {currentProject.modules.length} modules</span>
						<span>
							📐 {currentProject.roomSize.width}×
							{currentProject.roomSize.height} cm
						</span>
						{selectedModule && (
							<span>
								✅{' '}
								{
									currentProject.modules.find(m => m.id === selectedModule)
										?.name
								}
							</span>
						)}
					</div>
				</div>
			</div>
		</DndProvider>
	);
};

export default PlannerPage;
