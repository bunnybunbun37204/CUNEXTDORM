import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BillItem } from "@/types";
import { Component } from "react";
import { ElectricityBillList } from "./electricityBill";
import { RentBillList } from "./rentBill";
import { WaterBillList } from "./waterBill";

interface TabSwitcherProps {
	data: {
		rent: Array<BillItem>;
		electricity: Array<BillItem>;
		water: Array<BillItem>;
	};
}

export class TabSwitcher extends Component<TabSwitcherProps> {
	private tabs = [
		{ value: "rent", label: "ค่าเช่าห้อง" },
		{ value: "electricity", label: "ค่าไฟฟ้า" },
		{ value: "water", label: "ค่าน้ำ" },
	];

	render() {
		return (
			<Tabs defaultValue="rent" className="w-full">
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

				<div className="p-6 bg-white">
					<TabsContent value="rent">
						<RentBillList data={this.props.data.rent} />
					</TabsContent>
					<TabsContent value="electricity">
						<ElectricityBillList data={this.props.data.electricity} />
					</TabsContent>
					<TabsContent value="water">
						<WaterBillList data={this.props.data.water} />
					</TabsContent>
				</div>
			</Tabs>
		);
	}
}
