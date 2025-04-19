import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// TabSwitcher.tsx
import { Component } from "react";
import PersonalInfo from "./PersonalInfo";

type Tab = {
	value: string;
	label: string;
};

type PersonalData = {
	[key: string]: string;
	fullName: string;
	nickname: string;
	province: string;
	studentId: string;
	faculty: string;
	department: string;
	email: string;
	phone: string;
	building: string;
	room: string;
	educationYear: string;
	gpa: string;
	status: string;
	academicYear: string;
	bed: string;
	acNumber: string;
	floor: string;
};

class TabSwitcher extends Component {
	private tabs: Tab[] = [
		{ value: "personality", label: "ข้อมูลทั่วไป" },
		{ value: "activity", label: "ข้อมูลการเข้าร่วมกิจกรรม" },
	];

	private personalData: PersonalData = {
		fullName: "เทยกิจดล รังนาถย์",
		nickname: "ดล",
		province: "สรัง",
		studentId: "6534465023",
		faculty: "คณะวิทยาศาสตร์",
		department: "คณิตศาสตร์และวิทยาการคอมพิวเตอร์",
		email: "Siwadolrungmart@gmail.com",
		phone: "0630214568",
		building: "จําปี",
		room: "1009",
		educationYear: "2565",
		gpa: "4.00",
		status: "โครงการอื่น คณะวิทยาศาสตร์",
		academicYear: "ปีที่ 1",
		bed: "1",
		acNumber: "AC-123456",
		floor: "10",
	};

	shouldComponentUpdate() {
		return false; // Static component, no need to update
	}

	renderHeader() {
		return (
			<header className="mb-4">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">ข้อมูลส่วนตัว</h1>
				<p className="text-lg text-gray-600">ปีการศึกษา {this.personalData.educationYear}</p>
			</header>
		);
	}

	renderTabs() {
		return (
			<Tabs defaultValue="personality" className="w-full">
				<TabsList className="flex w-full bg-black">
					{this.tabs.map((tab) => (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className="text-white data-[state=active]:bg-white data-[state=active]:text-black"
						>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
				{this.renderTabContent()}
			</Tabs>
		);
	}

	renderTabContent() {
		return (
			<div className="p-6 bg-white">
				<TabsContent value="personality">
					<PersonalInfo data={this.personalData} />
				</TabsContent>
				<TabsContent value="activity">
					<p>hi 2</p>
				</TabsContent>
			</div>
		);
	}

	render() {
		return (
			<>
				{this.renderHeader()}
				{this.renderTabs()}
			</>
		);
	}
}

export default TabSwitcher;
