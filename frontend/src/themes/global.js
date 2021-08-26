import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle `
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }
`