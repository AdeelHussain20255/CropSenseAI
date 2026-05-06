"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  Camera, 
  Search, 
  RefreshCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Copy,
  Share2,
  X,
  Phone,
  MapPin,
  ChevronRight,
  ClipboardCheck
} from "lucide-react";
import Image from "next/image";
import { diseases, Disease } from "@/lib/diseases";
import { saveScan } from "@/lib/localStorage";
import { toast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

export default function DetectPage() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    disease: Disease;
    confidence: number;
    id: number;
  } | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Camera
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      toast("Could not access camera", "warning");
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL("image/jpeg");
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  // Analyze Disease
  const analyzeDisease = () => {
    if (!image) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      // Pick random disease
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      // Random confidence between 70 and 98
      const confidence = Math.floor(Math.random() * (98 - 70 + 1)) + 70;
      const id = Date.now();

      const analysisResult = {
        disease: randomDisease,
        confidence,
        id
      };

      setResult(analysisResult);
      setIsAnalyzing(false);

      // Save to localStorage
      saveScan({
        id,
        imageDataUrl: image,
        diseaseName: randomDisease.name,
        confidence,
        timestamp: new Date().toISOString(),
        severity: randomDisease.severity
      });

      toast("Analysis Complete!", "success");
    }, 1500);
  };

  const resetAll = () => {
    setImage(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  const copyToClipboard = (text: string, msg: string) => {
    navigator.clipboard.writeText(text);
    toast(msg, "success");
  };

  const shareResults = () => {
    if (!result) return;
    const text = `🌿 CropSense Diagnosis\nDisease: ${result.disease.name}\nSeverity: ${result.disease.severity}\nConfidence: ${result.confidence}%\nTop Treatment: ${result.disease.treatments[0]}\nPrevention: ${result.disease.prevention[0]}`;
    copyToClipboard(text, "Results copied to clipboard!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Panel: Upload/Preview */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-white">Scan Crop</h1>
            <p className="text-muted">Upload or capture a photo of the affected crop leaf.</p>
          </div>

          <div className="relative aspect-square md:aspect-[4/3] w-full bg-card rounded-3xl border-2 border-dashed border-border overflow-hidden flex flex-col items-center justify-center group transition-colors hover:border-accent">
            <AnimatePresence mode="wait">
              {isCameraActive ? (
                <motion.div 
                  key="camera"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20"
                >
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                    <button onClick={capturePhoto} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-background hover:scale-110 transition-transform">
                      <Camera size={32} />
                    </button>
                    <button onClick={stopCamera} className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                      <X size={32} />
                    </button>
                  </div>
                </motion.div>
              ) : image ? (
                <motion.div 
                  key="preview"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="relative w-full h-full"
                >
                  <Image src={image} alt="Crop preview" fill className="object-cover" unoptimized />
                  {isAnalyzing && <div className="scan-line" />}
                  {!isAnalyzing && !result && (
                    <button 
                      onClick={() => setImage(null)} 
                      className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                    >
                      <RefreshCcw size={20} />
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 p-8 text-center"
                >
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                    <Upload className="text-accent" size={32} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Click to upload or drag & drop</p>
                    <p className="text-muted text-sm mt-1">PNG, JPG or JPEG (Max. 10MB)</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={handleImageUpload}
                  />
                  <div className="flex items-center gap-4 mt-4">
                    <div className="h-px w-8 bg-border" />
                    <span className="text-muted text-xs uppercase font-bold">OR</span>
                    <div className="h-px w-8 bg-border" />
                  </div>
                  <button 
                    onClick={startCamera}
                    className="bg-border text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-accent hover:text-background transition-all font-bold"
                  >
                    <Camera size={20} /> Use Camera
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <button
            onClick={analyzeDisease}
            disabled={!image || isAnalyzing || !!result}
            className={cn(
              "w-full py-5 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 transition-all",
              !image || isAnalyzing || !!result
                ? "bg-border text-muted cursor-not-allowed"
                : "bg-accent text-background hover:bg-white hover:scale-[1.02]"
            )}
          >
            {isAnalyzing ? (
              <>
                <RefreshCcw className="animate-spin" /> Analyzing...
              </>
            ) : result ? (
              <>
                <CheckCircle2 /> Diagnosis Ready
              </>
            ) : (
              <>
                <Search size={24} /> Analyze Disease
              </>
            )}
          </button>
        </div>

        {/* Right Panel: Results */}
        <div className="flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {!result && !isAnalyzing ? (
              <motion.div
                key="empty-result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 glass rounded-[3rem] border-dashed border-border"
              >
                <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center mb-8">
                  <div className="w-16 h-16 bg-accent/5 rounded-full flex items-center justify-center animate-pulse">
                    <Search className="text-accent/40" size={32} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Results will appear here</h3>
                <p className="text-muted max-w-xs">Upload a crop photo to get your instant AI diagnosis and treatment plan.</p>
              </motion.div>
            ) : isAnalyzing ? (
              <motion.div
                key="analyzing-result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center gap-6 glass rounded-[3rem]"
              >
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
                  <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent" size={32} />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">Scanning Patterns...</h3>
                  <p className="text-muted text-sm">Identifying disease markers</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-6"
              >
                {/* Diagnosis Card */}
                <div className="glass-card p-8 rounded-[2.5rem]">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{result?.disease.name}</h2>
                      <div className="flex items-center gap-3">
                        <span className="text-accent font-mono text-lg">{result?.confidence}% Confidence</span>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                          result?.disease.severity === "Low" ? "bg-green-500/10 text-green-500" :
                          result?.disease.severity === "Medium" ? "bg-amber-500/10 text-amber-500" :
                          result?.disease.severity === "High" ? "bg-orange-500/10 text-orange-500" :
                          "bg-red-500/10 text-red-500"
                        )}>
                          {result?.disease.severity} Severity
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-3">Affected Crops</h4>
                      <div className="flex flex-wrap gap-2">
                        {result?.disease.affectedCrops.map(crop => (
                          <span key={crop} className="px-4 py-1.5 bg-border/50 text-white rounded-full text-sm">
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-3">Key Symptoms</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {result?.disease.symptoms.map((symptom, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Treatment Plan */}
                <div className="glass-card p-8 rounded-[2.5rem]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="text-accent" /> Treatment Plan
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-muted uppercase">Progress</span>
                      <div className="w-20 h-1.5 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-1/3 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {result?.disease.treatments.map((step, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-border/30 group/step cursor-pointer hover:bg-border/50 transition-colors">
                        <div className="relative flex items-center justify-center shrink-0 mt-1">
                          <div className="w-5 h-5 border-2 border-accent/30 rounded group-hover/step:border-accent transition-colors" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Step {i + 1}</span>
                          <p className="text-white text-sm">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-border flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                      <span className="text-muted">Estimated Recovery</span>
                    </div>
                    <span className="text-accent font-bold">{result?.disease.recovery}</span>
                  </div>
                </div>

                {/* Prevention Tips */}
                <div className="glass-card p-8 rounded-[2.5rem]">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <ShieldCheck className="text-accent" /> Prevention Tips
                  </h3>
                  <ul className="space-y-3">
                    {result?.disease.prevention.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted">
                        <Info size={16} className="mt-1 shrink-0 text-accent" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suppliers */}
                <div className="glass-card p-8 rounded-[2.5rem]">
                  <h3 className="text-xl font-bold text-white mb-6">Nearby Suppliers</h3>
                  <div className="space-y-4">
                    {result?.disease.suppliers.map((supplier, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-border/20">
                        <div>
                          <p className="text-white font-bold">{supplier.name}</p>
                          <p className="text-xs text-muted">{supplier.city} • {supplier.specialization}</p>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(supplier.phone, "Phone number copied!")}
                          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-all"
                        >
                          <Copy size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button 
                    onClick={shareResults}
                    className="flex-1 bg-white text-background py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-colors"
                  >
                    <Share2 size={20} /> Share Results
                  </button>
                  <button 
                    onClick={resetAll}
                    className="flex-1 border border-border text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-border transition-colors"
                  >
                    <RefreshCcw size={20} /> Scan Another
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Minimal ShieldCheck for the icons above
function ShieldCheck({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
