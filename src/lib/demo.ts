"use client";

import { toast } from "sonner";

/**
 * Shows a demo notice toast. Used on every link/button that would normally
 * navigate to a real page or external site. In this demo build, those links
 * are intentionally inert — they show this notice instead.
 */
export function showDemoNotice(action?: string) {
  toast.success("This is a demo website", {
    description: action
      ? `${action} will be available when the production site is built. This is a portfolio demo by Amrit Raj.`
      : "Links and actions will be connected when the production site is built. This is a portfolio demo by Amrit Raj.",
    duration: 4000,
  });
}
