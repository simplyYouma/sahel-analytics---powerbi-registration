import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';

export default function Step2Professional() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="status">Statut actuel</Label>
        <Select id="status" {...register('status')}>
          <option value="">Sélectionner...</option>
          <option value="Étudiant">Étudiant</option>
          <option value="Salarié">Salarié</option>
          <option value="Entrepreneur">Entrepreneur</option>
          <option value="Freelance">Freelance</option>
          <option value="En recherche d’emploi">En recherche d’emploi</option>
          <option value="Autre">Autre</option>
        </Select>
        {errors.status && <p className="text-red-500 text-xs">{errors.status.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="domain">Domaine d’activité</Label>
        <Input id="domain" {...register('domain')} placeholder="Ex: Finance, Marketing, IT..." />
        {errors.domain && <p className="text-red-500 text-xs">{errors.domain.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization">Organisation / Entreprise (si applicable)</Label>
        <Input id="organization" {...register('organization')} placeholder="Nom de l'entreprise" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="position">Poste occupé</Label>
        <Input id="position" {...register('position')} placeholder="Ex: Analyste Financier" />
      </div>
    </div>
  );
}
