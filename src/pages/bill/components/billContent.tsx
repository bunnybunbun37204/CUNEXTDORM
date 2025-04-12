import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
// billContent.tsx
import { Component } from "react";

interface BillDetail {
	name: string;
	amount: number;
}

interface BillContentState {
	items: BillDetail[];
	total: number;
}

type BillContentProps = Record<string, never>;

export class BillContent extends Component<BillContentProps, BillContentState> {
	constructor(props: BillContentProps) {
		super(props);
		this.state = {
			items: [
				{ name: "ค่าเช่าห้อง", amount: 10000 },
				{ name: "ค่าน้ำ", amount: 10000 },
				{ name: "ค่าไฟฟ้า", amount: 10000 },
				{ name: "ค่าปรับ", amount: 10000 },
				{ name: "ค่าประกัน", amount: 10000 },
			],
			total: 50000,
		};
	}

	renderBillItem(item: BillDetail, index: number) {
		return (
			<li key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
				<span className="text-gray-600">{item.name}</span>
				<span className="text-gray-800 font-medium">{item.amount.toLocaleString()} ฿</span>
			</li>
		);
	}

	render() {
		return (
			<div className="bg-white rounded-lg shadow-sm px-6 pb-6 max-w-2xl mx-auto">
				<div className="mb-6">
					<h3 className="text-lg font-semibold text-gray-700 mb-3">รายการ</h3>
					<ul className="space-y-2">{this.state.items.map((item, index) => this.renderBillItem(item, index))}</ul>
				</div>

				<div className="pt-4 border-t border-gray-200 mb-6">
					<div className="flex justify-between items-center">
						<span className="text-lg font-semibold text-gray-700">รวม</span>
						<span className="text-xl font-bold text-blue-600">{this.state.total.toLocaleString()} ฿</span>
					</div>
				</div>

				<div className="flex justify-end">
					<Button className="hover:cursor-pointer">
						<Printer />
						พิมพ์
					</Button>
				</div>
			</div>
		);
	}
}
