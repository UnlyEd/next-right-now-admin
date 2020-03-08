/**
 * react-admin doesn't export all TS types, so we add those we need manually here until they do
 *
 * This file overrides the native "react-admin" typings from "react-admin" package
 *
 * @see https://github.com/marmelab/react-admin
 */
declare module 'react-admin-wip' {
  import { History, Location } from 'history';
  import { ComponentType, ReactElement, ReactNode } from 'react';
  import { match as Match, RouteComponentProps, RouteProps } from 'react-router-dom';

  // XXX ------------------ "react-admin" CUSTOM -------------------

  export interface ArrayInput {}

  // Error: "only refers to a type, but is being used as a value here" when doing this

  // XXX ------------------ "react-admin" official package -------------------
  //  See https://github.com/marmelab/react-admin/blob/master/packages/ra-core/src/types.ts

  export const GET_LIST: string;
  export const GET_ONE: string;
  export const GET_MANY: string;
  export const GET_MANY_REFERENCE: string;
  export const CREATE: string;
  export const UPDATE: string;
  export const DELETE: string;
  export const DELETE_MANY: string;
  export const UPDATE_MANY: string;

  // XXX ------------------ "react-admin-core auth" -------------------
  //  See https://github.com/marmelab/react-admin/blob/master/packages/ra-core/src/auth/types.ts

  export type UserCheck = (
    payload: object,
    pathName: string,
    routeParams?: object
  ) => void;

  export const AUTH_LOGIN = 'AUTH_LOGIN';
  export const AUTH_CHECK = 'AUTH_CHECK';
  export const AUTH_ERROR = 'AUTH_ERROR';
  export const AUTH_LOGOUT = 'AUTH_LOGOUT';
  export const AUTH_GET_PERMISSIONS = 'AUTH_GET_PERMISSIONS';

  export type AuthActionType =
    | typeof AUTH_LOGIN
    | typeof AUTH_LOGOUT
    | typeof AUTH_ERROR
    | typeof AUTH_CHECK
    | typeof AUTH_GET_PERMISSIONS;

  // XXX ------------------ "react-admin-core auth" -------------------
  //  See https://github.com/marmelab/react-admin/blob/master/packages/ra-core/src/auth/WithPermissions.tsx

  export interface WithPermissionsChildrenParams {
    permissions: any;
  }

  // XXX ------------------ "react-admin-core" -------------------
  //  See https://github.com/marmelab/react-admin/blob/master/packages/ra-core/src/types.ts

  /**
   * data types
   */

  export type Identifier = string | number;

  export interface Record {
    id: Identifier;

    [key: string]: any;
  }

  export interface RecordMap<RecordType = Record> {
    // Accept strings and numbers as identifiers
    [id: string]: RecordType;

    [id: number]: RecordType;
  }

  export interface Sort {
    field: string;
    order: string;
  }

  export interface Filter {
    [k: string]: any;
  }

  export interface Pagination {
    page: number;
    perPage: number;
  }

  export type ValidUntil = Date;
  /**
   * i18nProvider types
   */

  export const I18N_TRANSLATE = 'I18N_TRANSLATE';
  export const I18N_CHANGE_LOCALE = 'I18N_CHANGE_LOCALE';

  export type Translate = (key: string, options?: any) => string;

  export type I18nProvider = {
    translate: Translate;
    changeLocale: (locale: string, options?: any) => Promise<void>;
    getLocale: () => string;
    [key: string]: any;
  };

  /**
   * authProvider types
   */

  export type AuthProvider = {
    login: (params: any) => Promise<any>;
    logout: (params: any) => Promise<void | string>;
    checkAuth: (params: any) => Promise<void>;
    checkError: (error: any) => Promise<void>;
    getPermissions: (params: any) => Promise<any>;
    [key: string]: any;
  };

  export type LegacyAuthProvider = (
    type: AuthActionType,
    params?: any,
  ) => Promise<any>;

  /**
   * dataProvider types
   */

