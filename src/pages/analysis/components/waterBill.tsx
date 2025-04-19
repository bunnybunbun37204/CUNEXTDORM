"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { BillItem, BillList } from "@/types";

const chartConfig = {
	amount: {
		label: "Water bill",
	},
} satisfies ChartConfig;

export const WaterBillList: React.FC<BillList> = ({ data }) => {
	console.log(data);

	return (
		<div>
			<ChartContainer config={chartConfig} className="pb-6">
				<BarChart
					accessibilityLayer
					data={data}
					margin={{
						top: 20,
					}}
				>
					<CartesianGrid vertical={false} />
					<XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} />
					<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
					<Bar dataKey="amount" fill="var(--color-desktop)" radius={8}>
						<LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
					</Bar>
				</BarChart>
			</ChartContainer>
			<StatsSummary data={data} />
		</div>
	);
};

const StatsSummary: React.FC<BillList> = ({ data }) => {
	const max = Math.max(...data.map((item: BillItem) => item.amount));
	const min = Math.min(...data.map((item: BillItem) => item.amount));
	const total = data.reduce((acc: number, item: BillItem) => acc + item.amount, 0);
	const average = total / data.length;
	return (
		<div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200">
			<table className="w-full">
				<thead>
					<tr className="border-b border-gray-200">
						<th className="text-left py-3 px-4 font-medium text-gray-900">สถิติ</th>
						<th className="text-right py-3 px-4 font-medium text-gray-900">จำนวนเงิน (฿)</th>
					</tr>
				</thead>
				<tbody>
					<tr className="border-b border-gray-100">
						<td className="py-3 px-4 text-gray-700">สูงสุด</td>
						<td className="py-3 px-4 text-gray-900 text-right font-medium">{max.toLocaleString()}</td>
					</tr>
					<tr className="border-b border-gray-100">
						<td className="py-3 px-4 text-gray-700">ต่ำสุด</td>
						<td className="py-3 px-4 text-gray-900 text-right font-medium">{min.toLocaleString()}</td>
					</tr>
					<tr>
						<td className="py-3 px-4 text-gray-700">เฉลี่ย</td>
						<td className="py-3 px-4 text-gray-900 text-right font-medium">{average.toLocaleString()}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
