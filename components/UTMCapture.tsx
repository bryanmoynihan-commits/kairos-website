"use client";

import { useEffect } from "react";
import { captureUTMParams } from "@/lib/analytics";

export default function UTMCapture() {
  useEffect(() => {
    captureUTMParams();
  }, []);

  return null;
}
