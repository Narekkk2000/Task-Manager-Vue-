export const clearFormData = <T extends Record<string, any>>(formData: T): void => {
    (Object.keys(formData) as Array<keyof T>).forEach(key => {
        formData[key] = null as T[keyof T];
    });
};