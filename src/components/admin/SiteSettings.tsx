
import { useState } from 'react';
import { useSiteSettings, useUpdateSiteSetting } from '@/hooks/useSiteSettings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const SiteSettings = () => {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSetting = useUpdateSiteSetting();
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updates = Object.entries(formData).map(([key, value]) =>
        updateSetting.mutateAsync({ key, value })
      );
      await Promise.all(updates);
      toast({ title: "Settings updated successfully!" });
      setFormData({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) return <div>Loading settings...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Site Settings</h2>
        <p className="text-gray-600">Configure your website settings</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings?.filter(setting => 
                ['site_name', 'site_description', 'contact_email', 'phone_number', 'address'].includes(setting.key)
              ).map((setting) => (
                <div key={setting.id}>
                  <label className="block text-sm font-medium mb-2 capitalize">
                    {setting.key.replace('_', ' ')}
                  </label>
                  <Input
                    value={formData[setting.key] ?? setting.value}
                    onChange={(e) => handleInputChange(setting.key, e.target.value)}
                    placeholder={setting.description}
                  />
                  <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Social Media Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings?.filter(setting => 
                setting.key.startsWith('social_')
              ).map((setting) => (
                <div key={setting.id}>
                  <label className="block text-sm font-medium mb-2 capitalize">
                    {setting.key.replace('social_', '').replace('_', ' ')} URL
                  </label>
                  <Input
                    type="url"
                    value={formData[setting.key] ?? setting.value}
                    onChange={(e) => handleInputChange(setting.key, e.target.value)}
                    placeholder={setting.description}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={updateSetting.isPending}>
              {updateSetting.isPending ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SiteSettings;
