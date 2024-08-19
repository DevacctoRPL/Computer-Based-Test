import 'styled-components';
import { CSSProp } from 'styled-components';

declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
}

declare module 'styled-components' {
  export interface DefaultTheme {
    // Define your theme properties here if you're using a theme
  }
}

declare module 'styled-components' {
  export interface ThemedStyledComponentsModule<T> {
    createGlobalStyle: ThemedGlobalStyledClassFactory<T>;
    css: ThemedCssFunction<T>;
    keyframes: ThemedKeyframesFunction<T>;
    ThemeProvider: ThemeProviderComponent<T>;
    useTheme(): T;
    ServerStyleSheet: ServerStyleSheet;
    StyleSheetManager: StyleSheetManagerComponent;
  }

  export interface ThemedStyledComponents<T> extends ThemedStyledComponentsModule<T> {
    <C extends keyof JSX.IntrinsicElements | React.ComponentType<any>>(
      component: C
    ): ThemedStyledFunction<C, T>;
  }

  export type StyledComponents = ThemedStyledComponents<DefaultTheme>;
  export const styled: StyledComponents;
}