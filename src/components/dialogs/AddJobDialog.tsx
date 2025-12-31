import { useState } from 'react';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useJobs } from '@/hooks/useJobs';

interface AddJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddJobDialog({ open, onOpenChange }: AddJobDialogProps) {
  const { createJob } = useJobs();
  const [formData, setFormData] = useState<{
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string;
    salary_min: string;
    salary_max: string;
    status: 'active' | 'paused' | 'closed';
  }>({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    salary_min: '',
    salary_max: '',
    status: 'active',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await createJob.mutateAsync({
      ...formData,
      requirements: formData.requirements.split(',').map(r => r.trim()).filter(Boolean),
      salary_min: formData.salary_min ? parseInt(formData.salary_min) : undefined,
      salary_max: formData.salary_max ? parseInt(formData.salary_max) : undefined,
    });

    setFormData({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: '',
      salary_min: '',
      salary_max: '',
      status: 'active',
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg glass">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Post New Job</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              Job Title *
            </label>
            <Input 
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Senior Software Engineer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Input 
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                placeholder="Engineering"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                Location
              </label>
              <Input 
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Remote / San Francisco"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Type</label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select 
                value={formData.status} 
                onValueChange={(value: 'active' | 'paused' | 'closed') => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                Salary Min
              </label>
              <Input 
                type="number"
                value={formData.salary_min}
                onChange={(e) => setFormData(prev => ({ ...prev, salary_min: e.target.value }))}
                placeholder="80000"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Salary Max</label>
              <Input 
                type="number"
                value={formData.salary_max}
                onChange={(e) => setFormData(prev => ({ ...prev, salary_max: e.target.value }))}
                placeholder="150000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Requirements (comma separated)</label>
            <Input 
              value={formData.requirements}
              onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
              placeholder="React, TypeScript, 5+ years experience"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Job Description</label>
            <Textarea 
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createJob.isPending}>
              {createJob.isPending ? 'Posting...' : 'Post Job'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
