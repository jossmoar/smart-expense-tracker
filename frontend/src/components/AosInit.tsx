"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({ once: true, duration: 500, easing: "ease-out-cubic" });
  }, []);

  // A client-side route change mounts brand new [data-aos] elements AOS
  // never scanned — without this they'd stay invisible until a hard reload.
  useEffect(() => {
    const id = requestAnimationFrame(() => AOS.refreshHard());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
