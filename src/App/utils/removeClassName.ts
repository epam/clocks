import { RefObject } from 'react';

export default function removeClassName(elementRef: RefObject<HTMLDivElement>, className: string) {
  return elementRef.current?.classList.remove(className);
}
