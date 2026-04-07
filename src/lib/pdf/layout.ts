import type { PDFPage, PDFFont, RGB } from "pdf-lib";
import { pdfTheme } from "@/lib/pdf/theme";

export type PdfFonts = {
  regular: PDFFont;
  bold: PDFFont;
};

export type Box = { x: number; y: number; w: number; h: number };

export function drawText(
  page: PDFPage,
  text: string,
  opts: {
    x: number;
    y: number;
    size: number;
    font: PDFFont;
    color: RGB;
    maxWidth?: number;
    lineHeight?: number;
    maxLines?: number;
  },
) {
  const { x, y, size, font, color, maxWidth, lineHeight, maxLines } = opts;

  if (!maxWidth) {
    page.drawText(text, { x, y, size, font, color });
    return { height: size, lines: 1 };
  }

  // Stabiilne word-wrap koos pika sõna "hard wrap"-iga (PDF-is ei tohi overflow'ida).
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  const pushLine = (line: string) => {
    if (!line) return;
    lines.push(line);
  };

  const hardWrapWord = (word: string) => {
    let chunk = "";
    for (const ch of Array.from(word)) {
      const test = chunk + ch;
      if (font.widthOfTextAtSize(test, size) <= maxWidth) chunk = test;
      else {
        pushLine(chunk);
        chunk = ch;
      }
      if (maxLines && lines.length >= maxLines) return "";
    }
    return chunk;
  };

  for (const w of words) {
    const ww = font.widthOfTextAtSize(w, size);
    const safeWord = ww <= maxWidth ? w : hardWrapWord(w);
    if (maxLines && lines.length >= maxLines) break;
    const test = current ? `${current} ${safeWord}` : safeWord;
    const width = font.widthOfTextAtSize(test, size);
    if (width <= maxWidth) current = test;
    else {
      pushLine(current);
      current = safeWord;
      if (maxLines && lines.length >= maxLines) break;
    }
  }
  if (current && (!maxLines || lines.length < maxLines)) pushLine(current);

  let finalLines = lines;
  if (maxLines && finalLines.length > maxLines) {
    finalLines = finalLines.slice(0, maxLines);
  }

  const lh = lineHeight ?? size * 1.25;
  let yy = y;
  for (let i = 0; i < finalLines.length; i += 1) {
    const line = finalLines[i];
    page.drawText(line, { x, y: yy, size, font, color });
    yy -= lh;
  }
  return { height: finalLines.length * lh, lines: finalLines.length };
}

export function drawPanel(page: PDFPage, box: Box, fill = pdfTheme.colors.panel) {
  // pdf-lib ei toeta "borderRadius" tüübi järgi igal versioonil; hoia ristkülikud puhtad ja print-sõbralikud.
  page.drawRectangle({
    x: box.x,
    y: box.y,
    width: box.w,
    height: box.h,
    color: fill,
    borderColor: pdfTheme.colors.line,
    borderWidth: 1,
  });
}

export function drawDivider(page: PDFPage, x: number, y: number, w: number) {
  page.drawLine({
    start: { x, y },
    end: { x: x + w, y },
    thickness: 1,
    color: pdfTheme.colors.line,
  });
}

export function formatDateEt(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

