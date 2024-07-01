export const imageUploader = async (imageFile) => {
  const imgBB_URL = import.meta.env.VITE_ImgBB_URL;
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    // Make a POST request to ImgBB's upload API using fetch
    const response = await fetch(`${imgBB_URL}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const responseData = await response.json();

    // Return the ImgBB response
    return responseData.data;
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    throw error;
  }
};
