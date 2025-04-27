type ValidationFields = {
  [key: string]: any;
};

export class ValidationFieldsMiddleware {
  constructor(
    private readonly data: ValidationFields,
    private readonly requiredFields: string[],
    private readonly optionalFields: string[] = []
  ) {}

  public validate() {
    for (const field of this.requiredFields) {
      if (this.data[field] === undefined || this.data[field] === null) {
        throw new Error(`Field ${field} is required`);
      }
    }

    for (const key of Object.keys(this.data)) {
      if (![...this.requiredFields, ...this.optionalFields].includes(key)) {
        throw new Error(`Field "${key}" is not allowed`);
      }
    }

    return true;
  }
}
