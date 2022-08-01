import React from 'react'
import styled from 'styled-components'

import DesktopNavigation from '../DesktopNavigation'
import DesktopSidebar from '../DesktopSidebar'

const DesktopLayouts = ({ children }) => {
  return (
    <Container>
      <DesktopSidebar />
      <Div>
        <DesktopNavigation />
        <br />
        <View>
          {children}
        </View>
      </Div>

    </Container>
  )
}

export default DesktopLayouts


const Container = styled.div`
  display: flex;
  padding: 0% 2%;
`

const Div = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1% 1%;

    @media screen and (min-width: 661px) and (max-width: 900px) {
      width: 75%;
    }
`

const View = styled.div`
    width: 100%;
    padding-top: 0%;
    height: 91vh;
    overflow-y: scroll;
    -ms-overflow-style: none;
  scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none;
    }

`