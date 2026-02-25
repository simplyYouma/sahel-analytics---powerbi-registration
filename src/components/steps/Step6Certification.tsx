import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';

export default function Step6Certification() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="wantCertificate">Souhaitez-vous obtenir une attestation de fin de formation ?</Label>
        <Select id="wantCertificate" {...register('wantCertificate')}>
          <option value="">Sélectionner...</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </Select>
        {errors.wantCertificate && <p className="text-red-500 text-xs">{errors.wantCertificate.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="source">Comment avez-vous entendu parler de la formation ?</Label>
        <Select id="source" {...register('source')}>
          <option value="">Sélectionner...</option>
          <option value="Réseaux sociaux">Réseaux sociaux</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Recommandation">Recommandation</option>
          <option value="Site web">Site web</option>
          <option value="Autre">Autre</option>
        </Select>
        {errors.source && <p className="text-red-500 text-xs">{errors.source.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactFuture">Acceptez-vous d’être contacté(e) pour d’autres formations futures ?</Label>
        <Select id="contactFuture" {...register('contactFuture')}>
          <option value="">Sélectionner...</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </Select>
        {errors.contactFuture && <p className="text-red-500 text-xs">{errors.contactFuture.message as string}</p>}
      </div>
    </div>
  );
}
