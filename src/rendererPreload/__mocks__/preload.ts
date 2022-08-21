export const api = {
  // Note: the non-mocked version uses Node's path.join method
  // which changes the delimiter based on the OS
  joinPath: (...paths: string[]) => paths.join("/"),
};
