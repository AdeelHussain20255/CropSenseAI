"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  History, 
  Trash2, 
  ChevronRight, 
  Calendar, 
  Activity, 
  ArrowUpRight,
  Filter,
  X,
  Search,
  AlertCircle
} from "lucide-react";
import { getScans, clearScans, deleteScan, ScanHistory } from "@/lib/localStorage";
import { diseases, Disease } from "@/lib/diseases";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

export default function HistoryPage() {
  const [scans, setScans] = useState<ScanHistory[]>([]);
  const [filter, setFilter] = useState("All");
  const [selectedScan, setSelectedScan] = useState<ScanHistory | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    setScans(getScans());
  }, []);

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteScan(id);
    setScans(getScans());
    toast("Scan deleted", "info");
  };

  const handleClearAll = () => {
    clearScans();
    setScans([]);
    setShowConfirmClear(false);
    toast("History cleared", "info");
  };

  const filteredScans = scans.filter(scan => 
    filter === "All" || scan.severity === filter
  );

  const getDiseaseDetails = (name: string): Disease | undefined => {
    return diseases.find(d => d.name === name);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Scan History</h1>
          <p className="text-muted">You have analyzed <span className="text-accent font-bold">{scans.length}</span> crop samples.</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent appearance-none cursor-pointer"
            >
              <option value="All">All Severities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          
          <button 
            onClick={() => setShowConfirmClear(true)}
            disabled={scans.length === 0}
            className="p-2.5 rounded-xl border border-border text-muted hover:text-red-500 hover:border-red-500/50 transition-all disabled:opacity-50"
            title="Clear History"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      {scans.length === 0 ? (
        <div className="glass rounded-[3rem] p-20 text-center border-dashed border-border">
          <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center mx-auto mb-8">
            <History className="text-muted" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">No scans yet</h3>
          <p className="text-muted max-w-sm mx-auto mb-10">Start by uploading your first crop photo for analysis.</p>
          <a 
            href="/detect" 
            className="bg-accent text-background px-8 py-3 rounded-2xl font-bold inline-flex items-center gap-2 hover:bg-white transition-all"
          >
            Start First Scan <ChevronRight size={20} />
          </a>
        </div>
      ) : filteredScans.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted">No scans found with <span className="text-white font-bold">{filter}</span> severity.</p>
          <button onClick={() => setFilter("All")} className="text-accent text-sm font-bold mt-4 underline underline-offset-4">Reset Filter</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredScans.map((scan) => (
              <motion.div
                key={scan.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedScan(scan)}
                className="glass-card rounded-3xl overflow-hidden cursor-pointer group"
              >
                <div className="aspect-[4/3] relative">
                  <img src={scan.imageDataUrl} alt={scan.diseaseName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 px-3 py-1 glass rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
                    {new Date(scan.timestamp).toLocaleDateString()}
                  </div>
                  <div className={cn(
                    "absolute bottom-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                    scan.severity === "Low" ? "bg-green-500 text-white" :
                    scan.severity === "Medium" ? "bg-amber-500 text-white" :
                    scan.severity === "High" ? "bg-orange-500 text-white" :
                    "bg-red-500 text-white"
                  )}>
                    {scan.severity}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{scan.diseaseName}</h3>
                      <p className="text-accent text-sm font-mono">{scan.confidence}% Confidence</p>
                    </div>
                    <button 
                      onClick={(e) => handleDelete(scan.id, e)}
                      className="p-2 text-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-tighter">
                    View Full Details <ArrowUpRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Scan Details Modal */}
      <AnimatePresence>
        {selectedScan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedScan(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedScan(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-accent hover:text-background transition-all"
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-64 md:h-full">
                    <img src={selectedScan.imageDataUrl} alt={selectedScan.diseaseName} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col gap-8">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                          selectedScan.severity === "Low" ? "bg-green-500/20 text-green-500" :
                          selectedScan.severity === "Medium" ? "bg-amber-500/20 text-amber-500" :
                          selectedScan.severity === "High" ? "bg-orange-500/20 text-orange-500" :
                          "bg-red-500/20 text-red-500"
                        )}>
                          {selectedScan.severity} Severity
                        </span>
                        <span className="text-muted text-xs flex items-center gap-1">
                          <Calendar size={14} /> {new Date(selectedScan.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <h2 className="text-4xl font-bold text-white mb-2">{selectedScan.diseaseName}</h2>
                      <p className="text-accent text-xl font-mono">{selectedScan.confidence}% Match</p>
                    </div>

                    {getDiseaseDetails(selectedScan.diseaseName) && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xs font-bold text-muted uppercase mb-3">Recommended Treatment</h4>
                          <ul className="space-y-2">
                            {getDiseaseDetails(selectedScan.diseaseName)?.treatments.map((t, i) => (
                              <li key={i} className="text-sm text-white flex items-start gap-3">
                                <span className="w-5 h-5 rounded bg-accent/20 text-accent flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i+1}</span>
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-6 border-t border-border flex justify-between">
                          <span className="text-muted text-sm">Estimated Recovery</span>
                          <span className="text-white font-bold">{getDiseaseDetails(selectedScan.diseaseName)?.recovery}</span>
                        </div>
                      </div>
                    )}

                    <button 
                      onClick={() => setSelectedScan(null)}
                      className="mt-4 bg-white text-background py-4 rounded-2xl font-bold hover:bg-accent transition-colors"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Clear Confirmation Modal */}
      <AnimatePresence>
        {showConfirmClear && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowConfirmClear(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="text-red-500" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Clear History?</h3>
              <p className="text-muted mb-8">This action cannot be undone. All your scan history will be permanently deleted.</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 py-3 rounded-xl border border-border text-white font-bold hover:bg-border transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleClearAll}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all"
                >
                  Yes, Clear
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
