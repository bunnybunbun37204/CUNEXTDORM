// InfoItem.tsx
import { Component } from "react";

interface Props {
	label: string;
	value: string | number | undefined;
}

export class InfoItem extends Component<Props> {
	shouldComponentUpdate(nextProps: Props) {
		return this.props.label !== nextProps.label || this.props.value !== nextProps.value;
	}

	render() {
		return (
			<div className="flex justify-between items-center">
				<span className="text-gray-600 whitespace-nowrap">{this.props.label}</span>
				<span className="text-gray-800 text-end">{this.props.value}</span>
			</div>
		);
	}
}
