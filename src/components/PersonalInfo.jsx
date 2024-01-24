export { InformationForm };

function InformationForm(prob) {
	return (
		<div className="informationForm inputDiv">
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
