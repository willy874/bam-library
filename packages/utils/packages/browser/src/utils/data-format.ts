export function formDataFormat(data: object): FormData {
  const format = (obj: any, keys: string[] = []) => {
    Object.entries(obj).forEach(([key, value]) => {
      const formName = [...keys, key].map((k, i) => (i ? `[${k}]` : k)).join('');
      if (value instanceof Blob) {
        if (value instanceof File) {
          formData.append(formName, value, value.name);
        } else {
          formData.append(formName, value);
        }
      } else if (value && typeof value === 'object') {
        format(value, [...keys, key]);
      } else if (typeof value === 'string') {
        formData.append(formName, value);
      } else if (value !== undefined) {
        formData.append(formName, JSON.stringify(value));
      }
    });
  };
  const formData = new FormData();
  format(data);
  return formData;
}
