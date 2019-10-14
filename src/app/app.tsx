import * as React from 'react'
import styled from 'styled-components'

import { Content } from './content'

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Header = styled.header`
  width: 100%;
  box-shadow: 0px 0px 5px 0px ${({ theme }) => theme.dark};
  margin-bottom: 16px;
`

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
`

export const App = () => {
  return (
    <>
      <Header>Cabalistic Necromancer</Header>
      <Container>
        <Content />
      </Container>
      <Footer>
        <div>
          Icons made by{' '}
          <a
            href="https://www.flaticon.com/authors/payungkead"
            title="Payungkead"
          >
            Payungkead
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </Footer>
    </>
  )
}
