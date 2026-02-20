import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Message {
	title?: string;
	content: string;
	type: "info" | "success" | "error" | "warning" | "loading";
	duration?: number;
	variant: "snackbar" | "notification" | "modal";
	key: string | number;
	onOk?: () => void;
	placement?:
		| "top"
		| "topLeft"
		| "topRight"
		| "bottom"
		| "bottomLeft"
		| "bottomRight";
}
export interface ErrorSliceState {
	notFound: boolean;
	internalServerError: boolean;
	forbidden: boolean;
	messages: Message[];
}
const initialState: ErrorSliceState = {
	notFound: false,
	internalServerError: false,
	forbidden: false,
	messages: [],
};
export const errorSlice = createSlice({
	// Name of slice
	name: "error",
	//Declare and initialise slice state variables
	initialState: initialState,
	// Declare reducer functions corresponding to an action type in signup slice
	// Immer provides safe mutation of state fields directly
	reducers: {
		reset: () => initialState,
		setNotFound: (state, action: PayloadAction<boolean>) => {
			state.notFound = action.payload;
		},
		setInternalServerError: (state, action: PayloadAction<boolean>) => {
			state.internalServerError = action.payload;
		},
		setForbidden: (state, action: PayloadAction<boolean>) => {
			state.forbidden = action.payload;
		},
		enqueueMessage: (
			state,
			action: PayloadAction<
				Omit<Message, "key"> & {
					key?: string | number;
				}
			>
		) => {
			// add message to the back
			const message: Message = {
				...action.payload,
				key: action.payload.key ?? uuidv4(),
			};
			state.messages = [...state.messages, message];
		},
		dequeueMessage: (state) => {
			// remove message at the front
			state.messages = state.messages.slice(1);
		},
		clearAllMessages: (state) => {
			state.messages = [];
		},
		removeMessage: (state, action: PayloadAction<string | number>) => {
			state.messages = state.messages.filter(
				(message) => message.key !== action.payload
			);
		},
	},
});

// Action creators are automatically generated for each reducer function using create slice
export const {
	reset,
	setNotFound,
	setInternalServerError,
	setForbidden,
	enqueueMessage,
	dequeueMessage,
	clearAllMessages,
	removeMessage,
} = errorSlice.actions;

const errorSliceReducer = errorSlice.reducer;

export default errorSliceReducer;
