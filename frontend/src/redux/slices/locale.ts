import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import localeCurrency from "locale-currency";

export enum Language {
	EnglishUK = "English (UK)",
	ChineseSimplified = "中文（简体）",
	Japanese = "日本語",
}

export const languageCodeMap: Record<Language, string> = {
	[Language.EnglishUK]: "en",
	[Language.ChineseSimplified]: "zh",
	[Language.Japanese]: "ja",
};

export const languageFontMap: Record<string, string> = {
	[Language.EnglishUK]: "Outfit",
	[Language.ChineseSimplified]: "Noto Sans SC",
	[Language.Japanese]: "Noto Sans JP",
};

export const LanguageLocaleMap = {
	[Language.EnglishUK]: "en",
	[Language.ChineseSimplified]: "zh-cn",
	[Language.Japanese]: "ja",
};

export const getLanguageCode = (language: Language | undefined) =>
	language ? languageCodeMap[language] : "";

export const getLanguageFont = (language: Language) =>
	languageFontMap[language];

export interface LocaleSliceState {
	language: Language;
	currency: string;
	timezone: string;
	countryCode: string;
}
const initialState: LocaleSliceState = {
	language: Language.EnglishUK,
	currency:
		localeCurrency.getCurrency(
			Intl.DateTimeFormat().resolvedOptions().locale
		) || "USD",
	timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	countryCode: Intl.DateTimeFormat().resolvedOptions().locale.split("-")[1],
};
export const localeSlice = createSlice({
	// Name of slice
	name: "locale",
	//Declare and initialise slice state variables
	initialState: initialState,
	// Declare reducer functions corresponding to an action type in signup slice
	// Immer provides safe mutation of state fields directly
	reducers: {
		reset: () => initialState,
		setLanguage: (state, action: PayloadAction<Language>) => {
			state.language = action.payload;
		},
		setCurrency: (state, action: PayloadAction<string>) => {
			state.currency = action.payload;
		},
		setTimezone: (state, action: PayloadAction<string>) => {
			state.timezone = action.payload;
		},
		setCountryCode: (state, action: PayloadAction<string>) => {
			state.countryCode = action.payload;
		},
	},
});

// Action creators are automatically generated for each reducer function using create slice
export const { reset, setLanguage, setCurrency, setTimezone, setCountryCode } =
	localeSlice.actions;

const localeSliceReducer = localeSlice.reducer;

export default localeSliceReducer;
