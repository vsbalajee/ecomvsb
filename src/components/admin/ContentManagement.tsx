
import { useState } from 'react';
import { useContentPages, useCreateContentPage, useUpdateContentPage, useDeleteContentPage } from '@/hooks/useContentPages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContentManagement = () => {
  const { data: pages, isLoading } = useContentPages();
  const createPage = useCreateContentPage();
  const updatePage = useUpdateContentPage();
  const deletePage = useDeleteContentPage();
  const { toast } = useToast();

  const [editingPage, setEditingPage] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    content: '',
    meta_description: '',
    is_published: false
  });

  const resetForm = () => {
    setFormData({
      slug: '',
      title: '',
      content: '',
      meta_description: '',
      is_published: false
    });
    setEditingPage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPage) {
        await updatePage.mutateAsync({ id: editingPage.id, ...formData });
        toast({ title: "Page updated successfully!" });
      } else {
        await createPage.mutateAsync(formData);
        toast({ title: "Page created successfully!" });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save page",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (page: any) => {
    setEditingPage(page);
    setFormData({
      slug: page.slug,
      title: page.title,
      content: page.content || '',
      meta_description: page.meta_description || '',
      is_published: page.is_published
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        await deletePage.mutateAsync(id);
        toast({ title: "Page deleted successfully!" });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete page",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) return <div>Loading pages...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Content Management</h2>
          <p className="text-gray-600">Manage website pages and content</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              New Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingPage ? 'Edit Page' : 'Create New Page'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="page-slug"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Page Title"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Meta Description</label>
                <Input
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="SEO meta description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Page content..."
                  rows={10}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                />
                <label className="text-sm font-medium">Published</label>
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit" disabled={createPage.isPending || updatePage.isPending}>
                  {(createPage.isPending || updatePage.isPending) ? 'Saving...' : 'Save Page'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {pages?.map((page) => (
          <Card key={page.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{page.title}</span>
                    <Badge variant={page.is_published ? "default" : "secondary"}>
                      {page.is_published ? "Published" : "Draft"}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600">/{page.slug}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(page)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDelete(page.id)}
                    disabled={deletePage.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{page.meta_description}</p>
              <div className="text-sm text-gray-500">
                Created: {new Date(page.created_at).toLocaleDateString()} | 
                Updated: {new Date(page.updated_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}

        {pages?.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No pages created yet. Create your first page!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
