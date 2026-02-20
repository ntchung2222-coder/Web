import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { MapPin, Phone, Mail, Globe, Star, Plus, Search, Filter } from "lucide-react";
import { motion } from "motion/react";
import { useAppContext } from "@/src/context/AppContext";

export function Clubs() {
  const { t } = useAppContext();
  const clubs = [
    {
      id: 1,
      name: "Happy Billiards Center",
      address: "123 Le Loi, District 1, HCMC",
      phone: "0123 456 789",
      rating: 4.8,
      tables: 20,
      type: ["Carom", "Pool"],
      image: "https://picsum.photos/seed/club1/400/250"
    },
    {
      id: 2,
      name: "Pro Billiards Club",
      address: "456 Nguyen Hue, District 1, HCMC",
      phone: "0987 654 321",
      rating: 4.5,
      tables: 15,
      type: ["Carom"],
      image: "https://picsum.photos/seed/club2/400/250"
    },
    {
      id: 3,
      name: "Saigon Pool Arena",
      address: "789 Vo Van Kiet, District 5, HCMC",
      phone: "0555 666 777",
      rating: 4.9,
      tables: 30,
      type: ["Pool", "Snooker"],
      image: "https://picsum.photos/seed/club3/400/250"
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-text-main">{t("clubs")}</h1>
          <p className="text-sm text-text-muted">{t("discoverClubs")}</p>
        </div>
        <Button variant="primary" className="rounded-xl shadow-lg shadow-primary/20 px-6">
          <Plus size={18} className="mr-2" />
          {t("registerClub")}
        </Button>
      </div>

      <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
          <input 
            type="text" 
            placeholder={t("search")}
            className="w-full bg-bg-main border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex gap-3">
          <Button variant="secondary-outline" size="sm" className="rounded-xl">
            <Filter size={14} className="mr-2" />
            {t("filter")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clubs.map((club, i) => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-0 overflow-hidden border-white/5 bg-bg-card/50 hover:border-primary/30 transition-all group">
              <div className="h-48 w-full relative">
                <img 
                  src={club.image} 
                  alt={club.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-warning text-xs font-bold">
                  <Star size={12} fill="currentColor" />
                  {club.rating}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors">{club.name}</h3>
                  <div className="flex items-center gap-1 text-text-muted text-xs">
                    <MapPin size={12} />
                    <span className="truncate">{club.address}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {club.type.map(t => (
                    <Badge key={t} variant="secondary" className="text-[8px] uppercase tracking-widest">{t}</Badge>
                  ))}
                  <Badge variant="success" className="text-[8px] uppercase tracking-widest">{club.tables} Tables</Badge>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-primary transition-colors">
                      <Phone size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-primary transition-colors">
                      <Mail size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-muted hover:text-primary transition-colors">
                      <Globe size={14} />
                    </button>
                  </div>
                  <Button variant="primary-outline" size="sm" className="rounded-xl text-xs">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
