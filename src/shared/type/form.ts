export type ISetError = (name: any, error: { message: string; type?: 'custom' }) => void;
export type ISetValue = (name: any, value: string | number) => void;
