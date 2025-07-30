import pdfParse from "pdf-parse";

function normalizeText(input: string): string {
  // collapse multiple spaces/newlines, trim ends
  return input
    .replace(/\r\n?/g, "\n")
    .replace(/[\t ]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

export const parsePDFBuffer = async (buffer: Buffer): Promise<string> => {
  const data = await pdfParse(buffer);
  return normalizeText(data.text);
};
