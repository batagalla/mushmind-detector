
import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  CircularProgress,
  Container,
  styled,
  useTheme,
  alpha
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "@/context/AuthContext";
import { imageAPI } from "@/services/api";
import { toast } from "sonner";

// Styled components
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const PreviewImage = styled('img')({
  maxWidth: '100%',
  maxHeight: '300px',
  objectFit: 'contain',
  borderRadius: '8px',
});

const ImageUpload = ({ onImageSelected, isLoading, onIdentify }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { isAuthenticated } = useAuth() || {};
  const theme = useTheme();
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size should be less than 10MB");
      return;
    }
    
    // Create a preview URL for the selected image
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    if (isAuthenticated) {
      // If user is authenticated, upload the image to the server
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("image", file);
        
        const response = await imageAPI.uploadImage(formData);
        const uploadedImage = response.data.image;
        
        // Pass the uploaded image data to the parent component
        onImageSelected(uploadedImage);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
        // Still allow preview for identification
        onImageSelected(file);
      } finally {
        setUploading(false);
      }
    } else {
      // If not authenticated, just use the local preview
      onImageSelected(file);
    }
  };

  const handleReset = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onImageSelected(null);
  };

  return (
    <Container maxWidth="lg" id="image-uploader" sx={{ py: 6 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Upload a Mushroom Photo
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          Upload a clear photo of a mushroom to identify it and determine if it's safe to eat.
          {!isAuthenticated && (
            <Typography component="span" color="warning.main">
              {" "}Log in to save your identification results.
            </Typography>
          )}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            maxWidth: 600,
            margin: '0 auto',
          }}>
            {previewUrl ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 2 }}>
                <Box sx={{ 
                  width: '100%', 
                  maxHeight: 500,
                  overflow: 'hidden',
                  borderRadius: 2,
                  boxShadow: 2
                }}>
                  <PreviewImage src={previewUrl} alt="Mushroom preview" />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleReset}
                    disabled={isLoading || uploading}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onIdentify}
                    disabled={isLoading || uploading}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Identify Mushroom"
                    )}
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box 
                sx={{ 
                  border: '2px dashed',
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  borderRadius: 2, 
                  p: 4, 
                  textAlign: 'center',
                  width: '100%',
                  cursor: 'pointer',
                  '&:hover': { 
                    borderColor: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.04)
                  },
                  transition: 'all 0.2s'
                }}
              >
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  disabled={uploading}
                  sx={{ mb: 2 }}
                >
                  {uploading ? "Uploading..." : "Upload Image"}
                  <VisuallyHiddenInput 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    disabled={uploading}
                  />
                </Button>
                <Typography variant="body2" color="textSecondary">
                  Supported formats: JPEG, PNG, WebP (max 10MB)
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ImageUpload;
