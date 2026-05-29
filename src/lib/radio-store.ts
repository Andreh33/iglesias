"use client";

import { create } from "zustand";

type RadioState = {
  /** El usuario ha iniciado la reproducción al menos una vez (no autoplay). */
  started: boolean;
  playing: boolean;
  volume: number;
  /** Visible el mini-player de la barra inferior. */
  miniVisible: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setVolume: (v: number) => void;
  hideMini: () => void;
};

export const useRadio = create<RadioState>((set) => ({
  started: false,
  playing: false,
  volume: 0.8,
  miniVisible: false,
  play: () => set({ playing: true, started: true, miniVisible: true }),
  pause: () => set({ playing: false }),
  toggle: () =>
    set((s) => ({ playing: !s.playing, started: true, miniVisible: true })),
  setVolume: (v) => set({ volume: v }),
  hideMini: () => set({ miniVisible: false, playing: false }),
}));
