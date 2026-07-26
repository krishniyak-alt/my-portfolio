import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Edit3, Check, RotateCcw, Save, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EditBar = () => {
  const { isEditMode, setIsEditMode, resetToDefault } = usePortfolio();
  const [copied, setCopied] = useState(false);

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold shadow-2xl transition-all duration-300 border ${
            isEditMode
              ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.6)] animate-pulse'
              : 'bg-accent text-slate-950 border-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)]'
          }`}
        >
          <Edit3 size={18} />
          {isEditMode ? 'Exit Edit Mode' : 'Live Website Editor'}
        </motion.button>
      </div>

      {/* Edit Mode Top Control Banner */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/40 text-white px-4 py-3 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Sparkles size={18} className="animate-spin" />
                <span>Live In-Browser Edit Mode Active! Drag sliders or click text to edit anywhere.</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetToDefault}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg border border-red-500/30 transition-colors"
                >
                  <RotateCcw size={14} />
                  Reset Defaults
                </button>
                <button
                  onClick={() => setIsEditMode(false)}
                  className="flex items-center gap-1 px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                >
                  <Check size={16} /> Done Editing
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditBar;
