declare module Miru {
  export type IMiruDataFunction = () => object;

  export interface IMiruParameters {
    data?: object | IMiruDataFunction;
    watch?: object
  }

  export interface IMiru {
    [propName: string]: any;
  }
}
