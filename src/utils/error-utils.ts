export function getErrorObject(err: any): Error {
    return err.response && typeof err.response.data === "object" ? err.response.data.error : err
}