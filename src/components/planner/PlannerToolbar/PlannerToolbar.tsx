import React from 'react';
import type { PlannerProject } from '../../../types';
import './PlannerToolbar.css';

interface PlannerToolbarProps {
	project?: PlannerProject;
	onNewProject?: () => void;
	onOpenProject?: () => void;
	onSaveProject?: (project: PlannerProject) => void;
	onExportProject?: (project: PlannerProject) => void;
	onImportProject?: (file: File) => void;
	onUndo?: () => void;
	onRedo?: () => void;
	canUndo?: boolean;
	canRedo?: boolean;
}

const PlannerToolbar: React.FC<PlannerToolbarProps> = ({
	project,
	onNewProject,
	onOpenProject,
	onSaveProject,
	onExportProject,
	onImportProject,
	onUndo,
	onRedo,
	canUndo = false,
	canRedo = false,
}) => {
	const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && onImportProject) {
			onImportProject(file);
		}
		// Reset input
		e.target.value = '';
	};

	const handleExport = () => {
		if (project && onExportProject) {
			onExportProject(project);
		}
	};

	const handleSave = () => {
		if (project && onSaveProject) {
			onSaveProject(project);
		}
	};

	return (
		<div className='planner-toolbar'>
			<div className='planner-toolbar__section'>
				<h3>File</h3>
				<div className='planner-toolbar__buttons'>
					<button
						className='planner-toolbar__btn'
						onClick={onNewProject}
						title='New Project'
					>
						📄 New
					</button>
					<button
						className='planner-toolbar__btn'
						onClick={onOpenProject}
						title='Open Project'
					>
						📂 Open
					</button>
					<button
						className='planner-toolbar__btn'
						onClick={handleSave}
						disabled={!project}
						title='Save Project'
					>
						💾 Save
					</button>
					<button
						className='planner-toolbar__btn'
						onClick={handleExport}
						disabled={!project}
						title='Export Project'
					>
						📤 Export
					</button>
					<label className='planner-toolbar__btn planner-toolbar__btn--file'>
						📥 Import
						<input
							type='file'
							accept='.json'
							onChange={handleFileImport}
							style={{ display: 'none' }}
						/>
					</label>
				</div>
			</div>

			<div className='planner-toolbar__section'>
				<h3>Edit</h3>
				<div className='planner-toolbar__buttons'>
					<button
						className='planner-toolbar__btn'
						onClick={onUndo}
						disabled={!canUndo}
						title='Undo'
					>
						↶ Undo
					</button>
					<button
						className='planner-toolbar__btn'
						onClick={onRedo}
						disabled={!canRedo}
						title='Redo'
					>
						↷ Redo
					</button>
				</div>
			</div>

			<div className='planner-toolbar__section'>
				<h3>View</h3>
				<div className='planner-toolbar__buttons'>
					<button className='planner-toolbar__btn' title='Zoom In'>
						🔍+ Zoom In
					</button>
					<button className='planner-toolbar__btn' title='Zoom Out'>
						🔍- Zoom Out
					</button>
					<button className='planner-toolbar__btn' title='Fit to Screen'>
						📐 Fit Screen
					</button>
					<button className='planner-toolbar__btn' title='Toggle Grid'>
						⊞ Grid
					</button>
				</div>
			</div>

			<div className='planner-toolbar__section'>
				<h3>Project Info</h3>
				{project ? (
					<div className='planner-toolbar__project-info'>
						<p>
							<strong>Name:</strong> {project.name}
						</p>
						<p>
							<strong>Modules:</strong> {project.modules.length}
						</p>
						<p>
							<strong>Updated:</strong>{' '}
							{new Date(project.updatedAt).toLocaleDateString()}
						</p>
					</div>
				) : (
					<p className='planner-toolbar__no-project'>No project loaded</p>
				)}
			</div>
		</div>
	);
};

export default PlannerToolbar;
