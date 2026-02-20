import { Card } from "@/src/components/ui/Card";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/Tabs";
import { Trophy, Calendar, MapPin, Users, Info, Award, ShieldCheck, Share2, Star, Search, Clock } from "lucide-react";
import { motion } from "motion/react";
import { cn, formatDate } from "@/src/lib/utils";
import { useAppContext } from "@/src/context/AppContext";

export function Dashboard() {
  const { t, language } = useAppContext();
  const tournamentInfo = {
    name: "Happy Billiards Internal Tournament - The Second",
    organizer: "Happy Billiards Club",
    startDate: "2026-02-20",
    endDate: "2026-02-25",
    location: "Happy Billiards Center, District 1, HCMC",
    participants: 64,
    prizePool: "20,000,000 VND",
    status: "ongoing",
    banner: "https://picsum.photos/seed/billiards/1200/400"
  };

  const matches = [
    { id: 1, round: "Quarter Finals", p1: "Nguyen Van A", p2: "Tran Van B", score1: 40, score2: 32, status: "Finished", time: "10:00 AM" },
    { id: 2, round: "Quarter Finals", p1: "Le Thi C", p2: "Pham Van D", score1: 15, score2: 12, status: "Live", time: "11:30 AM" },
    { id: 3, round: "Quarter Finals", p1: "Hoang E", p2: "Vu F", score1: 0, score2: 0, status: "Upcoming", time: "02:00 PM" },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
      >
        <div className="h-64 md:h-80 w-full relative">
          <img 
            src={tournamentInfo.banner} 
            alt="Tournament Banner" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/40 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <Badge variant="success" className="rounded-lg px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
                {t(tournamentInfo.status)}
              </Badge>
              <div className="flex items-center gap-1 text-warning">
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-bold">{t("featuredEvent")}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-text-main tracking-tight leading-tight">
              {tournamentInfo.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted font-medium">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                <span>{formatDate(tournamentInfo.startDate)} - {formatDate(tournamentInfo.endDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>{tournamentInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" />
                <span>{tournamentInfo.organizer}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="primary" className="rounded-2xl px-8 shadow-xl shadow-primary/20">
              {t("register")}
            </Button>
            <Button variant="secondary-outline" size="icon" className="rounded-2xl w-12 h-12">
              <Share2 size={20} />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Tabs - Level 2 Navigation */}
      <Tabs defaultValue="overview" className="space-y-8">
        <div className="sticky top-20 z-30 bg-bg-main/95 backdrop-blur-xl py-4 -mx-6 px-6 md:-mx-10 md:px-10 border-b border-white/5 transition-all">
          <div className="max-w-[1440px] mx-auto">
            <TabsList className="border-none bg-transparent gap-10 h-auto p-0 justify-start overflow-x-auto no-scrollbar">
              {[
                { value: "overview", label: t("overview") },
                { value: "matches", label: t("matches") },
                { value: "brackets", label: t("brackets") },
                { value: "players", label: t("players") },
                { value: "prizes", label: t("prizes") },
              ].map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className="text-sm font-bold px-0 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-text-muted hover:text-text-main transition-all"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto">
          <TabsContent value="overview" className="grid grid-cols-1 lg:grid-cols-3 gap-8 outline-none">
            <div className="lg:col-span-2 space-y-8">
              <Card className="p-8 border-white/5 bg-bg-card/50 shadow-sm">
                <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                  <Info size={20} className="text-primary" />
                  {t("aboutTournament")}
                </h3>
                <div className="prose prose-invert max-w-none text-text-body space-y-4 leading-relaxed">
                  <p>
                    {language === "en" 
                      ? "Welcome to the second edition of the Happy Billiards Internal Tournament. This event is designed to foster sportsmanship and skill development among our club members."
                      : "Chào mừng bạn đến với giải đấu Happy Billiards Internal Tournament lần thứ hai. Sự kiện này được thiết kế để thúc đẩy tinh thần thể thao và phát triển kỹ năng giữa các thành viên câu lạc bộ."}
                  </p>
                  <p>
                    {language === "en"
                      ? "The tournament follows the standard 3-Cushion Carom rules with a double-elimination format for the preliminary rounds, moving into a single-elimination bracket for the Top 16."
                      : "Giải đấu tuân theo các quy tắc Carom 3 băng tiêu chuẩn với thể thức loại kép cho các vòng sơ loại, chuyển sang sơ đồ loại trực tiếp cho Top 16."}
                  </p>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-8 border-white/5 bg-bg-card/50 flex items-center gap-6 group hover:border-primary/20 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Award size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">{t("prizePool")}</p>
                    <p className="text-2xl font-black text-text-main">{tournamentInfo.prizePool}</p>
                  </div>
                </Card>
                <Card className="p-8 border-white/5 bg-bg-card/50 flex items-center gap-6 group hover:border-success/20 transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center text-success group-hover:scale-110 transition-transform">
                    <Users size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">{t("registeredPlayers")}</p>
                    <p className="text-2xl font-black text-text-main">{tournamentInfo.participants} / 64</p>
                  </div>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="p-8 border-white/5 bg-bg-card/50">
                <h3 className="text-lg font-bold text-text-main mb-6">{t("schedule")}</h3>
                <div className="space-y-8">
                  {[
                    { label: t("deadline"), date: "2026-02-18", active: false },
                    { label: t("openingCeremony"), date: "2026-02-20", active: true },
                    { label: t("groupStage"), date: "2026-02-20", active: false },
                    { label: t("finalsClosing"), date: "2026-02-25", active: false },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-3 h-3 rounded-full border-2",
                          item.active ? "bg-primary border-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "bg-transparent border-white/20"
                        )} />
                        {i < 3 && <div className="w-px flex-1 bg-white/10 my-2" />}
                      </div>
                      <div className="flex flex-col pb-2">
                        <span className={cn("text-[10px] font-bold uppercase tracking-widest mb-1", item.active ? "text-primary" : "text-text-muted")}>
                          {item.label}
                        </span>
                        <span className="text-sm font-bold text-text-main">{formatDate(item.date)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8 border-white/5 bg-bg-card/50">
                <h3 className="text-lg font-bold text-text-main mb-6">{t("sponsors")}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-20 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer group">
                      <span className="text-[10px] font-bold text-text-muted group-hover:text-primary transition-colors tracking-widest">BRAND {i}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="matches" className="space-y-6 outline-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-text-main">{t("matches")}</h3>
              <div className="flex gap-2">
                <Button variant="secondary-outline" size="sm" className="rounded-xl">{t("viewAll")}</Button>
                <Button variant="secondary-outline" size="sm" className="rounded-xl">{t("liveOnly")}</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matches.map((match) => (
                <Card key={match.id} className="p-6 border-white/5 bg-bg-card/50 hover:border-primary/30 transition-all group">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{match.round}</span>
                    <Badge variant={match.status === "Live" ? "danger" : match.status === "Finished" ? "secondary" : "warning"}>
                      {match.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col items-center flex-1 text-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center font-bold text-text-main">
                        {match.p1[0]}
                      </div>
                      <span className="text-sm font-bold text-text-main truncate w-full">{match.p1}</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-4 text-3xl font-black font-mono text-text-main">
                        <span>{match.score1}</span>
                        <span className="text-text-muted text-sm font-sans">-</span>
                        <span>{match.score2}</span>
                      </div>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{match.time}</span>
                    </div>

                    <div className="flex flex-col items-center flex-1 text-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center font-bold text-text-main">
                        {match.p2[0]}
                      </div>
                      <span className="text-sm font-bold text-text-main truncate w-full">{match.p2}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/5 flex justify-center">
                    <Button variant="ghost" size="sm" className="text-xs font-bold text-primary hover:bg-primary/10">
                      {t("viewDetails")}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="brackets" className="flex items-center justify-center py-20 outline-none">
            <div className="text-center space-y-4">
              <Trophy size={64} className="mx-auto text-text-muted opacity-20" />
              <h3 className="text-xl font-bold text-text-main">{t("bracketsUpdating")}</h3>
              <p className="text-text-muted max-w-xs mx-auto">{t("bracketsUpdatingDesc")}</p>
              <Button variant="primary-outline" className="rounded-xl">{t("refresh")}</Button>
            </div>
          </TabsContent>

          <TabsContent value="players" className="space-y-6 outline-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-text-main">{t("registeredPlayers")} ({tournamentInfo.participants})</h3>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
                <input 
                  type="text" 
                  placeholder={t("search")}
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <Card key={i} className="p-4 border-white/5 bg-bg-card/50 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-main truncate">{t("players")} {i + 1}</p>
                    <p className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{t("eloRating")}: {1500 + i * 10}</p>
                  </div>
                  <Badge variant="secondary" className="text-[8px]">{t("seed")} {i + 1}</Badge>
                </Card>
              ))}
            </div>
            <div className="flex justify-center pt-6">
              <Button variant="secondary-outline" size="sm" className="rounded-xl">{t("viewAll")}</Button>
            </div>
          </TabsContent>

          <TabsContent value="prizes" className="space-y-8 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { rank: "Giải Nhất", prize: "10,000,000 VND", icon: "🏆", color: "text-warning" },
                { rank: "Giải Nhì", prize: "5,000,000 VND", icon: "🥈", color: "text-text-muted" },
                { rank: "Giải Ba", prize: "2,500,000 VND", icon: "🥉", color: "text-orange-400" },
              ].map((item, i) => (
                <Card key={i} className="p-8 border-white/5 bg-bg-card/50 text-center space-y-4 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted">{item.rank}</h4>
                  <p className={cn("text-2xl font-black", item.color)}>{item.prize}</p>
                  <div className="pt-4">
                    <Badge variant="secondary" className="bg-white/5">Cúp & Huy chương</Badge>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-8 border-white/5 bg-bg-card/50">
              <h3 className="text-lg font-bold text-text-main mb-6">{t("additionalPrizes")}</h3>
              <div className="space-y-4">
                {[
                  { label: t("highRun"), prize: "1,000,000 VND" },
                  { label: t("avg"), prize: "1,000,000 VND" },
                  { label: "Giải phong cách", prize: "500,000 VND" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-sm font-bold text-text-main">{item.label}</span>
                    <span className="text-sm font-black text-primary">{item.prize}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
