import 'antd/dist/antd.css';
import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import robotoBold from '../assets/fonts/roboto/roboto-bold-webfont.woff2';
import robotoBoldItalic from '../assets/fonts/roboto/roboto-bolditalic-webfont.woff2';
import robotoLight from '../assets/fonts/roboto/roboto-light-webfont.woff2';
import robotoLightItalic from '../assets/fonts/roboto/roboto-lightitalic-webfont.woff2';
import robotoMedium from '../assets/fonts/roboto/roboto-medium-webfont.woff2';
import robotoRegular from '../assets/fonts/roboto/roboto-regular-webfont.woff2';
import  TicketStyle from '~/components/Ticket/styles';

export default createGlobalStyle`
  @font-face {
    font-family: 'roboto';
    src: url(${robotoBold}) format('woff2');
    font-weight: bold;
    font-style: normal;

}
@font-face {
    font-family: 'roboto';
    src: url(${robotoBoldItalic}) format('woff2');
    font-weight: bold;
    font-style: italic;

}
@font-face {
    font-family: 'roboto';
    src: url(${robotoLight}) format('woff2');
    font-weight: light;
    font-style: normal;

}
@font-face {
    font-family: 'roboto';
    src: url(${robotoLightItalic}) format('woff2');
    font-weight: light;
    font-style: italic;

}
@font-face {
    font-family: 'roboto';
    src: url(${robotoMedium}) format('woff2');
    font-weight: 400;
    font-style: normal;

}
@font-face {
    font-family: 'roboto';
    src: url(${robotoRegular}) format('woff2');
    font-weight: normal;
    font-style: normal;
}
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'roboto';
  }

  .ant-layout {
    min-height: 90vh;  
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  #components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
  
  .site-layout .site-layout-background {
    background: #fff;
  }

  .orderAmount {
    color: green;
  }

  .print-btn-order {
    text-align: right;
  }

  .card-deck {
    .ant-card-actions {
      margin-top: auto;
    }
  }

  .impress-options-box {
    height: 100%;
    .ant-tabs, .ant-tabs-content {
      height: 100%!important;
    }
  }

  ${TicketStyle}
`;

