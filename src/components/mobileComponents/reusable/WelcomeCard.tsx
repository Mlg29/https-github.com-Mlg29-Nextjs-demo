import React from 'react'
import styled from 'styled-components'
import { checkbox } from '../../../assets'
import { WelcomeCardInterface } from '../../../utils/interfaces'
import { RowBetween } from '../../../utils/StyledComponent'
import { GlobalStyle } from '../../../utils/themes/themes'
import { Header, IconImage, SmallText } from '../Styled'



const WelcomeCard: React.FC<WelcomeCardInterface> = ({
    header,
    title,
    selected,
    type,
    handleClick,
}) => {
    return (
        <CardContainer onClick={handleClick} style={{border: `${ selected === type ? `1px solid ${GlobalStyle.color.bazaraTint}` : 'none'}`}}>
            <RowBetween>
                <Header>{header}</Header>
                {
                    selected === type ? <IconImage
                        src={checkbox}
                        width={20}
                        height={20}
                    /> : <EmptyDiv />
                }
            </RowBetween>
            <SmallText>{title}</SmallText>
        </CardContainer>
    )
}

export default WelcomeCard


const CardContainer = styled.div`
padding: 10px;
border-radius: 10px;
margin: 10px 0px;
height: 120px;
background-color: ${GlobalStyle.color.darkBlack};
`


const EmptyDiv = styled.div`
    border-radius: 50%;
    border: 1px solid ${GlobalStyle.color.lightGray};
    width: 20px;
    height: 20px;
`