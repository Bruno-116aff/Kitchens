import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { KitchenModule, PlannerProject } from '../../../types';
import './ModernPlannerCanvas.css';

interface ModernPlannerCanvasProps {
	project?: PlannerProject;
	onProjectChange?: (project: PlannerProject) => void;
	onSave?: (project: PlannerProject) => void;
	onExport?: (project: PlannerProject) => void;
}

interface DraggedModule {
	type: 'module';
	moduleType: KitchenModule['type'];
	moduleData?: Partial<KitchenModule>;
}

const ModernPlannerCanvas: React.FC<ModernPlannerCanvasProps> = ({
	project,
	// onProjectChange,
	onSave,
	onExport,
}) => {
	const [modules, setModules] = useState<KitchenModule[]>([]);
	const [selectedModule, setSelectedModule] = useState<string | null>(null);
	const [roomSize, setRoomSize] = useState({ width: 400, height: 300 });
	const [gridSize] = useState(20);
	const [showGrid, setShowGrid] = useState(true);
	const [zoom, setZoom] = useState(1);
	const canvasRef = useRef<HTMLDivElement>(null);

	// Initialize project data
	React.useEffect(() => {
		if (project) {
			setModules(project.modules || []);
			setRoomSize(project.roomSize || { width: 400, height: 300 });
		}
	}, [project]);

	// Handle drop from module library
	// const handleDrop = useCallback(
	// 	(item: DraggedModule, monitor: any) => {
	// 		if (!monitor.didDrop()) return;

	// 		const dropResult = monitor.getDropResult();
	// 		if (!dropResult) return;

	// 		const { x, y } = dropResult;

	// 		// Snap to grid
	// 		const snappedX = Math.round(x / gridSize) * gridSize;
	// 		const snappedY = Math.round(y / gridSize) * gridSize;

	// 		const newModule: KitchenModule = {
	// 			id: `module-${Date.now()}`,
	// 			type: item.moduleType,
	// 			name:
	// 				item.moduleType.charAt(0).toUpperCase() + item.moduleType.slice(1),
	// 			x: snappedX,
	// 			y: snappedY,
	// 			width: item.moduleData?.width || 80,
	// 			height: item.moduleData?.height || 60,
	// 			rotation: 0,
	// 		};

	// 		setModules(prev => [...prev, newModule]);
	// 		setSelectedModule(newModule.id);

	// 		// Notify parent
	// 		if (onProjectChange) {
	// 			const updatedProject: PlannerProject = {
	// 				id: project?.id || 'new-project',
	// 				name: project?.name || 'Untitled Project',
	// 				modules: [...modules, newModule],
	// 				roomSize,
	// 				createdAt: project?.createdAt || new Date().toISOString(),
	// 				updatedAt: new Date().toISOString(),
	// 			};
	// 			onProjectChange(updatedProject);
	// 		}
	// 	},
	// 	[modules, roomSize, gridSize, project, onProjectChange]
	// );

	// Drop target component
	const DropTarget: React.FC<{ children: React.ReactNode }> = ({
		children,
	}) => {
		const [{ isOver }, drop] = useDrop({
			accept: 'module',
			drop: (_item: DraggedModule, monitor) => {
				const clientOffset = monitor.getClientOffset();
				if (!clientOffset || !canvasRef.current) return;

				const rect = canvasRef.current.getBoundingClientRect();
				const x = (clientOffset.x - rect.left) / zoom;
				const y = (clientOffset.y - rect.top) / zoom;

				return { x, y };
			},
			collect: monitor => ({
				isOver: monitor.isOver(),
			}),
		});

		return (
			<div
				ref={drop as any}
				className={`modern-planner-canvas ${
					isOver ? 'modern-planner-canvas--drag-over' : ''
				}`}
			>
				{children}
			</div>
		);
	};

	// Module component with drag functionality
	const ModuleComponent: React.FC<{ module: KitchenModule }> = ({ module }) => {
		const [{ isDragging }, drag] = useDrag({
			type: 'existing-module',
			item: () => ({ type: 'existing-module', moduleId: module.id }),
			collect: monitor => ({
				isDragging: monitor.isDragging(),
			}),
		});

		const isSelected = selectedModule === module.id;

		return (
			<div
				ref={drag as any}
				className={`modern-planner-module ${
					isSelected ? 'modern-planner-module--selected' : ''
				} ${isDragging ? 'modern-planner-module--dragging' : ''}`}
				style={{
					left: module.x,
					top: module.y,
					width: module.width,
					height: module.height,
					transform: `rotate(${module.rotation}deg)`,
				}}
				onClick={e => {
					e.stopPropagation();
					setSelectedModule(module.id);
				}}
			>
				<div className='modern-planner-module__content'>
					<div className='modern-planner-module__icon'>
						{getModuleIcon(module.type)}
					</div>
					<div className='modern-planner-module__name'>{module.name}</div>
					<div className='modern-planner-module__dimensions'>
						{module.width}×{module.height}
					</div>
				</div>

				{isSelected && (
					<div className='modern-planner-module__controls'>
						<button
							className='modern-planner-module__control-btn'
							onClick={e => {
								e.stopPropagation();
								handleRotateModule(module.id);
							}}
							title='Rotate'
						>
							🔄
						</button>
						<button
							className='modern-planner-module__control-btn modern-planner-module__control-btn--danger'
							onClick={e => {
								e.stopPropagation();
								handleDeleteModule(module.id);
							}}
							title='Delete'
						>
							🗑️
						</button>
					</div>
				)}
			</div>
		);
	};

	// Helper functions
	const getModuleIcon = (type: KitchenModule['type']): string => {
		const icons = {
			cabinet: '📦',
			counter: '🪑',
			appliance: '🔥',
			sink: '🚰',
			island: '🏝️',
		};
		return icons[type] || '📦';
	};

	const handleRotateModule = (moduleId: string) => {
		setModules(prev =>
			prev.map(module =>
				module.id === moduleId
					? { ...module, rotation: (module.rotation + 90) % 360 }
					: module
			)
		);
	};

	const handleDeleteModule = (moduleId: string) => {
		setModules(prev => prev.filter(module => module.id !== moduleId));
		setSelectedModule(null);
	};

	const handleCanvasClick = () => {
		setSelectedModule(null);
	};

	const handleZoomIn = () => {
		setZoom(prev => Math.min(prev * 1.2, 3));
	};

	const handleZoomOut = () => {
		setZoom(prev => Math.max(prev / 1.2, 0.3));
	};

	const handleResetZoom = () => {
		setZoom(1);
	};

	const handleSave = () => {
		if (onSave) {
			const currentProject: PlannerProject = {
				id: project?.id || 'new-project',
				name: project?.name || 'Untitled Project',
				modules,
				roomSize,
				createdAt: project?.createdAt || new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			onSave(currentProject);
		}
	};

	const handleExport = () => {
		if (onExport) {
			const currentProject: PlannerProject = {
				id: project?.id || 'new-project',
				name: project?.name || 'Untitled Project',
				modules,
				roomSize,
				createdAt: project?.createdAt || new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			onExport(currentProject);
		}
	};

	return (
		<div className='modern-planner-canvas-container'>
			{/* Toolbar */}
			<div className='modern-planner-toolbar'>
				<div className='modern-planner-toolbar__section'>
					<h3>View</h3>
					<div className='modern-planner-toolbar__buttons'>
						<button onClick={handleZoomIn} title='Zoom In'>
							🔍+ Zoom In
						</button>
						<button onClick={handleZoomOut} title='Zoom Out'>
							🔍- Zoom Out
						</button>
						<button onClick={handleResetZoom} title='Reset Zoom'>
							📐 Reset
						</button>
						<button
							onClick={() => setShowGrid(!showGrid)}
							className={showGrid ? 'active' : ''}
							title='Toggle Grid'
						>
							⊞ Grid
						</button>
					</div>
				</div>

				<div className='modern-planner-toolbar__section'>
					<h3>Actions</h3>
					<div className='modern-planner-toolbar__buttons'>
						<button onClick={handleSave} title='Save Project'>
							💾 Save
						</button>
						<button onClick={handleExport} title='Export Project'>
							📤 Export
						</button>
					</div>
				</div>

				<div className='modern-planner-toolbar__section'>
					<h3>Info</h3>
					<div className='modern-planner-toolbar__info'>
						<p>Modules: {modules.length}</p>
						<p>Zoom: {Math.round(zoom * 100)}%</p>
						{selectedModule && (
							<p>
								Selected: {modules.find(m => m.id === selectedModule)?.name}
							</p>
						)}
					</div>
				</div>
			</div>

			{/* Canvas */}
			<DropTarget>
				<div
					ref={canvasRef}
					className='modern-planner-canvas'
					onClick={handleCanvasClick}
					style={{
						transform: `scale(${zoom})`,
						transformOrigin: 'top left',
					}}
				>
					{/* Room outline */}
					<div
						className='modern-planner-room'
						style={{
							width: roomSize.width,
							height: roomSize.height,
						}}
					>
						{/* Grid */}
						{showGrid && (
							<div className='modern-planner-grid'>
								{Array.from(
									{ length: Math.ceil(roomSize.width / gridSize) },
									(_, i) => (
										<div
											key={`v-${i}`}
											className='modern-planner-grid-line modern-planner-grid-line--vertical'
											style={{ left: i * gridSize }}
										/>
									)
								)}
								{Array.from(
									{ length: Math.ceil(roomSize.height / gridSize) },
									(_, i) => (
										<div
											key={`h-${i}`}
											className='modern-planner-grid-line modern-planner-grid-line--horizontal'
											style={{ top: i * gridSize }}
										/>
									)
								)}
							</div>
						)}

						{/* Modules */}
						{modules.map(module => (
							<ModuleComponent key={module.id} module={module} />
						))}
					</div>
				</div>
			</DropTarget>
		</div>
	);
};

export default ModernPlannerCanvas;
