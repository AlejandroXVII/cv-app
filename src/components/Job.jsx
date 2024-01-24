import { useState } from "react";
import { TrashIcon, PenIcon } from "../assets/icons";
export { JobSection };

function EditJobForm(prob) {
	function handleNameChange(e) {
		prob.setJobData({ ...prob.jobData, name: e.target.value });
	}
	function handlePositionChange(e) {
		prob.setJobData({ ...prob.jobData, position: e.target.value });
	}
	function handleStartDateChange(e) {
		prob.setJobData({ ...prob.jobData, startDate: e.target.value });
	}
	function handleEndDateChange(e) {
		prob.setJobData({ ...prob.jobData, endDate: e.target.value });
	}
	function handleDescriptionChange(e) {
		prob.setJobData({ ...prob.jobData, description: e.target.value });
	}
	function cleanForm() {
		prob.setJobData({
			id: "",
			name: "",
			position: "",
			startDate: "",
			endDate: "",
			description: "",
		});
	}
	function handleSave(e) {
		e.preventDefault();
		prob.setJobs(
			prob.jobs.map((job) => {
				if (job.id === prob.jobData.id) {
					return {
						id: job.id,
						name:
							prob.jobData.name === ""
								? "No name"
								: prob.jobData.name,
						position: prob.jobData.position,
						startDate: prob.jobData.startDate,
						endDate: prob.jobData.endDate,
						description: prob.jobData.description,
					};
				} else {
					return job;
				}
			})
		);
		cleanForm(e);
		prob.setShow(false);
	}
	return (
		<>
			<h2>Edit data</h2>
			<form id="EditJobForm">
				<label htmlFor="jobName">Company name</label>
				<input
					name="name"
					id="jobName"
					value={prob.jobData.name}
					onChange={handleNameChange}
				/>
				<label htmlFor="positionTitle">Position Title</label>
				<input
					name="position"
					id="positionTitle"
					value={prob.jobData.position}
					onChange={handlePositionChange}
				/>
				<label htmlFor="jobDateStart">Start date</label>
				<input
					type="date"
					name="dateStart"
					id="jobDateStart"
					value={prob.jobData.startDate}
					onChange={handleStartDateChange}
				/>
				<label htmlFor="jobDateEnd">End date</label>
				<input
					type="date"
					name="dateEnd"
					id="jobDateEnd"
					value={prob.jobData.endDate}
					onChange={handleEndDateChange}
				/>
				<label htmlFor="jobDescription">Description of the role</label>
				<textarea
					name="description"
					id="jobDescription"
					value={prob.jobData.description}
					onChange={handleDescriptionChange}
				/>
				<div className="buttonContainer">
					<button onClick={handleSave}>Save</button>
					<button
						onClick={(e) => {
							e.preventDefault();
							prob.setShow(false);
							cleanForm();
						}}
					>
						Cancel
					</button>
				</div>
			</form>
		</>
	);
}
function JobSection(prob) {
	const [jobData, setJobData] = useState({
		name: "",
		position: "",
		startDate: "",
		endDate: "",
		description: "",
	});
	const [editJobData, setEditJobData] = useState({
		id: -1,
		name: "",
		position: "",
		startDate: "",
		endDate: "",
		description: "",
	});

	function handleNameChange(e) {
		setJobData({ ...jobData, name: e.target.value });
	}
	function handlePositionChange(e) {
		setJobData({ ...jobData, position: e.target.value });
	}
	function handleStartDateChange(e) {
		setJobData({ ...jobData, startDate: e.target.value });
	}
	function handleEndDateChange(e) {
		setJobData({ ...jobData, endDate: e.target.value });
	}
	function handleDescriptionChange(e) {
		setJobData({ ...jobData, description: e.target.value });
	}
	function cleanForm() {
		setJobData({
			name: "",
			position: "",
			startDate: "",
			endDate: "",
			description: "",
		});
	}
	function handleSave(e) {
		e.preventDefault();
		prob.setJob([
			...prob.jobs,
			{
				id: "j-" + prob.nextID,
				name: jobData.name === "" ? "No name" : jobData.name,
				position: jobData.position,
				startDate: jobData.startDate,
				endDate: jobData.endDate,
				description: jobData.description,
			},
		]);
		cleanForm(e);
		prob.setShow(false);
		prob.setNextID(prob.nextID + 1);
	}
	function handleEditClick(editedID) {
		prob.jobs.forEach((job) => {
			if (job.id === editedID)
				setEditJobData({
					id: job.id,
					name: job.name,
					position: job.position,
					startDate: job.startDate,
					endDate: job.endDate,
					description: job.description,
				});
		});
	}
	return (
		<>
			<h1>Job data</h1>
			{prob.showJobEdit ? (
				<EditJobForm
					jobData={editJobData}
					setJobData={setEditJobData}
					jobs={prob.jobs}
					setJobs={prob.setJob}
					setShow={prob.setShowJobEdit}
				/>
			) : (
				<>
					{!prob.show ? (
						<div>
							<ul>
								{prob.jobs.map((job) => (
									<li key={job.id}>
										{job.name}
										<button
											onClick={() => {
												prob.setShowJobEdit(true);
												prob.jobs.forEach((e) =>
													e.id === job.id
														? handleEditClick(
																job.id,
																job
														  )
														: null
												);
											}}
										>
											<PenIcon />
										</button>
										<button
											onClick={() => {
												prob.setJob(
													prob.jobs.filter(
														(e) => e.id !== job.id
													)
												);
											}}
										>
											<TrashIcon />
										</button>
									</li>
								))}
							</ul>
						</div>
					) : (
						<>
							<h2>Insert data</h2>
							<form id="jobForm">
								<label htmlFor="jobName">Company name</label>
								<input
									name="name"
									id="jobName"
									value={jobData.name}
									onChange={handleNameChange}
								/>
								<label htmlFor="positionTitle">
									Position Title
								</label>
								<input
									name="position"
									id="positionTitle"
									value={jobData.position}
									onChange={handlePositionChange}
								/>
								<label htmlFor="jobDateStart">Start date</label>
								<input
									type="date"
									name="dateStart"
									id="jobDateStart"
									value={jobData.startDate}
									onChange={handleStartDateChange}
								/>
								<label htmlFor="jobDateEnd">End date</label>
								<input
									type="date"
									name="dateEnd"
									id="jobDateEnd"
									value={jobData.endDate}
									onChange={handleEndDateChange}
								/>
								<label htmlFor="jobDescription">
									Description of the role
								</label>
								<textarea
									name="description"
									id="jobDescription"
									value={jobData.description}
									onChange={handleDescriptionChange}
								/>
								<div className="buttonContainer">
									<button onClick={handleSave}>Save</button>
									<button
										onClick={(e) => {
											e.preventDefault();
											prob.setShow(false);
											cleanForm();
										}}
									>
										Cancel
									</button>
								</div>
							</form>
						</>
					)}
				</>
			)}
		</>
	);
}
