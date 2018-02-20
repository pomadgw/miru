declare module Miru {
  export type IMiruDataFunction = () => object;

  export interface IMiruMethods {
    [propName: string]: Function;
  }

  export interface IMiruParameters {
    data?: object | IMiruDataFunction;
    watch?: object;
    methods?: IMiruMethods;
    computed?: IMiruMethods;
  }

  export interface IMiru {
    [propName: string]: any;
  }
}
