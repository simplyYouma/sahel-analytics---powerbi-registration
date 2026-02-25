import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useFormContext } from 'react-hook-form';

// Comprehensive list of countries with priority to African countries
const countries = [
  // Africa
  "Mali", "Sénégal", "Côte d'Ivoire", "Burkina Faso", "Guinée", "Niger", "Togo", "Bénin", "Cameroun", "Gabon", "Congo", "RDC", "Tchad", "Mauritanie", "Maroc", "Algérie", "Tunisie", "Égypte", "Afrique du Sud", "Nigeria", "Ghana", "Kenya", "Éthiopie", "Rwanda", "Madagascar",
  // Rest of World (Common)
  "France", "États-Unis", "Canada", "Belgique", "Suisse", "Allemagne", "Royaume-Uni", "Chine", "Japon", "Inde", "Brésil",
  // Others (Simplified list for demo, ideally full ISO list)
  "Afghanistan", "Albanie", "Andorre", "Angola", "Arabie saoudite", "Argentine", "Arménie", "Australie", "Autriche", "Azerbaïdjan",
  "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Belize", "Bhoutan", "Biélorussie", "Birmanie", "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brunei", "Bulgarie", "Burundi",
  "Cambodge", "Cap-Vert", "Centrafrique", "Chili", "Chypre", "Colombie", "Comores", "Corée du Nord", "Corée du Sud", "Costa Rica", "Croatie", "Cuba",
  "Danemark", "Djibouti", "Dominique",
  "Émirats arabes unis", "Équateur", "Érythrée", "Espagne", "Estonie", "Eswatini",
  "Fidji", "Finlande",
  "Gambie", "Géorgie", "Grèce", "Grenade", "Guatemala", "Guinée-Bissau", "Guyana",
  "Haïti", "Honduras", "Hongrie",
  "Indonésie", "Irak", "Iran", "Irlande", "Islande", "Israël", "Italie",
  "Jamaïque", "Jordanie",
  "Kazakhstan", "Kirghizistan", "Kiribati", "Koweït",
  "Laos", "Lesotho", "Lettonie", "Liban", "Liberia", "Libye", "Liechtenstein", "Lituanie", "Luxembourg",
  "Macédoine du Nord", "Malaisie", "Malawi", "Maldives", "Malte", "Maurice", "Mexique", "Micronésie", "Moldavie", "Monaco", "Mongolie", "Monténégro", "Mozambique",
  "Namibie", "Nauru", "Népal", "Nicaragua", "Norvège", "Nouvelle-Zélande",
  "Oman", "Ouganda", "Ouzbékistan",
  "Pakistan", "Palaos", "Palestine", "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay", "Pays-Bas", "Pérou", "Philippines", "Pologne", "Portugal",
  "Qatar",
  "Roumanie", "Russie",
  "Saint-Christophe-et-Niévès", "Sainte-Lucie", "Saint-Marin", "Saint-Vincent-et-les-Grenadines", "Salomon", "Salvador", "Samoa", "São Tomé-et-Principe", "Serbie", "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", "Soudan", "Soudan du Sud", "Sri Lanka", "Suède", "Suriname", "Syrie",
  "Tadjikistan", "Tanzanie", "Thaïlande", "Timor oriental", "Tonga", "Trinité-et-Tobago", "Turkménistan", "Turquie", "Tuvalu",
  "Ukraine", "Uruguay",
  "Vanuatu", "Vatican", "Venezuela", "Vietnam",
  "Yémen",
  "Zambie", "Zimbabwe"
].sort();

export function CountrySelect({ name }: { name: string }) {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const value = watch(name);

  const filteredCountries = useMemo(() => {
    return countries.filter(country => 
      country.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Register the field manually since we're using a custom UI
  useEffect(() => {
    register(name);
  }, [register, name]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sahel-navy focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer hover:bg-slate-100 transition-colors",
          !value && "text-slate-400"
        )}
        onClick={() => setOpen(!open)}
      >
        <span className="truncate">{value ? value : "Sélectionner un pays..."}</span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </div>
      
      {open && (
        <div className="absolute z-[100] mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-xl animate-in fade-in-0 zoom-in-95 overflow-hidden">
          <div className="flex items-center border-b border-slate-100 px-3 bg-slate-50/50">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Rechercher un pays..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-[200px] overflow-y-auto p-1 custom-scrollbar">
            {filteredCountries.length === 0 ? (
              <div className="py-6 text-center text-sm text-slate-500">Aucun pays trouvé.</div>
            ) : (
              filteredCountries.map((country) => (
                <div
                  key={country}
                  className={cn(
                    "relative flex cursor-default select-none items-center rounded-lg px-2 py-2.5 text-sm outline-none hover:bg-slate-100 hover:text-sahel-navy cursor-pointer transition-colors",
                    value === country && "bg-slate-100 text-sahel-navy font-medium"
                  )}
                  onClick={() => {
                    setValue(name, country, { shouldValidate: true });
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-sahel-gold",
                      value === country ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
