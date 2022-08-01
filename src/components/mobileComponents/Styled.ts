import styled from "styled-components";
import Image from 'next/image'
import { GlobalStyle } from "../../utils/themes/themes";
import { Divider, Typography } from "antd";


const {Paragraph} = Typography

export const Text = styled(Paragraph)`
   color: ${GlobalStyle.color.white};
   font-size: ${GlobalStyle.size.size10};
   font-weight: 600;
   font-family: Nunito;
   margin-bottom: 0% !important;
   background: ${GlobalStyle.color.artBoard};
   padding: 5px;
   border-radius: 10px;
   display: flex;
   flex-direction: row-reverse;
   align-items: center;
`

export const Container = styled.div`
   padding: 10px 15px;
   display: flex;
   flex-direction: column;
   flex: 1;
   height: 100vh;
   min-height: 100vh;
   overflow-y: scroll;
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
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  margin-top: 5%;
`

export const Header = styled.h1`
    font-size: ${GlobalStyle.size.size16};
    font-weight: 600;
    font-family: Nunito;
    margin: 0;
    color: ${GlobalStyle.color.white}
`

export const HeaderMedium = styled.h1`
    font-size: ${GlobalStyle.size.size15};
    font-weight: 600;
    font-family: Nunito;
    margin: 0;
    color: ${GlobalStyle.color.white}
`

export const SmallText = styled.p`
    font-size: ${GlobalStyle.size.size16};
    font-weight: 400;
    font-family: Nunito;
    line-height: 22px;
    margin:5% 0%;
    color: ${GlobalStyle.color.white}
`

export const SmallTextCenter = styled.p`
    font-size: ${GlobalStyle.size.size14};
    font-weight: 600;
    font-family: Nunito;
    line-height: 22px;
    margin:5% 0%;
    text-align: center;
    color: ${GlobalStyle.color.white}
`

export const MediumText = styled.p`
    font-size: ${GlobalStyle.size.size16};
    font-weight: 600;
    font-family: Nunito;
    Line height: 22px;
    margin: 0;
    color: ${GlobalStyle.color.white}
`

export const RowContainer = styled.div`
   display: flex;
   flex-direction: row;
`

export const RowJustifyCenter = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
`

export const RowJustifyBetween = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
`

export const RowJustifyAlignCenter = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
`

export const RowJustifyAlignBetween = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`

export const RowJustifyStart = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
`
export const RowJustifyAlignStart = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   align-items: flex-start;
`

export const RowJustifyEnd = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: flex-end;
`
export const RowJustifyAlignEnd = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: flex-end;
   align-items: flex-end;
`

export const IconImage = styled(Image)`
    
`

export const DividerContainer = styled(Divider)`
    color: white;
`

export const BottomContainer = styled.div`
flex: 1;
`

export const ColumnContainer = styled.div`
  flex: 6;
`
export const GlobalBreak = styled.hr`
 color: ${GlobalStyle.color.gray};
`