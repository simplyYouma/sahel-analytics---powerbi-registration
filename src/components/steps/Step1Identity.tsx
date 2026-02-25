import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { CountrySelect } from '@/components/ui/CountrySelect';

export default function Step1Identity() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nom et Prénom</Label>
          <Input id="fullName" {...register('fullName')} placeholder="Ex: Moussa Diarra" />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Genre</Label>
          <Select id="gender" {...register('gender')}>
            <option value="">Sélectionner...</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Ne pas préciser">Préfère ne pas préciser</option>
          </Select>
          {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Âge</Label>
          <Input 
            id="age" 
            type="number" 
            min="0"
            {...register('age')} 
            placeholder="Ex: 25" 
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e') {
                e.preventDefault();
              }
            }}
          />
          {errors.age && <p className="text-red-500 text-xs">{errors.age.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Numéro de téléphone (WhatsApp actif ?)</Label>
          <Input id="phone" type="tel" {...register('phone')} placeholder="+223 00 00 00 00" />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message as string}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email">Email professionnel</Label>
          <Input id="email" type="email" {...register('email')} placeholder="Ex: contact@entreprise.com" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Pays</Label>
          <CountrySelect name="country" />
          {errors.country && <p className="text-red-500 text-xs">{errors.country.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Ville</Label>
          <Input id="city" {...register('city')} placeholder="Ex: Bamako" />
          {errors.city && <p className="text-red-500 text-xs">{errors.city.message as string}</p>}
        </div>
      </div>
    </div>
  );
}
