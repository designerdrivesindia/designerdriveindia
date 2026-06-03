"use client";

import { create } from "zustand";

export type ToastVariant = "default" | "success" | "error";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface UIState {
  // Mobile navigation drawer
  mobileNavOpen: boolean;
  setMobileNav: (open: boolean) => void;

  // Global inquiry modal (used by "Plan My Trip" CTAs)
  inquiryModalOpen: boolean;
  inquiryContext: { title?: string; source?: string; referenceId?: string };
  openInquiryModal: (ctx?: UIState["inquiryContext"]) => void;
  closeInquiryModal: () => void;

  // Toasts
  toasts: Toast[];
  toast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
}

let toastSeq = 0;

export const useUIStore = create<UIState>((set) => ({
  mobileNavOpen: false,
  setMobileNav: (open) => set({ mobileNavOpen: open }),

  inquiryModalOpen: false,
  inquiryContext: {},
  openInquiryModal: (ctx = {}) =>
    set({ inquiryModalOpen: true, inquiryContext: ctx }),
  closeInquiryModal: () => set({ inquiryModalOpen: false, inquiryContext: {} }),

  toasts: [],
  toast: (t) => {
    const id = `toast-${++toastSeq}`;
    set((s) => ({ toasts: [...s.toasts, { ...t, id }] }));
    // Auto-dismiss after 5s
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) }));
    }, 5000);
  },
  dismissToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) })),
}));
