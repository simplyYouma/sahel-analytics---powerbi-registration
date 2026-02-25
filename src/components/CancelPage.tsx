import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CancelPage() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="flex justify-center mb-6">
        <XCircle className="w-24 h-24 text-red-500" />
      </div>
      <h1 className="text-3xl font-display font-bold text-sahel-navy mb-4">Paiement Annulé</h1>
      <p className="text-lg text-slate-600 mb-8">
        Le processus de paiement a été annulé. Votre inscription n'est pas encore finalisée.
      </p>
      <Link to="/">
        <Button variant="outline">Réessayer l'inscription</Button>
      </Link>
    </div>
  );
}
