import React from 'react'
import styled from 'styled-components'
import { chevronLeft, truck } from '../../assets'
import { GlobalStyle } from '../../utils/themes/themes'
import Button from '../Button'
import Paragraph from '../Paragraph'
import MobileHeader from './Header'
import { Container, IconImage } from './Styled'

import { useRouter } from 'next/router'

const MobileDelivery = () => {
    const router = useRouter()


    return (
        <Container>
            <MobileHeader
                header="Shipping Fee"
                icon={chevronLeft}
            />
            <Column>
                <ColumnGlobal>
                    <IconImage
                        src={truck}
                        width={70}
                        height={60}
                    />
                    <br/>
                    <Paragraph text='No Delivery Fees' fontSize={GlobalStyle.size.size18} fontWeight='600' />
                    <Div>
                    <Paragraph text='All your delivery locations will be listed here' color={GlobalStyle.color.gray} fontSize={GlobalStyle.size.size14} fontWeight='400' textAlign='center' />
                    </Div>
                    <br/>
                    <Button children="Add Shipping Fees" handlePress={() => router.push('/add-delivery-fee')} />
                </ColumnGlobal>

            </Column>
        </Container>
    )
}

export default MobileDelivery

const Div = styled.div`
 width: 80%;
 margin: 1% auto;
`

const Column = styled.div`
  flex: 1;
`

const ColumnGlobal = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 80%;
width: 70%;
margin: 0 auto;
`