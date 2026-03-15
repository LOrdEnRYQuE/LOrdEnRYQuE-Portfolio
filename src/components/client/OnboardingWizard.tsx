"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, Calendar, Rocket, Code, Wallet, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface OnboardingData {
  scope?: string;
  currentStep?: number;
  complete?: boolean;
  [key: string]: string | number | boolean | undefined;
}

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({});
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const res = await fetch("/api/client/onboarding");
        if (res.ok) {
          const data = await res.json();
          if (data && Object.keys(data).length > 0) {
            setFormData(data);
            if (data.currentStep) setCurrentStep(data.currentStep);
            if (data.complete) setComplete(true);
          }
        }
      } catch (error) {
        console.error("Failed to load onboarding progress:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProgress();
  }, []);

  const saveProgress = async (newData: OnboardingData) => {
    try {
      await fetch("/api/client/onboarding", {
        method: "POST",
        body: JSON.stringify(newData),
      });
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  };

  const STEPS = [
    {
      id: 1,
      title: t("onboarding.step.scope.title"),
      subtitle: t("onboarding.step.scope.sub"),
      icon: Rocket,
    },
    {
      id: 2,
      title: t("onboarding.step.tech.title"),
      subtitle: t("onboarding.step.tech.sub"),
      icon: Code,
    },
    {
      id: 3,
      title: t("onboarding.step.budget.title"),
      subtitle: t("onboarding.step.budget.sub"),
      icon: Wallet,
    },
    {
      id: 4,
      title: t("onboarding.step.kickoff.title"),
      subtitle: t("onboarding.step.kickoff.sub"),
      icon: Calendar,
    }
  ];

  const handleNext = () => {
    const isLast = currentStep === STEPS.length;
    const nextStep = isLast ? currentStep : currentStep + 1;
    const isComplete = isLast;

    if (isLast) {
      setComplete(true);
    } else {
      setCurrentStep(nextStep);
    }

    saveProgress({ ...formData, currentStep: nextStep, complete: isComplete });
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      saveProgress({ ...formData, currentStep: prevStep });
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  if (complete) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 text-center rounded-3xl border-accent/20"
      >
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">{t("onboarding.success")}</h3>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          {t("onboarding.success.desc")}
        </p>
        <Button href="/" variant="primary" size="lg">{t("onboarding.return_home")}</Button>
      </motion.div>
    );
  }

  const ActiveIcon = STEPS[currentStep - 1].icon;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[10px] font-bold text-accent uppercase tracking-widest">{t("onboarding.progress")}</p>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
            {t("onboarding.step_of").replace("{current}", currentStep.toString()).replace("{total}", STEPS.length.toString())}
          </p>
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card p-10 rounded-3xl border-white/5"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="p-4 bg-accent/10 text-accent rounded-2xl">
              <ActiveIcon size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{STEPS[currentStep - 1].title}</h2>
              <p className="text-sm text-gray-500">{STEPS[currentStep - 1].subtitle}</p>
            </div>
          </div>

          <div className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <textarea 
                  value={formData.scope || ""}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  onBlur={() => saveProgress(formData)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-sm focus:border-accent outline-none min-h-[150px] transition-all"
                  placeholder={t("onboarding.step.scope.placeholder")}
                />
              </div>
            )}
            {currentStep === 2 && (
              <div className="grid grid-cols-2 gap-4">
                {['Next.js / TypeScript', 'React Native / Mobile', 'AI Integration', 'Backend / API Strategy'].map(stack => (
                  <button key={stack} className="p-4 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 hover:border-accent hover:text-white transition-all">
                    {stack}
                  </button>
                ))}
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <select className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-accent outline-none">
                    <option>{t("onboarding.budget")}</option>
                    <option>5.000 € - 10.000 €</option>
                    <option>10.000 € - 25.000 €</option>
                    <option>25.000 €+</option>
                  </select>
                  <select className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-accent outline-none">
                    <option>{t("onboarding.timeline")}</option>
                    <option>{t("onboarding.timeline.under_4_weeks") || "Under 4 weeks"}</option>
                    <option>{t("onboarding.timeline.1_2_months") || "1 - 2 months"}</option>
                    <option>{t("onboarding.timeline.3_plus_months") || "3+ months"}</option>
                  </select>
                </div>
              </div>
            )}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 flex items-center justify-between">
                   <div className="text-left">
                     <p className="text-white font-bold text-sm">{t("onboarding.kickoff.preferred_label") || "Preferred Time Slot"}</p>
                     <p className="text-xs text-gray-500 italic">{t("onboarding.kickoff.preferred_value") || "Tomorrow, 10:00 AM CET"}</p>
                   </div>
                   <button className="text-accent underline text-sm font-bold bg-transparent border-none cursor-pointer">
                     {t("common.change") || "Change"}
                   </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
            <button 
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-opacity ${currentStep === 1 ? 'opacity-0 cursor-default' : 'text-gray-500 hover:text-white'}`}
            >
              <ArrowLeft size={16} />
              {t("onboarding.back")}
            </button>
            <Button onClick={handleNext} className="rounded-xl px-12 py-6">
              <span className="flex items-center gap-2">
                {currentStep === STEPS.length ? t("onboarding.submit") : t("onboarding.next")}
                <ArrowRight size={16} />
              </span>
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
