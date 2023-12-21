import { createGlobalStyle } from 'styled-components';
import resetStyle from './reset';
import DESIGN_TOKEN from './tokens';

const { color } = DESIGN_TOKEN;
const GlobalStyles = createGlobalStyle`
${resetStyle}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
  font-family: "Pretendard";
  font-weight: 400;
  /* background-color: ${color.gray[100]}; */
}
`;

export default GlobalStyles;
