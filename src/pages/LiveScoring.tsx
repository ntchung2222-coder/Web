import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Trophy, Clock, RotateCcw, ChevronLeft, Save, Share2, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { getSocket, joinMatch, updateScore, onScoreUpdated } from "@/src/lib/socket";
import { toast } from "react-hot-toast";

export function LiveScoring() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  
  const [match, setMatch] = React.useState({
    id: matchId,
    player1: "Nguyen Van A",
    player2: "Tran Van B",
    score1: 0,
    score2: 0,
    inning: 1,
    target: 40,
    status: "LIVE",
    discipline: "3-Cushion Carom",
    currentTurn: 1 as 1 | 2,
    history: [] as any[],
  });

  React.useEffect(() => {
    if (matchId) {
      joinMatch(matchId);
      const cleanup = onScoreUpdated((data) => {
        if (data.matchId === matchId) {
          setMatch(prev => ({ ...prev, ...data }));
        }
      });
      return cleanup;
    }
  }, [matchId]);

  const handleScore = (player: 1 | 2, points: number) => {
    const newMatch = { ...match };
    if (player === 1) newMatch.score1 += points;
    else newMatch.score2 += points;
    
    // Emit update
    updateScore({ matchId, ...newMatch });
    setMatch(newMatch);
  };

  const handleEndTurn = () => {
    const newMatch = { ...match };
    newMatch.currentTurn = match.currentTurn === 1 ? 2 : 1;
    if (newMatch.currentTurn === 1) newMatch.inning += 1;
    
    updateScore({ matchId, ...newMatch });
    setMatch(newMatch);
    toast.success(`Turn changed to ${newMatch.currentTurn === 1 ? match.player1 : match.player2}`);
  };

  return (
    <div className="min-h-screen bg-bg-main text-text-body flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/5 bg-bg-card/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
            <ChevronLeft size={20} />
          </Button>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-muted uppercase tracking-widest">{match.discipline}</span>
            <span className="text-sm font-bold text-text-main">Match ID: {matchId}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="danger" className="animate-pulse">LIVE</Badge>
          <div className="h-8 w-px bg-white/10 mx-2" />
          <Button variant="secondary-outline" size="icon" className="rounded-xl">
            <Settings size={18} />
          </Button>
          <Button variant="primary" size="sm" className="rounded-xl px-4">
            <Save size={16} className="mr-2" /> Finish
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 flex flex-col gap-6 max-w-5xl mx-auto w-full">
        {/* Score Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Player 1 */}
          <motion.div
            animate={{ scale: match.currentTurn === 1 ? 1 : 0.98, opacity: match.currentTurn === 1 ? 1 : 0.7 }}
            className={cn(
              "relative rounded-[2rem] p-8 border-2 transition-all duration-500",
              match.currentTurn === 1 ? "bg-primary/5 border-primary shadow-2xl shadow-primary/10" : "bg-bg-card border-white/5"
            )}
          >
            {match.currentTurn === 1 && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                Current Turn
              </div>
            )}
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-bg-input border border-white/10 flex items-center justify-center text-3xl font-black text-text-main">
                {match.player1[0]}
              </div>
              <h2 className="text-2xl font-black text-text-main">{match.player1}</h2>
              <div className="text-[120px] font-black font-mono leading-none text-text-main tracking-tighter">
                {match.score1}
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button 
                  variant="primary" 
                  className="h-24 rounded-3xl text-3xl font-black shadow-xl shadow-primary/20"
                  onClick={() => handleScore(1, 1)}
                  disabled={match.currentTurn !== 1}
                >
                  +1
                </Button>
                <Button 
                  variant="secondary-outline" 
                  className="h-24 rounded-3xl text-xl font-bold"
                  onClick={() => handleScore(1, -1)}
                  disabled={match.currentTurn !== 1 || match.score1 === 0}
                >
                  -1
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Player 2 */}
          <motion.div
            animate={{ scale: match.currentTurn === 2 ? 1 : 0.98, opacity: match.currentTurn === 2 ? 1 : 0.7 }}
            className={cn(
              "relative rounded-[2rem] p-8 border-2 transition-all duration-500",
              match.currentTurn === 2 ? "bg-primary/5 border-primary shadow-2xl shadow-primary/10" : "bg-bg-card border-white/5"
            )}
          >
            {match.currentTurn === 2 && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                Current Turn
              </div>
            )}
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-bg-input border border-white/10 flex items-center justify-center text-3xl font-black text-text-main">
                {match.player2[0]}
              </div>
              <h2 className="text-2xl font-black text-text-main">{match.player2}</h2>
              <div className="text-[120px] font-black font-mono leading-none text-text-main tracking-tighter">
                {match.score2}
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button 
                  variant="primary" 
                  className="h-24 rounded-3xl text-3xl font-black shadow-xl shadow-primary/20"
                  onClick={() => handleScore(2, 1)}
                  disabled={match.currentTurn !== 2}
                >
                  +1
                </Button>
                <Button 
                  variant="secondary-outline" 
                  className="h-24 rounded-3xl text-xl font-bold"
                  onClick={() => handleScore(2, -1)}
                  disabled={match.currentTurn !== 2 || match.score2 === 0}
                >
                  -1
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Match Stats */}
        <Card className="p-8 border-white/5 bg-bg-card/50 flex items-center justify-around rounded-[2rem]">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Inning</span>
            <span className="text-3xl font-black text-text-main font-mono">{match.inning}</span>
          </div>
          <div className="h-12 w-px bg-white/5" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Target</span>
            <span className="text-3xl font-black text-text-main font-mono">{match.target}</span>
          </div>
          <div className="h-12 w-px bg-white/5" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Avg</span>
            <span className="text-3xl font-black text-text-main font-mono">
              {(Math.max(match.score1, match.score2) / match.inning).toFixed(2)}
            </span>
          </div>
        </Card>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="secondary" className="h-20 rounded-3xl text-lg font-bold bg-white/5 border border-white/5">
            <RotateCcw size={20} className="mr-3" /> Reset Match
          </Button>
          <Button 
            variant="primary" 
            className="h-20 rounded-3xl text-xl font-black shadow-xl shadow-primary/20"
            onClick={handleEndTurn}
          >
            End Turn
          </Button>
          <Button variant="secondary" className="h-20 rounded-3xl text-lg font-bold bg-white/5 border border-white/5">
            <Share2 size={20} className="mr-3" /> Share Live
          </Button>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted opacity-50">
          <Clock size={14} />
          <span>Match started at 10:30 AM • Happy Billiards Center</span>
        </div>
      </footer>
    </div>
  );
}
