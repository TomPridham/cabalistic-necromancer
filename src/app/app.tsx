import * as React from 'react'
import styled from 'styled-components'

import { Content } from './content'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`

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
  margin-top: auto;
  padding: 8px;
  background: ${({ theme }) => theme.accent};
`

export const App = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  )
}