  export type DataProvider = {
    getList: (
      resource: string,
      params: GetListParams,
    ) => Promise<GetListResult>;

    getOne: (resource: string, params: GetOneParams) => Promise<GetOneResult>;

    getMany: (
      resource: string,
      params: GetManyParams,
    ) => Promise<GetManyResult>;

    getManyReference: (
      resource: string,
      params: GetManyReferenceParams,
    ) => Promise<GetManyReferenceResult>;

    update: (resource: string, params: UpdateParams) => Promise<UpdateResult>;

    updateMany: (
      resource: string,
      params: UpdateManyParams,
    ) => Promise<UpdateManyResult>;

    create: (resource: string, params: CreateParams) => Promise<CreateResult>;

    delete: (resource: string, params: DeleteParams) => Promise<DeleteResult>;

    deleteMany: (
      resource: string,
      params: DeleteManyParams,
    ) => Promise<DeleteManyResult>;

    [key: string]: any;
  };

  export interface GetListParams {
    pagination: Pagination;
    sort: Sort;
    filter: any;
  }

  export interface GetListResult {
    data: Record[];
    total: number;
    validUntil?: ValidUntil;
  }

  export interface GetOneParams {
    id: Identifier;
  }

  export interface GetOneResult {
    data: Record;
    validUntil?: ValidUntil;
  }

  export interface GetManyParams {
    ids: Identifier[];
  }

  export interface GetManyResult {
    data: Record[];
    validUntil?: ValidUntil;
  }

  export interface GetManyReferenceParams {
    target: string;
    id: Identifier;
    pagination: Pagination;
    sort: Sort;
    filter: any;
  }

  export interface GetManyReferenceResult {
    data: Record[];
    total: number;
    validUntil?: ValidUntil;
  }

  export interface UpdateParams {
    id: Identifier;
    data: any;
    previousData: Record;
  }

  export interface UpdateResult {
    data: Record;
    validUntil?: ValidUntil;
  }

  export interface UpdateManyParams {
    ids: Identifier[];
    data: any;
  }

  export interface UpdateManyResult {
    data?: Identifier[];
    validUntil?: ValidUntil;
  }

  export interface CreateParams {
    data: any;
  }

  export interface CreateResult {
    data: Record;
    validUntil?: ValidUntil;
  }

  export interface DeleteParams {
    id: Identifier;
  }

  export interface DeleteResult {
    data?: Record;
  }

  export interface DeleteManyParams {
    ids: Identifier[];
  }

  export interface DeleteManyResult {
    data?: Identifier[];
  }

  export type DataProviderResult =
    | CreateResult
    | DeleteResult
    | DeleteManyResult
    | GetListResult
    | GetManyResult
    | GetManyReferenceResult
    | GetOneResult
    | UpdateResult
    | UpdateManyResult;

  export type DataProviderProxy = {
    getList: (
      resource: string,
      params: GetListParams,
      options?: UseDataProviderOptions,
    ) => Promise<GetListResult>;

    getOne: (
      resource: string,
      params: GetOneParams,
      options?: UseDataProviderOptions,
    ) => Promise<GetOneResult>;

    getMany: (
      resource: string,
      params: GetManyParams,
      options?: UseDataProviderOptions,
    ) => Promise<GetManyResult>;

    getManyReference: (
      resource: string,
      params: GetManyReferenceParams,
      options?: UseDataProviderOptions,
    ) => Promise<GetManyReferenceResult>;

    update: (
      resource: string,
      params: UpdateParams,
      options?: UseDataProviderOptions,
    ) => Promise<UpdateResult>;

    updateMany: (
      resource: string,
      params: UpdateManyParams,
      options?: UseDataProviderOptions,
    ) => Promise<UpdateManyResult>;

    create: (
      resource: string,
      params: CreateParams,
      options?: UseDataProviderOptions,
    ) => Promise<CreateResult>;

    delete: (
      resource: string,
      params: DeleteParams,
      options?: UseDataProviderOptions,
    ) => Promise<DeleteResult>;

    deleteMany: (
      resource: string,
      params: DeleteManyParams,
      options?: UseDataProviderOptions,
    ) => Promise<DeleteManyResult>;

    [key: string]: any;
  };

  export interface UseDataProviderOptions {
    action?: string;
    fetch?: string;
    meta?: object;
    undoable?: boolean;
    onSuccess?: any;
    onFailure?: any;
  }

