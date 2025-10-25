import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

// Base Cabinet 3D Model
export const BaseCabinet3D: React.FC<{
	width: number;
	height: number;
	depth: number;
	material?: string;
	position?: [number, number, number];
	rotation?: [number, number, number];
}> = ({
	width,
	height,
	depth,
	material = 'wood',
	position = [0, 0, 0],
	rotation = [0, 0, 0],
}) => {
	const meshRef = useRef<THREE.Mesh>(null);

	// Get material color based on type
	const getMaterialColor = () => {
		switch (material) {
			case 'wood':
				return '#8b4513';
			case 'white':
				return '#ffffff';
			case 'black':
				return '#000000';
			case 'gray':
				return '#808080';
			case 'oak':
				return '#daa520';
			case 'walnut':
				return '#5d4037';
			default:
				return '#8b4513';
		}
	};

	return (
		<group position={position} rotation={rotation}>
			{/* Main cabinet body */}
			<Box args={[width / 100, height / 100, depth / 100]}>
				<meshStandardMaterial
					color={getMaterialColor()}
					roughness={0.3}
					metalness={0.1}
				/>
			</Box>

			{/* Cabinet doors */}
			<Box
				args={[width / 200 - 0.01, height / 100 - 0.02, 0.01]}
				position={[width / 400, 0, depth / 200 + 0.01]}
			>
				<meshStandardMaterial
					color={getMaterialColor()}
					roughness={0.2}
					metalness={0.0}
				/>
			</Box>
			<Box
				args={[width / 200 - 0.01, height / 100 - 0.02, 0.01]}
				position={[-width / 400, 0, depth / 200 + 0.01]}
			>
				<meshStandardMaterial
					color={getMaterialColor()}
					roughness={0.2}
					metalness={0.0}
				/>
			</Box>

			{/* Handles */}
			<Box
				args={[0.02, 0.01, 0.01]}
				position={[width / 400, 0, depth / 200 + 0.02]}
			>
				<meshStandardMaterial color='#c0c0c0' roughness={0.1} metalness={0.8} />
			</Box>
			<Box
				args={[0.02, 0.01, 0.01]}
				position={[-width / 400, 0, depth / 200 + 0.02]}
			>
				<meshStandardMaterial color='#c0c0c0' roughness={0.1} metalness={0.8} />
			</Box>
		</group>
	);
};

// Wall Cabinet 3D Model
export const WallCabinet3D: React.FC<{
	width: number;
	height: number;
	depth: number;
	material?: string;
	position?: [number, number, number];
	rotation?: [number, number, number];
}> = ({
	width,
	height,
	depth,
	material = 'wood',
	position = [0, 0, 0],
	rotation = [0, 0, 0],
}) => {
	const getMaterialColor = () => {
		switch (material) {
			case 'wood':
				return '#8b4513';
			case 'white':
				return '#ffffff';
			case 'black':
				return '#000000';
			case 'gray':
				return '#808080';
			case 'oak':
				return '#daa520';
			case 'walnut':
				return '#5d4037';
			default:
				return '#8b4513';
		}
	};

	return (
		<group position={position} rotation={rotation}>
			{/* Main cabinet body */}
			<Box args={[width / 100, height / 100, depth / 100]}>
				<meshStandardMaterial
					color={getMaterialColor()}
					roughness={0.3}
					metalness={0.1}
				/>
			</Box>

			{/* Glass doors */}
			<Box
				args={[width / 100 - 0.02, height / 100 - 0.02, 0.01]}
				position={[0, 0, depth / 200 + 0.01]}
			>
				<meshStandardMaterial
					color='#ffffff'
					transparent
					opacity={0.3}
					roughness={0.1}
					metalness={0.0}
				/>
			</Box>

			{/* Handles */}
			<Box args={[0.02, 0.01, 0.01]} position={[0, 0, depth / 200 + 0.02]}>
				<meshStandardMaterial color='#c0c0c0' roughness={0.1} metalness={0.8} />
			</Box>
		</group>
	);
};

// Counter Top 3D Model
export const CounterTop3D: React.FC<{
	width: number;
	height: number;
	depth: number;
	material?: string;
	position?: [number, number, number];
	rotation?: [number, number, number];
}> = ({
	width,
	height,
	depth,
	material = 'granite',
	position = [0, 0, 0],
	rotation = [0, 0, 0],
}) => {
	const getMaterialColor = () => {
		switch (material) {
			case 'granite':
				return '#696969';
			case 'marble':
				return '#f5f5f5';
			case 'quartz':
				return '#e6e6fa';
			case 'wood':
				return '#8b4513';
			case 'concrete':
				return '#a9a9a9';
			default:
				return '#696969';
		}
	};

	return (
		<group position={position} rotation={rotation}>
			{/* Main counter top */}
			<Box args={[width / 100, 0.04, depth / 100]}>
				<meshStandardMaterial
					color={getMaterialColor()}
					roughness={0.1}
					metalness={0.0}
				/>
			</Box>

			{/* Counter edge */}
			<Box
				args={[width / 100, 0.08, 0.02]}
				position={[0, -0.02, depth / 200 - 0.01]}
			>
				<meshStandardMaterial
					color={getMaterialColor()}
					roughness={0.1}
					metalness={0.0}
				/>
			</Box>
		</group>
	);
};

