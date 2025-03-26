
/**
 * Validates an image file for size and type
 * @param file The file to validate
 * @param maxSizeMB Maximum file size in MB
 * @returns An object containing validation result and error message if any
 */
export const validateImage = (file: File, maxSizeMB = 10): { valid: boolean; error?: string } => {
  // Check if the file is an image
  if (!file.type.match("image.*")) {
    return { valid: false, error: "Please select an image file" };
  }

  // Check file size
  if (file.size > maxSizeMB * 1024 * 1024) {
    return { valid: false, error: `File size should be less than ${maxSizeMB}MB` };
  }

  return { valid: true };
};

/**
 * Resizes an image to the specified maximum width and height
 * @param file The image file to resize
 * @param maxWidth Maximum width of the resized image
 * @param maxHeight Maximum height of the resized image
 * @returns Promise that resolves to a Blob containing the resized image
 */
export const resizeImage = (
  file: File,
  maxWidth = 800,
  maxHeight = 800
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate the new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create blob"));
              return;
            }
            resolve(blob);
          },
          file.type,
          0.85 // Quality parameter
        );
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Converts a file to a base64 string
 * @param file The file to convert
 * @returns Promise that resolves to the base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};
