export function randomHexColor(): string {
  const color = Math.floor(Math.random() * 0xffffff);
  return `#${color.toString(16).padStart(6, "0")}`;
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