// Refrigerator 3D Model
export const Refrigerator3D: React.FC<{
	width: number;
	height: number;
	depth: number;
	position?: [number, number, number];
	rotation?: [number, number, number];
}> = ({ width, height, depth, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
	return (
		<group position={position} rotation={rotation}>
			{/* Main body */}
			<Box args={[width / 100, height / 100, depth / 100]}>
				<meshStandardMaterial color='#ffffff' roughness={0.1} metalness={0.0} />
			</Box>

			{/* Freezer section */}
			<Box
				args={[width / 100 - 0.02, height / 300, depth / 100 - 0.02]}
				position={[0, height / 300, 0]}
			>
				<meshStandardMaterial color='#f0f0f0' roughness={0.1} metalness={0.0} />
			</Box>

			{/* Refrigerator section */}
			<Box
				args={[width / 100 - 0.02, height / 150, depth / 100 - 0.02]}
				position={[0, -height / 300, 0]}
			>
				<meshStandardMaterial color='#f0f0f0' roughness={0.1} metalness={0.0} />
			</Box>

			{/* Handle */}
			<Box args={[0.02, 0.1, 0.01]} position={[width / 200 + 0.01, 0, 0]}>
				<meshStandardMaterial color='#c0c0c0' roughness={0.1} metalness={0.8} />
			</Box>

			{/* Brand logo area */}
			<Box
				args={[0.1, 0.05, 0.01]}
				position={[0, height / 200 - 0.1, depth / 200 + 0.01]}
			>
				<meshStandardMaterial color='#000000' roughness={0.1} metalness={0.0} />
			</Box>
		</group>
	);
};

// Dishwasher 3D Model
export const Dishwasher3D: React.FC<{
	width: number;
	height: number;
	depth: number;
	position?: [number, number, number];
	rotation?: [number, number, number];
}> = ({ width, height, depth, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
	return (
		<group position={position} rotation={rotation}>
			{/* Main body */}
			<Box args={[width / 100, height / 100, depth / 100]}>
				<meshStandardMaterial color='#ffffff' roughness={0.1} metalness={0.0} />
			</Box>

			{/* Door */}
			<Box
				args={[width / 100 - 0.02, height / 100 - 0.02, 0.01]}
				position={[0, 0, depth / 200 + 0.01]}
			>
				<meshStandardMaterial color='#ffffff' roughness={0.1} metalness={0.0} />
			</Box>

			{/* Handle */}
			<Box args={[0.02, 0.05, 0.01]} position={[0, 0, depth / 200 + 0.02]}>
				<meshStandardMaterial color='#c0c0c0' roughness={0.1} metalness={0.8} />
			</Box>

			{/* Control panel */}
			<Box
				args={[0.08, 0.03, 0.01]}
				position={[0, height / 200 - 0.05, depth / 200 + 0.01]}
			>
				<meshStandardMaterial color='#000000' roughness={0.1} metalness={0.0} />
			</Box>
		</group>
	);
};

// Oven 3D Model
export const Oven3D: React.FC<{
	width: number;
	height: number;
	depth: number;
	position?: [number, number, number];
	rotation?: [number, number, number];
}> = ({ width, height, depth, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
	return (
		<group position={position} rotation={rotation}>
			{/* Main body */}
			<Box args={[width / 100, height / 100, depth / 100]}>
				<meshStandardMaterial color='#000000' roughness={0.1} metalness={0.8} />
			</Box>

			{/* Door */}
			<Box
				args={[width / 100 - 0.02, height / 100 - 0.02, 0.01]}
				position={[0, 0, depth / 200 + 0.01]}
			>
				<meshStandardMaterial color='#000000' roughness={0.1} metalness={0.8} />
			</Box>

			{/* Handle */}
			<Box args={[0.02, 0.05, 0.01]} position={[0, 0, depth / 200 + 0.02]}>
				<meshStandardMaterial color='#c0c0c0' roughness={0.1} metalness={0.8} />
			</Box>

			{/* Control panel */}
			<Box
				args={[0.08, 0.03, 0.01]}
				position={[0, height / 200 - 0.05, depth / 200 + 0.01]}
			>
				<meshStandardMaterial color='#c0c0c0' roughness={0.1} metalness={0.8} />
			</Box>

			{/* Window */}
			<Box
				args={[width / 100 - 0.04, height / 200, 0.01]}
				position={[0, -height / 400, depth / 200 + 0.02]}
			>
				<meshStandardMaterial
					color='#ffffff'
					transparent
					opacity={0.3}
					roughness={0.1}
					metalness={0.0}
				/>
			</Box>
		</group>
	);
};

// Sink 3D Model
export const Sink3D: React.FC<{
	width: number;
	height: number;
	depth: number;
	type?: 'single' | 'double';
	position?: [number, number, number];
	rotation?: [number, number, number];
}> = ({
	width,
	height,
	depth,
	type = 'single',
	position = [0, 0, 0],
	rotation = [0, 0, 0],
}) => {
	return (
		<group position={position} rotation={rotation}>
			{/* Sink bowl(s) */}
			{type === 'single' ? (
				<Cylinder
					args={[width / 200, width / 200, 0.15, 16]}
					position={[0, -0.075, 0]}
				>
					<meshStandardMaterial
						color='#ffffff'
						roughness={0.1}
						metalness={0.0}
					/>
				</Cylinder>
			) : (
				<>
					<Cylinder
						args={[width / 400, width / 400, 0.15, 16]}
						position={[-width / 400, -0.075, 0]}
					>
						<meshStandardMaterial
							color='#ffffff'
							roughness={0.1}
							metalness={0.0}
						/>
					</Cylinder>
					<Cylinder
						args={[width / 400, width / 400, 0.15, 16]}
						position={[width / 400, -0.075, 0]}
					>
						<meshStandardMaterial
							color='#ffffff'
							roughness={0.1}
							metalness={0.0}
						/>
					</Cylinder>
				</>
			)}

			{/* Faucet */}
			<Box args={[0.02, 0.1, 0.02]} position={[0, 0.05, 0]}>
				<meshStandardMaterial color='#c0c0c0' roughness={0.1} metalness={0.8} />
			</Box>

			{/* Faucet head */}
			<Sphere args={[0.02]} position={[0, 0.1, 0]}>
				<meshStandardMaterial color='#c0c0c0' roughness={0.1} metalness={0.8} />
			</Sphere>
		</group>
	);
};

// Kitchen Island 3D Model
export const KitchenIsland3D: React.FC<{
	width: number;
	height: number;
	depth: number;
	material?: string;
	position?: [number, number, number];
	rotation?: [number, number, number];
}> = ({
	width,
	height,
	depth,
	material = 'wood',
	position = [0, 0, 0],
	rotation = [0, 0, 0],
}) => {
	const getMaterialColor = () => {
		switch (material) {
			case 'wood':
				return '#8b4513';
			case 'white':
				return '#ffffff';
			case 'black':
				return '#000000';
			case 'gray':
				return '#808080';
			case 'oak':
				return '#daa520';
			case 'walnut':
				return '#5d4037';
			default:
				return '#8b4513';
		}
	};

	return (
		<group position={position} rotation={rotation}>
			{/* Base */}
			<Box args={[width / 100, height / 100, depth / 100]}>
				<meshStandardMaterial
					color={getMaterialColor()}
					roughness={0.3}
					metalness={0.1}
				/>
			</Box>

			{/* Counter top */}
			<Box
				args={[width / 100, 0.04, depth / 100]}
				position={[0, height / 200 + 0.02, 0]}
			>
				<meshStandardMaterial color='#696969' roughness={0.1} metalness={0.0} />
			</Box>

			{/* Cabinet doors */}
			<Box
				args={[width / 200 - 0.01, height / 100 - 0.02, 0.01]}
				position={[width / 400, 0, depth / 200 + 0.01]}
			>
				<meshStandardMaterial
					color={getMaterialColor()}
					roughness={0.2}
					metalness={0.0}
				/>
			</Box>
			<Box
				args={[width / 200 - 0.01, height / 100 - 0.02, 0.01]}
				position={[-width / 400, 0, depth / 200 + 0.01]}
			>
				<meshStandardMaterial
					color={getMaterialColor()}
					roughness={0.2}
					metalness={0.0}
				/>
			</Box>

			{/* Handles */}
			<Box
				args={[0.02, 0.01, 0.01]}
				position={[width / 400, 0, depth / 200 + 0.02]}
			>
				<meshStandardMaterial color='#c0c0c0' roughness={0.1} metalness={0.8} />
			</Box>
			<Box
				args={[0.02, 0.01, 0.01]}
				position={[-width / 400, 0, depth / 200 + 0.02]}
			>
				<meshStandardMaterial color='#c0c0c0' roughness={0.1} metalness={0.8} />
			</Box>
		</group>
	);
};

