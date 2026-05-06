export interface ScanHistory {
  id: number;
  imageDataUrl: string;
  diseaseName: string;
  confidence: number;
  timestamp: string;
  severity: string;
}

const STORAGE_KEY = "cropsense_history";

export const saveScan = (scan: ScanHistory) => {
  if (typeof window === "undefined") return;
  const history = getScans();
  const updatedHistory = [scan, ...history];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
};

export const getScans = (): ScanHistory[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearScans = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};

export const deleteScan = (id: number) => {
  if (typeof window === "undefined") return;
  const history = getScans();
  const updatedHistory = history.filter((scan) => scan.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
};
