import imageCompression from "browser-image-compression";

export async function handleImageUpload(event, uploadToServer) {
	const imageFile = event.target.files[0];
	const options = {
		maxSizeMB: 0.4,
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	};
	try {
		const compressedFile = await imageCompression(imageFile, options);
		await uploadToServer(compressedFile); // write your own logic
	} catch (error) {
		console.log(error);
	}
}
