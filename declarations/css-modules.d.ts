declare module '*.css' {
  interface IClassNames {
    [className: string]: string;
  }
  const styles: IClassNames;
  export = styles;
}