  export type LegacyDataProvider = (
    type: string,
    resource: string,
    params: any,
  ) => Promise<any>;

  /**
   * Redux state type
   */

  export interface ReduxState {
    admin: {
      ui: {
        optimistic: boolean;
        sidebarOpen: boolean;
        viewVersion: number;
      };
      resources: {
        [name: string]: {
          data: {
            [key: string]: Record;
            [key: number]: Record;
          };
          list: {
            params: any;
            ids: Identifier[];
            loadedOnce: boolean;
            selectedIds: Identifier[];
            total: number;
            cachedRequests?: {
              ids: Identifier[];
              total: number;
              validity: Date;
            };
          };
          validity: {
            [key: string]: Date;
            [key: number]: Date;
          };
        };
      };
      references: {
        oneToMany: {
          [relatedTo: string]: { ids: Identifier[]; total: number };
        };
      };
      loading: number;
      customQueries: {
        [key: string]: any;
      };
    };
    router: {
      location: Location;
    };
  }

  export type InitialState = object | (() => object);

  /**
   * Misc types
   */

  export type Dispatch<T> = T extends (...args: infer A) => any
    ? (...args: A) => void
    : never;

  export type ResourceElement = ReactElement<ResourceProps>;
  export type RenderResourcesFunction = (
    permissions: any,
  ) => ResourceElement[] | Promise<ResourceElement[]>;
  export type AdminChildren = RenderResourcesFunction | ReactNode;

  export interface CustomRoute extends RouteProps {
    noLayout?: boolean;
  }

  export type CustomRoutes = Array<ReactElement<CustomRoute>>;

  export type TitleComponent = string | ReactElement<any>;
  export type CatchAllComponent = ComponentType<{ title?: TitleComponent }>;

  interface LoginComponentProps extends RouteComponentProps {
    title?: TitleComponent;
    theme?: object;
  }

  export type LoginComponent = ComponentType<LoginComponentProps>;
  export type DashboardComponent = ComponentType<WithPermissionsChildrenParams>;

  export interface LayoutProps {
    dashboard?: DashboardComponent;
    logout: ReactNode;
    menu: ComponentType;
    theme: object;
    title?: TitleComponent;
  }

  export type LayoutComponent = ComponentType<LayoutProps>;

  export interface ReactAdminComponentProps {
    basePath: string;
    permissions?: any;
  }

  export interface ReactAdminComponentPropsWithId {
    basePath: string;
    permissions?: any;
    id: Identifier;
  }

  export type ResourceMatch = Match<{
    id?: string;
  }>;

  export interface ResourceProps {
    intent?: 'route' | 'registration';
    match?: ResourceMatch;
    name: string;
    list?: ComponentType<ReactAdminComponentProps>;
    create?: ComponentType<ReactAdminComponentProps>;
    edit?: ComponentType<ReactAdminComponentPropsWithId>;
    show?: ComponentType<ReactAdminComponentPropsWithId>;
    icon?: ComponentType<any>;
    options?: object;
  }

  export interface AdminProps {
    appLayout?: LayoutComponent;
    authProvider?: AuthProvider | LegacyAuthProvider;
    catchAll?: CatchAllComponent;
    children?: AdminChildren;
    customReducers?: object;
    customRoutes?: CustomRoutes;
    customSagas?: any[];
    dashboard?: DashboardComponent;
    dataProvider: DataProvider | LegacyDataProvider;
    history?: History;
    i18nProvider?: I18nProvider;
    initialState?: InitialState;
    layout?: LayoutComponent;
    loading?: ComponentType;
    locale?: string;
    loginPage?: LoginComponent | boolean;
    logoutButton?: ComponentType;
    menu?: ComponentType;
    theme?: object;
    title?: TitleComponent;
  }

  export type Exporter = (
    data: any,
    fetchRelatedRecords: (
      data: any,
      field: string,
      resource: string,
    ) => Promise<any>,
    dataProvider: DataProvider,
    resource?: string,
  ) => Promise<void>;

  export type SetOnSave = (
    onSave?: (values: object, redirect: any) => void,
  ) => void;

  export type FormFunctions = {
    setOnSave?: SetOnSave;
  };
}
