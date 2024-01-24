import { MailIcon, PhoneIcon, AddressIcon } from "../assets/icons.jsx";
export { CV };

function CV(prob) {
	return (
		<div className="cv">
			<div className="head">
				<div>
					<h1>{prob.fullName}</h1>
					{prob.email !== "" ? <MailIcon /> : null}
					<p>{prob.email}</p>
					{prob.phone !== "" ? <PhoneIcon /> : null}
					<p>{prob.phone}</p>
					{prob.address !== "" ? <AddressIcon /> : null}
					<p>{prob.address}</p>
				</div>
			</div>
			{prob.educations.length > 0 ? (
				<>
					<div>
						<h2 className="head">Education Information</h2>
						<ul>
							{prob.educations.map((education) => (
								<li key={education.id}>
									{education.name !== "" ? (
										<span>
											Institution: {education.name}{" "}
										</span>
									) : null}
									{education.tittle !== "" ? (
										<span>tittle: {education.tittle} </span>
									) : null}
									{education.startDate !== "" ? (
										<span>
											Start: {education.startDate}{" "}
										</span>
									) : null}
									{education.startDate !== "" ? (
										<span>End: {education.endDate}</span>
									) : null}
								</li>
							))}
						</ul>
					</div>
				</>
			) : null}
			{prob.jobs.length > 0 ? (
				<>
					<div>
						<h2 className="head">Job Information</h2>
						<ul>
							{prob.jobs.map((job) => (
								<li key={job.id}>
									{job.name !== "" ? (
										<span>Institution: {job.name}</span>
									) : null}
									{job.position !== "" ? (
										<span>position: {job.position}</span>
									) : null}
									{job.startDate !== "" ? (
										<span>Start: {job.startDate}</span>
									) : null}
									{job.startDate !== "" ? (
										<span>End: {job.endDate}</span>
									) : null}
									{job.description !== "" ? (
										<span>
											Description: {job.description}
										</span>
									) : null}
								</li>
							))}
						</ul>
					</div>
				</>
			) : null}
		</div>
	);
}
