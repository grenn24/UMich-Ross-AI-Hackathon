import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { useDispatch, useSelector } from "react-redux";
import { PERSIST, persistStore } from "redux-persist";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";
import errorSliceReducer from "./slices/error.ts";
import localeSliceReducer from "./slices/locale.ts";

// Enable map state variables
enableMapSet();

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["locale"], // persisted slices
};

const rootReducer = combineReducers({
	locale: localeSliceReducer,
	error: errorSliceReducer,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedRootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [PERSIST],
			},
		}),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
