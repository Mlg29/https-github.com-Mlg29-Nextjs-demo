
import styled from "styled-components";
import { GlobalStyle } from "./themes/themes";


export const DesktopHeaderBig = styled.h1`

`

export const DesktopHeaderMedium = styled.h1`

`

export const DesktopHeaderSmall = styled.h1`

`

export const DesktopParagraphBig = styled.p`

`

export const DesktopParagraphMedium = styled.p`

`

export const DesktopParagraphSmall = styled.p`

`

export const MobileHeaderBig = styled.h1`

`

export const MobileHeaderMedium = styled.h1`
font-size: 20px;
color: ${GlobalStyle.color.white}
`

export const MobileHeaderSmall = styled.h1`

`

export const MobileParagraphBig = styled.p`

`

export const MobileParagraphMedium = styled.p`
color: ${GlobalStyle.color.white};
text-align: center;
`

export const MobileParagraphSmall = styled.p`

`

export const RowCenter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `

  export const ColumnCenterGlobal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  `

export const RowBetween = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `

  export const RowBetweenStart = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  `
  export const RowBetweenEnd = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`
export const RowBetweenNoCenter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `
export const RowAround = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  `
export const RowStart = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  `

  export const RowAlignStart = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  `


export const RowEnd = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  `

  export const ColumnStart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  `
export const ColumnEnd = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  `

  export const ColumnAlignStart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
