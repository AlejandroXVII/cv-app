import { useState } from "react";
import { TrashIcon, PenIcon } from "../assets/icons";
export { EducationSection };

function EditEducationForm(prob) {
	function handleNameChange(e) {
		prob.setEducationData({ ...prob.educationData, name: e.target.value });
	}
	function handleTittleChange(e) {
		prob.setEducationData({
			...prob.educationData,
			tittle: e.target.value,
		});
	}
	function handleStartDateChange(e) {
		prob.setEducationData({
			...prob.educationData,
			startDate: e.target.value,
		});
	}
	function handleEndDateChange(e) {
		prob.setEducationData({
			...prob.educationData,
			endDate: e.target.value,
		});
	}
	function cleanForm() {
		prob.setEducationData({
			id: "",
			name: "",
			tittle: "",
			startDate: "",
			endDate: "",
		});
	}
	function handleSave(e) {
		e.preventDefault();
		prob.setEducations(
			prob.educations.map((education) => {
				if (education.id === prob.educationData.id) {
					return {
						id: education.id,
						name:
							prob.educationData.name === ""
								? "No name"
								: prob.educationData.name,
						tittle: prob.educationData.tittle,
						startDate: prob.educationData.startDate,
						endDate: prob.educationData.endDate,
					};
				} else {
					return education;
				}
			})
		);
		cleanForm(e);
		prob.setShow(false);
	}
	return (
		<>
			<h2>Edit data</h2>
			<form id="EditEducationForm">
				<label htmlFor="educationName">Institution name</label>
				<input
					name="name"
					id="educationName"
					value={prob.educationData.name}
					onChange={handleNameChange}
					required
				/>
				<label htmlFor="tittleTitle">Degree name</label>
				<input
					name="tittle"
					id="tittleTitle"
					value={prob.educationData.tittle}
					onChange={handleTittleChange}
				/>
				<label htmlFor="educationDateStart">Start date</label>
				<input
					type="date"
					name="dateStart"
					id="educationDateStart"
					value={prob.educationData.startDate}
					onChange={handleStartDateChange}
				/>
				<label htmlFor="educationDateEnd">End date</label>
				<input
					type="date"
					name="dateEnd"
					id="educationDateEnd"
					value={prob.educationData.endDate}
					onChange={handleEndDateChange}
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
function EducationSection(prob) {
	const [educationData, setEducationData] = useState({
		name: "",
		tittle: "",
		startDate: "",
		endDate: "",
	});
	const [editEducationData, setEditEducationData] = useState({
		id: -1,
		name: "",
		tittle: "",
		startDate: "",
		endDate: "",
	});

	function handleNameChange(e) {
		setEducationData({ ...educationData, name: e.target.value });
	}
	function handleTittleChange(e) {
		setEducationData({ ...educationData, tittle: e.target.value });
	}
	function handleStartDateChange(e) {
		setEducationData({ ...educationData, startDate: e.target.value });
	}
	function handleEndDateChange(e) {
		setEducationData({ ...educationData, endDate: e.target.value });
	}
	function cleanForm() {
		setEducationData({
			name: "",
			tittle: "",
			startDate: "",
			endDate: "",
		});
	}
	function handleSave(e) {
		e.preventDefault();
		prob.setEducation([
			...prob.educations,
			{
				id: "e-" + String(prob.nextID),
				name:
					educationData.name === "" ? "No name" : educationData.name,
				tittle: educationData.tittle,
				startDate: educationData.startDate,
				endDate: educationData.endDate,
			},
		]);
		cleanForm(e);
		prob.setShow(false);
		prob.setNextID(prob.nextID + 1);
	}
	function handleEditClick(editedID) {
		prob.educations.forEach((education) => {
			if (education.id === editedID)
				setEditEducationData({
					id: education.id,
					name: education.name,
					tittle: education.tittle,
					startDate: education.startDate,
					endDate: education.endDate,
				});
		});
	}
	return (
		<>
			<h1>Education data</h1>
			{prob.showEducationEdit ? (
				<EditEducationForm
					educationData={editEducationData}
					setEducationData={setEditEducationData}
					educations={prob.educations}
					setEducations={prob.setEducation}
					setShow={prob.setShowEducationEdit}
				/>
			) : (
				<>
					{!prob.show ? (
						<div>
							<ul>
								{prob.educations.map((education) => (
									<li key={education.id}>
										{education.name}
										<button
											onClick={() => {
												prob.setShowEducationEdit(true);
												prob.educations.forEach((e) =>
													e.id === education.id
														? handleEditClick(
																education.id,
																education
														  )
														: null
												);
											}}
										>
											<PenIcon />
										</button>
										<button
											onClick={() => {
												prob.setEducation(
													prob.educations.filter(
														(e) =>
															e.id !==
															education.id
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
							<form id="educationForm">
								<label htmlFor="educationName">
									Institution name
								</label>
								<input
									name="name"
									id="educationName"
									value={educationData.name}
									onChange={handleNameChange}
								/>
								<label htmlFor="tittleTitle">Degree name</label>
								<input
									name="tittle"
									id="tittleTitle"
									value={educationData.tittle}
									onChange={handleTittleChange}
								/>
								<label htmlFor="educationDateStart">
									Start date
								</label>
								<input
									type="date"
									name="dateStart"
									id="educationDateStart"
									value={educationData.startDate}
									onChange={handleStartDateChange}
								/>
								<label htmlFor="educationDateEnd">
									End date
								</label>
								<input
									type="date"
									name="dateEnd"
									id="educationDateEnd"
									value={educationData.endDate}
									onChange={handleEndDateChange}
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
