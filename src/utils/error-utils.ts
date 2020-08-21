export function getErrorObject(err: any): Error {
    return typeof err.response.data === "object" ? err.response.data.error : err
}