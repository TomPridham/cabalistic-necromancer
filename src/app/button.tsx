import * as React from 'react'
import styled from 'styled-components'

import { Skull } from './skull'

type AsyncButtonProps = {
  clickHandler: () => Promise<void>
  loading: boolean
  loadingText: string
}

const Button = styled.button`
  text-align: center;
  vertical-align: center;
  border: 2px solid ${({ theme }) => theme.dark};
  border-radius: 4px;
  padding: 8px;
  font-size: 32px;
  width: 100%;
  white-space: nowrap;

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
