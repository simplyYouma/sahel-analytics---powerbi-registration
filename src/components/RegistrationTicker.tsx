import React, { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';

const DEFAULT_NAMES = [
  "A. Diallo", "F. Youm", "M. Traoré", "S. Keita", "O. Coulibaly", 
  "C. Diarra", "K. Touré", "B. Cissé", "A. Maïga", "H. Sangaré"
];

const PROMPT_MESSAGES = [
  "vient de s'inscrire ! 🎓",
  "a rejoint la cohorte ! 🚀",
  "est prêt(e) pour la formation ! 📊",
  "a sécurisé sa place ! 🔥",
  "sera des nôtres ! ✨",
  "a décidé de maîtriser Power BI ! 📈",
  "rejoint l'aventure Sahel Analytics ! 🌍",
  "est inscrit(e) à la session ! 💼",
  "va booster sa carrière ! 🎯",
  "fait désormais partie de l'équipe ! 🤝"
];

export default function RegistrationTicker() {
  const [registrations, setRegistrations] = useState<{name: string, msg: string}[]>([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        // Here we attempt to fetch from the Google Apps Script. 
        // If the URL is provided in your .env as VITE_GOOGLE_SCRIPT_URL, it will use it.
        const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
        if (!scriptUrl) throw new Error("No URL provided");
        
        const response = await fetch(scriptUrl);
        const data = await response.json();
        
        if (data.names && data.names.length > 0) {
          const formatted = data.names.map((name: string) => {
            // Format name to 'FirstLetter. LastName' for privacy
            const parts = name.trim().split(' ');
            const formattedName = parts.length > 1 
              ? `${parts[0].charAt(0).toUpperCase()}. ${parts.slice(1).join(' ')}` 
              : name;
              
            return {
              name: formattedName,
              msg: PROMPT_MESSAGES[Math.floor(Math.random() * PROMPT_MESSAGES.length)]
            };
          });

          // Si on a moins de 8 inscrits réels, on complète avec des noms fictifs
          // pour s'assurer que le bandeau est assez long pour l'animation
          if (formatted.length < 8) {
            const needed = 8 - formatted.length;
            const mockToAdd = [...DEFAULT_NAMES]
              .sort(() => 0.5 - Math.random())
              .slice(0, needed)
              .map(name => ({
                name,
                msg: PROMPT_MESSAGES[Math.floor(Math.random() * PROMPT_MESSAGES.length)]
              }));
              
            // On mélange les vrais et les faux pour plus de naturel
            const combined = [...formatted, ...mockToAdd].sort(() => 0.5 - Math.random());
            setRegistrations(combined);
          } else {
            setRegistrations(formatted);
          }
          return;
        }
      } catch (e) {
        // Silently fallback to mock data
      }

      // Fallback: Default mock data mixed with some randomness
      const fallback = [...DEFAULT_NAMES]
        .sort(() => 0.5 - Math.random())
        .slice(0, 8)
        .map(name => ({
          name,
          msg: PROMPT_MESSAGES[Math.floor(Math.random() * PROMPT_MESSAGES.length)]
        }));
      setRegistrations(fallback);
    };

    fetchRegistrations();
  }, []);

  if (registrations.length === 0) return null;

  // We duplicate the list to create a seamless infinite scroll loop
  const tickerItems = [...registrations, ...registrations];

  return (
    <div className="w-full bg-sahel-navy text-white overflow-hidden py-3 border-y border-white/10 relative shadow-inner">
      {/* Gradient fades on the edges to make it look pro */}
      <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-sahel-navy to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-sahel-navy to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {tickerItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mx-8 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity cursor-default">
            <div className="w-6 h-6 rounded-full bg-sahel-gold/20 flex items-center justify-center shrink-0">
               <UserPlus className="w-3.5 h-3.5 text-sahel-gold" />
            </div>
            <span className="text-sahel-gold font-bold">{item.name}</span>
            <span className="text-slate-300">{item.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
