import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image, Shield } from 'lucide-react';
import { isValidImageFile, SECURITY_CONFIG } from '@/utils/security';

interface ImageUploadProps {
  onImageSelect: (url: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload = ({ onImageSelect, currentImage, className }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentImage || '');
  const { toast } = useToast();

  const validateImageFile = (file: File): boolean => {
    if (!isValidImageFile(file)) {
      if (!SECURITY_CONFIG.ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a JPEG, PNG, GIF, or WebP image.",
          variant: "destructive",
        });
      } else if (file.size > SECURITY_CONFIG.MAX_FILE_SIZE) {
        toast({
          title: "File Too Large",
          description: `Please upload an image smaller than ${SECURITY_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB.`,
          variant: "destructive",
        });
      }
      return false;
    }
    return true;
  };

  const scanImageForSecurity = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      // Basic security checks - use HTMLImageElement constructor explicitly
      const img = document.createElement('img');
      img.onload = () => {
        // Check for reasonable image dimensions (prevent memory exhaustion)
        if (img.width > 5000 || img.height > 5000) {
          toast({
            title: "Image Too Large",
            description: "Image dimensions are too large. Please use an image smaller than 5000x5000 pixels.",
            variant: "destructive",
          });
          resolve(false);
          return;
        }
        
        // Basic aspect ratio check (prevent extremely skewed images)
        const aspectRatio = img.width / img.height;
        if (aspectRatio > 10 || aspectRatio < 0.1) {
          toast({
            title: "Invalid Image Dimensions",
            description: "Image aspect ratio is too extreme. Please use a more standard image format.",
            variant: "destructive",
          });
          resolve(false);
          return;
        }
        
        resolve(true);
      };
      
      img.onerror = () => {
        toast({
          title: "Invalid Image",
          description: "The uploaded file appears to be corrupted or not a valid image.",
          variant: "destructive",
        });
        resolve(false);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateImageFile(file)) {
      event.target.value = '';
      return;
    }

    setUploading(true);

    // Perform security scan
    const isSecure = await scanImageForSecurity(file);
    if (!isSecure) {
      setUploading(false);
      event.target.value = '';
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      
      // For now, we'll use the data URL directly
      // In a production app, you'd upload to a secure storage service
      onImageSelect(result);
      setUploading(false);
      
      toast({
        title: "Image Selected",
        description: "Image has been successfully validated and selected.",
      });
    };

    reader.onerror = () => {
      toast({
        title: "Upload Error",
        description: "Failed to process the image. Please try again.",
        variant: "destructive",
      });
      setUploading(false);
    };

    reader.readAsDataURL(file);
    event.target.value = '';
  }, [onImageSelect, toast]);

  const handleUrlInput = (url: string) => {
    // Enhanced URL validation
    try {
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Invalid protocol');
      }
      
      // Check for HTTPS in production
      if (urlObj.protocol === 'http:' && window.location.protocol === 'https:') {
        toast({
          title: "Insecure URL",
          description: "HTTPS URLs are required for security. Please use an HTTPS image URL.",
          variant: "destructive",
        });
        return;
      }
      
      if (!/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(url)) {
        toast({
          title: "Invalid Image URL",
          description: "URL must point to a valid image file (.jpg, .jpeg, .png, .gif, .webp)",
          variant: "destructive",
        });
        return;
      }

      // Check for suspicious domains or patterns
      const suspiciousPatterns = [
        /localhost/i,
        /127\.0\.0\.1/,
        /192\.168\./,
        /10\./,
        /172\.16\./,
        /javascript:/i,
        /data:/i
      ];
      
      if (suspiciousPatterns.some(pattern => pattern.test(url))) {
        toast({
          title: "Invalid URL",
          description: "This URL type is not allowed for security reasons.",
          variant: "destructive",
        });
        return;
      }

      setPreview(url);
      onImageSelect(url);
      
      toast({
        title: "Image URL Added",
        description: "Image URL has been successfully validated and added.",
      });
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid HTTPS image URL.",
        variant: "destructive",
      });
    }
  };

  const clearImage = () => {
    setPreview('');
    onImageSelect('');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {preview && (
        <div className="relative">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-32 object-cover rounded-md border"
            onError={() => {
              toast({
                title: "Image Load Error",
                description: "Failed to load image. Please try a different image.",
                variant: "destructive",
              });
              clearImage();
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <label htmlFor="image-upload" className="cursor-pointer">
            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              asChild
            >
              <span>
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Processing...' : 'Upload Image'}
              </span>
            </Button>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Shield className="h-3 w-3" />
          <span>Max size: {SECURITY_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB. Formats: JPEG, PNG, GIF, WebP</span>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or enter HTTPS URL</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="https://example.com/image.jpg"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleUrlInput(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              if (input?.value) {
                handleUrlInput(input.value);
                input.value = '';
              }
            }}
          >
            <Image className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
