import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Check, BarChart2, PieChart, TrendingUp, Database } from 'lucide-react';
import RegistrationTicker from './RegistrationTicker';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-10 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sahel-gold/10 text-sahel-gold text-sm font-medium mb-8 border border-sahel-gold/20 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sahel-gold opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-sahel-gold"></span>
                        </span>
                        Prochaine session : Mars 2026
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-sahel-navy mb-8 leading-[1.1] tracking-tight">
                        Donnez du sens à <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sahel-navy via-sahel-blue to-sahel-gold animate-gradient-x">vos données.</span>
                    </h1>
                    
                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Maîtrisez Power BI en 3 semaines. Une formation intensive et pratique pour créer des tableaux de bord qui impactent les décisions.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/register">
                            <Button size="lg" className="h-14 px-8 rounded-full bg-sahel-navy hover:bg-sahel-navy/90 text-lg shadow-xl shadow-sahel-navy/20 transition-all hover:scale-105 font-medium">
                                Réserver ma place
                            </Button>
                        </Link>
                        <a href="#programme" className="text-sahel-navy font-medium hover:text-sahel-blue transition-colors flex items-center gap-2 px-6 py-4 rounded-full hover:bg-slate-50">
                            Voir le programme <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-sahel-gold/10 rounded-full blur-3xl mix-blend-multiply opacity-70"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-sahel-blue/10 rounded-full blur-3xl mix-blend-multiply opacity-70"></div>
            <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl mix-blend-multiply opacity-50"></div>
        </div>
      </section>

      {/* Ticker / Scrolling Banner */}
      <RegistrationTicker />

      {/* Bento Grid Section for Benefits */}
      <section id="programme" className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-sahel-navy mb-4">Ce que vous allez maîtriser</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Un programme complet conçu pour vous rendre opérationnel immédiatement.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Large Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100 relative overflow-hidden group hover:border-sahel-navy/10 transition-colors"
                >
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-sahel-navy border border-slate-100">
                            <BarChart2 className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold text-sahel-navy mb-4">Visualisation Avancée</h3>
                        <p className="text-slate-600 max-w-md leading-relaxed">
                            Apprenez à choisir les bons graphiques. Transformez des tableaux Excel illisibles en dashboards interactifs clairs et percutants qui racontent une histoire.
                        </p>
                    </div>
                    <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-white/80 to-transparent pointer-events-none"></div>
                    {/* Decorative chart UI */}
                    <div className="absolute -right-12 -bottom-12 w-72 h-56 bg-white rounded-tl-3xl shadow-xl border border-slate-100 p-6 opacity-90 group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                        <div className="flex gap-3 items-end h-full pb-2 justify-center">
                            <div className="w-10 h-[40%] bg-sahel-gold/80 rounded-t-lg"></div>
                            <div className="w-10 h-[70%] bg-sahel-navy/80 rounded-t-lg"></div>
                            <div className="w-10 h-[50%] bg-slate-200 rounded-t-lg"></div>
                            <div className="w-10 h-[85%] bg-sahel-navy rounded-t-lg"></div>
                        </div>
                    </div>
                </motion.div>

                {/* Tall Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="md:row-span-2 bg-sahel-navy text-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-sahel-gold backdrop-blur-sm border border-white/10">
                            <Database className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Modélisation & DAX</h3>
                        <p className="text-slate-300 mb-8 leading-relaxed">
                            Ne vous limitez plus. Apprenez le langage DAX pour créer des mesures complexes et modélisez vos données comme un pro.
                        </p>
                        <ul className="space-y-4">
                            {['Nettoyage Power Query', 'Modèle en étoile', 'Mesures DAX', 'KPIs dynamiques'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-300 group-hover:text-white transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-sahel-gold/20 flex items-center justify-center text-sahel-gold shrink-0">
                                        <Check className="w-3.5 h-3.5" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sahel-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-sahel-gold/20 transition-colors duration-500"></div>
                </motion.div>

                {/* Medium Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:border-sahel-blue/20 transition-all duration-300 group"
                >
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600 group-hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-sahel-navy mb-2">Business Intelligence</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Passez de l'analyse descriptive à l'analyse décisionnelle. Automatisez vos reportings pour gagner du temps.
                    </p>
                </motion.div>

                {/* Medium Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300 group"
                >
                    <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                        <PieChart className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-sahel-navy mb-2">Certification</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Validez vos compétences avec une attestation reconnue et un projet portfolio concret à présenter.
                    </p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Practical Details Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100">
                <h2 className="text-3xl font-display font-bold text-sahel-navy mb-8 text-center">Détails Pratiques</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sahel-gold shadow-sm shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-sahel-navy">Dates & Horaires</h4>
                                <p className="text-slate-600">Les Samedis 26 Mars, 4 et 11 Avril</p>
                                <p className="text-slate-600">10:00H - 13:00H</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sahel-gold shadow-sm shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-sahel-navy">Lieu</h4>
                                <p className="text-slate-600">Sahel Analytics, Faladié</p>
                                <p className="text-slate-500 text-sm">(à proximité immédiate de l’INPS)</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sahel-gold shadow-sm shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-sahel-navy">Tarif</h4>
                                <p className="text-2xl font-bold text-sahel-navy">37 500 FCFA</p>
                                <p className="text-slate-500 text-sm">Paiement en 2 tranches possible</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sahel-gold shadow-sm shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-sahel-navy">Contacts</h4>
                                <p className="text-slate-600">+223 83 77 83 03</p>
                                <p className="text-slate-600">+223 79 27 25 98</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-10 text-center pt-8 border-t border-slate-200">
                    <a href="https://sahel-analytics.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sahel-navy font-medium hover:text-sahel-gold transition-colors">
                        Visiter notre site web <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-12 md:p-24 text-center shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-sahel-navy mb-6">Prêt à transformer votre carrière ?</h2>
                    <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
                        Rejoignez la prochaine cohorte. Places limitées pour garantir un suivi personnalisé.
                    </p>
                    <Link to="/register">
                        <Button size="lg" className="h-16 px-12 rounded-full bg-sahel-gold text-sahel-navy hover:bg-sahel-gold/90 font-bold text-xl shadow-xl shadow-sahel-gold/20 transition-transform hover:scale-105">
                            S'inscrire maintenant
                        </Button>
                    </Link>
                    <p className="mt-8 text-sm text-slate-400 font-medium tracking-wide uppercase">
                        Formation certifiante • Éligible financement • Support post-formation
                    </p>
                </div>
                
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sahel-navy via-sahel-blue to-sahel-gold"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-sahel-gold/5 rounded-full blur-3xl pointer-events-none group-hover:bg-sahel-gold/10 transition-colors duration-700"></div>
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-sahel-navy/5 rounded-full blur-3xl pointer-events-none group-hover:bg-sahel-navy/10 transition-colors duration-700"></div>
            </div>
        </div>
      </section>
    </div>
  );
}
