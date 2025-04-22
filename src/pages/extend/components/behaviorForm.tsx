"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Component } from "react";

interface BehaviorState {
	goodDeedThisYear: string;
	goodDeedPlan: string;
	dormBehaviorToImprove: string;
	lifestyle: string;
	password: string;
}

export class BehaviorForm extends Component<object, BehaviorState> {
	constructor(props: object) {
		super(props);
		this.state = {
			goodDeedThisYear: "",
			goodDeedPlan: "",
			dormBehaviorToImprove: "",
			lifestyle: "",
			password: "",
		};
	}

	handleChange = (field: keyof BehaviorState, value: string) => {
		this.setState((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};

	handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		alert(JSON.stringify(this.state, null, 2));
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
				{/* ส่วนความชอบส่วนตัว */}
				<section className="space-y-4">
					<div className="space-y-2">
						<Label>ความดีที่เคยทำ</Label>
						<Input
							value={this.state.goodDeedThisYear}
							onChange={(e) => this.handleChange("goodDeedThisYear", e.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<Label>ความดีที่คิดว่าจะทํา</Label>
						<Input
							value={this.state.goodDeedPlan}
							onChange={(e) => this.handleChange("goodDeedPlan", e.target.value)}
						/>
					</div>
					<div className="space-y-2">
						<Label>พฤติกรรมที่อยากปรับปรุงในการอยู่หอพัก</Label>
						<Input
							value={this.state.dormBehaviorToImprove}
							onChange={(e) => this.handleChange("dormBehaviorToImprove", e.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<Label>ไลฟ์สไตล์ ความชอบส่วนตัว</Label>
						<Input value={this.state.lifestyle} onChange={(e) => this.handleChange("lifestyle", e.target.value)} />
					</div>
				</section>

				<Button type="submit" className="w-full">
					ส่งข้อมูล
				</Button>
			</form>
		);
	}
}
