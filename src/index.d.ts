declare module Miru {
  export type IMiruDataFunction = () => Object;

  export interface IMiruParameters {
    data?: Object | IMiruDataFunction;
  }

  export interface IMiruDef {
    [propName: string]: any;
  }
}
