import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';

export default function Step8Comments() {
  const { register } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="comments">Avez-vous des besoins spécifiques ou remarques particulières ?</Label>
        <Textarea 
          id="comments" 
          {...register('comments')} 
          placeholder="Vos commentaires..." 
          className="min-h-[120px]"
        />
      </div>
    </div>
  );
}
