import { useState } from "react";
import "./App.css";
//import mailIconSrc from "./assets/mail.svg";
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
						name: prob.jobData.name,
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
			<h2>Edit your job data</h2>
			<form id="EditJobForm">
				<label htmlFor="jobName">Name</label>
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
				id: prob.nextID,
				name: jobData.name,
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
			{prob.showEdit ? (
				<EditJobForm
					jobData={editJobData}
					setJobData={setEditJobData}
					jobs={prob.jobs}
					setJobs={prob.setJob}
					setShow={prob.setShowEdit}
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
												prob.setShowEdit(true);
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
											Edit
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
											Delate
										</button>
									</li>
								))}
							</ul>
						</div>
					) : (
						<>
							<h2>Insert your job data</h2>
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
							</form>
						</>
					)}
				</>
			)}
		</>
	);
}
function InformationForm(prob) {
	return (
		<div>
			<h1>Personal data</h1>
			<form id="personalInformationForm">
				<label htmlFor="fullNamePersonalInfo">Full Name</label>
				<input
					id="fullNamePersonalInfo"
					name="fullName"
					placeholder="John Adams"
					value={prob.fullName}
					onChange={(e) => prob.setFullName(e.target.value)}
				/>

				<label htmlFor="emailPersonalInfo">Email</label>
				<input
					id="emailPersonalInfo"
					type="email"
					name="email"
					placeholder=" example@mail.com"
					value={prob.email}
					onChange={(e) => prob.setEmail(e.target.value)}
				/>

				<label htmlFor="telPersonalInfo">Phone</label>
				<input
					id="telPersonalInfo"
					type="tel"
					name="phone"
					placeholder=" XXXX-XXX-XXXX"
					value={prob.phone}
					onChange={(e) => prob.setPhone(e.target.value)}
				/>
				<label htmlFor="addressPersonalInfo">Address</label>
				<input
					id="addressPersonalInfo"
					name="address"
					placeholder="California"
					value={prob.address}
					onChange={(e) => prob.setAddress(e.target.value)}
				/>
			</form>
		</div>
	);
}

function CV(prob) {
	return (
		<>
			<div>
				<h1>{prob.fullName}</h1>
				{/*prob.email !== "" ? <img src={mailIconSrc} : null*/}
				<h2>{prob.email}</h2>
				<h2>{prob.phone}</h2>
				<h2>{prob.address}</h2>
			</div>
		</>
	);
}

function App() {
	const [fullName, setFullName] = useState("John");
	const [email, setEmail] = useState("gmail");
	const [phone, setPhone] = useState("000");
	const [address, setAddress] = useState("paris");
	const [nextID, setNextID] = useState(0);
	const [jobs, setJob] = useState([]);
	const [showJobForm, setShowJobForm] = useState(true);
	const [showEdit, setShowEdit] = useState(false);
	return (
		<>
			<InformationForm
				fullName={fullName}
				setFullName={setFullName}
				email={email}
				setEmail={setEmail}
				phone={phone}
				setPhone={setPhone}
				address={address}
				setAddress={setAddress}
			/>

			<JobSection
				setJob={setJob}
				jobs={jobs}
				nextID={nextID}
				setNextID={setNextID}
				show={showJobForm}
				setShow={setShowJobForm}
				showEdit={showEdit}
				setShowEdit={setShowEdit}
			/>
			{!showJobForm & !showEdit ? (
				<button onClick={() => setShowJobForm(true)}>
					Add job experience
				</button>
			) : null}
			<CV
				fullName={fullName}
				email={email}
				phone={phone}
				address={address}
				jobs={jobs}
				setJob={setJob}
			/>
		</>
	);
}

export default App;
