import { useNavigate } from "react-router-dom";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table";
import { Badge } from "@/src/components/ui/Badge";
import { Plus, Search, MoreVertical, Filter } from "lucide-react";
import { Input } from "@/src/components/ui/Input";
import { motion } from "motion/react";
import { useAppContext } from "@/src/context/AppContext";
import { formatDate } from "@/src/lib/utils";

export function Tournaments() {
  const { t } = useAppContext();
  const navigate = useNavigate();
  const tournaments = [
    { id: 1, name: "Vietnam Carom Championship 2026", date: "2026-03-15", status: "upcoming", players: 128, type: "3-Cushion" },
    { id: 2, name: "Hanoi Open Pool", date: "2026-02-20", status: "ongoing", players: 64, type: "9-Ball" },
    { id: 3, name: "Saigon Masters", date: "2026-01-10", status: "completed", players: 32, type: "10-Ball" },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-text-main">{t("tournaments")}</h1>
          <p className="text-sm text-text-muted">{t("trackMatches")}</p>
        </div>
        <Button 
          variant="primary" 
          className="rounded-xl shadow-lg shadow-primary/20 px-6"
          onClick={() => navigate("/tournaments/create")}
        >
          <Plus size={18} className="mr-2" />
          {t("createTournament")}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-0 overflow-hidden border border-white/5 bg-bg-card/50">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <Input placeholder={t("search")} className="pl-10 rounded-xl bg-bg-main border-white/5" />
            </div>
            <div className="flex gap-3">
              <Button variant="secondary-outline" size="sm" className="rounded-xl">
                <Filter size={14} className="mr-2" />
                {t("filter")}
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-white/5">
                <TableHead className="py-4 px-6">{t("tournaments")}</TableHead>
                <TableHead>{t("category")}</TableHead>
                <TableHead>{t("time")}</TableHead>
                <TableHead>{t("players")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead className="text-right px-6">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tournaments.map((trn) => (
                <TableRow key={trn.id} className="border-white/5 group">
                  <TableCell className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-text-main group-hover:text-primary transition-colors">{trn.name}</span>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold mt-0.5">ID: TRN-{trn.id}00</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-white/5 text-text-body border border-white/5">
                      {trn.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{formatDate(trn.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full bg-bg-input border border-bg-card flex items-center justify-center text-[8px] font-bold">
                            {i}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-text-muted">+{trn.players - 3}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        trn.status === "ongoing" ? "success" :
                        trn.status === "upcoming" ? "warning" : "secondary"
                      }
                      className="rounded-lg px-3 py-1 font-bold text-[10px] uppercase tracking-wider"
                    >
                      {t(trn.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="secondary-outline" 
                        size="sm" 
                        className="rounded-xl text-xs"
                        onClick={() => navigate(`/tournaments/${trn.id}/director`)}
                      >
                        {t("director")}
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-lg hover:bg-white/5">
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </div>
  );
}
