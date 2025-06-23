import { ResponseDto } from "./dto/response.dto";
export function successResponse<T>(code: number, message: string, data: any) {
    return {
        code,
        message,
        time: new Date().toISOString(),
        data,
    } as ResponseDto;
}

export function errorResponse(code: number, message: string) {
    return {
        code,
        message,
        time: new Date().toISOString(),
        data: null,
    } as ResponseDto;
}
