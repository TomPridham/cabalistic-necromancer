import * as React from 'react'
import styled, { css, keyframes } from 'styled-components'

import { images } from './images'

type SkullProps = {
  shouldLaugh: boolean
}

type AsyncButtonProps = {
  clickHandler: () => Promise<void>
  loading: boolean
  loadingText: string
}

type ThoughtProps = {
  currentBeer: string | undefined
  currentThought: string | undefined
  daydream: string | undefined
  name: string
}

const laugh = () => keyframes`
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(3px);
  }
  50% {
    transform: translateY(6px);
  }
  75% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(6px);
  }
`

const Jaw = styled.path<SkullProps>`
  ${({ shouldLaugh }) =>
    shouldLaugh
      ? css`
          animation: ${laugh} 0.5s alternate linear infinite;
        `
      : ''};
`

export const Skull: React.FC<SkullProps> = ({ shouldLaugh = true }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 74 64"
    width="32"
    height="32"
    strokeWidth="5px"
  >
    <defs>
      <clipPath id="angry-left-eye">
        <rect x="0" y="0" width="1" height="1" />
      </clipPath>
    </defs>
    <g data-name="skull-death">
      <path d="M32,2C17.66,2,6,11.87,6,24c0,6.93,3.92,13.53,10.5,17.67a1.025,1.025,0,0,1,.5.86V47a3.009,3.009,0,0,0,3,3h2a1,1,0,0,0,1-1V47h2v2a1,1,0,0,0,1,1h3a1,1,0,0,0,1-1V46a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v3a1,1,0,0,0,1,1h3a1,1,0,0,0,1-1V47h2v2a1,1,0,0,0,1,1h2a3.009,3.009,0,0,0,3-3V42.53a1.025,1.025,0,0,1,.5-.86C54.08,37.53,58,30.93,58,24,58,11.87,46.34,2,32,2ZM46.44,39.97A3.024,3.024,0,0,0,45,42.53V47a1,1,0,0,1-1,1H43V47a2.006,2.006,0,0,0-2-2H39a2.006,2.006,0,0,0-2,2v1H36V46a3.009,3.009,0,0,0-3-3H31a3.009,3.009,0,0,0-3,3v2H27V47a2.006,2.006,0,0,0-2-2H23a2.006,2.006,0,0,0-2,2v1H20a1,1,0,0,1-1-1V42.53a3.024,3.024,0,0,0-1.44-2.56C11.49,36.15,8,30.33,8,24,8,12.97,18.77,4,32,4s24,8.97,24,20C56,30.33,52.51,36.15,46.44,39.97Z" />
      <g data-name="eyes">
        <path
          id="left-eye"
          d="M22,18a8,8,0,1,0,8,8A8.009,8.009,0,0,0,22,18Zm0,14a6,6,0,1,1,6-6A6.006,6.006,0,0,1,22,32Z"
        />
        {shouldLaugh && (
          <>
            <circle fill="red" r="6" cx="22" cy="26" />
            <rect
              fill="#ECECF0"
              height="8"
              transform="rotate(45, 23, 26)"
              width="16"
              x="14"
              y="18"
            />
          </>
        )}
        <path
          id="right-eye"
          d="M41,22a6,6,0,1,0,6,6A6.006,6.006,0,0,0,41,22Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,41,32Z"
        />
        {shouldLaugh && (
          <>
            <circle fill="red" r="4" cx="41" cy="28" />
            <rect
              fill="#ECECF0"
              height="8"
              transform="rotate(-45, 36, 42)"
              width="16"
              x="41"
              y="28"
            />
          </>
        )}
      </g>
      <Jaw
        shouldLaugh={shouldLaugh}
        d="M45,55H43V54a2.006,2.006,0,0,0-2-2H39a2.006,2.006,0,0,0-2,2v1H36V53a2.006,2.006,0,0,0-2-2H30a2.006,2.006,0,0,0-2,2v2H27V54a2.006,2.006,0,0,0-2-2H23a2.006,2.006,0,0,0-2,2v1H19a2.006,2.006,0,0,0-2,2v2a2.006,2.006,0,0,0,2,2h.27A1.984,1.984,0,0,0,21,62H43a1.984,1.984,0,0,0,1.73-1H45a2.006,2.006,0,0,0,2-2V57A2.006,2.006,0,0,0,45,55Zm0,4H44a1,1,0,0,0-1,1H21a1,1,0,0,0-1-1H19V57h3a1,1,0,0,0,1-1V54h2v2a1,1,0,0,0,1,1h3a1,1,0,0,0,1-1V53h4v3a1,1,0,0,0,1,1h3a1,1,0,0,0,1-1V54h2v2a1,1,0,0,0,1,1h3Z"
      />
    </g>
  </svg>
)

