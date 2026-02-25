import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'motion/react';
import { registrationSchema, RegistrationData } from '@/types/schema';
import { Button } from '@/components/ui/Button';
import { Check, ChevronRight, Loader2, User, Briefcase, BarChart, Target, Calendar, Award, ShieldCheck, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

// Steps
import Step1Identity from './steps/Step1Identity';
import Step2Professional from './steps/Step2Professional';
import Step3Profile from './steps/Step3Profile';
import Step4Objectives from './steps/Step4Objectives';
import Step5Logistics from './steps/Step5Logistics';
import Step6Certification from './steps/Step6Certification';
import Step7Compliance from './steps/Step7Compliance';
import Step8Comments from './steps/Step8Comments';

const steps = [
  { id: 1, title: 'Identité', component: Step1Identity, icon: User },
  { id: 2, title: 'Professionnel', component: Step2Professional, icon: Briefcase },
  { id: 3, title: 'Profil Data', component: Step3Profile, icon: BarChart },
  { id: 4, title: 'Objectifs', component: Step4Objectives, icon: Target },
  { id: 5, title: 'Logistique', component: Step5Logistics, icon: Calendar },
  { id: 6, title: 'Certification', component: Step6Certification, icon: Award },
  { id: 7, title: 'Conformité', component: Step7Compliance, icon: ShieldCheck },
  { id: 8, title: 'Commentaires', component: Step8Comments, icon: MessageSquare },
];

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const methods = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
  });

  const { trigger, handleSubmit, formState: { isValid } } = methods;

  const nextStep = async () => {
    const stepFields = getFieldsForStep(currentStep);
    const isStepValid = await trigger(stepFields);
    
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      // Scroll to top of form container if needed, but in this layout it might not be necessary
      // document.getElementById('form-content')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: RegistrationData) => {
    setIsSubmitting(true);
    try {
      // Use env var or fallback to the provided URL
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbwla_aIw071QwRd9hrl6DKLLSSKM4IEbFWSJLnVbw-JwkhvtMK9WFJ8IC3rLm81f_IWmA/exec";

      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        setIsSuccess(true);
      } else {
        console.error("VITE_GOOGLE_SCRIPT_URL is not set and no fallback provided.");
        alert("Erreur de configuration. Veuillez contacter l'administrateur.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-2xl text-center border border-slate-100 mx-4 md:mx-auto">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Check className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-sahel-navy mb-6">Inscription Reçue !</h2>
        <p className="text-base md:text-lg text-slate-600 mb-10 max-w-lg mx-auto">
          Merci de vous être inscrit au Workshop PowerBI. Nous avons bien reçu vos informations.
          Vous recevrez bientôt un email de confirmation.
        </p>
        <Button onClick={() => window.location.reload()} size="lg" className="bg-sahel-navy hover:bg-sahel-navy/90 w-full md:w-auto">
          Retour à l'accueil
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row min-h-[600px] md:min-h-[700px] border border-slate-100 mx-4 md:mx-auto my-8">
      {/* Sidebar / Stepper - Hidden on mobile, shown as progress bar maybe? Or just stacked. Let's keep it simple for now but responsive. */}
      <div className="hidden md:flex md:w-1/3 bg-slate-50 p-8 border-r border-slate-100 flex-col rounded-l-3xl">
        <div className="mb-10">
          <h2 className="text-2xl font-display font-bold text-sahel-navy">Inscription</h2>
          <p className="text-sm text-slate-500 mt-1">Formation Power BI</p>
        </div>

        <div className="flex-1 space-y-0 relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-4 bottom-10 w-0.5 bg-slate-200 -z-10"></div>

          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex items-center gap-4 py-3 relative group">
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10",
                    isActive ? "bg-sahel-navy border-sahel-navy text-white shadow-lg scale-110" : 
                    isCompleted ? "bg-green-500 border-green-500 text-white" : 
                    "bg-white border-slate-200 text-slate-300"
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <div className={cn("transition-colors duration-300", isActive ? "opacity-100" : "opacity-60")}>
                  <p className={cn(
                    "text-sm font-medium",
                    isActive ? "text-sahel-navy font-bold" : "text-slate-500"
                  )}>
                    {step.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Header for Steps */}
      <div className="md:hidden bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between rounded-t-3xl">
         <div>
            <h2 className="text-lg font-display font-bold text-sahel-navy">Inscription</h2>
            <p className="text-xs text-slate-500">Étape {currentStep + 1}/{steps.length}</p>
         </div>
         <div className="w-10 h-10 rounded-full bg-sahel-navy text-white flex items-center justify-center shadow-lg">
            {React.createElement(steps[currentStep].icon, { className: "w-5 h-5" })}
         </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-2/3 p-6 md:p-12 flex flex-col relative bg-white rounded-r-3xl rounded-b-3xl md:rounded-bl-none">
        <div className="mb-6 md:mb-8 hidden md:block">
          <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2">Étape {currentStep + 1}/{steps.length}</h3>
          <h2 className="text-3xl font-display font-bold text-sahel-navy">{steps[currentStep].title}</h2>
        </div>

        <div className="flex-1" id="form-content">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <CurrentStepComponent />
                </motion.div>
              </AnimatePresence>
            </form>
          </FormProvider>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center bg-white z-20 gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={cn("text-slate-400 hover:text-sahel-navy px-2 md:px-4", currentStep === 0 && "invisible")}
          >
            Retour
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button 
              type="button" 
              onClick={nextStep} 
              size="lg"
              className="bg-sahel-navy hover:bg-sahel-navy/90 text-white rounded-full px-6 md:px-8 shadow-lg shadow-sahel-navy/20 w-auto"
            >
              Suivant <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              type="button" 
              onClick={handleSubmit(onSubmit)} 
              disabled={isSubmitting} 
              size="lg"
              className="bg-sahel-gold hover:bg-sahel-gold/90 text-sahel-navy font-bold rounded-full px-6 md:px-8 shadow-lg shadow-sahel-gold/20 w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Envoi...
                </>
              ) : (
                'Confirmer'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper to get fields for validation per step
function getFieldsForStep(step: number): any[] {
  switch (step) {
    case 0: return ['fullName', 'gender', 'age', 'phone', 'email', 'country', 'city'];
    case 1: return ['status', 'domain', 'organization', 'position'];
    case 2: return ['workedWithData', 'dataLevel', 'tools', 'createdDashboard', 'knowsDax', 'createdSurvey'];
    case 3: return ['motivation', 'expectations', 'usage'];
    case 4: return ['participationMode', 'availableSaturdays', 'hasLaptop', 'hasInternet', 'readyToInstall', 'paymentMode'];
    case 5: return ['wantCertificate', 'source', 'contactFuture'];
    case 6: return ['gdprAccepted'];
    case 7: return ['comments'];
    default: return [];
  }
}
