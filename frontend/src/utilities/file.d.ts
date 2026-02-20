export declare function base64UrlToFile(base64Url: string, fileName: string): Promise<File>;
export declare function base64UrlsToFiles(base64Urls: string[], fileNames: string[]): Promise<File[]>;
export declare function fileToBase64Url(file: File): Promise<string>;
export declare function filesToBase64Urls(files: File[]): Promise<string[]>;
export declare function bufferToFile(buffer: any, filename: string, type: string): File;
export declare function generateFileURL(file: File | null | undefined, timeout?: number): string;
export declare function openFileInNewWindow(file: File): void;
