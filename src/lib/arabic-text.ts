import { isValidElement, type ReactNode } from "react";

const ARABIC_CHAR = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;
const NON_LETTER = /[\s\d\p{P}\p{S}]/gu;

/** True when the letters in `text` are majority Arabic-script. */
export function isMostlyArabic(text: string): boolean {
  const letters = text.replace(NON_LETTER, "");
  if (!letters) return false;

  let arabicCount = 0;
  for (const char of letters) {
    if (ARABIC_CHAR.test(char)) arabicCount++;
  }
  return arabicCount / letters.length > 0.5;
}

/** Flattens react-markdown's `children` (React nodes) into plain text. */
export function flattenToText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenToText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return flattenToText(node.props.children);
  }
  return "";
}
