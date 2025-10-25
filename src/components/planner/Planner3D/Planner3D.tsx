import React, { useRef, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
	OrbitControls,
	Environment,
	ContactShadows,
	Grid,
	Text,
	Box,
} from '@react-three/drei';
// import { useDrag } from 'react-dnd';
import * as THREE from 'three';
import type { KitchenModule, PlannerProject } from '../../../types';
import {
	BaseCabinet3D,
	// WallCabinet3D,
	CounterTop3D,
	Refrigerator3D,
	Dishwasher3D,
	Oven3D,
	Sink3D,
	KitchenIsland3D,
} from './KitchenModels3D';
import './Planner3D.css';

interface Planner3DProps {
	project?: PlannerProject;
	onProjectChange?: (project: PlannerProject) => void;
	onSave?: (project: PlannerProject) => void;
	onExport?: (project: PlannerProject) => void;
}

// interface DraggedModule {
// 	type: 'module';
// 	moduleType: KitchenModule['type'];
// 	moduleData: Partial<KitchenModule>;
// }

// 3D Kitchen Module Component
const KitchenModule3D: React.FC<{
	module: KitchenModule;
	isSelected: boolean;
	onSelect: (id: string) => void;
	// onUpdate: (id: string, updates: Partial<KitchenModule>) => void;
}> = ({ module, isSelected, onSelect }) => {
	const meshRef = useRef<THREE.Mesh>(null);
	const [hovered, setHovered] = useState(false);

	// Handle drag in 3D space
	// const [{ isDragging }, drag] = useDrag({
	// 	type: 'existing-module',
	// 	item: { type: 'existing-module', moduleId: module.id },
	// 	collect: monitor => ({
	// 		isDragging: monitor.isDragging(),
	// 	}),
	// });

	// Animation for hover and selection
	useFrame(state => {
		if (meshRef.current) {
			const time = state.clock.getElapsedTime();
			if (hovered || isSelected) {
				meshRef.current.rotation.y = Math.sin(time * 2) * 0.1;
			}
		}
	});

	// Get 3D model component based on type
	const getModule3D = () => {
		const position: [number, number, number] = [0, 0, 0];
		const rotation: [number, number, number] = [
			0,
			(module.rotation * Math.PI) / 180,
			0,
		];

		switch (module.type) {
			case 'cabinet':
				return (
					<BaseCabinet3D
						width={module.width}
						height={module.height}
						depth={60}
						material='oak'
						position={position}
						rotation={rotation}
					/>
				);
			case 'counter':
				return (
					<CounterTop3D
						width={module.width}
						height={module.height}
						depth={60}
						material='granite'
						position={position}
						rotation={rotation}
					/>
				);
			case 'appliance':
				// Determine appliance type based on name
				if (
					module.name.toLowerCase().includes('refrigerator') ||
					module.name.toLowerCase().includes('fridge')
				) {
					return (
						<Refrigerator3D
							width={module.width}
							height={module.height}
							depth={70}
							position={position}
							rotation={rotation}
						/>
					);
				} else if (module.name.toLowerCase().includes('dishwasher')) {
					return (
						<Dishwasher3D
							width={module.width}
							height={module.height}
							depth={60}
							position={position}
							rotation={rotation}
						/>
					);
				} else if (module.name.toLowerCase().includes('oven')) {
					return (
						<Oven3D
							width={module.width}
							height={module.height}
							depth={60}
							position={position}
							rotation={rotation}
						/>
					);
				} else {
					// Generic appliance
					return (
						<Refrigerator3D
							width={module.width}
							height={module.height}
							depth={60}
							position={position}
							rotation={rotation}
						/>
					);
				}
			case 'sink':
				return (
					<Sink3D
						width={module.width}
						height={module.height}
						depth={50}
						type={
							module.name.toLowerCase().includes('double') ? 'double' : 'single'
						}
						position={position}
						rotation={rotation}
					/>
				);
			case 'island':
				return (
					<KitchenIsland3D
						width={module.width}
						height={module.height}
						depth={80}
						material='oak'
						position={position}
						rotation={rotation}
					/>
				);
			default:
				return (
					<BaseCabinet3D
						width={module.width}
						height={module.height}
						depth={60}
						material='oak'
						position={position}
						rotation={rotation}
					/>
				);
		}
	};

	return (
		<group
			// ref={drag}
			position={[module.x / 100, 0, module.y / 100]}
			onClick={e => {
				e.stopPropagation();
				onSelect(module.id);
			}}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
		>
			{/* 3D Model */}
			{getModule3D()}

			{/* Module label */}
			<Text
				position={[0, module.height / 200 + 0.2, 0]}
				fontSize={0.08}
				color={isSelected ? '#1f2937' : '#6b7280'}
				anchorX='center'
				anchorY='middle'
			>
				{module.name}
			</Text>

			{/* Selection outline */}
			{isSelected && (
				<mesh position={[0, 0, 0]}>
					<Box
						args={[module.width / 100 + 0.1, module.height / 100 + 0.1, 0.7]}
					/>
					<meshBasicMaterial color='#3b82f6' transparent opacity={0.2} />
				</mesh>
			)}
		</group>
	);
};

