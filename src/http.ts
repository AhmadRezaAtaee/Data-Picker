import { Method } from 'axios';

export interface HttpRequestConfig {
    url: string,
    method: Method,
    headers: { [x: string]: string },
    data: any
};

export const HttpRequestConfigDefault:
    Partial<HttpRequestConfig> =
{
    method: 'GET',
};

export interface HttpResponse {
    data: any
    headers: any
    status: number
}