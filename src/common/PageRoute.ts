export const enum PageRoute {
  ANIMATOR = "/animator",
  LAUNCHER = "/",
}

export const pathnameToPageRoute = (pathname: string): PageRoute => {
  switch (pathname) {
    case "/animator":
      return PageRoute.ANIMATOR;
    case "/":
    default:
      return PageRoute.LAUNCHER;
  }
};
