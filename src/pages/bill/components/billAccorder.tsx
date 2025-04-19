// billAccorder.tsx
"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { statusMap } from "@/types";
import type { Bill } from "@/types";
import { CircleCheck, CircleX, LoaderCircle } from "lucide-react";
import { Component } from "react";
import { BillContent } from "./billContent";

interface BillAccorderProps {
	bills: Bill[];
}

export class BillAccorder extends Component<BillAccorderProps> {
	renderBillItem(bill: Bill) {
		const { color, text } = statusMap[bill.status];
		return (
			<AccordionItem key={`${bill.month}-${bill.year}`} value={`${bill.month}-${bill.year}`}>
				<AccordionTrigger className="hover:no-underline">
					<div className="flex w-full justify-between items-center -mr-2">
						<span>
							บิลค่าเช่าเดือน {bill.month} / {bill.year}
						</span>
						<span className={`flex items-center space-x-1 ${color}`}>
							{this.renderStatusIcon(bill.status)}
							<span className="text-sm font-medium">{text}</span>
						</span>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<BillContent />
				</AccordionContent>
			</AccordionItem>
		);
	}

	renderStatusIcon(status: string) {
		switch (status) {
			case "paid":
				return <CircleCheck className="icon" />;
			case "pending":
				return <LoaderCircle className="icon" />;
			case "unpaid":
				return <CircleX className="icon" />;
			default:
				return null;
		}
	}

	render() {
		return (
			<Accordion type="single" collapsible className="w-full">
				{this.props.bills.map((bill) => this.renderBillItem(bill))}
			</Accordion>
		);
	}
}
