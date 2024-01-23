import { useState } from "react";
import "./App.css";
//import mailIconSrc from "./assets/mail.svg";
function EditJobForm(prob) {
	function handleNameChange(e) {
		prob.setJobData({ ...prob.jobData, name: e.target.value });
	}
	function cleanForm() {
		prob.setJobData({ ...prob.jobData, name: "" });
	}
	function handleSave(e) {
		e.preventDefault();
		prob.setJobs(
			prob.jobs.map((job) => {
				if (job.id === prob.jobData.id) {
					return { ...job, name: prob.jobData.name };
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
			<form id="jobForm">
				<label htmlFor="jobName">Name</label>
				<input
					name="name"
					id="jobName"
					value={prob.jobData.name}
					onChange={handleNameChange}
				/>
				<label htmlFor="jobAddress">Address</label>
				<input name="address" id="jobAddress" />
				<label htmlFor="jobDate">Date</label>
				<input name="date" id="jobDate" />
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
		address: "",
		date: "",
	});
	const [editJobData, setEditJobData] = useState({
		id: -1,
		name: "",
		address: "",
		date: "",
	});

	function handleNameChange(e) {
		setJobData({ ...jobData, name: e.target.value });
	}
	function cleanForm() {
		setJobData({ ...jobData, name: "" });
	}
	function handleSave(e) {
		e.preventDefault();
		prob.setJob([
			...prob.jobs,
			{
				id: prob.nextID,
				name: jobData.name,
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
					...editJobData,
					id: job.id,
					name: job.name,
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
								<label htmlFor="jobName">Name</label>
								<input
									name="name"
									id="jobName"
									value={jobData.name}
									onChange={handleNameChange}
								/>
								<label htmlFor="jobAddress">Address</label>
								<input name="address" id="jobAddress" />
								<label htmlFor="jobDate">Date</label>
								<input name="date" id="jobDate" />
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
				<label htmlFor="fullName">Full Name</label>
				<input
					name="firstName"
					placeholder="John Adams"
					value={prob.fullName}
					onChange={(e) => prob.setFullName(e.target.value)}
				/>

				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					placeholder=" example@mail.com"
					value={prob.email}
					onChange={(e) => prob.setEmail(e.target.value)}
				/>

				<label htmlFor="phone">Phone</label>
				<input
					type="tel"
					name="phone"
					placeholder=" XXXX-XXX-XXXX"
					value={prob.phone}
					onChange={(e) => prob.setPhone(e.target.value)}
				/>
				<label htmlFor="address">Address</label>
				<input
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
