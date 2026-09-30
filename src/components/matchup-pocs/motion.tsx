"use client";

import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PocMotion({ root, swapped }: { root: RefObject<HTMLDivElement | null>; swapped: boolean }) {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const node = root.current;
      if (!node) return;
      const words = node.querySelectorAll("[data-reveal-word]");
      if (words.length) {
        gsap.fromTo(words, { opacity: 0.65 }, {
          opacity: 1, stagger: 0.12, ease: "none",
          scrollTrigger: { trigger: words[0].parentElement, start: "top 90%", end: "top 55%", scrub: true },
        });
      }
      // Only the optional deep-dive cards stack. The quick card never waits for scroll.
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", node);
      cards.slice(0, -1).forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card, start: "top 110px", endTrigger: cards[index + 1],
          end: "top 170px", pin: true, pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.97, transformOrigin: "top center", ease: "none",
          scrollTrigger: { trigger: cards[index + 1], start: "top 75%", end: "top 170px", scrub: true },
        });
      });
    }, root);
    return () => media.revert();
  }, { scope: root, dependencies: [swapped], revertOnUpdate: true });
  return null;
}
