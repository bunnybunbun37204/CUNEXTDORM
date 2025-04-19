import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Component } from "react";

interface ActivityFormState {
	activity1: boolean;
	activity2: boolean;
	activity3: boolean;
	activity4: boolean;
	activity5: boolean;
	activity6: boolean;
	activity7: boolean;
	activity8: boolean;
}

export class ActivityForm extends Component<object, ActivityFormState> {
	constructor(props: object) {
		super(props);
		this.state = {
			activity1: false,
			activity2: false,
			activity3: false,
			activity4: false,
			activity5: false,
			activity6: false,
			activity7: false,
			activity8: false,
		};
	}
	private activities = [
		{ id: 1, name: "กิจกรรมปฐมนิเทศนิสิตใหม่หอพักภาคต้นปีการศึกษา 2565" },
		{ id: 2, name: "กิจกรรมตรวจ 5 ส หอพอพักภาคต้นปีการศึกศา 2565" },
		{ id: 3, name: "กิจกรรมปฐมนิเทศนิสิตใหม่หอพักภาคปลายปีการศึกษา 2565" },
		{ id: 4, name: "กิจกรมมอบรมและฝึกซ้อมหนีไฟ หอพักนิสิตจุฬาลงกรณ์มหาวิทยาลัย ปีการศึกษา 2565 (ภาคทฤษฎี)" },
		{ id: 5, name: "กิจกรมมอบรมและฝึกซ้อมหนีไฟ หอพักนิสิตจุฬาลงกรณ์มหาวิทยาลัย ปีการศึกษา 2565 (ภาคปฏิบัติ) " },
		{ id: 6, name: "กิจกรรมตรวจ 5 ส หอพอพักภาคปลายปีการศึกศา 2565" },
		{ id: 7, name: "กิจกรรมประเมินร้านค้าครั้งที่ 2 " },
		{ id: 8, name: "กิจกรรมอบรมหัวปีกกิจกรรมหนีไฟ " },
	];
	handleCheckboxChange = (id: number, checked: boolean | string) => {
		this.setState((prevState) => ({
			...prevState,
			[`activity${id}`]: checked,
		}));
	};

	handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form data:", this.state);
		// Add your submission logic here
	};

	render() {
		return (
			<div className="flex flex-col items-start space-y-4">
				<h1 className="font-semibold">ข้อมูลการเข้าร่วมกิจกรรมหอพัก</h1>
				{this.activities.map((activity) => (
					<div key={activity.id} className="items-center">
						<div className="flex items-center">
							<Checkbox
								id={`activity${activity.id}`}
								className="mr-2"
								onCheckedChange={(checked) => this.handleCheckboxChange(activity.id, checked)}
							/>
							<label htmlFor={`activity-${activity.id}`} className="text-gray-700">
								{activity.name}
							</label>
						</div>
						<Input
							type="text"
							placeholder="เหตุผลที่ไม่เข้าร่วมกิจกรรม"
							className="ml-6 w-3/4 border rounded px-2 py-1"
							disabled={this.state[`activity${activity.id}` as keyof ActivityFormState]}
						/>
					</div>
				))}
				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
				>
					ถัดไป
				</button>
			</div>
		);
	}
}
