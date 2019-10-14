import * as React from 'react'

import { AsyncButton, Skull } from './components'

export const Content = () => {
  const name = 'a'
  const currentThought = 'whatever'
  const daydream = 'some junk'
  const currentBeer = 'yum'
  return (
    <div>
      <p>{currentThought}</p>
      <p>{currentBeer}</p>

      <img
        src={`https://www.pdq.com/about-us/${name}`}
        alt={`${name} portrait`}
      />
      <img src={daydream} alt={`${name}'s daydream'`} />

      <AsyncButton>
        <Skull shouldLaugh={false} />
        <span style={{ marginLeft: '8px' }}>Read some minds</span>
      </AsyncButton>
    </div>
  )
}
