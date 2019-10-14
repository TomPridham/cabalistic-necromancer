import { createGlobalStyle } from 'styled-components'

export const Reset = createGlobalStyle`
/* from https://hankchizljaw.com/wrote/a-modern-css-reset */
/* Box sizing rules */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Remove default padding */
ul[class], ol[class] {
  padding: 0;
}

/* Remove default margin */
body, h1, h2, h3, h4, p, ul[class], ol[class],
  li, figure, figcaption, blockquote, dl, dd {
  margin: 0;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* Remove list styles on ul, ol elements with a class attribute */
ul[class], ol[class] {
  list-style: none;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img {
  max-width: 100%;
  display: block;
}

/* Natural flow and rhythm in articles by default */
article > * + * {
  margin-top: 1em;
}

/* Inherit fonts for inputs and buttons */
input, button, textarea, select {
  font: inherit;
}

/* Remove all animations and transitions for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`

export const theme = {
  accent: '#3596ED',
  background: '#ECECF0',
  danger: '#660000',
  textColor: '#323141',
  dark: '#1F1F29',
}

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Oxygen', sans-serif;
    color: ${theme.textColor}
    background: ${theme.background}
  }
  button {
    background: transparent;
    margin: 0;
    padding: 0;
    width: auto;
    border: none;
    cursor: pointer;
  }
`
