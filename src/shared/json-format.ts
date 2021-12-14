export function getDataError(message: string, status_code?: number) {
  return {
    code: 0,
    message: message,
    status_code: status_code,
  };
}
