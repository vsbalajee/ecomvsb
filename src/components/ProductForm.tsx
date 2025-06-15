
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useCategories } from '@/hooks/useCategories';
import { useQueryClient } from '@tanstack/react-query';
import AdminProtectedComponent from './AdminProtectedComponent';
import ImageUpload from './ImageUpload';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category_id: string;
  image_url: string;
  sku: string;
  stock_quantity: number;
}

const ProductForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: categories = [] } = useCategories();
  
  const form = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category_id: '',
      image_url: '',
      sku: '',
      stock_quantity: 0,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);

    // Enhanced client-side validation
    if (data.price <= 0) {
      toast({
        title: "Invalid Price",
        description: "Price must be greater than 0.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (data.stock_quantity < 0) {
      toast({
        title: "Invalid Stock",
        description: "Stock quantity cannot be negative.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (!data.image_url) {
      toast({
        title: "Image Required",
        description: "Please upload an image or provide an image URL.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .insert({
          ...data,
          supplier_id: '00000000-0000-0000-0000-000000000001', // Default supplier
          is_active: true,
        });

      if (error) {
        console.error('Error adding product:', error);
        
        // Enhanced error handling
        if (error.message.includes('duplicate key')) {
          toast({
            title: "Duplicate SKU",
            description: "A product with this SKU already exists.",
            variant: "destructive",
          });
        } else if (error.message.includes('permission denied')) {
          toast({
            title: "Permission Denied",
            description: "You don't have permission to add products.",
            variant: "destructive",
          });
        } else if (error.message.includes('foreign key')) {
          toast({
            title: "Invalid Category",
            description: "The selected category is invalid.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to add product. Please check your input and try again.",
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Product Added",
        description: "The product has been successfully added to your catalog.",
      });

      // Refresh products list
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowDialog(false);
      form.reset();
    } catch (error) {
      console.error('Unexpected error adding product:', error);
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminProtectedComponent fallback={null}>
      <div className="space-y-4">
        <Button onClick={() => setShowDialog(true)} className="bg-orange-500 hover:bg-orange-600">
          Add New Product
        </Button>

        {showDialog && (
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Add a new product to your catalog. Fill in all the required fields.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ 
                      required: 'Product name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                      maxLength: { value: 100, message: 'Name must be less than 100 characters' }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    rules={{
                      maxLength: { value: 500, message: 'Description must be less than 500 characters' }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter product description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      rules={{ 
                        required: 'Price is required', 
                        min: { value: 0.01, message: 'Price must be greater than 0' },
                        max: { value: 99999.99, message: 'Price must be less than $100,000' }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.01" 
                              min="0.01"
                              max="99999.99"
                              placeholder="0.00" 
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stock_quantity"
                      rules={{ 
                        required: 'Stock quantity is required', 
                        min: { value: 0, message: 'Stock cannot be negative' },
                        max: { value: 999999, message: 'Stock must be less than 1,000,000' }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock Quantity</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0"
                              max="999999"
                              placeholder="0" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="category_id"
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sku"
                    rules={{ 
                      required: 'SKU is required',
                      pattern: {
                        value: /^[A-Z0-9-_]+$/,
                        message: 'SKU can only contain uppercase letters, numbers, hyphens, and underscores'
                      },
                      minLength: { value: 3, message: 'SKU must be at least 3 characters' },
                      maxLength: { value: 20, message: 'SKU must be less than 20 characters' }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter product SKU (e.g., PROD-001)" 
                            {...field}
                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image_url"
                    rules={{ required: 'Image is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Image</FormLabel>
                        <FormControl>
                          <ImageUpload
                            onImageSelect={field.onChange}
                            currentImage={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="bg-orange-500 hover:bg-orange-600">
                      {isSubmitting ? 'Adding...' : 'Add Product'}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminProtectedComponent>
  );
};

export default ProductForm;
