// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFieldRequired = (schema: any, fieldName: string) => {
  const field = schema.shape[fieldName];
  return !field.isOptional();
};
