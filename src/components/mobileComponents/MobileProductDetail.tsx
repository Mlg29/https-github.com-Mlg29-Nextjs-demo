import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook'

import { useRouter } from "next/router"
import { BottomContainer, ColumnContainer, Container } from './Styled'
import { RowStart } from '../../utils/StyledComponent'
import { chevronLeft } from '../../assets'
import Paragraph from '../Paragraph'
import styled from 'styled-components'
import { Tag, Divider } from "antd"
import { GlobalStyle } from '../../utils/themes/themes'
import { getProductBySlug, productBySlug, updateProduct } from '../../slices/ProductSlice'
import MobileHeader from './Header'
import ProductVariantCard from '../ProductVariantCard'
import Button from '../Button'
import renderHTML from 'react-render-html';
import { ProductUpdateFormData } from '../../utils/types'
import ProductDetailSkeleton from '../SkelentonLoader/Mobile/ProductDetailSkeleton'

function MobileProductDetail() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const productBySlugData = useAppSelector(productBySlug)
    const [loader, setLoader] = useState(false)
    const [stateLoader, setStateLoader] = useState(false)



    const productSlug = router?.query?.id

    const id = typeof window !== "undefined" ? localStorage?.getItem("activeId") : null

    const [visible, setVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')


    const handleModalClose = () => {
        setVisible(false)
    }



    useEffect(() => {
        setStateLoader(true)
        const loadData = async () => {
            await dispatch(getProductBySlug(productSlug))
            setStateLoader(false)
        }
        loadData()
       
    }, [productSlug, id])

    const updateProductStatus = async (data) => {
        const payload: ProductUpdateFormData = {
            id: productBySlugData?._id,
            name: productBySlugData?.name,
            description: productBySlugData?.description,
            categories: productBySlugData?.categories,
            variants: productBySlugData?.variants,
            isDraft: false,
            status: data
        }

        const resultAction = await dispatch(updateProduct(payload))
        if (updateProduct.fulfilled.match(resultAction)) {
            setType('Success')
            setTitle('Product status updated successfully')
            setVisible(true)
            dispatch(getProductBySlug(productSlug))
        }
        else {
            setType('Error')
            setTitle('Unable to update product status')
            setVisible(true)
        }
    }



    return (
        <Container>
        {
            stateLoader ? <ProductDetailSkeleton />
            :
             <>
                <MobileHeader
                    icon={chevronLeft}
                    header={productBySlugData?.name}
                />
                <Div color={productBySlugData?.status === 'active' ? GlobalStyle.color.green : productBySlugData?.status === 'inactive' ? GlobalStyle.color.red : GlobalStyle.color.orange}>
                    <Paragraph textTransform='capitalize' textAlign='center' text={productBySlugData?.status} fontSize={GlobalStyle.size.size12} />
                </Div>
                <ColumnContainer>
                    <View>
                        <RowStart>
                            <MinDiv>
                                <Paragraph text='Product Name' fontSize={GlobalStyle.size.size12} fontWeight='600' color={GlobalStyle.color.gray} />
                                <Paragraph text={productBySlugData?.name} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                            </MinDiv>
                        </RowStart>
                        <Break></Break>
                        <RowStart>
                            <MinDiv>
                                <Paragraph text='Description' fontSize={GlobalStyle.size.size12} fontWeight='600' color={GlobalStyle.color.gray} />
                                <DescDiv>
                                    {renderHTML(`<div>${productBySlugData?.description}</div>`)}
                                </DescDiv>
                               

                            </MinDiv>
                        </RowStart>
                        <Break></Break>
                        <RowStart>
                            <MinDiv>
                                <Paragraph text='Category' fontSize={GlobalStyle.size.size12} fontWeight='600' color={GlobalStyle.color.gray} />
                                <Paragraph text={productBySlugData?.categories} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                            </MinDiv>
                        </RowStart>
                        <Break></Break>
                    </View>

                    <Paragraph text='Colours' fontSize={GlobalStyle.size.size14} fontFamily='400' />

                    <Subdiv>
                        {
                            productBySlugData?.variants?.map((data, i) => {
                                return <ProductVariantCard key={i} name={productBySlugData?.name} price={data?.spec[0]?.price} image={data.variantImg?.length > 0 ? data.variantImg[0] : data.variantImg} />
                            })
                        }
                    </Subdiv>
                </ColumnContainer>
                <br />
                <BottomContainer>
                    <Button isLoading={loader} children='Edit Product' handlePress={() => router.push(`/product-detail/edit/${productSlug}`)} />
                    <TextDiv onClick={productBySlugData?.status === 'active' ? () => updateProductStatus('inactive') : () => updateProductStatus('active')}>
                        <Paragraph text={productBySlugData?.status === 'active' ? 'Deactivate' : 'Activate'} />
                    </TextDiv>
                </BottomContainer>
            </>
        }
           

        </Container>

    )
}

export default MobileProductDetail

const Div = styled(Tag)`
    margin: 5% 0% 2% 0%;
    padding: 5px;
    border-radius: 5px 5px 0px 0px;
`

const View = styled.div`
    padding: 10px;
    background: ${GlobalStyle.color.darkBlack};
    border-radius: 5px;
    margin-bottom: 3%;
`


const MinDiv = styled.div`
    margin-left: 3%;
    width: 100%;
`

const Subdiv = styled.div`
   background: ${GlobalStyle.color.darkBlack};
   padding: 10px;
   border-radius: 10px;
   margin-top: 3%;
`

const Break = styled(Divider)`
    color: ${GlobalStyle.color.lightwhite};
    margin: 5px 0% !important;
`

const TextDiv = styled.div`
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin: 5% 0%;
`

const ContDiv = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
`

const DescDiv = styled.div`
    max-height: 80px;
    overflow-y: scroll;
    -ms-overflow-style: none;
  scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none;
    }
`