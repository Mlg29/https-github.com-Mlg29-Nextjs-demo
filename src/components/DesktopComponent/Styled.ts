import styled from "styled-components";
import Image from 'next/image'
import { GlobalStyle } from "../../utils/themes/themes";
import { Divider, Typography } from "antd";


const {Paragraph} = Typography


export const Container = styled.div`
   
`

export const ContainerDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85vh;
    min-height: 85vh;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
      }
`

export const CenterContainer = styled.div`
    width: 500px;
    margin: 0% auto;
    // border: 1px solid ${GlobalStyle.color.darkBlack};
    // border-radius: 5px
`

export const AuthItemLabel = styled.div`
font-family: Nunito;
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
color: #c6c6c6;
margin-left: 3%;
`

export const AuthCard = styled.div`
    background: #242424;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  margin-top: 5%;
`

export const IconImage = styled(Image)`
    width: 20px;
    height: 20px;

    :hover {
        opacity: 0.7;
    }
`

export const DividerContainer = styled(Divider)`
    color: white;
`