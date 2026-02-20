import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Stepper } from "@/src/components/ui/Stepper";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Calendar, MapPin, Users, Settings, ChevronRight, ChevronLeft, Plus, Trash2 } from "lucide-react";
import { useAppContext } from "@/src/context/AppContext";
import { toast } from "react-hot-toast";

export function CreateTournament() {
  const { t } = useAppContext();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  
  const steps = [
    t("overview"),
    t("venue"),
    t("category"),
    t("finish")
  ];

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    regDeadline: "",
    fee: 0,
    clubId: "",
    categories: [{ name: "Carom 3 Cushion", discipline: "CAROM_3C", target: 40 }],
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast.success("Tournament created successfully!");
      navigate("/tournaments");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const addCategory = () => {
    setFormData(prev => ({
      ...prev,
      categories: [...prev.categories, { name: "", discipline: "CAROM_3C", target: 30 }]
    }));
  };

  const removeCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-4xl font-black text-text-main tracking-tight">{t("createTournament")}</h1>
        <p className="text-text-muted max-w-md">{t("welcomeBack")}</p>
      </div>

      <Stepper steps={steps} currentStep={currentStep} className="px-10" />

      <Card className="p-10 border-white/5 bg-bg-card/50 shadow-2xl rounded-[2.5rem] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {currentStep === 0 && (
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">{t("tournamentName")}</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Happy Billiards Open 2026"
                    className="w-full bg-bg-input border border-white/10 rounded-2xl p-4 text-text-main focus:ring-2 focus:ring-primary outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">{t("description")}</label>
                  <textarea 
                    placeholder="Describe your tournament, rules, and prizes..."
                    className="w-full bg-bg-input border border-white/10 rounded-2xl p-4 text-text-main focus:ring-2 focus:ring-primary outline-none transition-all h-32 resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">{t("startDate")}</label>
                    <input 
                      type="date" 
                      className="w-full bg-bg-input border border-white/10 rounded-2xl p-4 text-text-main focus:ring-2 focus:ring-primary outline-none transition-all"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">{t("endDate")}</label>
                    <input 
                      type="date" 
                      className="w-full bg-bg-input border border-white/10 rounded-2xl p-4 text-text-main focus:ring-2 focus:ring-primary outline-none transition-all"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">{t("selectClub")}</label>
                    <select 
                      className="w-full bg-bg-input border border-white/10 rounded-2xl p-4 text-text-main focus:ring-2 focus:ring-primary outline-none transition-all appearance-none"
                      value={formData.clubId}
                      onChange={(e) => setFormData({...formData, clubId: e.target.value})}
                    >
                      <option value="">-- {t("selectClub")} --</option>
                      <option value="1">Happy Billiards Center</option>
                      <option value="2">Pro Billiards Club</option>
                      <option value="3">Saigon Pool Arena</option>
                    </select>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center text-center gap-4">
                    <MapPin size={32} className="text-text-muted opacity-50" />
                    <p className="text-sm text-text-muted">Or enter a custom address if not at a registered club.</p>
                    <Button variant="secondary-outline" size="sm" className="rounded-xl">Enter Custom Address</Button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-text-main">{t("tournamentCategories")}</h3>
                  <Button variant="primary-outline" size="sm" className="rounded-xl" onClick={addCategory}>
                    <Plus size={16} className="mr-2" /> {t("addCategory")}
                  </Button>
                </div>
                <div className="space-y-4">
                  {formData.categories.map((cat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-6">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input 
                          type="text" 
                          placeholder={t("category")}
                          className="bg-bg-input border border-white/10 rounded-xl p-3 text-sm text-text-main outline-none"
                          value={cat.name}
                          onChange={(e) => {
                            const newCats = [...formData.categories];
                            newCats[i].name = e.target.value;
                            setFormData({...formData, categories: newCats});
                          }}
                        />
                        <select 
                          className="bg-bg-input border border-white/10 rounded-xl p-3 text-sm text-text-main outline-none"
                          value={cat.discipline}
                          onChange={(e) => {
                            const newCats = [...formData.categories];
                            newCats[i].discipline = e.target.value;
                            setFormData({...formData, categories: newCats});
                          }}
                        >
                          <option value="CAROM_3C">Carom 3 Cushion</option>
                          <option value="CAROM_1C">Carom 1 Cushion</option>
                          <option value="POOL_9B">Pool 9 Ball</option>
                          <option value="POOL_10B">Pool 10 Ball</option>
                        </select>
                        <input 
                          type="number" 
                          placeholder={t("targetPoints")}
                          className="bg-bg-input border border-white/10 rounded-xl p-3 text-sm text-text-main outline-none"
                          value={cat.target}
                          onChange={(e) => {
                            const newCats = [...formData.categories];
                            newCats[i].target = parseInt(e.target.value);
                            setFormData({...formData, categories: newCats});
                          }}
                        />
                      </div>
                      <Button variant="ghost" size="icon" className="text-danger hover:bg-danger/10 rounded-xl" onClick={() => removeCategory(i)}>
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center space-y-6 py-10">
                <div className="w-20 h-20 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
                  <Trophy size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-text-main">{t("readyToLaunch")}</h3>
                  <p className="text-text-muted">{t("readyToLaunchDesc")}</p>
                </div>
                <div className="max-w-xs mx-auto p-6 rounded-2xl bg-white/5 border border-white/5 text-left space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">{t("tournamentName")}:</span>
                    <span className="text-text-main font-bold">{formData.name || "Untitled"}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">{t("time")}:</span>
                    <span className="text-text-main font-bold">{formData.startDate} - {formData.endDate}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">{t("category")}:</span>
                    <span className="text-text-main font-bold">{formData.categories.length}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
          <Button 
            variant="secondary-outline" 
            className="rounded-2xl px-8" 
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={18} className="mr-2" /> {t("back")}
          </Button>
          <Button 
            variant="primary" 
            className="rounded-2xl px-10 shadow-xl shadow-primary/20" 
            onClick={handleNext}
          >
            {currentStep === steps.length - 1 ? t("finish") : t("next")} <ChevronRight size={18} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
