import type { PersonalInfoProps } from "@/types";
// PersonalInfo.tsx
import { Component } from "react";
import { InfoCard } from "./InfoCard";
import { InfoItem } from "./InfoItem";

interface Props {
	data: PersonalInfoProps;
}

export default class PersonalInfo extends Component<Props> {
	shouldComponentUpdate(nextProps: Props) {
		return JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data);
	}

	renderGeneralInfo() {
		const { data } = this.props;
		return (
			<InfoCard title="ข้อมูลทั่วไป">
				<InfoItem label="รหัสนิสิต" value={data.studentId} />
				<InfoItem label="ชื่อ" value={data.fullName} />
				<InfoItem label="ชื่อเล่น" value={data.nickname} />
				<InfoItem label="จังหวัด" value={data.province} />
				<InfoItem label="E-mail" value={data.email} />
				<InfoItem label="เบอร์โทร" value={data.phone} />
			</InfoCard>
		);
	}

	renderDormInfo() {
		const { data } = this.props;
		return (
			<InfoCard title="ข้อมูลหอพัก">
				<InfoItem label="ตึก" value={data.building} />
				<InfoItem label="ห้อง" value={data.room} />
				<InfoItem label="เตียง" value={data.bed} />
				<InfoItem label="A/C No." value={data.acNumber} />
				<InfoItem label="ชั้น" value={data.floor} />
			</InfoCard>
		);
	}

	renderEducationInfo() {
		const { data } = this.props;
		return (
			<InfoCard title="ข้อมูลการศึกษา">
				<InfoItem label="เป็นนิสิต" value={data.status} />
				<InfoItem label="ชั้นปีที่" value={data.academicYear} />
				<InfoItem label="ภาควิชา" value={data.department} />
				<InfoItem label="ผลการเรียน (GPAX)" value={data.gpa} />
			</InfoCard>
		);
	}

	render() {
		return (
			<section className="space-y-6">
				{this.renderGeneralInfo()}
				{this.renderDormInfo()}
				{this.renderEducationInfo()}
			</section>
		);
	}
}
