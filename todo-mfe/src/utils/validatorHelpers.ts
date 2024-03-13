export const throwRejected = (message: string): Promise<never> => {
  return Promise.reject(new Error(message));
};

const isAlphanumeric = (value: string): Boolean => {
  return /[^\p{L}\p{N}\s]/giu.test(value);
}


export const checkInput = (_: any, value: string = ""): Promise<boolean | void> => {
  if (!value.replace(/\s/g, '')) return throwRejected("Description cannot be empty or blank!");
  if (isAlphanumeric(value)) 
    return throwRejected("Description must only include alphanumeric characters!");
  return Promise.resolve(true);
};

export const validator = async (validate: () => Promise<any>) => {
  return await validate();
}
