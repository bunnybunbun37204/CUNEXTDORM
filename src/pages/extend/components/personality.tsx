"use client";
import { Component } from "react";

interface PersonalityState {
	profileImage: string;
	name: string;
	faculty: string;
	year: string;
	studentId: string;
	grade: File | null;
	building: string;
	room: string;
	bed: string;
	startingSemester: string;
	startingYear: string;
	confirmBed: boolean | null;
	errors: Record<string, string>;
}

export class PersonalityForm extends Component<object, PersonalityState> {
	constructor(props: object) {
		super(props);
		this.state = {
			profileImage: "",
			name: "",
			faculty: "",
			year: "",
			studentId: "",
			grade: null,
			building: "",
			room: "",
			bed: "",
			startingSemester: "",
			startingYear: "",
			confirmBed: null,
			errors: {},
		};
	}

	handleInputChange = (field: keyof PersonalityState, value: string | File | boolean | null) => {
		this.setState((prevState) => ({
			...prevState,
			[field]: value,
			errors: { ...prevState.errors, [field]: "" },
		}));
	};

	validateForm = () => {
		const errors: Record<string, string> = {};
		if (!this.state.name) errors.name = "กรุณากรอกชื่อ-นามสกุล";
		if (!this.state.studentId) errors.studentId = "กรุณากรอกรหัสนิสิต";
		if (!this.state.grade) errors.grade = "กรุณาอัปโหลดเกรดเฉลี่ย";
		this.setState({ errors });
		return Object.keys(errors).length === 0;
	};

	handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (this.validateForm()) {
			console.log("Form data:", this.state);
			// Add your submission logic here
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="max-w-2xl mx-auto p-6 space-y-4">
				{/* Profile Image Upload */}
				<div className="text-center">
					<h3 className="cursor-pointer">
						<input
							type="file"
							accept="image/*"
							className="hidden"
							onChange={(e) => {
								if (e.target.files?.[0]) {
									this.handleInputChange("profileImage", URL.createObjectURL(e.target.files[0]));
								}
							}}
						/>
						<img
							src={this.state.profileImage || "/default-avatar.png"}
							alt="Profile"
							className="h-32 w-32 rounded-full mx-auto mb-2 border-4 border-gray-200"
						/>
						<p className="text-blue-600">คลิกเพื่ออัปโหลดรูปโปรไฟล์</p>
					</h3>
				</div>

				{/* Personal Information */}
				<div className="space-y-4">
					<div>
						<h3 className="block mb-1 font-semibold">ชื่อ-นามสกุล</h3>
						<input
							type="text"
							value={this.state.name}
							onChange={(e) => this.handleInputChange("name", e.target.value)}
							className="w-full p-2 border rounded"
						/>
						{this.state.errors.name && <p className="text-red-500 text-sm">{this.state.errors.name}</p>}
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<h3 className="block mb-1 font-semibold">คณะ</h3>
							<input
								type="text"
								value={this.state.faculty}
								onChange={(e) => this.handleInputChange("faculty", e.target.value)}
								className="w-full p-2 border rounded"
							/>
						</div>

						<div>
							<h3 className="block mb-1 font-semibold">ชั้นปี</h3>
							<input
								type="text"
								value={this.state.year}
								onChange={(e) => this.handleInputChange("year", e.target.value)}
								className="w-full p-2 border rounded"
							/>
						</div>
					</div>

					<div>
						<h3 className="block mb-1 font-semibold">รหัสนิสิต</h3>
						<input
							type="text"
							value={this.state.studentId}
							onChange={(e) => this.handleInputChange("studentId", e.target.value)}
							className="w-full p-2 border rounded"
						/>
						{this.state.errors.studentId && <p className="text-red-500 text-sm">{this.state.errors.studentId}</p>}
					</div>
				</div>

				{/* Dorm Information */}
				<div className="grid grid-cols-3 gap-4">
					<div>
						<h3 className="block mb-1 font-semibold">ตึกพัก</h3>
						<input
							type="text"
							value={this.state.building}
							onChange={(e) => this.handleInputChange("building", e.target.value)}
							className="w-full p-2 border rounded"
						/>
					</div>

					<div>
						<h3 className="block mb-1 font-semibold">ห้องพัก</h3>
						<input
							type="text"
							value={this.state.room}
							onChange={(e) => this.handleInputChange("room", e.target.value)}
							className="w-full p-2 border rounded"
						/>
					</div>

					<div>
						<h3 className="block mb-1 font-semibold">เตียง</h3>
						<input
							type="text"
							value={this.state.bed}
							onChange={(e) => this.handleInputChange("bed", e.target.value)}
							className="w-full p-2 border rounded"
						/>
					</div>
				</div>

				{/* Academic Information */}
				<div className="space-y-4">
					<div>
						<h3 className="block mb-2 font-semibold">เริ่มเข้าหอเมื่อภาคการศึกษา</h3>
						<div className="space-y-2">
							{["ภาคการศึกษาต้น", "ภาคการศึกษาปลาย"].map((semester) => (
								<h3 key={semester} className="flex items-center space-x-2">
									<input
										type="radio"
										name="semester"
										value={semester}
										checked={this.state.startingSemester === semester}
										onChange={(e) => this.handleInputChange("startingSemester", e.target.value)}
										className="form-radio"
									/>
									<span>{semester}</span>
								</h3>
							))}
						</div>
					</div>

					<div>
						<h3 className="block mb-1 font-semibold">ปีการศึกษา</h3>
						<input
							type="text"
							value={this.state.startingYear}
							onChange={(e) => this.handleInputChange("startingYear", e.target.value)}
							className="w-full p-2 border rounded"
						/>
					</div>

					<div>
						<h3 className="block mb-2 font-semibold">ยืนยันเตียงเดิม</h3>
						<div className="space-y-2">
							<h3 className="flex items-center space-x-2">
								<input
									type="radio"
									name="confirmBed"
									checked={this.state.confirmBed === true}
									onChange={() => this.handleInputChange("confirmBed", true)}
									className="form-radio"
								/>
								<span>ยืนยันเตียงเดิม</span>
							</h3>
							<h3 className="flex items-center space-x-2">
								<input
									type="radio"
									name="confirmBed"
									checked={this.state.confirmBed === false}
									onChange={() => this.handleInputChange("confirmBed", false)}
									className="form-radio"
								/>
								<span>ไม่ยืนยันเตียงเดิม</span>
							</h3>
						</div>
					</div>

					<div>
						<h3 className="block mb-1 font-semibold">อัปโหลดเกรดเฉลี่ยสะสม (PDF เท่านั้น)</h3>
						<input
							type="file"
							accept=".pdf"
							onChange={(e) => this.handleInputChange("grade", e.target.files?.[0] || null)}
							className="w-full p-2 border rounded"
						/>
						{this.state.errors.grade && <p className="text-red-500 text-sm">{this.state.errors.grade}</p>}
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
				>
					ถัดไป
				</button>
			</form>
		);
	}
}
