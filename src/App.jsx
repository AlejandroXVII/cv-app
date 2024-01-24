import { useState } from "react";
import { JobSection } from "./components/Job.jsx";
import { EducationSection } from "./components/Education.jsx";
import { InformationForm } from "./components/PersonalInfo.jsx";
import { CV } from "./components/CV.jsx";
import { PlusIcon, DownloadIcon } from "./assets/icons.jsx";

export default function App() {
	const [fullName, setFullName] = useState("Alejandro");
	const [email, setEmail] = useState("example@gmail.com");
	const [phone, setPhone] = useState("+58-412-777-7777");
	const [address, setAddress] = useState("California");
	const [nextJobID, setNextJobID] = useState(0);
	const [jobs, setJob] = useState([]);
	const [showJobForm, setShowJobForm] = useState(false);
	const [showJobEdit, setShowJobEdit] = useState(false);
	const [nextEducationID, setNextEducationID] = useState(0);
	const [educations, setEducation] = useState([]);
	const [showEducationForm, setShowEducationForm] = useState(false);
	const [showEducationEdit, setShowEducationEdit] = useState(false);
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

			<div className="education inputDiv">
				<EducationSection
					setEducation={setEducation}
					educations={educations}
					nextID={nextEducationID}
					setNextID={setNextEducationID}
					show={showEducationForm}
					setShow={setShowEducationForm}
					showEducationEdit={showEducationEdit}
					setShowEducationEdit={setShowEducationEdit}
				/>
				{!showEducationForm & !showEducationEdit ? (
					<button
						className="addButton"
						onClick={() => setShowEducationForm(true)}
					>
						<PlusIcon /> <span>Add job experience</span>
					</button>
				) : null}
			</div>
			<div className="job inputDiv ">
				<JobSection
					setJob={setJob}
					jobs={jobs}
					nextID={nextJobID}
					setNextID={setNextJobID}
					show={showJobForm}
					setShow={setShowJobForm}
					showJobEdit={showJobEdit}
					setShowJobEdit={setShowJobEdit}
				/>
				{!showJobForm & !showJobEdit ? (
					<button
						className="addButton"
						onClick={() => setShowJobForm(true)}
					>
						<PlusIcon /> <span>Add job experience</span>
					</button>
				) : null}
			</div>
			<CV
				fullName={fullName}
				email={email}
				phone={phone}
				address={address}
				educations={educations}
				jobs={jobs}
			/>
			<button className="printButton" onClick={print}>
				<DownloadIcon />
			</button>
		</>
	);
}
