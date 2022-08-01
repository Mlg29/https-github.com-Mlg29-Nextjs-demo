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
import { useAppDispatch } from '../../app/hook'
import { ProductUpdateFormData } from '../../utils/types'
import { getProduct, updateProduct } from '../../slices/ProductSlice'
import { useRouter } from 'next/router'

const ProductCard = ({ data, setVisible, setTitle, setType }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const id = localStorage.getItem("activeId")


    const updateProductStatus = async (data) => {
        const payload: ProductUpdateFormData = {
            id: data?._id,
            name: data?.name,
            description: data?.description,
            categories: data?.categories,
            variants: data?.variants,
            isDraft: false,
            status: data?.status === 'active' ? 'inactive' : 'active'
        }

        const resultAction = await dispatch(updateProduct(payload))
        if (updateProduct.fulfilled.match(resultAction)) {
            setType('Success')
            setTitle('Product status updated successfully')
            setVisible(true)
            dispatch(getProduct(id))
        }
        else {
            setType('Error')
            setTitle('Unable to update product status')
            setVisible(true)
        }
    }

    const menu = (data) => (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <View onClick={() => router.push(`/product-detail/${data.slug}`)}>
                            <Paragraph text='Edit' />
                        </View>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <View onClick={() => updateProductStatus(data)}>
                            <Paragraph text={data?.status === 'active' ? 'Deactivate' : 'Activate'} />
                        </View>
                    )
                }
            ]}
        />
    );



    return (
        <RowBetween>
            <ColumnDiv>
                <RowStart>
                    <ImageContainer source={data?.variants[0]?.variantImg[0]} width={40} height={40} />
                    <SubDiv>
                        <Paragraph text={data?.name} fontSize={GlobalStyle.size.size14} fontWeight='600' />
                        <RowStart>
                            <CurrencyFormat value={data?.variants[0]?.spec[0]?.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph color={GlobalStyle.color.gray} text={value} fontSize={GlobalStyle.size.size12} fontWeight='600' />} />
                            <Cont>
                                {
                                    data?.status === 'active'
                                        ? <ContActiveDiv></ContActiveDiv>
                                        : data?.status === 'inactive'
                                            ? <ContInactiveDiv></ContInactiveDiv>
                                            : <ContDraftDiv></ContDraftDiv>
                                }
                                <Paragraph text={data?.status} margin='2px 0% 0% 0%' fontSize={GlobalStyle.size.size10} fontWeight='600' textTransform='capitalize' />
                            </Cont>
                        </RowStart>
                    </SubDiv>
                </RowStart>
            </ColumnDiv>
            <Dropdown overlay={menu(data)} trigger={['click']}>
                <IconImage
                    src={dotIcon}
                />
            </Dropdown>
        </RowBetween>
    )
}

export default ProductCard



const ColumnDiv = styled.div`
  padding: 10px 0%;
  border-bottom: 1px solid ${GlobalStyle.color.darkBlack};
  width: 100%;
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