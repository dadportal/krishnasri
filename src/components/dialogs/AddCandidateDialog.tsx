import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCandidates } from '@/hooks/useCandidates';

interface AddCandidateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCandidateDialog({ open, onOpenChange }: AddCandidateDialogProps) {
  const { createCandidate } = useCandidates();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: '',
    experience: '',
    education: '',
    skills: '',
    linkedin: '',
    notes: '',
    status: 'new' as const,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await createCandidate.mutateAsync({
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      match_score: 0,
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      role: '',
      experience: '',
      education: '',
      skills: '',
      linkedin: '',
      notes: '',
      status: 'new',
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg glass">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Add New Candidate</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Full Name *
              </label>
              <Input 
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email
              </label>
              <Input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Phone
              </label>
              <Input 
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 234 567 890"
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
                placeholder="San Francisco, CA"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                Role
              </label>
              <Input 
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                placeholder="Senior Developer"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                Experience
              </label>
              <Input 
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="5 years"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-muted-foreground" />
              Education
            </label>
            <Input 
              value={formData.education}
              onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
              placeholder="B.S. Computer Science"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Skills (comma separated)</label>
            <Input 
              value={formData.skills}
              onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
              placeholder="React, TypeScript, Node.js"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">LinkedIn URL</label>
            <Input 
              value={formData.linkedin}
              onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea 
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes about the candidate..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createCandidate.isPending}>
              {createCandidate.isPending ? 'Adding...' : 'Add Candidate'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