// 3D Room Component
const Room3D: React.FC<{
	roomSize: { width: number; height: number };
}> = ({ roomSize }) => {
	return (
		<group>
			{/* Floor */}
			<mesh
				position={[0, -0.1, 0]}
				rotation={[-Math.PI / 2, 0, 0]}
				receiveShadow
			>
				<planeGeometry args={[roomSize.width / 100, roomSize.height / 100]} />
				<meshStandardMaterial color='#f8fafc' roughness={0.8} metalness={0.0} />
			</mesh>

			{/* Walls */}
			{/* Back wall */}
			<mesh position={[0, 1, -roomSize.height / 200]} receiveShadow>
				<planeGeometry args={[roomSize.width / 100, 2]} />
				<meshStandardMaterial color='#e2e8f0' roughness={0.6} metalness={0.0} />
			</mesh>

			{/* Left wall */}
			<mesh
				position={[-roomSize.width / 200, 1, 0]}
				rotation={[0, Math.PI / 2, 0]}
				receiveShadow
			>
				<planeGeometry args={[roomSize.height / 100, 2]} />
				<meshStandardMaterial color='#e2e8f0' roughness={0.6} metalness={0.0} />
			</mesh>

			{/* Right wall */}
			<mesh
				position={[roomSize.width / 200, 1, 0]}
				rotation={[0, -Math.PI / 2, 0]}
				receiveShadow
			>
				<planeGeometry args={[roomSize.height / 100, 2]} />
				<meshStandardMaterial color='#e2e8f0' roughness={0.6} metalness={0.0} />
			</mesh>
		</group>
	);
};

// 3D Scene Component
const Scene3D: React.FC<{
	modules: KitchenModule[];
	roomSize: { width: number; height: number };
	selectedModule: string | null;
	onModuleSelect: (id: string) => void;
	// onModuleUpdate: (id: string, updates: Partial<KitchenModule>) => void;
}> = ({
	modules,
	roomSize,
	selectedModule,
	onModuleSelect,
	// onModuleUpdate,
}) => {
	const { camera } = useThree();

	// Set up camera position
	React.useEffect(() => {
		camera.position.set(5, 5, 5);
		camera.lookAt(0, 0, 0);
	}, [camera]);

	return (
		<>
			{/* Lighting */}
			<ambientLight intensity={0.4} />
			<directionalLight
				position={[10, 10, 5]}
				intensity={1}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				shadow-camera-far={50}
				shadow-camera-left={-10}
				shadow-camera-right={10}
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
			/>
			<pointLight position={[-10, 10, -10]} intensity={0.5} />

			{/* Environment */}
			<Environment preset='apartment' />

			{/* Room */}
			<Room3D roomSize={roomSize} />

			{/* Grid */}
			<Grid
				position={[0, 0, 0]}
				args={[roomSize.width / 100, roomSize.height / 100]}
				cellSize={0.2}
				cellThickness={0.5}
				cellColor='#e5e7eb'
				sectionSize={1}
				sectionThickness={1}
				sectionColor='#d1d5db'
				fadeDistance={30}
				fadeStrength={1}
				followCamera={false}
				infiniteGrid={false}
			/>

			{/* Modules */}
			{modules.map(module => (
				<KitchenModule3D
					key={module.id}
					module={module}
					isSelected={selectedModule === module.id}
					onSelect={onModuleSelect}
					// onUpdate={onModuleUpdate}
				/>
			))}

			{/* Contact shadows */}
			<ContactShadows
				position={[0, -0.1, 0]}
				opacity={0.4}
				scale={10}
				blur={2}
				far={4.5}
				resolution={256}
				color='#000000'
			/>
		</>
	);
};

