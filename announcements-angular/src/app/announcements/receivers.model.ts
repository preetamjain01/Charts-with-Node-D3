export class Receivers {
  constructor(
    public input: Array<string>,
    public file: {
      file: File,
      field: string
    }
  ) {  }
}
