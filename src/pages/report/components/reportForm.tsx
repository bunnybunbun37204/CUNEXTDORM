import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Send } from "lucide-react";
import { Component } from "react";

interface ReportState {
	reporterName: string;
	building: string;
	room: string;
	bed: string;
	section: string;
	contactNumber: string;
	issueTypes: string;
	appointmentTimes: string;
	problemDescription: string;
	photos: File[];
}
export class ReportForm extends Component<object, ReportState> {
	constructor(props: object) {
		super(props);
		this.state = {
			reporterName: "Mr. Kiwol Rangmas",
			building: "Building J",
			room: "1009",
			bed: "B",
			section: "10",
			contactNumber: "0630214568",
			issueTypes: "",
			appointmentTimes: "",
			problemDescription: "",
			photos: [],
		};
	}

	handleCheckboxChange = (category: "issueTypes" | "appointmentTimes", value: string) => {
		this.setState({ [category]: value } as Pick<ReportState, typeof category>);
	};

	handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert("Form submitted");
		// Handle form submission logic
		console.log("Form submitted:", this.state);
	};

	render() {
		return (
			<div>
				<h1 className="text-2xl font-bold mb-4">แจ้งเรื่อง</h1>

				{/* Reporter Information */}
				<section className="mb-6">
					<h2 className="text-lg font-semibold mb-2">ข้อมูลผู้แจ้งเรื่อง</h2>
					<p className="text-gray-600">{this.state.reporterName}</p>
				</section>

				{/* Incident Details */}
				<section className="mb-6 grid grid-cols-2 gap-4">
					<div>
						<span className="block text-sm font-medium mb-1">ตึก</span>
						<p className="text-gray-600">{this.state.building}</p>
					</div>
					<div>
						<span className="block text-sm font-medium mb-1">ห้อง</span>
						<p className="text-gray-600">{this.state.room}</p>
					</div>
					<div>
						<span className="block text-sm font-medium mb-1">เตียง</span>
						<p className="text-gray-600">{this.state.bed}</p>
					</div>
					<div>
						<span className="block text-sm font-medium mb-1">ชั้น</span>
						<p className="text-gray-600">{this.state.section}</p>
					</div>
				</section>

				{/* Contact Information */}
				<section className="mb-6">
					<h2 className="text-lg font-semibold mb-2">เบอร์โทรติดต่อ</h2>
					<p className="text-gray-600">{this.state.contactNumber}</p>
				</section>

				{/* Issue Type */}
				<section className="mb-6">
					<h2 className="text-lg font-semibold mb-2">ประเภทงานซ่อม</h2>
					<RadioGroup>
						{["งานประตูและลูกบิด/ประตูกระจก", "สัญญาณอินเตอร์เน็ต(WIFI)", "งานตู้น้ำดื่ม(ตู้น้ำร้อนน้ำเย็น)", "อื่น ๆ"].map(
							(issue, index) => (
								<div className="flex items-center space-x-2" key={issue}>
									<RadioGroupItem
										value={index.toString()}
										onClick={() => this.handleCheckboxChange("issueTypes", issue)}
									/>
									<Label className="text-gray-700">{issue}</Label>
								</div>
							),
						)}
					</RadioGroup>
				</section>

				{/* Appointment Time */}
				<section className="mb-6">
					<h2 className="text-lg font-semibold mb-2">การนัดหมาย</h2>
					<RadioGroup>
						{["13:00-16:00 (ทุกวันจันทร์-ศุกร์)", "09.00-16.00 (ทุกวันเสาร์-อาทิตย์)"].map((time, index) => (
							<div className="flex items-center space-x-2" key={time}>
								<RadioGroupItem
									value={index.toString()}
									onClick={() => this.handleCheckboxChange("appointmentTimes", time)}
								/>
								<Label className="text-gray-700">{time}</Label>
							</div>
						))}
					</RadioGroup>
				</section>

				{/* Problem Description */}
				<section className="mb-6">
					<h2 className="text-lg font-semibold mb-2">รายละเอียด</h2>
					<textarea
						value={this.state.problemDescription}
						onChange={(e) => this.setState({ problemDescription: e.target.value })}
						className="w-full p-2 border rounded-md"
						placeholder="ยกตัวอย่างเช่น ประตูห้องน้ำเปิดไม่ออก"
						rows={4}
					/>
				</section>

				{/* Photo Upload */}
				<section className="mb-6">
					<h2 className="text-lg font-semibold mb-2">อัพโหลดรูปภาพ</h2>
					<input
						type="file"
						accept="image/*"
						onChange={(e) => this.setState({ photos: Array.from(e.target.files || []) })}
						className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
					/>
					<p className="text-sm text-gray-500 mt-1">ขนาดไฟล์ไม่เกิน 10 MB</p>
				</section>

				<section className="flex justify-end">
					<button
						type="submit"
						className="inline-flex bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
						onClick={this.handleSubmit}
					>
						<Send className="pr-2" />
						ยืนยันการแจ้งเรื่อง
					</button>
				</section>
			</div>
		);
	}
}