const Button = styled.button`
  text-align: center;
  vertical-align: center;
  border: 2px solid ${({ theme }) => theme.dark};
  border-radius: 4px;
  padding: 8px;
  font-size: 32px;
  width: 100%;

  &:hover,
  &:focus {
    box-shadow: inset 0px 0px 2px ${({ theme }) => theme.dark};
  }

  &:active {
    box-shadow: inset 0px 0px 8px ${({ theme }) => theme.dark};
  }

  &:disabled {
    box-shadow: none;
    cursor: not-allowed;
    border: 2px solid graytext;
  }

  &::-moz-focus-inner {
    border: 0;
  }
`

export const AsyncButton: React.FC<AsyncButtonProps> = ({
  children,
  clickHandler,
  loading,
  loadingText,
  ...props
}) => {
  const onMouseUpHandler = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement) {
      e.target.blur()
    }
  }

  return (
    <Button
      {...props}
      disabled={loading}
      onClick={clickHandler}
      onMouseUp={onMouseUpHandler}
    >
      {!loading && children}
      {loading && (
        <>
          <Skull shouldLaugh={loading} />
          <span style={{ marginLeft: '8px' }}>{loadingText}</span>
        </>
      )}
    </Button>
  )
}

const thoughtStyles = css`
  img {
    height: 140px;
    width: 140px;
    padding: 5px;
  }
  & > div {
    display: flex;
  }
`

export const Thought: React.FC<ThoughtProps> = ({
  currentBeer,
  currentThought,
  daydream,
  name,
}) => (
  <div css={thoughtStyles}>
    {currentThought && (
      <p>
        {name} is currently thinking: "{currentThought}"
      </p>
    )}
    {currentBeer && (
      <p>
        {name} is currently sipping {currentBeer}
      </p>
    )}

    <div style={{ display: 'flex' }}>
      <img
        src={images[name.toLowerCase() as keyof typeof images]}
        alt={`${name} portrait`}
      />
      <img src={daydream} alt={`${name}'s daydream`} />
    </div>
  </div>
)

