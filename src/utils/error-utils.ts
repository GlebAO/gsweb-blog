import { ResponseError } from "../reducers/types";

export function getErrorObject(err: any): ResponseError {
    return err.response && typeof err.response.data === "object" ? err.response.data.error : err
}