// Main 3D Planner Component
const Planner3D: React.FC<Planner3DProps> = ({
	project,
	// onProjectChange,
	onSave,
	onExport,
}) => {
	const [modules, setModules] = useState<KitchenModule[]>([]);
	const [selectedModule, setSelectedModule] = useState<string | null>(null);
	const [roomSize, setRoomSize] = useState({ width: 400, height: 300 });
	// const [viewMode, setViewMode] = useState<'2d' | '3d'>('3d');
	const [cameraPosition, setCameraPosition] = useState<
		'top' | 'front' | 'side' | 'free'
	>('free');

	// Initialize project data
	React.useEffect(() => {
		if (project) {
			setModules(project.modules || []);
			setRoomSize(project.roomSize || { width: 400, height: 300 });
		}
	}, [project]);

	// Handle module selection
	const handleModuleSelect = useCallback((id: string) => {
		setSelectedModule(id);
	}, []);

	// Handle module updates
	// const handleModuleUpdate = useCallback(
	// 	(id: string, updates: Partial<KitchenModule>) => {
	// 		setModules(prev =>
	// 			prev.map(module =>
	// 				module.id === id ? { ...module, ...updates } : module
	// 			)
	// 		);
	// 	},
	// 	[]
	// );

	// Handle camera position changes
	const handleCameraPosition = useCallback(
		(position: 'top' | 'front' | 'side' | 'free') => {
			setCameraPosition(position);
		},
		[]
	);

	// Handle save
	const handleSave = useCallback(() => {
		if (onSave && project) {
			const updatedProject: PlannerProject = {
				...project,
				modules,
				roomSize,
				updatedAt: new Date().toISOString(),
			};
			onSave(updatedProject);
		}
	}, [modules, roomSize, project, onSave]);

	// Handle export
	const handleExport = useCallback(() => {
		if (onExport && project) {
			const updatedProject: PlannerProject = {
				...project,
				modules,
				roomSize,
				updatedAt: new Date().toISOString(),
			};
			onExport(updatedProject);
		}
	}, [modules, roomSize, project, onExport]);

	return (
		<div className='planner-3d'>
			{/* 3D Controls */}
			<div className='planner-3d__controls'>
				<div className='planner-3d__control-group'>
					<h3>View</h3>
					<div className='planner-3d__buttons'>
						<button
							className={cameraPosition === 'top' ? 'active' : ''}
							onClick={() => handleCameraPosition('top')}
							title='Top View'
						>
							📐 Top
						</button>
						<button
							className={cameraPosition === 'front' ? 'active' : ''}
							onClick={() => handleCameraPosition('front')}
							title='Front View'
						>
							👁️ Front
						</button>
						<button
							className={cameraPosition === 'side' ? 'active' : ''}
							onClick={() => handleCameraPosition('side')}
							title='Side View'
						>
							👁️ Side
						</button>
						<button
							className={cameraPosition === 'free' ? 'active' : ''}
							onClick={() => handleCameraPosition('free')}
							title='Free View'
						>
							🎮 Free
						</button>
					</div>
				</div>

				<div className='planner-3d__control-group'>
					<h3>Actions</h3>
					<div className='planner-3d__buttons'>
						<button onClick={handleSave} title='Save Project'>
							💾 Save
						</button>
						<button onClick={handleExport} title='Export Project'>
							📤 Export
						</button>
					</div>
				</div>

				<div className='planner-3d__control-group'>
					<h3>Info</h3>
					<div className='planner-3d__info'>
						<p>Modules: {modules.length}</p>
						<p>
							Room: {roomSize.width}×{roomSize.height} cm
						</p>
						{selectedModule && (
							<p>
								Selected: {modules.find(m => m.id === selectedModule)?.name}
							</p>
						)}
					</div>
				</div>
			</div>

			{/* 3D Canvas */}
			<div className='planner-3d__canvas'>
				<Canvas
					shadows
					camera={{ position: [5, 5, 5], fov: 50 }}
					style={{ background: '#f8fafc' }}
				>
					<Suspense fallback={null}>
						<Scene3D
							modules={modules}
							roomSize={roomSize}
							selectedModule={selectedModule}
							onModuleSelect={handleModuleSelect}
							// onModuleUpdate={handleModuleUpdate}
						/>
						<OrbitControls
							enablePan={true}
							enableZoom={true}
							enableRotate={true}
							minDistance={2}
							maxDistance={20}
							minPolarAngle={0}
							maxPolarAngle={Math.PI / 2}
						/>
					</Suspense>
				</Canvas>
			</div>
		</div>
	);
};

export default Planner3D;
