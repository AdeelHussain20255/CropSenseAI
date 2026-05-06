"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Upload, 
  Zap, 
  CheckCircle, 
  ShieldCheck, 
  Search, 
  History, 
  Bell,
  Camera,
  ArrowDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-10 md:pt-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full text-accent text-sm font-medium mb-8"
          >
            <span className="animate-pulse">✦</span> AI-Powered Crop Disease Detection
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
          >
            Protect Your Crops with <br />
            <span className="italic text-accent bg-gradient-to-r from-accent to-emerald-400 bg-clip-text text-transparent">AI Diagnosis</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Instant, accurate, and actionable insights for your farm. Upload a photo of your crop and let our AI identify diseases and recommend treatments in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/detect"
              className="group bg-accent text-background px-8 py-4 rounded-2xl text-lg font-bold flex items-center gap-2 hover:bg-white transition-all hover:scale-105 active:scale-95"
            >
              Start Detection <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              className="px-8 py-4 rounded-2xl text-lg font-bold text-white border border-border hover:bg-border transition-all flex items-center gap-2"
            >
              View Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20 py-8 border-y border-border/50 flex flex-wrap justify-center gap-8 md:gap-16 text-sm md:text-base font-medium text-muted"
          >
            <span className="flex items-center gap-2">
              <span className="text-accent font-bold">50+</span> Diseases Detected
            </span>
            <span className="w-1 h-1 bg-border rounded-full hidden md:block" />
            <span className="flex items-center gap-2">
              <span className="text-accent font-bold">95%</span> Accuracy
            </span>
            <span className="w-1 h-1 bg-border rounded-full hidden md:block" />
            <span className="flex items-center gap-2">
              <span className="text-accent font-bold">10K+</span> Farmers Helped
            </span>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-muted">Three simple steps to save your harvest</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Dashed Line Connector (Desktop) */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] dashed-connector hidden md:block -z-10" />

            {[
              { icon: Upload, title: "Upload Photo", desc: "Take a clear photo of the affected area and upload it to our tool." },
              { icon: Zap, title: "AI Analysis", desc: "Our neural network scans the image to identify disease patterns." },
              { icon: CheckCircle, title: "Get Treatment", desc: "Receive a detailed treatment plan and local supplier contacts." },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-card border border-border rounded-3xl flex items-center justify-center mb-6 group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(74,222,128,0.1)] transition-all">
                  <step.icon className="text-accent w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-muted leading-relaxed max-w-[250px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: Camera, title: "Image Upload & Camera", desc: "Capture photos directly from your field or upload from gallery." },
              { icon: Search, title: "Instant Classification", desc: "Get diagnostic results in under a second with 95% precision." },
              { icon: ShieldCheck, title: "Actionable Plans", desc: "Step-by-step recovery guides and chemical recommendations." },
              { icon: Search, title: "Supplier Directory", desc: "Connect with vetted agricultural suppliers in your local city." },
              { icon: History, title: "Scan History", desc: "Track disease spread and treatment progress over time." },
              { icon: Bell, title: "Treatment Reminders", desc: "Stay on top of your crop care schedule with smart alerts." },
            ].map((feat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass-card p-8 rounded-[2rem] flex flex-col gap-4"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <feat.icon className="text-accent w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">{feat.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to heal your fields?</h2>
            <p className="text-muted text-lg max-w-xl mx-auto mb-10">
              Join thousands of farmers using CropSense AI to protect their livelihood and increase yield.
            </p>
            <Link
              href="/detect"
              className="inline-flex bg-accent text-background px-10 py-5 rounded-2xl text-xl font-bold items-center gap-3 hover:bg-white transition-all hover:scale-105"
            >
              Start Free Diagnosis <ArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
