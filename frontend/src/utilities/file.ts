export async function base64UrlToFile(base64Url: string, fileName: string) {
	const type = base64Url.split(";")[0].split(":")[1];

	console.log(base64Url);
	const response = await fetch(base64Url);

	const blob = new Blob([await response.blob()], { type: type });

	// Convert Blob to File
	return new File([blob], fileName, { type: type });
}

export async function base64UrlsToFiles(
	base64Urls: string[],
	fileNames: string[],
) {
	return Promise.all(
		base64Urls.map((base64Url, index) =>
			base64UrlToFile(base64Url, fileNames[index]),
		),
	);
}

export async function fileToBase64Url(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onloadend = () => {
			const dataUrl = reader.result as string; // Ensure the result is treated as a string
			resolve(dataUrl); // Resolve the promise with the Data URL
		};

		reader.onerror = () => {
			reject(new Error("Error occurred while reading the file."));
		};

		reader.readAsDataURL(file); // Start reading the file
	});
}

export async function filesToBase64Urls(files: File[]) {
	return Promise.all(files.map((file) => fileToBase64Url(file)));
}

export function bufferToFile(buffer: any, filename: string, type: string) {
	const blob = new Blob([new Uint8Array(buffer)], {
		type: type,
	});
	const file = new File([blob], filename, {
		type: type,
	});
	return file;
}

export function generateFileURL(
	file: File | null | undefined,
	timeout: number = 3000,
) {
	const url = file ? URL.createObjectURL(file) : "";
	// Release memory associated with url shortly after it is opened
	setTimeout(() => URL.revokeObjectURL(url), timeout);
	return url;
}

export function openFileInNewWindow(file: File) {
	const url = generateFileURL(file);
	console.log(url);
	window.open(url);
}
