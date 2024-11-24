export class UnableToChangeSettingError extends Error {
  constructor(name: string, value: string | boolean | number) {
    super(`Unable to change setting ${name} to value ${value}`);
  }
}
