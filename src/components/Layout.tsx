import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-sahel-gold/30 selection:text-sahel-navy">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md border border-white/20 shadow-sm rounded-full px-6 py-3 flex justify-between items-center pointer-events-auto transition-all hover:shadow-md hover:bg-white/90">
            {/* Logo area */}
            <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-sahel-navy text-white rounded-full flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform shadow-lg shadow-sahel-navy/20">
                    SA
                </div>
                <span className="font-display font-bold text-sahel-navy tracking-tight hidden sm:block text-lg">Sahel Analytics</span>
            </Link>
            
            {/* Nav / CTA */}
            <div className="flex items-center gap-4">
                <Link to="/register">
                    <Button size="sm" className="rounded-full bg-sahel-navy hover:bg-sahel-navy/90 text-white px-6 shadow-lg shadow-sahel-navy/20 transition-transform hover:scale-105">
                        S'inscrire
                    </Button>
                </Link>
            </div>
        </div>
      </header>

      <main className="flex-grow pt-28">
        {children}
      </main>

      <footer className="bg-sahel-navy text-white py-20 overflow-hidden relative mt-20">
         {/* Decorative elements */}
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
         
         <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-4 gap-12 mb-20">
                <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white text-sahel-navy rounded-full flex items-center justify-center font-bold text-sm">
                            SA
                        </div>
                        <h3 className="text-2xl font-display font-bold">Sahel Analytics</h3>
                    </div>
                    <p className="text-slate-400 max-w-sm leading-relaxed">
                        Formation d'excellence en Business Intelligence et Analyse de Données. 
                        Transformez votre carrière avec des compétences concrètes et certifiées.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-sahel-gold tracking-wide text-sm uppercase">Formation</h4>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-sahel-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>Programme</a></li>
                        <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-sahel-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>Tarifs</a></li>
                        <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-sahel-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>Mentors</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-sahel-gold tracking-wide text-sm uppercase">Contact</h4>
                    <ul className="space-y-4 text-slate-400 text-sm">
                        <li>FALADIE à côté de l'INPS, Bamako</li>
                        <li>+223 83 77 83 03</li>
                        <li>+223 75 77 36 29</li>
                        <li>
                            <a href="https://sahel-analytics.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-sahel-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                sahel-analytics.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-xs tracking-wide">© {new Date().getFullYear()} Sahel Analytics. Tous droits réservés.</p>
                <div className="flex gap-6">
                    {/* Social icons placeholders */}
                </div>
            </div>
            
            {/* Big Text Background */}
            <div className="absolute -bottom-10 -right-10 text-[15vw] font-bold text-white/[0.02] pointer-events-none select-none whitespace-nowrap font-display leading-none">
                ANALYTICS
            </div>
         </div>
      </footer>
    </div>
  );
}
