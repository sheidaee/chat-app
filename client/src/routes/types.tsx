export type AppRoute = {
  path: string;
  Component: React.ComponentType<any> | React.ComponentType<any>;
  exact: boolean;
  cprops?: any;
};
