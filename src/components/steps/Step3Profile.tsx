import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';

export default function Step3Profile() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="workedWithData">Avez-vous déjà travaillé avec des données ?</Label>
        <Select id="workedWithData" {...register('workedWithData')}>
          <option value="">Sélectionner...</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </Select>
        {errors.workedWithData && <p className="text-red-500 text-xs">{errors.workedWithData.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataLevel">Niveau en analyse de données</Label>
        <Select id="dataLevel" {...register('dataLevel')}>
          <option value="">Sélectionner...</option>
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Avancé">Avancé</option>
        </Select>
        {errors.dataLevel && <p className="text-red-500 text-xs">{errors.dataLevel.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label>Outils déjà utilisés (cases multiples)</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {['Excel', 'Google Sheets', 'SQL', 'Power BI', 'Tableau', 'Python', 'Aucun'].map((tool) => (
            <div key={tool} className="flex items-center space-x-2">
              <Checkbox id={`tool-${tool}`} value={tool} {...register('tools')} />
              <label htmlFor={`tool-${tool}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {tool}
              </label>
            </div>
          ))}
        </div>
        {errors.tools && <p className="text-red-500 text-xs">{errors.tools.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="createdDashboard">Avez-vous déjà créé un tableau de bord ?</Label>
        <Select id="createdDashboard" {...register('createdDashboard')}>
          <option value="">Sélectionner...</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </Select>
        {errors.createdDashboard && <p className="text-red-500 text-xs">{errors.createdDashboard.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="knowsDax">Savez-vous ce qu’est le DAX ?</Label>
        <Select id="knowsDax" {...register('knowsDax')}>
          <option value="">Sélectionner...</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
          <option value="Entendu parler">J’en ai entendu parler</option>
        </Select>
        {errors.knowsDax && <p className="text-red-500 text-xs">{errors.knowsDax.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="createdSurvey">Avez-vous déjà conçu un questionnaire ou une enquête ?</Label>
        <Select id="createdSurvey" {...register('createdSurvey')}>
          <option value="">Sélectionner...</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </Select>
        {errors.createdSurvey && <p className="text-red-500 text-xs">{errors.createdSurvey.message as string}</p>}
      </div>
    </div>
  );
}
