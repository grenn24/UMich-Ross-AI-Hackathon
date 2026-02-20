import { AxiosRequestConfig, AxiosResponse } from "axios";
declare class ApiClient {
    private client;
    constructor(baseURL: string, requestConfigInterceptor?: (config: AxiosRequestConfig<any>) => void, responseErrorInterceptor?: (status: number, body: Object) => void);
    get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>>;
    put<T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    patch<T, R>(url: string, data: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>>;
}
declare const createApiClient: (parentPath: string, requestConfigInterceptor?: (config: AxiosRequestConfig<any>) => void, responseErrorInterceptor?: (status: number, body: Object) => void) => ApiClient;
export default createApiClient;
