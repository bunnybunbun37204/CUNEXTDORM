// InfoCard.tsx
import React, { type ReactNode } from "react";
import { Component } from "react";

interface Props {
	title: string;
	children: ReactNode;
}

export class InfoCard extends Component<Props> {
	shouldComponentUpdate(nextProps: Props) {
		return (
			this.props.title !== nextProps.title ||
			React.Children.count(this.props.children) !== React.Children.count(nextProps.children)
		);
	}

	render() {
		return (
			<div className="bg-white p-4 rounded-lg border border-gray-200">
				<h3 className="text-lg font-medium text-gray-700 mb-3">{this.props.title}</h3>
				<div className="space-y-2">{this.props.children}</div>
			</div>
		);
	}
}
