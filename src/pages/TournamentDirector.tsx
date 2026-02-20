import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/Tabs";
import { Badge } from "@/src/components/ui/Badge";
import { 
  Settings, Users, Calendar, Trophy, 
  LayoutDashboard, UserPlus, Shuffle, 
  Play, CheckCircle2, MoreHorizontal,
  ChevronRight, ArrowRight
} from "lucide-react";
import { motion } from "motion/react";
import { cn, formatDate } from "@/src/lib/utils";
import { useAppContext } from "@/src/context/AppContext";
import { toast } from "react-hot-toast";

export function TournamentDirector() {
  const { tournamentId } = useParams();
  const { t } = useAppContext();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = React.useState("registrations");

  const registrations = [
    { id: 1, name: "Nguyen Van A", club: "Happy Billiards", paid: true, checkedIn: true, seed: 1 },
    { id: 2, name: "Tran Van B", club: "Pro Club", paid: true, checkedIn: true, seed: 2 },
    { id: 3, name: "Le Thi C", club: "Saigon Arena", paid: true, checkedIn: false, seed: null },
    { id: 4, name: "Pham Van D", club: "Independent", paid: false, checkedIn: false, seed: null },
  ];

  const handleAutoDraw = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Đang bốc thăm tự động...',
        success: 'Bốc thăm hoàn tất!',
        error: 'Có lỗi xảy ra.',
      }
    );
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-xl shadow-primary/10">
            <LayoutDashboard size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-text-main tracking-tight">{t("director")}</h1>
            <p className="text-sm text-text-muted">{t("trackMatches")} ID: {tournamentId}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary-outline" className="rounded-xl">
            <Settings size={18} className="mr-2" /> {t("settings")}
          </Button>
          <Button variant="primary" className="rounded-xl shadow-lg shadow-primary/20">
            <Play size={18} className="mr-2" /> {t("startTournament")}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="registrations" className="space-y-8">
        <div className="bg-bg-card/50 p-2 rounded-2xl border border-white/5 inline-flex">
          <TabsList className="border-none bg-transparent gap-2 p-0">
            {[
              { value: "registrations", label: t("registration"), icon: Users },
              { value: "draw", label: t("draw"), icon: Shuffle },
              { value: "schedule", label: t("schedule"), icon: Calendar },
              { value: "matches", label: t("matches"), icon: Trophy },
            ].map((tab) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all text-sm font-bold"
              >
                <tab.icon size={16} />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="registrations" className="space-y-6 outline-none">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-text-main">{t("registrationList")} ({registrations.length})</h3>
            <div className="flex gap-3">
              <Button variant="secondary-outline" size="sm" className="rounded-xl">{t("exportExcel")}</Button>
              <Button variant="primary" size="sm" className="rounded-xl">
                <UserPlus size={16} className="mr-2" /> {t("addPlayer")}
              </Button>
            </div>
          </div>

          <Card className="p-0 overflow-hidden border-white/5 bg-bg-card/50">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">{t("players")}</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">{t("clubs")}</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">{t("payment")}</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">{t("checkIn")}</th>
                  <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">{t("seed")}</th>
                  <th className="p-4 text-right text-[10px] font-bold uppercase tracking-widest text-text-muted">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                          {reg.name[0]}
                        </div>
                        <span className="text-sm font-bold text-text-main">{reg.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-text-body">{reg.club}</td>
                    <td className="p-4">
                      <Badge variant={reg.paid ? "success" : "danger"} className="text-[8px] uppercase">
                        {reg.paid ? t("paid") : t("unpaid")}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={reg.checkedIn ? "primary" : "secondary"} className="text-[8px] uppercase">
                        {reg.checkedIn ? t("checkedIn") : t("absent")}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <input 
                        type="number" 
                        defaultValue={reg.seed || ""} 
                        className="w-12 bg-bg-input border border-white/10 rounded-lg p-1 text-xs text-center text-text-main"
                        placeholder="-"
                      />
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="icon" className="rounded-lg">
                        <MoreHorizontal size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>

        <TabsContent value="draw" className="space-y-8 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-8 border-white/5 bg-bg-card/50 space-y-6">
                <h3 className="text-lg font-bold text-text-main">{t("drawConfig")}</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest">{t("category")}</label>
                    <select className="w-full bg-bg-input border border-white/10 rounded-xl p-3 text-sm text-text-main outline-none">
                      <option>{t("carom3c")}</option>
                      <option>{t("carom1c")}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest">{t("format")}</label>
                    <select className="w-full bg-bg-input border border-white/10 rounded-xl p-3 text-sm text-text-main outline-none">
                      <option>{t("singleElim")}</option>
                      <option>{t("doubleElim")}</option>
                      <option>{t("groupPlusElim")}</option>
                    </select>
                  </div>
                </div>
                <Button variant="primary" className="w-full rounded-xl py-6 shadow-lg shadow-primary/20" onClick={handleAutoDraw}>
                  <Shuffle size={18} className="mr-2" /> {t("autoDraw")}
                </Button>
              </Card>

              <Card className="p-8 border-white/5 bg-bg-card/50">
                <h3 className="text-sm font-bold text-text-main mb-4 uppercase tracking-widest">{t("unassignedPlayers")} (12)</h3>
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group cursor-move">
                      <span className="text-xs font-bold text-text-body group-hover:text-primary transition-colors">{t("players")} {t("back")} {i + 1}</span>
                      <ArrowRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="p-8 border-white/5 bg-bg-card/50 min-h-[600px] flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-text-muted opacity-20">
                  <Shuffle size={48} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-main">{t("emptyBracket")}</h3>
                  <p className="text-sm text-text-muted max-w-xs mx-auto">{t("emptyBracketDesc")}</p>
                </div>
                <Button variant="secondary-outline" className="rounded-xl">{t("loadTemplate")}</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="outline-none">
          <Card className="p-20 border-white/5 bg-bg-card/50 text-center space-y-6">
             <Calendar size={64} className="mx-auto text-text-muted opacity-20" />
             <h3 className="text-xl font-bold text-text-main">{t("schedulingFeature")}</h3>
             <p className="text-text-muted max-w-xs mx-auto">{t("schedulingFeatureDesc")}</p>
             <Button variant="primary" className="rounded-xl">{t("configSchedule")}</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
