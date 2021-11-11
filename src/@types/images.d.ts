// Required to allow importing images with webpack in typescript
// Note `import` statements must be in a different file to wildcard module declarations or they break
// https://github.com/microsoft/TypeScript/issues/28097
declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
