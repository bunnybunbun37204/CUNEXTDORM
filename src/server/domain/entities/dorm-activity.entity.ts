export class DormActivity {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly description: string,
		public readonly date: Date,
		public readonly maxPoints: number,
	) {}
}
