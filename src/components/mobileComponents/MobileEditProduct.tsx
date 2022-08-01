import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook'

import { useRouter } from "next/router"
import { changeOrderStatus, getSellerOrderDetail, sellerOrderDetails, orderLoader } from '../../slices/OrderSlice'
import { BottomContainer, ColumnContainer, Container, IconImage } from './Styled'
import { RowStart, RowAlignStart, RowBetween } from '../../utils/StyledComponent'
import { calender, chevronLeft, pin } from '../../assets'
import Paragraph from '../Paragraph'
import styled from 'styled-components'
import { Tag, Divider } from "antd"
import { GlobalStyle } from '../../utils/themes/themes'
import { getProductBySlug, productBySlug, updateProduct } from '../../slices/ProductSlice'
import MobileHeader from './Header'
import ProductVariantCard from '../ProductVariantCard'
import Button from '../Button'
import TextInput from '../TextInput'
import SelectField from '../SelectField'
import { useFormik } from 'formik'
import { ProductCreateFormData, ProductFormData } from '../../utils/types'
import { ProductSchema } from '../../utils/schemas'
import { categoryList } from '../../utils/constants/categories'
import ResponseModal from '../Modal/ResponseModal'


function MobileEditProduct() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const productBySlugData = useAppSelector(productBySlug)
    const [loader, setLoader] = useState(false)

    const [productVariantList, setProductVariantList] = useState(productBySlugData?.variants)


    const [responseModal, setResponseModal] = useState(false)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')



    const productSlug = router?.query?.id

    const id = typeof window !== "undefined" ? localStorage?.getItem("activeId") : null


    useEffect(() => {
        dispatch(getProductBySlug(productSlug))
    }, [productSlug, id])

    useEffect(() => {
       setProductVariantList(productBySlugData?.variants)
    }, [productBySlugData])



    const initialValues: ProductFormData = {
        productName: productBySlugData?.name,
        productDescription: productBySlugData?.description,
        category: productBySlugData?.categories
    };

    const handleFormSubmit = async (data) => {
        setLoader(true)
        var payload: ProductCreateFormData = {
            id: productBySlugData._id,
            name: data?.productName,
            description: data?.productDescription,
            categories: data?.category,
            isDraft: false,
            variants: productVariantList
        }

        try {
            var resultAction = await dispatch(updateProduct(payload))
            if (updateProduct.fulfilled.match(resultAction)) {
                setLoader(false)
                setResponseModal(true)
                setTitle('You have successfully updated your product')
                setType('Success')

            }
            else {
                setLoader(false)
                setResponseModal(true)
                setTitle('Error while adding a new product to your store')
                setType('Error')
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues,
            validationSchema: ProductSchema,
            onSubmit: (data: ProductFormData) => handleFormSubmit(data),
            enableReinitialize: true
        });


    const editVariant = (data, index) => {
        const bb = data?.spec?.map(dd => dd?.size)
        const payload = {
            isColor: true,
            isSize: bb?.length >= 1 ? true : false,
        }
        localStorage.setItem('slug', productSlug)
        localStorage.setItem('productDraft', JSON.stringify(payload))
         localStorage.setItem('editableId', data?._id)
         return router.push('/product-variant')
    }

    const removeVariant = (data, index) => {
        const newData = productVariantList?.filter((data, i) => i !== index)

        setProductVariantList(newData)
    }


    const handleRessponseModalClose = () => {
        setResponseModal(false)
        if (type === 'Error') {
            return;
        }
        else {
            return router.push('/products')
        }
    }

    return (
        <>
            <Container>
                <MobileHeader
                    icon={chevronLeft}
                    header={productBySlugData?.name}
                />
                <Paragraph text='Kindly provide product information' fontSize={GlobalStyle.size.size16} fontWeight='400' margin='3% 0%' color={GlobalStyle.color.gray} />
                <ColumnContainer>
                    <TextInput
                        label='Product Name'
                        required
                        value={values.productName}
                        onChange={handleChange('productName')}
                        errorMsg={touched.productName ? errors.productName : undefined}
                    />
                    <TextInput
                        label='Tell us about your product'
                        type='description'
                        isMultiline={true}
                        value={values?.productDescription}
                        handleTextChange={handleChange('productDescription')}
                        errorMsg={touched.productDescription ? errors.productDescription : undefined}
                    />

                    <SelectField
                        data={categoryList}
                        value={values.category}
                        placeholder="Category"
                        onSearch={handleChange('category')}
                        onChange={handleChange('category')}
                        errorMsg={touched.category ? errors.category : undefined}
                    />

                    <Div>
                        <Paragraph color={GlobalStyle.color.gray} text='Product Colours' fontSize={GlobalStyle.size.size14} fontFamily='400' />

                    </Div>
                    <Subdiv>
                        {
                            productVariantList?.map((data, i) => {
                                return <ProductVariantCard edit key={i} handleDeleteClick={() => removeVariant(data, i)} handleEditClick={() => editVariant(data, i)} name={productBySlugData?.name} price={data?.spec[0]?.price} image={data.variantImg?.length > 0 ? data.variantImg[0] : data.variantImg} />
                            })
                        }
                    </Subdiv>
                </ColumnContainer>
                <BottomContainer>
                    <Button isLoading={loader} children='Update Product' handlePress={handleSubmit} />
                </BottomContainer>
            </Container>


            <ResponseModal
                title={title}
                type={type}
                modalVisible={responseModal}
                setModalVisible={handleRessponseModalClose}
                handlePress={handleRessponseModalClose}

            />

        </>

    )
}

export default MobileEditProduct

const Div = styled.div`
   background: ${GlobalStyle.color.artBoard};
   padding: 6px;
   margin-top: 10%;
`

const Subdiv = styled.div`
   background: ${GlobalStyle.color.darkBlack};
   padding: 10px;
   border-radius: 10px;
   margin-top: 3%;
`

function setResponseModal(arg0: boolean) {
    throw new Error('Function not implemented.')
}

