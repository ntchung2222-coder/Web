import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/Table";
import { Input } from "@/src/components/ui/Input";
import { Badge } from "@/src/components/ui/Badge";
import { Search, MoreVertical, Plus, Filter, CheckCircle2, CreditCard } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { useAppContext } from "@/src/context/AppContext";

export function Players() {
  const { t } = useAppContext();
  const players = [
    { id: 1, name: "Nguyen Van A", club: "Pro Billiards Club", elo: 1850, rank: 1, type: "Carom", isPaid: true, isCheckedIn: true },
    { id: 2, name: "Tran Van B", club: "Hanoi Billiards Center", elo: 1820, rank: 2, type: "Carom", isPaid: true, isCheckedIn: false },
    { id: 3, name: "Le Thi C", club: "Saigon Pool Arena", elo: 1750, rank: 1, type: "Pool", isPaid: false, isCheckedIn: false },
    { id: 4, name: "Pham Van D", club: "Independent", elo: 1680, rank: 3, type: "Carom", isPaid: true, isCheckedIn: true },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-text-main">{t("players")}</h1>
          <p className="text-sm text-text-muted">{t("welcomeBack")}</p>
        </div>
        <Button variant="primary" className="rounded-xl shadow-lg shadow-primary/20 px-6">
          <Plus size={18} className="mr-2" />
          {t("addPlayer")}
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
                <TableHead className="py-4 px-6">{t("rank")}</TableHead>
                <TableHead>{t("players")}</TableHead>
                <TableHead>{t("clubVenue")}</TableHead>
                <TableHead>{t("discipline")}</TableHead>
                <TableHead>{t("eloRating")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead className="text-right px-6">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((p) => (
                <TableRow key={p.id} className="border-white/5 group">
                  <TableCell className="py-4 px-6">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs",
                      p.rank === 1 ? "bg-warning/20 text-warning border border-warning/20" :
                      p.rank === 2 ? "bg-text-muted/20 text-text-body border border-text-muted/20" :
                      "bg-white/5 text-text-muted"
                    )}>
                      {p.rank}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-text-main group-hover:text-primary transition-colors">{p.name}</TableCell>
                  <TableCell className="text-sm text-text-body">{p.club}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                      {p.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono font-bold text-text-main">{p.elo}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-1.5 rounded-lg",
                        p.isPaid ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                      )} title={p.isPaid ? t("payment") + ": OK" : t("payment") + ": Pending"}>
                        <CreditCard size={14} />
                      </div>
                      <div className={cn(
                        "p-1.5 rounded-lg",
                        p.isCheckedIn ? "bg-primary/10 text-primary" : "bg-white/5 text-text-muted"
                      )} title={p.isCheckedIn ? t("checkIn") + ": OK" : t("checkIn") + ": Pending"}>
                        <CheckCircle2 size={14} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <Button variant="ghost" size="icon" className="rounded-lg hover:bg-white/5">
                      <MoreVertical size={16} />
                    </Button>
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
