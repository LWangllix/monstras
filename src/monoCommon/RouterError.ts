class RouterError {
  status: number;
  isRouterError = true;
  errors: Array<{ key?: string; msgs: Array<string> }> = [];
  constructor(
    status: number,
    errors: Array<{ key?: string; msgs: Array<string> }> = []
  ) {
    this.status = status;
    this.errors = errors;
  }
}
export default RouterError;
export const isRouterError = (e): RouterError => {
  if (e?.isRouterError) {
    return e as RouterError;
  }
  null;
}
