import imageCompression from "browser-image-compression";

export async function handleImageUpload(event) {
	const imageFile = event;
	const options = {
		maxSizeMB: 0.4,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	};
	try {
		const compressedFile = await imageCompression(imageFile, options);
		//await uploadToServer(compressedFile); // write your own logic
		return compressedFile
	} catch (error) {
		console.log(error);
	}
}
