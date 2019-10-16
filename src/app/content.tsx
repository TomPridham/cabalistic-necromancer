import * as React from 'react'
import { css } from 'styled-components'

import { AsyncButton, Empty, ErrorComponent, Thought } from './components'

const styles = {
  container: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    max-width: 300px;
    padding-top: 16px;
    text-align: center;
    & > * {
      margin-bottom: 16px;
    }
  `,
}
export const Content = () => {
  const [currentBeer, setCurrentBeer] = React.useState<string>()
  const [currentThought, setCurrentThought] = React.useState<string>()
  const [daydream, setDaydream] = React.useState<string>()
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [name, setName] = React.useState<string>()

  const onClickHandler = async () => {
    setLoading(true)
    const res = await window.fetch('/thought')
    if (res.ok) {
      const thought = await res.json()
      setCurrentBeer(thought.currentBeer)
      setCurrentThought(thought.currentThought)
      setDaydream(thought.daydream)
      setName(thought.name)
      setLoading(false)
      setError(false)
    } else {
      setError(true)
      setLoading(false)
    }
  }
  return (
    <div css={styles.container}>
      {!error && name && (
        <Thought
          currentBeer={currentBeer}
          currentThought={currentThought}
          daydream={daydream}
          name={name}
        />
      )}
      {!error && !name && <Empty />}
      {error && <ErrorComponent />}

      <AsyncButton
        loading={loading}
        loadingText="doing magic"
        clickHandler={onClickHandler}
      >
        Read some minds
      </AsyncButton>
    </div>
  )
}
