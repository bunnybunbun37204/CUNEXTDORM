export class DormActivity {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly description: string,
		public readonly date: Date,
		public readonly duration: number, // Duration in hours
		public readonly location: string,
		public readonly participants: number,
	) {}
}
