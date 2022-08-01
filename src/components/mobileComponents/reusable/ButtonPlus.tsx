
import React from 'react'
import styled from "styled-components"
import { IconImage } from '../Styled'
import { plus } from '../../../assets'
import { GlobalStyle } from '../../../utils/themes/themes'


const ButtonPlus = ({handleClick}) => {
  return (
    <Div onClick={handleClick}>
       <IconImage 
            src={plus}
            width={50}
            height={30}
       />
    </Div>
  )
}

export default ButtonPlus


const Div = styled.div`
    background: ${GlobalStyle.color.bazaraTint};
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 10%;
    right: 10%
`