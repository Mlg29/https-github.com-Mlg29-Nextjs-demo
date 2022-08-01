import React from 'react'
import styled from 'styled-components'
import { arrowLeft, storeLogo } from '../../assets'
import { RowBetween, RowStart,RowAlignStart } from '../../utils/StyledComponent'
import { GlobalStyle } from '../../utils/themes/themes'
import { IconImage } from '../mobileComponents/Styled'
import Paragraph from '../Paragraph'
import {useRouter} from "next/router"
import { NotificationCardType } from '../../utils/types'

const NotificationCard: React.FC<NotificationCardType> = ({ icon, header, duration,action }) => {
    const router = useRouter()

    const handleRoute = (route: string) => {
        router.push(`/notification/${route}`)
    }


    return (
        <RowBetween>
            <RowAlignStart>
                <IconImage
                    src={icon}
                    width={20}
                    height={20}
                />
                <Div>
                    <Paragraph text={header} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                    <Paragraph text={duration} fontSize={GlobalStyle.size.size14} fontWeight='400' color={GlobalStyle.color.gray} margin='3px 0%' />
                </Div>
            </RowAlignStart>


            <RowStart onClick={() => handleRoute(action)}>
                <Paragraph text='View' fontSize={GlobalStyle.size.size14} fontWeight='700' margin='0% 5px' />
                <IconImage
                    src={arrowLeft}
                    width={15}
                    height={15}
                />
            </RowStart>
        </RowBetween>
    )
}

export default NotificationCard


const Div = styled.div`
    margin-left: 13px;
`

