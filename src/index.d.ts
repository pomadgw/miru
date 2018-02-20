declare module Miru {
  export type IMiruDataFunction = () => object;

  export interface IMiruParameters {
    data?: object | IMiruDataFunction;
    watch?: object;
    render?: IMiruDataFunction;
  }

  export interface IMiru {
    $mount: (selector: string) => void;
    [propName: string]: any;
  }
}
