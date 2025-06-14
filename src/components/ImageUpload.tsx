
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image } from 'lucide-react';

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
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a JPEG, PNG, GIF, or WebP image.",
        variant: "destructive",
      });
      return false;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateImageFile(file)) {
      event.target.value = '';
      return;
    }

    setUploading(true);

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
        description: "Image has been successfully selected.",
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
    // Basic URL validation
    try {
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Invalid protocol');
      }
      
      if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(url)) {
        toast({
          title: "Invalid Image URL",
          description: "URL must point to a valid image file (.jpg, .jpeg, .png, .gif, .webp)",
          variant: "destructive",
        });
        return;
      }

      setPreview(url);
      onImageSelect(url);
      
      toast({
        title: "Image URL Added",
        description: "Image URL has been successfully added.",
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

        <div className="text-xs text-gray-500">
          Max size: 5MB. Formats: JPEG, PNG, GIF, WebP
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or enter URL</span>
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
