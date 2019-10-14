import * as React from 'react'
import styled, { css, keyframes } from 'styled-components'

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
  name: string | undefined
}

const laugh = () => keyframes`
  from {
    transform: translate&(0px);
  }
  to {
    transform: translateY(2px);
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
    viewBox="0 0 64 64"
    width="24"
    height="24"
    strokeWidth="5px"
  >
    <g data-name="skull-death">
      <path d="M32,2C17.66,2,6,11.87,6,24c0,6.93,3.92,13.53,10.5,17.67a1.025,1.025,0,0,1,.5.86V47a3.009,3.009,0,0,0,3,3h2a1,1,0,0,0,1-1V47h2v2a1,1,0,0,0,1,1h3a1,1,0,0,0,1-1V46a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v3a1,1,0,0,0,1,1h3a1,1,0,0,0,1-1V47h2v2a1,1,0,0,0,1,1h2a3.009,3.009,0,0,0,3-3V42.53a1.025,1.025,0,0,1,.5-.86C54.08,37.53,58,30.93,58,24,58,11.87,46.34,2,32,2ZM46.44,39.97A3.024,3.024,0,0,0,45,42.53V47a1,1,0,0,1-1,1H43V47a2.006,2.006,0,0,0-2-2H39a2.006,2.006,0,0,0-2,2v1H36V46a3.009,3.009,0,0,0-3-3H31a3.009,3.009,0,0,0-3,3v2H27V47a2.006,2.006,0,0,0-2-2H23a2.006,2.006,0,0,0-2,2v1H20a1,1,0,0,1-1-1V42.53a3.024,3.024,0,0,0-1.44-2.56C11.49,36.15,8,30.33,8,24,8,12.97,18.77,4,32,4s24,8.97,24,20C56,30.33,52.51,36.15,46.44,39.97Z" />
      <g data-name="eyes">
        <path
          id="left-eye"
          d="M22,18a8,8,0,1,0,8,8A8.009,8.009,0,0,0,22,18Zm0,14a6,6,0,1,1,6-6A6.006,6.006,0,0,1,22,32Z"
        ></path>
        {shouldLaugh && <circle fill="red" r="6" cx="22" cy="26" />}
        <path
          id="right-eye"
          d="M41,22a6,6,0,1,0,6,6A6.006,6.006,0,0,0,41,22Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,41,32Z"
        />
        {shouldLaugh && <circle fill="red" r="4" cx="41" cy="28" />}
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

  &:hover,
  &:focus {
    box-shadow: inset 0px 0px 2px ${({ theme }) => theme.dark};
  }

  &:active {
    box-shadow: inset 0px 0px 8px ${({ theme }) => theme.dark};
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
    console.log('hey')
    if (e.target instanceof Element) {
      e.target.blur()
    }
  }

  return (
    <Button {...props} onMouseUp={onMouseUpHandler} onClick={clickHandler}>
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

export const Thought: React.FC<ThoughtProps> = ({
  currentBeer,
  currentThought,
  daydream,
  name,
}) => (
  <>
    <p>{currentThought}</p>
    <p>{currentBeer}</p>

    <img
      src={`https://www.pdq.com/about-us/${name}`}
      alt={`${name} portrait`}
    />
    <img src={daydream} alt={`${name}'s daydream'`} />
  </>
)

export const ErrorComponent = () => <p>frick</p>
