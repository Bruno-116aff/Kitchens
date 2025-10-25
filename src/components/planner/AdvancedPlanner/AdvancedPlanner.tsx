import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ModernPlannerCanvas from '../ModernPlannerCanvas/ModernPlannerCanvas';
import ModernModuleLibrary from '../ModernModuleLibrary/ModernModuleLibrary';
import Planner3D from '../Planner3D/Planner3D';
import PlannerToolbar from '../PlannerToolbar/PlannerToolbar';
import type { PlannerProject, KitchenModule } from '../../../types';
import './AdvancedPlanner.css';

interface AdvancedPlannerProps {
	project?: PlannerProject;
	onProjectChange?: (project: PlannerProject) => void;
	onSave?: (project: PlannerProject) => void;
	onExport?: (project: PlannerProject) => void;
}

const AdvancedPlanner: React.FC<AdvancedPlannerProps> = ({
	project,
	onProjectChange,
	onSave,
	onExport,
}) => {
	const [currentProject, setCurrentProject] = useState<
		PlannerProject | undefined
	>(project);
	const [history, setHistory] = useState<PlannerProject[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const [showLibrary, setShowLibrary] = useState(true);
	const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
	const [selectedModule, setSelectedModule] = useState<string | null>(null);

	// Initialize project
	React.useEffect(() => {
		if (project) {
			setCurrentProject(project);
		}
	}, [project]);

	// Handle project changes
	const handleProjectChange = useCallback(
		(updatedProject: PlannerProject) => {
			setCurrentProject(updatedProject);

			// Add to history
			const newHistory = history.slice(0, historyIndex + 1);
			newHistory.push(updatedProject);
			setHistory(newHistory);
			setHistoryIndex(newHistory.length - 1);

			// Notify parent
			if (onProjectChange) {
				onProjectChange(updatedProject);
			}
		},
		[history, historyIndex, onProjectChange]
	);

	// Handle save
	const handleSave = useCallback(
		(projectToSave: PlannerProject) => {
			setCurrentProject(projectToSave);
			if (onSave) {
				onSave(projectToSave);
			}
		},
		[onSave]
	);

	// Handle export
	const handleExport = useCallback(
		(projectToExport: PlannerProject) => {
			if (onExport) {
				onExport(projectToExport);
			}
		},
		[onExport]
	);

	// Handle new project
	const handleNewProject = useCallback(() => {
		const newProject: PlannerProject = {
			id: `project-${Date.now()}`,
			name: 'New Kitchen Project',
			modules: [],
			roomSize: { width: 400, height: 300 },
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		setCurrentProject(newProject);
		setHistory([newProject]);
		setHistoryIndex(0);
		setSelectedModule(null);
	}, []);

	// Handle open project
	const handleOpenProject = useCallback(() => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.json';
		input.onchange = e => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = e => {
					try {
						const projectData = JSON.parse(e.target?.result as string);
						setCurrentProject(projectData);
						setHistory([projectData]);
						setHistoryIndex(0);
						setSelectedModule(null);
					} catch (error) {
						console.error('Error loading project:', error);
						alert('Error loading project file');
					}
				};
				reader.readAsText(file);
			}
		};
		input.click();
	}, []);

	// Handle import project
	const handleImportProject = useCallback((file: File) => {
		const reader = new FileReader();
		reader.onload = e => {
			try {
				const projectData = JSON.parse(e.target?.result as string);
				setCurrentProject(projectData);
				setHistory([projectData]);
				setHistoryIndex(0);
				setSelectedModule(null);
			} catch (error) {
				console.error('Error importing project:', error);
				alert('Error importing project file');
			}
		};
		reader.readAsText(file);
	}, []);

	// Handle undo
	const handleUndo = useCallback(() => {
		if (historyIndex > 0) {
			const newIndex = historyIndex - 1;
			setHistoryIndex(newIndex);
			setCurrentProject(history[newIndex]);
			setSelectedModule(null);
		}
	}, [history, historyIndex]);

	// Handle redo
	const handleRedo = useCallback(() => {
		if (historyIndex < history.length - 1) {
			const newIndex = historyIndex + 1;
			setHistoryIndex(newIndex);
			setCurrentProject(history[newIndex]);
			setSelectedModule(null);
		}
	}, [history, historyIndex]);

	// Handle module add from library
	const handleModuleAdd = useCallback(
		(moduleData: Omit<KitchenModule, 'id'>) => {
			if (!currentProject) return;

			const newModule: KitchenModule = {
				...moduleData,
				id: `module-${Date.now()}`,
			};

			const updatedProject: PlannerProject = {
				...currentProject,
				modules: [...currentProject.modules, newModule],
				updatedAt: new Date().toISOString(),
			};

			handleProjectChange(updatedProject);
			setSelectedModule(newModule.id);
		},
		[currentProject, handleProjectChange]
	);

	// Handle view mode change
	const handleViewModeChange = useCallback((mode: '2d' | '3d') => {
		setViewMode(mode);
	}, []);

	// Handle module selection
	// const handleModuleSelect = useCallback((moduleId: string | null) => {
	// 	setSelectedModule(moduleId);
	// }, []);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className='advanced-planner'>
				{/* Toolbar */}
				<div className='advanced-planner__toolbar'>
					<PlannerToolbar
						project={currentProject}
						onNewProject={handleNewProject}
						onOpenProject={handleOpenProject}
						onSaveProject={handleSave}
						onExportProject={handleExport}
						onImportProject={handleImportProject}
						onUndo={handleUndo}
						onRedo={handleRedo}
						canUndo={historyIndex > 0}
						canRedo={historyIndex < history.length - 1}
					/>
				</div>

				{/* View Mode Toggle */}
				<div className='advanced-planner__view-toggle'>
					<div className='advanced-planner__view-buttons'>
						<button
							className={`advanced-planner__view-btn ${
								viewMode === '2d' ? 'active' : ''
							}`}
							onClick={() => handleViewModeChange('2d')}
							title='2D View'
						>
							📐 2D View
						</button>
						<button
							className={`advanced-planner__view-btn ${
								viewMode === '3d' ? 'active' : ''
							}`}
							onClick={() => handleViewModeChange('3d')}
							title='3D View'
						>
							🎮 3D View
						</button>
					</div>
				</div>

				{/* Main content */}
				<div className='advanced-planner__content'>
					{/* Module Library */}
					{showLibrary && (
						<div className='advanced-planner__library'>
							<ModernModuleLibrary onModuleAdd={handleModuleAdd} />
						</div>
					)}

					{/* Canvas/3D View */}
					<div className='advanced-planner__workspace'>
						{viewMode === '2d' ? (
							<ModernPlannerCanvas
								project={currentProject}
								onProjectChange={handleProjectChange}
								onSave={handleSave}
								onExport={handleExport}
							/>
						) : (
							<Planner3D
								project={currentProject}
								onProjectChange={handleProjectChange}
								onSave={handleSave}
								onExport={handleExport}
							/>
						)}
					</div>
				</div>

				{/* Toggle Library Button */}
				<button
					className='advanced-planner__toggle-library'
					onClick={() => setShowLibrary(!showLibrary)}
					title={showLibrary ? 'Hide Library' : 'Show Library'}
				>
					{showLibrary ? '📚' : '📖'}
				</button>

				{/* Project Info Panel */}
				{currentProject && (
					<div className='advanced-planner__info-panel'>
						<div className='advanced-planner__info-content'>
							<h4>{currentProject.name}</h4>
							<p>Modules: {currentProject.modules.length}</p>
							<p>
								Room: {currentProject.roomSize.width}×
								{currentProject.roomSize.height} cm
							</p>
							<p>
								Updated:{' '}
								{new Date(currentProject.updatedAt).toLocaleDateString()}
							</p>
							{selectedModule && (
								<p>
									Selected:{' '}
									{
										currentProject.modules.find(m => m.id === selectedModule)
											?.name
									}
								</p>
							)}
						</div>
					</div>
				)}
			</div>
		</DndProvider>
	);
};

export default AdvancedPlanner;
