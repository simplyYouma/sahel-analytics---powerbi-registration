import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SuccessPage() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-24 h-24 text-green-500" />
      </div>
      <h1 className="text-3xl font-display font-bold text-sahel-navy mb-4">Paiement Réussi !</h1>
      <p className="text-lg text-slate-600 mb-8">
        Merci pour votre inscription. Votre paiement a été confirmé.
        Vous recevrez bientôt un email avec tous les détails de la formation.
      </p>
      <Link to="/">
        <Button>Retour à l'accueil</Button>
      </Link>
    </div>
  );
}
