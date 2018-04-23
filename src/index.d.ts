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
    render?: IMiruDataFunction;
    components?: object;
    props?: Array<string> | object;
  }

  export interface IMiru {
    $mount: (selector: string) => void;
    [propName: string]: any;
  }

  export interface Dependency {
    subscribers: Map<string, any>;
    deps: Array<any>;
  }
}
