

import React, { useState } from 'react'
import styled from 'styled-components'
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import { GlobalStyle } from '../../utils/themes/themes'
import ImageContainer from '../Image'
import Paragraph from '../Paragraph'
import * as CurrencyFormat from 'react-currency-format';
import { Dropdown, Menu } from 'antd'
import { IconImage } from '../mobileComponents/Styled'
import { dotIcon } from '../../assets'
import { useRouter } from 'next/router'

const OutofStockCard = ({ image, name, slug, price, status, productId}) => {

    const router = useRouter()

    const menu = (data) => (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <View onClick={() => router.push(`/product-detail/${data}`)}>
                            <Paragraph text='Edit' />
                        </View>
                    ),
                }
            ]}
        />
    );



    return (
        <RowBetween>
            <ColumnDiv>
                <RowStart>
                    <ImageContainer source={image} width={40} height={40} />
                    <SubDiv>
                        <Paragraph text={name} fontSize={GlobalStyle.size.size14} fontWeight='600' />
                        <RowStart>
                            <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph color={GlobalStyle.color.gray} text={value} fontSize={GlobalStyle.size.size12} fontWeight='600' />} />
                            <Cont>
                                {
                                    status === 'active'
                                        ? <ContActiveDiv></ContActiveDiv>
                                        : status === 'inactive'
                                            ? <ContInactiveDiv></ContInactiveDiv>
                                            : <ContDraftDiv></ContDraftDiv>
                                }
                                <Paragraph text={status} margin='2px 0% 0% 0%' fontSize={GlobalStyle.size.size10} fontWeight='600' textTransform='capitalize' />
                            </Cont>
                        </RowStart>
                    </SubDiv>
                </RowStart>
            </ColumnDiv>
            <Dropdown overlay={menu(slug)}>
                <IconImage
                    src={dotIcon}
                />
            </Dropdown>
        </RowBetween>
    )
}

export default OutofStockCard



const ColumnDiv = styled.div`
  padding: 10px 0%;
  border-bottom: 1px solid ${GlobalStyle.color.darkBlack}
`

const SubDiv = styled.div`
  margin-left: 10px
`


const ContActiveDiv = styled.div`
 width: 5px;
 height: 5px;
 margin: 0% 5px 0% 2%;
 border-radius: 50%;
 background: ${GlobalStyle.color.green};
`

const ContInactiveDiv = styled.div`
 width: 5px;
 height: 5px;
 margin: 0% 5px 0% 2%;
 border-radius: 50%;
 background: ${GlobalStyle.color.red};
`

const ContDraftDiv = styled.div`
 width: 5px;
 height: 5px;
 margin: 0% 5px 0% 2%;
 border-radius: 50%;
 background: ${GlobalStyle.color.orange};
`

const Cont = styled.div`
 display: flex;
 align-items: center;
 margin: 0% 5%;
`

const View = styled.div`

`