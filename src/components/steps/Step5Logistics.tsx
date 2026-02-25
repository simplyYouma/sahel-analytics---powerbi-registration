import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';

export default function Step5Logistics() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="participationMode">Mode de participation</Label>
        <Select id="participationMode" {...register('participationMode')}>
          <option value="">Sélectionner...</option>
          <option value="Présentiel">Présentiel</option>
          <option value="En ligne">En ligne</option>
        </Select>
        {errors.participationMode && <p className="text-red-500 text-xs">{errors.participationMode.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="availableSaturdays">Êtes-vous disponible les samedis 10h–13h aux dates indiquées ?</Label>
        <Select id="availableSaturdays" {...register('availableSaturdays')}>
          <option value="">Sélectionner...</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </Select>
        {errors.availableSaturdays && <p className="text-red-500 text-xs">{errors.availableSaturdays.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hasLaptop">Disposez-vous d’un ordinateur portable personnel ?</Label>
        <Select id="hasLaptop" {...register('hasLaptop')}>
          <option value="">Sélectionner...</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </Select>
        {errors.hasLaptop && <p className="text-red-500 text-xs">{errors.hasLaptop.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hasInternet">Avez-vous une connexion internet stable ?</Label>
        <Select id="hasInternet" {...register('hasInternet')}>
          <option value="">Sélectionner...</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </Select>
        {errors.hasInternet && <p className="text-red-500 text-xs">{errors.hasInternet.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="readyToInstall">Êtes-vous prêt(e) à installer Power BI Desktop avant le début ?</Label>
        <Select id="readyToInstall" {...register('readyToInstall')}>
          <option value="">Sélectionner...</option>
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </Select>
        {errors.readyToInstall && <p className="text-red-500 text-xs">{errors.readyToInstall.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="paymentMode">Mode de paiement envisagé</Label>
        <Select id="paymentMode" {...register('paymentMode')}>
          <option value="">Sélectionner...</option>
          <option value="Intégral">Paiement intégral</option>
          <option value="Deux tranches">Paiement en deux tranches</option>
        </Select>
        {errors.paymentMode && <p className="text-red-500 text-xs">{errors.paymentMode.message as string}</p>}
      </div>
    </div>
  );
}
