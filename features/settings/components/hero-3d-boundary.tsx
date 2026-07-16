"use client";

import { Component, type ReactNode } from "react";

import { HeroSceneFallback } from "@/features/settings/components/hero-scene-fallback";

export class Hero3DBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Hero 3D scene failed to render, falling back:", error);
  }

  render() {
    if (this.state.failed) return <HeroSceneFallback />;
    return this.props.children;
  }
}
