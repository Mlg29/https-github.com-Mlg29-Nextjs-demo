
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { checkbox, chevronLeft, landMark } from '../../assets'
import { ProductSchema } from '../../utils/schemas'
import { GlobalStyle } from '../../utils/themes/themes'
import { ProductCreateFormData, ProductFormData } from '../../utils/types'
import Button from '../Button'
import Paragraph from '../Paragraph'
import SelectField from '../SelectField'
import TextInput from '../TextInput'
import MobileHeader from './Header'
import { BottomContainer, ColumnContainer, Container, IconImage } from './Styled'

import { categoryList } from '../../utils/constants/categories'
import { RowBetween } from '../../utils/StyledComponent'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { createProduct, getProductBySlug, productBySlug, updateProduct } from '../../slices/ProductSlice'
import ProductVariantCard from '../ProductVariantCard'
import ResponseModal from '../Modal/ResponseModal'

const MobileAddProduct = () => {
    const [loader, setLoader] = useState(false)
    const productInDraft = JSON.parse(localStorage.getItem('productDraft'))
    const [size, setSize] = useState(productInDraft?.isSize ? productInDraft?.isSize : false)
    const [color, setColor] = useState(productInDraft?.isColor ? productInDraft?.isColor : false)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const productSlug = useAppSelector(productBySlug)
    const [productVar, setProductVar] = useState(productSlug?.variants)
    const activeId = localStorage.getItem('activeId')
    const getSlug = localStorage.getItem('slug')
    const colorVariants = JSON.parse(localStorage.getItem('colorVariety'))
    const colorSizeVariants = JSON.parse(localStorage.getItem('colorSizeList'))
    const [colorVariety, setColorVariety] = useState(colorVariants)
    const [colorSizeVariety, setColorSizeVariety] = useState(colorSizeVariants)
    const [responseModal, setResponseModal] = useState(false)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')

    const initialValues: ProductFormData = {
        productName: productSlug?.name,
        productDescription: productSlug?.description,
        category: productSlug?.categories
    };

    console.log({productSlug, getSlug})

    useEffect(() => {
        setProductVar(productSlug?.variants)
    }, [productSlug])

    useEffect(() => {
        dispatch(getProductBySlug(getSlug))
    }, [getSlug])

    const handleFormSubmit = async (data) => {
        setLoader(true)
        const payload = {
            isColor: color,
            isSize: size,
        }

        const payloadData = {
            id: activeId,
            name: data?.productName,
            description: data?.productDescription,
            categories: data?.category,
            isDraft: true,
            status: 'draft',
            variants: []
        }

        localStorage.setItem('productDraft', JSON.stringify(payload))

        if (getSlug === null) {
            const resultAction = await dispatch(createProduct(payloadData))
            if (createProduct.fulfilled.match(resultAction)) {
                setLoader(false)
                localStorage.setItem('slug', resultAction?.payload?.message?.slug)
                return router.push('/product-variant')

            }
        }
        else {
            setLoader(false)
            return router.push('/product-variant')
        }

        setLoader(false)

    }

   
    const handleColorPublish = async () => {
        setLoader(true)
        var payload: ProductCreateFormData = {
            id: productSlug?.id,
            name: productSlug?.name,
            description: productSlug?.description,
            categories: productSlug?.categories,
            variants: productVar,
            isDraft: false,
            status: 'active',
        }

        try {
            var resultAction = await dispatch(updateProduct(payload))
            if (updateProduct.fulfilled.match(resultAction)) {
                setLoader(false)
                setResponseModal(true)
                setTitle('')
                setType('Success')
                localStorage.removeItem('slug')
                localStorage.removeItem('productDraft')
                localStorage.removeItem('editableId')
            }
            else {
                setLoader(false)
                setResponseModal(true)
                setTitle('')
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

    const editVariant = (data) => {
         localStorage.setItem('editableId', data?.data?._id)
        return router.push('/product-variant')
    }

    const removeVariant = (index) => {
        const newData = productVar?.filter((data, i) => i !== index)
        setProductVar(newData)
    }


    const renderColorVariety = () => {
        return productVar?.map((data, i) => {
            return <ProductVariantCard key={i} edit={true} handleDeleteClick={() => removeVariant(i)} handleEditClick={() => editVariant({data, i})} image={data?.variantImg[0]} name={productSlug?.name} price={data?.spec[0]?.price} />
        })

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

    const handleColorSizePublish = async () => {
        setLoader(true)
        var payload: ProductCreateFormData = {
            id: productSlug?.id,
            name: productSlug?.name,
            description: productSlug?.description,
            categories: productSlug?.categories,
            variants: colorSizeVariety,
            isDraft: false,
            status: 'active',
        }

        try {
            var resultAction = await dispatch(updateProduct(payload))
            if (updateProduct.fulfilled.match(resultAction)) {
                setLoader(false)
                setResponseModal(true)
                setTitle('')
                setType('Success')
                localStorage.removeItem('slug')
                localStorage.removeItem('productDraft')

            }
            else {
                setLoader(false)
                setResponseModal(true)
                setTitle('')
                setType('Error')
            }
        }
        catch (e) {
            console.log(e)
        }
    }


    const addAnotherColor = () => {
        localStorage.removeItem('editableId')
        router.push('/product-variant')
    }

    return (
        <Container>
            <MobileHeader
                icon={chevronLeft}
                header="Product Details"
            />
            <br />
            <ColumnContainer>
                <Paragraph text="Kindly provide product information" fontSize={GlobalStyle.size.size14} fontWeight='400' color={GlobalStyle.color.gray} />
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
                    value={values.productDescription}
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

                <br />
                {
                   productVar?.length < 1 || productVar === undefined ? <>
                        <Paragraph text="Size and Colour Options" fontSize={GlobalStyle.size.size16} fontWeight='400' margin='0% 0% 2% 0%' />

                        <Div>
                            <RowBetween>
                                <Paragraph text="Does your product have sizes?" fontSize={GlobalStyle.size.size16} fontWeight='400' color={GlobalStyle.color.gray} />
                                {
                                    size ? <ActiveBox onClick={() => setSize(false)}><IconImage src={checkbox} /></ActiveBox> : <InactiveBox onClick={() => setSize(true)}></InactiveBox>
                                }
                            </RowBetween>
                        </Div>
                        <Div>
                            <RowBetween>
                                <Paragraph text="Does your product have colours?" fontSize={GlobalStyle.size.size16} fontWeight='400' color={GlobalStyle.color.gray} />
                                {
                                    color ? <ActiveBox onClick={() => setColor(false)}><IconImage src={checkbox} /></ActiveBox> : <InactiveBox onClick={() => setColor(true)}></InactiveBox>
                                }
                            </RowBetween>
                        </Div>
                    </>
                    : null
                }

                {
                   productVar?.length >= 1 ? <>
                        <Divs>
                            <Paragraph text='Product Colours' fontSize={GlobalStyle.size.size14} fontWeight='400' />
                        </Divs>

                        {renderColorVariety()}
                        <View onClick={() => addAnotherColor()}>
                            <IconImage
                                src={landMark}
                            />
                            <Paragraph text='Add Another Colour' fontSize={GlobalStyle.size.size14} fontFamily='400' margin='0% 0% 0% 3%' />
                        </View>
                        <br />
                    </> : null
                }


            </ColumnContainer>
            <BottomContainer>
                
                {productVar?.length < 1 || productVar === undefined ? <Button isLoading={loader} children={"Continue"} handlePress={handleSubmit} /> : null}
                {productVar?.length >= 1 ? <Button isLoading={loader} children={"Publish"} handlePress={handleColorPublish} /> : null}
            </BottomContainer>

            <ResponseModal
                title={title}
                type={type}
                modalVisible={responseModal}
                setModalVisible={handleRessponseModalClose}
                handlePress={handleRessponseModalClose}

            />

        </Container>
    )
}

export default MobileAddProduct


const Div = styled.div`
    padding: 5px 0%;
`

const Divs = styled.div`
background: ${GlobalStyle.color.artBoard};
padding: 5px;
margin-bottom: 10px
`

const ActiveBox = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    background: ${GlobalStyle.color.bazaraTint};
    border-radius: 5px;
`

const InactiveBox = styled.div`
width: 20px;
height: 20px;
background: ${GlobalStyle.color.darkBlack};
border: 1px solid ${GlobalStyle.color.white};
border-radius: 5px;
`

const View = styled.div`
    display: flex;
    margin-top: 20px;
`