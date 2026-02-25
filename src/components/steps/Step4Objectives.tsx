import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';

export default function Step4Objectives() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="motivation">Pourquoi souhaitez-vous suivre cette formation ?</Label>
        <Textarea 
          id="motivation" 
          {...register('motivation')} 
          placeholder="Décrivez vos motivations..." 
          className="min-h-[120px]"
        />
        {errors.motivation && <p className="text-red-500 text-xs">{errors.motivation.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="expectations">Quels résultats attendez-vous concrètement ?</Label>
        <Textarea 
          id="expectations" 
          {...register('expectations')} 
          placeholder="Vos attentes..." 
          className="min-h-[120px]"
        />
        {errors.expectations && <p className="text-red-500 text-xs">{errors.expectations.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="usage">Comment comptez-vous utiliser les compétences acquises ?</Label>
        <Select id="usage" {...register('usage')}>
          <option value="">Sélectionner...</option>
          <option value="Emploi actuel">Dans mon emploi actuel</option>
          <option value="Évolution pro">Pour évoluer professionnellement</option>
          <option value="Création dashboards">Pour créer des dashboards pour mon entreprise</option>
          <option value="Consultant">Pour devenir consultant</option>
          <option value="CV">Pour enrichir mon CV</option>
          <option value="Autre">Autre</option>
        </Select>
        {errors.usage && <p className="text-red-500 text-xs">{errors.usage.message as string}</p>}
      </div>
    </div>
  );
}
