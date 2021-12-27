export interface IThemingProps {
  autoTheming: boolean | undefined;
  theme: string | undefined;
  autoThemingHandler: () => void;
  themeHandler: () => void;
}
