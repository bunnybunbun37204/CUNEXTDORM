abstract class Model<T> {
  protected readonly _id: string;
  public readonly props: T;

  constructor(props: T, id?: string) {
    this._id = id || Bun.randomUUIDv7();
    this.props = props;
  }
}
