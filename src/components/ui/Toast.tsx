"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "info" | "warning";
  id: number;
  onClose: (id: number) => void;
}

const Toast = ({ message, type = "success", id, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 2500);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="glass px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl min-w-[280px]"
    >
      {type === "success" ? (
        <CheckCircle2 className="text-accent" size={20} />
      ) : (
        <AlertCircle className="text-amber-500" size={20} />
      )}
      <p className="text-white text-sm font-medium flex-1">{message}</p>
      <button onClick={() => onClose(id)} className="text-muted hover:text-white">
        <X size={16} />
      </button>
    </motion.div>
  );
};

let toastCount = 0;
let addToastFn: (message: string, type?: "success" | "info" | "warning") => void;

export const toast = (message: string, type: "success" | "info" | "warning" = "success") => {
  if (addToastFn) {
    addToastFn(message, type);
  }
};

export const Toaster = () => {
  const [toasts, setToasts] = useState<{ id: number; message: string; type?: "success" | "info" | "warning" }[]>([]);

  useEffect(() => {
    addToastFn = (message, type) => {
      const id = ++toastCount;
      setToasts((prev) => [...prev, { id, message, type }]);
    };
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};
