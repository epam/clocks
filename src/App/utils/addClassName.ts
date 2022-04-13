import { RefObject } from 'react';

export default function addClassName(elementRef: RefObject<HTMLDivElement>, className: string) {
  return elementRef.current?.classList.add(className);
}
