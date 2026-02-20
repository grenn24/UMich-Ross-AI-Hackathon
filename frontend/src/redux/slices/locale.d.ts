import { PayloadAction } from "@reduxjs/toolkit";
export declare enum Language {
    EnglishUK = "English (UK)",
    ChineseSimplified = "\u4E2D\u6587\uFF08\u7B80\u4F53\uFF09",
    Japanese = "\u65E5\u672C\u8A9E"
}
export declare const languageCodeMap: Record<Language, string>;
export declare const languageFontMap: Record<string, string>;
export declare const LanguageLocaleMap: {
    "English (UK)": string;
    "\u4E2D\u6587\uFF08\u7B80\u4F53\uFF09": string;
    日本語: string;
};
export declare const getLanguageCode: (language: Language | undefined) => string;
export declare const getLanguageFont: (language: Language) => string;
export interface LocaleSliceState {
    language: Language;
    currency: string;
    timezone: string;
    countryCode: string;
}
export declare const localeSlice: import("@reduxjs/toolkit").Slice<LocaleSliceState, {
    reset: () => LocaleSliceState;
    setLanguage: (state: import("immer").WritableDraft<LocaleSliceState>, action: PayloadAction<Language>) => void;
    setCurrency: (state: import("immer").WritableDraft<LocaleSliceState>, action: PayloadAction<string>) => void;
    setTimezone: (state: import("immer").WritableDraft<LocaleSliceState>, action: PayloadAction<string>) => void;
    setCountryCode: (state: import("immer").WritableDraft<LocaleSliceState>, action: PayloadAction<string>) => void;
}, "locale", "locale", import("@reduxjs/toolkit").SliceSelectors<LocaleSliceState>>;
export declare const reset: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"locale/reset">, setLanguage: import("@reduxjs/toolkit").ActionCreatorWithPayload<Language, "locale/setLanguage">, setCurrency: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "locale/setCurrency">, setTimezone: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "locale/setTimezone">, setCountryCode: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "locale/setCountryCode">;
declare const localeSliceReducer: import("redux").Reducer<LocaleSliceState>;
export default localeSliceReducer;
