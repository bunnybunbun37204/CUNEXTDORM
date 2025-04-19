"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Component } from "react";
import { ActivityForm } from "./activityForm";
import { BehaviorForm } from "./behaviorForm";
import { PersonalityForm } from "./personality";

export class ExtendingForm extends Component {
	private tabs = [
		{ value: "personality", label: "ข้อมูลส่วนตัว", child: <PersonalityForm /> },
		{ value: "activity", label: "กิจกรรมหอพัก", child: <ActivityForm /> },
		{ value: "behavior", label: "พฤติกรรม", child: <BehaviorForm /> },
	];

	render() {
		return (
			<div>
				<h1 className="text-2xl font-bold mb-4">แจ้งเรื่อง</h1>
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
					{this.tabs.map((tab) => (
						<TabsContent key={tab.value} value={tab.value}>
							{tab.child}
						</TabsContent>
					))}
				</Tabs>
			</div>
		);
	}
}