export const ErrorComponent = () => (
  <>
    <svg
      height="250"
      viewBox="0 0 64 64"
      width="250"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g data-name="skull-death">
        <path
          d="m54 26a20.583 20.583 0 0 1 -7.75 16 22.178 22.178 0 0 1 -5.28 3.17l.01.06 1.02 10.77h-20l1.02-10.77.01-.06a22.178 22.178 0 0 1 -5.28-3.17 20.583 20.583 0 0 1 -7.75-16 20.148 20.148 0 0 1 2.33-9.42 20.871 20.871 0 0 1 3.59-4.91 22.718 22.718 0 0 1 32.16 0 20.871 20.871 0 0 1 3.59 4.91 20.148 20.148 0 0 1 2.33 9.42z"
          fill="#ffdaaa"
        />
        <g fill="#ee8700">
          <path d="m23.03 45.17-.01.06-8.4 8.4a1 1 0 0 0 0 1.41l1.41 1.42a1 1 0 0 1 0 1.41l-2.83 2.83a1 1 0 0 1 -1.41 0l-2.83-2.83a1 1 0 0 1 0-1.41l-1.42-1.42a1 1 0 0 1 -1.41 0l-2.83-2.83a1 1 0 0 1 0-1.41l2.83-2.83a1 1 0 0 1 1.41 0l1.42 1.41a1 1 0 0 0 1.41 0l7.38-7.38a22.178 22.178 0 0 0 5.28 3.17z" />
          <path d="m60.7 50.8a1 1 0 0 1 0 1.41l-2.83 2.83a1 1 0 0 1 -1.41 0l-1.42 1.42a1 1 0 0 1 0 1.41l-2.83 2.83a1 1 0 0 1 -1.41 0l-2.83-2.83a1 1 0 0 1 0-1.41l1.41-1.42a1 1 0 0 0 0-1.41l-8.4-8.4-.01-.06a22.178 22.178 0 0 0 5.28-3.17l7.38 7.38a1 1 0 0 0 1.41 0l1.42-1.41a1 1 0 0 1 1.41 0z" />
          <path d="m16.03 6.13a1 1 0 0 1 0 1.41l-1.41 1.42a1 1 0 0 0 0 1.41l1.3 1.3a20.871 20.871 0 0 0 -3.59 4.91l-1.96-1.96a1 1 0 0 0 -1.41 0l-1.42 1.41a1 1 0 0 1 -1.41 0l-2.83-2.83a1 1 0 0 1 0-1.41l2.83-2.83a1 1 0 0 1 1.41 0l1.42-1.42a1 1 0 0 1 0-1.41l2.83-2.83a1 1 0 0 1 1.41 0z" />
          <path d="m60.7 11.79a1 1 0 0 1 0 1.41l-2.83 2.83a1 1 0 0 1 -1.41 0l-1.42-1.41a1 1 0 0 0 -1.41 0l-1.96 1.96a20.871 20.871 0 0 0 -3.59-4.91l1.3-1.3a1 1 0 0 0 0-1.41l-1.41-1.42a1 1 0 0 1 0-1.41l2.83-2.83a1 1 0 0 1 1.41 0l2.83 2.83a1 1 0 0 1 0 1.41l1.42 1.42a1 1 0 0 1 1.41 0z" />
        </g>
        <path d="m34 37 1 4h-6l1-4z" fill="#3e3d42" />
        <path
          d="m45.41 22.47a6.994 6.994 0 0 1 -4.28 12.53 7.013 7.013 0 0 1 -6.13-3.61l3.15-2.7 3.13-2.68z"
          fill="#3e3d42"
        />
        <path
          d="m25.98 28.69 3.15 2.7a7 7 0 0 1 -13.13-3.39 6.93 6.93 0 0 1 2.72-5.53l4.13 3.54z"
          fill="#3e3d42"
        />
        <path d="m58.58 47.26a1.851 1.851 0 0 0 -1.43-.58 1.9 1.9 0 0 0 -1.39.58l-1.42 1.41-6.63-6.62a21.607 21.607 0 0 0 7.29-16.05 21.009 21.009 0 0 0 -2.12-9.21l1.46-1.46 1.4 1.4a1.949 1.949 0 0 0 1.41.59h.01a2.021 2.021 0 0 0 1.42-.58l2.83-2.83a2 2 0 0 0 0-2.83l-2.83-2.83a2.021 2.021 0 0 0 -1.42-.58 2.157 2.157 0 0 0 -.51.06l-.38-.38a2.074 2.074 0 0 0 .06-.5 1.962 1.962 0 0 0 -.58-1.43l-2.83-2.83a2 2 0 0 0 -2.83 0l-2.83 2.83a1.962 1.962 0 0 0 -.58 1.43 1.9 1.9 0 0 0 .58 1.39l1.41 1.42-.61.61a23.7 23.7 0 0 0 -32.12 0l-.61-.61 1.4-1.4a2.016 2.016 0 0 0 .01-2.84l-2.83-2.83a2 2 0 0 0 -2.83 0l-2.83 2.83a1.962 1.962 0 0 0 -.58 1.43 2.074 2.074 0 0 0 .06.5l-.38.38a2.157 2.157 0 0 0 -.51-.06 2.021 2.021 0 0 0 -1.42.58l-2.83 2.83a2 2 0 0 0 0 2.83l2.83 2.83a2.021 2.021 0 0 0 1.42.58h.01a1.9 1.9 0 0 0 1.39-.58l1.42-1.41 1.46 1.46a21.009 21.009 0 0 0 -2.12 9.21 21.607 21.607 0 0 0 7.29 16.05l-6.63 6.62-1.4-1.4a1.949 1.949 0 0 0 -1.41-.59h-.01a2.021 2.021 0 0 0 -1.42.58l-2.83 2.83a2 2 0 0 0 0 2.83l2.83 2.83a2.021 2.021 0 0 0 1.42.58 2.844 2.844 0 0 0 .51-.06l.38.38a2.074 2.074 0 0 0 -.06.5 1.962 1.962 0 0 0 .58 1.43l2.83 2.83a2.016 2.016 0 0 0 2.83 0l2.83-2.83a1.962 1.962 0 0 0 .58-1.43 1.9 1.9 0 0 0 -.58-1.39l-1.41-1.42 6.44-6.44-.77 8.01a1.013 1.013 0 0 0 .26.76 1 1 0 0 0 .74.33h20a1 1 0 0 0 .74-.33 1.013 1.013 0 0 0 .26-.76l-.77-8.01 6.44 6.44-1.4 1.4a2.016 2.016 0 0 0 -.01 2.84l2.83 2.83a2.016 2.016 0 0 0 2.83 0l2.83-2.83a1.962 1.962 0 0 0 .58-1.43 2.074 2.074 0 0 0 -.06-.5l.38-.38a2.074 2.074 0 0 0 .5.06 1.83 1.83 0 0 0 1.43-.58l2.83-2.83a2 2 0 0 0 0-2.83zm-7.08-43.25 2.84 2.81a1.014 1.014 0 0 0 -.01 1.43l1.42 1.42a1.027 1.027 0 0 0 .7.29h.01a.951.951 0 0 0 .7-.29l2.83 2.82-2.83 2.83-1.41-1.41a2.061 2.061 0 0 0 -2.83 0l-1.04 1.05a21.343 21.343 0 0 0 -2.42-3.26l.63-.62a1.992 1.992 0 0 0 0-2.82l-1.41-1.42zm-40.42 9.9a2.048 2.048 0 0 0 -2.82 0l-1.42 1.41-2.83-2.82 2.81-2.84a1.017 1.017 0 0 0 .71.3.928.928 0 0 0 .72-.29l1.42-1.42a1 1 0 0 0 0-1.41l2.82-2.83 2.83 2.83-1.41 1.41a2 2 0 0 0 0 2.83l.63.62a21.343 21.343 0 0 0 -2.42 3.26zm2.83 39.01a1.992 1.992 0 0 0 0 2.82l1.41 1.42-2.82 2.83-2.84-2.81a1.014 1.014 0 0 0 .01-1.43l-1.42-1.42a.864.864 0 0 0 -.71-.29.951.951 0 0 0 -.7.29l-2.83-2.82 2.83-2.83 1.41 1.41a2 2 0 0 0 2.83 0l6.76-6.76a22.562 22.562 0 0 0 3.51 2.15zm26.67-8.67a1.025 1.025 0 0 0 -.61 1.02l.93 9.73h-2.9v-3h-2v3h-3v-5h-2v5h-3v-3h-2v3h-2.9l.93-9.73a1.025 1.025 0 0 0 -.61-1.02 20.012 20.012 0 0 1 -12.42-18.25c0-11.03 9.42-20 21-20s21 8.97 21 20a20.012 20.012 0 0 1 -12.42 18.25zm16.6 10.09a1.017 1.017 0 0 0 -.71-.3 1.183 1.183 0 0 0 -.72.29l-1.42 1.42a1 1 0 0 0 0 1.41l-2.82 2.83-2.83-2.83 1.41-1.41a2 2 0 0 0 0-2.83l-7.44-7.44a22.562 22.562 0 0 0 3.51-2.15l6.76 6.76a1.992 1.992 0 0 0 2.82 0l1.42-1.41 2.83 2.82z" />
        <path d="m29.78 30.63-10.41-8.92a1 1 0 0 0 -1.26-.03 7.872 7.872 0 0 0 -3.11 6.32 8 8 0 0 0 15 3.88 1.007 1.007 0 0 0 -.22-1.25zm-6.78 3.37a6 6 0 0 1 -6-6 5.9 5.9 0 0 1 1.73-4.21l9.09 7.79a6.024 6.024 0 0 1 -4.82 2.42z" />
        <path d="m49.13 28a7.9 7.9 0 0 0 -3.112-6.324 1 1 0 0 0 -1.259.035l-10.41 8.92a1 1 0 0 0 -.222 1.246 8 8 0 0 0 15.003-3.877zm-12.817 3.581 9.092-7.789a5.921 5.921 0 0 1 1.725 4.208 6 6 0 0 1 -10.817 3.581z" />
        <path d="m35.97 40.76-1-4a1 1 0 0 0 -.97-.76h-4a1 1 0 0 0 -.97.76l-1 4a1.022 1.022 0 0 0 .18.86 1 1 0 0 0 .79.38h6a1 1 0 0 0 .79-.38 1.022 1.022 0 0 0 .18-.86zm-5.69-.76.5-2h2.44l.5 2z" />
      </g>
    </svg>
    <h2>
      {' '}
      Something went wrong when we were sacrificing the goats. Try again?
    </h2>
  </>
)

export const Empty = () => (
  <p>Thoughts are waiting for you to click that button.</p>
)
