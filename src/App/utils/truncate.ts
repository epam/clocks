export function truncate(text: string, len: number) {
  if (text.length > 20 && text.length > 0) {
    return text.substring(0, len) + '...';
  } else {
    return text;
  }
}
