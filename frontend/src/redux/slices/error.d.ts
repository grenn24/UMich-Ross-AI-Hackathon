import { PayloadAction } from "@reduxjs/toolkit";
interface Message {
    title?: string;
    content: string;
    type: "info" | "success" | "error" | "warning" | "loading";
    duration?: number;
    variant: "snackbar" | "notification" | "modal";
    key: string | number;
    onOk?: () => void;
    placement?: "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight";
}
export interface ErrorSliceState {
    notFound: boolean;
    internalServerError: boolean;
    forbidden: boolean;
    messages: Message[];
}
export declare const errorSlice: import("@reduxjs/toolkit").Slice<ErrorSliceState, {
    reset: () => ErrorSliceState;
    setNotFound: (state: import("immer").WritableDraft<ErrorSliceState>, action: PayloadAction<boolean>) => void;
    setInternalServerError: (state: import("immer").WritableDraft<ErrorSliceState>, action: PayloadAction<boolean>) => void;
    setForbidden: (state: import("immer").WritableDraft<ErrorSliceState>, action: PayloadAction<boolean>) => void;
    enqueueMessage: (state: import("immer").WritableDraft<ErrorSliceState>, action: PayloadAction<Omit<Message, "key"> & {
        key?: string | number;
    }>) => void;
    dequeueMessage: (state: import("immer").WritableDraft<ErrorSliceState>) => void;
    clearAllMessages: (state: import("immer").WritableDraft<ErrorSliceState>) => void;
    removeMessage: (state: import("immer").WritableDraft<ErrorSliceState>, action: PayloadAction<string | number>) => void;
}, "error", "error", import("@reduxjs/toolkit").SliceSelectors<ErrorSliceState>>;
export declare const reset: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"error/reset">, setNotFound: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "error/setNotFound">, setInternalServerError: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "error/setInternalServerError">, setForbidden: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "error/setForbidden">, enqueueMessage: import("@reduxjs/toolkit").ActionCreatorWithPayload<Omit<Message, "key"> & {
    key?: string | number;
}, "error/enqueueMessage">, dequeueMessage: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"error/dequeueMessage">, clearAllMessages: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"error/clearAllMessages">, removeMessage: import("@reduxjs/toolkit").ActionCreatorWithPayload<string | number, "error/removeMessage">;
declare const errorSliceReducer: import("redux").Reducer<ErrorSliceState>;
export default errorSliceReducer;
