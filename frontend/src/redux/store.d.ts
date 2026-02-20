declare const rootReducer: import("redux").Reducer<{
    locale: import("./slices/locale.ts").LocaleSliceState;
    error: import("./slices/error.ts").ErrorSliceState;
}, import("redux").UnknownAction, Partial<{
    locale: import("./slices/locale.ts").LocaleSliceState | undefined;
    error: import("./slices/error.ts").ErrorSliceState | undefined;
}>>;
declare const store: import("@reduxjs/toolkit").EnhancedStore<Partial<{
    locale: import("./slices/locale.ts").LocaleSliceState | undefined;
    error: import("./slices/error.ts").ErrorSliceState | undefined;
}> & import("redux-persist/es/persistReducer").PersistPartial, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<Partial<{
        locale: import("./slices/locale.ts").LocaleSliceState | undefined;
        error: import("./slices/error.ts").ErrorSliceState | undefined;
    }> & import("redux-persist/es/persistReducer").PersistPartial, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export declare const persistor: import("redux-persist").Persistor;
export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export declare const useAppDispatch: import("react-redux").UseDispatch<import("redux-thunk").ThunkDispatch<Partial<{
    locale: import("./slices/locale.ts").LocaleSliceState | undefined;
    error: import("./slices/error.ts").ErrorSliceState | undefined;
}> & import("redux-persist/es/persistReducer").PersistPartial, undefined, import("redux").UnknownAction> & import("redux").Dispatch<import("redux").UnknownAction>>;
export declare const useAppSelector: import("react-redux").UseSelector<{
    locale: import("./slices/locale.ts").LocaleSliceState;
    error: import("./slices/error.ts").ErrorSliceState;
}>;
