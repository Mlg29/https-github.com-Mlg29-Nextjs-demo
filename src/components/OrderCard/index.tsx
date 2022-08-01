import React from 'react'
import styled from 'styled-components'
import { RowStart } from '../../utils/StyledComponent'
import ImageContainer from '../Image'
import Paragraph from '../Paragraph'
import * as CurrencyFormat from "react-currency-format"
import { GlobalStyle } from '../../utils/themes/themes'
import { Tag } from 'antd'


const OrderCard = ({ image, name, size, key, price, delivery, orderId, status, handleClick }) => {

    return (
        <CardDiv onClick={handleClick}>
            <RowStartCard>
                <View>
                    <ImageContainer source={image} width={80} height={80} />
                    <Div>
                        <TextContainer color={status === 'completed' ? GlobalStyle.color.green : status === 'pending' ? GlobalStyle.color.orange : status === 'processing' ? GlobalStyle.color.pink : status === 'dispatched' ? GlobalStyle.color.purple : GlobalStyle.color.red}>
                            <Paragraph text={status} fontSize={GlobalStyle.size.size10} textTransform='capitalize' textAlign='center' />
                        </TextContainer>
                    </Div>
                </View>

                <Subdiv>
                    <Paragraph margin="4px 0px"  text={name} fontSize={GlobalStyle.size.size14} fontWeight='600' />
                    <RowStart>
                        <Paragraph text='Size - ' margin="0px 0px" fontSize={GlobalStyle.size.size10} fontWeight='600' />
                        <Paragraph text={size}  fontSize={GlobalStyle.size.size10} fontWeight='600' color={GlobalStyle.color.bazaraTint} margin="0% 2%" />
                        <Paragraph text=' | ' fontSize={GlobalStyle.size.size10} margin="0% 2%" color={GlobalStyle.color.gray} />
                        <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={value} fontSize={GlobalStyle.size.size14} fontWeight='600' />} />
                    </RowStart>
                    <RowStart>
                        <Paragraph margin="3px 0px" text={`Estimated Delivery: ${new Date(delivery).toDateString()}`} fontSize={GlobalStyle.size.size10} fontWeight='600' color={GlobalStyle.color.gray} />
                    </RowStart>
                    <RowStart>
                        <Paragraph text={`Order ID - ${orderId?.substring(0, 15)}`} fontSize={GlobalStyle.size.size11} fontWeight='600' color={GlobalStyle.color.gray} />
                    </RowStart>
                </Subdiv>
            </RowStartCard>
        </CardDiv>
    )
}

export default OrderCard

const RowStartCard = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
`
const CardDiv = styled.div`
    border-bottom: 1px solid ${GlobalStyle.color.lightGray};
    padding: 10px 0%;
`

const View = styled.div`

`
const Div = styled.div`
    margin-top: -20%;
    width: 100%;
`

const TextContainer = styled(Tag)`
width: 100%;
`


const Subdiv = styled.div`
    margin-left: 15px;
    max-width: 80%;
`