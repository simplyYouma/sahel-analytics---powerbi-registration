import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';

export default function Step7Compliance() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
        <h3 className="font-bold mb-2">Protection des données (RGPD)</h3>
        <p>
          Les informations recueillies sur ce formulaire sont enregistrées dans un fichier informatisé par Sahel Analytics pour la gestion des inscriptions à la formation PowerBI.
          Elles sont conservées pendant la durée de la formation et sont destinées à l'équipe pédagogique.
        </p>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox id="gdprAccepted" {...register('gdprAccepted')} className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="gdprAccepted" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            J’accepte que mes données soient utilisées uniquement dans le cadre de cette formation.
          </Label>
          {errors.gdprAccepted && <p className="text-red-500 text-xs">{errors.gdprAccepted.message as string}</p>}
        </div>
      </div>
    </div>
  );
}
