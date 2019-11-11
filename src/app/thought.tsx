import * as React from 'react'
import styled from 'styled-components'

import { images } from './images'

type ThoughtProps = {
  currentBeer: string | undefined
  currentThought: string | undefined
  daydream: string | undefined
  name: string
}

const ThoughtContainer = styled.div`
  img {
    height: 140px;
    width: 140px;
    padding: 5px;
    object-fit: cover;
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
  <ThoughtContainer>
    {currentThought && (
      <p>
        {name} is currently thinking: "{currentThought}"
      </p>
    )}
    <br />
    {currentBeer && (
      <p>
        {name} is currently sipping {currentBeer}
      </p>
    )}
    <br />

    <div style={{ display: 'flex' }}>
      <img
        src={images[name.toLowerCase() as keyof typeof images]}
        alt={`${name} portrait`}
      />
      <img src={daydream} alt={`${name}'s daydream`} />
    </div>
  </ThoughtContainer>
)
