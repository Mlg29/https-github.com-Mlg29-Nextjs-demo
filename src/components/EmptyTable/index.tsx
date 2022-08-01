import React from 'react'
import styled from 'styled-components'
import { GlobalStyle } from '../../utils/themes/themes'
import { IconImage } from '../DesktopComponent/Styled'
import Paragraph from '../Paragraph'

function EmptyTable({icon, header, title}) {
  return (
   <Div>
     <Contain>
        <IconImage src={icon} />
        <Paragraph text={header} fontSize={GlobalStyle.size.size18} fontWeight='700' margin='10px 0%' />
        <Paragraph text={title} fontSize={GlobalStyle.size.size14} fontWeight='400' textAlign='center' />
    </Contain>
   </Div>
  )
}

export default EmptyTable

const Contain = styled.div`
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Div = styled.div`
    display: flex;
    flex-direction: column;
    height: 30vh;
    justify-content: center;
    align-items: center;
`