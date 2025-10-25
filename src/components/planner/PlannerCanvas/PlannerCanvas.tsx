import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { KitchenModule, PlannerProject } from '../../../types';
import './PlannerCanvas.css';

interface PlannerCanvasProps {
	project?: PlannerProject;
	onProjectChange?: (project: PlannerProject) => void;
	onSave?: (project: PlannerProject) => void;
	onExport?: (project: PlannerProject) => void;
}

const PlannerCanvas: React.FC<PlannerCanvasProps> = ({
	project,
	onProjectChange,
	onSave,
	onExport,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [modules, setModules] = useState<KitchenModule[]>([]);
	const [selectedModule, setSelectedModule] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	const [roomSize, setRoomSize] = useState({ width: 400, height: 300 });

	// Initialize canvas
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Set canvas size
		canvas.width = 800;
		canvas.height = 600;

		// Load project data if provided
		if (project) {
			setModules(project.modules || []);
			setRoomSize(project.roomSize || { width: 400, height: 300 });
		}
	}, [project]);

	// Draw the planner
	const draw = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw room outline
		ctx.strokeStyle = '#374151';
		ctx.lineWidth = 2;
		ctx.strokeRect(50, 50, roomSize.width, roomSize.height);

		// Draw grid
		ctx.strokeStyle = '#e5e7eb';
		ctx.lineWidth = 1;
		const gridSize = 20;

		for (let x = 50; x <= 50 + roomSize.width; x += gridSize) {
			ctx.beginPath();
			ctx.moveTo(x, 50);
			ctx.lineTo(x, 50 + roomSize.height);
			ctx.stroke();
		}

		for (let y = 50; y <= 50 + roomSize.height; y += gridSize) {
			ctx.beginPath();
			ctx.moveTo(50, y);
			ctx.lineTo(50 + roomSize.width, y);
			ctx.stroke();
		}

		// Draw modules
		modules.forEach(module => {
			const isSelected = selectedModule === module.id;

			// Module background
			ctx.fillStyle = isSelected ? '#dbeafe' : '#f3f4f6';
			ctx.fillRect(module.x, module.y, module.width, module.height);

			// Module border
			ctx.strokeStyle = isSelected ? '#2563eb' : '#9ca3af';
			ctx.lineWidth = isSelected ? 2 : 1;
			ctx.strokeRect(module.x, module.y, module.width, module.height);

			// Module text
			ctx.fillStyle = '#374151';
			ctx.font = '12px Inter, sans-serif';
			ctx.textAlign = 'center';
			ctx.fillText(
				module.name,
				module.x + module.width / 2,
				module.y + module.height / 2 + 4
			);
		});
	}, [modules, selectedModule, roomSize]);

	// Redraw when modules or selection changes
	useEffect(() => {
		draw();
	}, [draw]);

	// Handle mouse events
	const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Find clicked module
		const clickedModule = modules.find(
			module =>
				x >= module.x &&
				x <= module.x + module.width &&
				y >= module.y &&
				y <= module.y + module.height
		);

		if (clickedModule) {
			setSelectedModule(clickedModule.id);
			setIsDragging(true);
			setDragOffset({
				x: x - clickedModule.x,
				y: y - clickedModule.y,
			});
		} else {
			setSelectedModule(null);
		}
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!isDragging || !selectedModule) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const newX = x - dragOffset.x;
		const newY = y - dragOffset.y;

		// Update module position
		setModules(prevModules =>
			prevModules.map(module =>
				module.id === selectedModule ? { ...module, x: newX, y: newY } : module
			)
		);
	};

	const handleMouseUp = () => {
		setIsDragging(false);

		// Notify parent of changes
		if (onProjectChange) {
			onProjectChange({
				id: project?.id || 'new-project',
				name: project?.name || 'Untitled Project',
				modules,
				roomSize,
				createdAt: project?.createdAt || new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});
		}
	};

	// Add new module
	const addModule = (type: KitchenModule['type']) => {
		const newModule: KitchenModule = {
			id: `module-${Date.now()}`,
			type,
			name: type.charAt(0).toUpperCase() + type.slice(1),
			x: 100 + Math.random() * 200,
			y: 100 + Math.random() * 100,
			width: 80,
			height: 60,
			rotation: 0,
		};

		setModules(prev => [...prev, newModule]);
		setSelectedModule(newModule.id);
	};

	// Delete selected module
	const deleteSelectedModule = () => {
		if (selectedModule) {
			setModules(prev => prev.filter(module => module.id !== selectedModule));
			setSelectedModule(null);
		}
	};

	// Clear all modules
	const clearCanvas = () => {
		setModules([]);
		setSelectedModule(null);
	};

	// Save project
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

	// Export project
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
		<div className='planner-canvas'>
			<div className='planner-canvas__toolbar'>
				<div className='planner-canvas__tools'>
					<button
						className='planner-canvas__tool-btn'
						onClick={() => addModule('cabinet')}
						title='Add Cabinet'
					>
						📦 Cabinet
					</button>
					<button
						className='planner-canvas__tool-btn'
						onClick={() => addModule('counter')}
						title='Add Counter'
					>
						🪑 Counter
					</button>
					<button
						className='planner-canvas__tool-btn'
						onClick={() => addModule('appliance')}
						title='Add Appliance'
					>
						🔥 Appliance
					</button>
					<button
						className='planner-canvas__tool-btn'
						onClick={() => addModule('sink')}
						title='Add Sink'
					>
						🚰 Sink
					</button>
				</div>

				<div className='planner-canvas__actions'>
					{selectedModule && (
						<button
							className='planner-canvas__action-btn planner-canvas__action-btn--danger'
							onClick={deleteSelectedModule}
							title='Delete Selected Module'
						>
							🗑️ Delete
						</button>
					)}
					<button
						className='planner-canvas__action-btn'
						onClick={clearCanvas}
						title='Clear Canvas'
					>
						🧹 Clear
					</button>
					<button
						className='planner-canvas__action-btn planner-canvas__action-btn--primary'
						onClick={handleSave}
						title='Save Project'
					>
						💾 Save
					</button>
					<button
						className='planner-canvas__action-btn'
						onClick={handleExport}
						title='Export Project'
					>
						📤 Export
					</button>
				</div>
			</div>

			<div className='planner-canvas__workspace'>
				<canvas
					ref={canvasRef}
					className='planner-canvas__canvas'
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					onMouseLeave={handleMouseUp}
				/>
			</div>

			<div className='planner-canvas__info'>
				<p>Modules: {modules.length}</p>
				{selectedModule && (
					<p>Selected: {modules.find(m => m.id === selectedModule)?.name}</p>
				)}
			</div>
		</div>
	);
};

export default PlannerCanvas;
