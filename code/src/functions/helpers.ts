export function randomHexColor(): string {
  return (
    "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 6)
  );
}

export function stringShortener(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.slice(0, maxLength - 3) + "...";
  }
  return text;
}

export function generateId(): string {
  return Date.now() + Math.random().toString(36).substring(2, 9);
}
