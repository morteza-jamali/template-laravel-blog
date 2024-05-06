export const STRINGS = {
  REQUIRED_FIELD: (name: string) => `The ${name} field is required`,
  MIN_CHAR: (name: string, min: number) =>
    `The ${name} field must be at least ${min} characters`,
  FORMAT: (name: string) => `The ${name} field format is invalid`,
  MIN_NUM: (name: string, number: number) =>
    `The ${name} field must be ${number} or more`,
};

export default STRINGS;
