
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { cancel, chevronLeft, delIcon, editIcon, landMark } from '../../assets'
import { ProductColorAloneSchema, ProductColorSchema, ProductNoColorSchema, ProductSizeSchema } from '../../utils/schemas'
import { GlobalStyle } from '../../utils/themes/themes'
import { ProductColorAloneData, ProductColorData, ProductCreateFormData, ProductNoColorData, ProductSizeData } from '../../utils/types'
import Button from '../Button'
import Paragraph from '../Paragraph'

import TextInput from '../TextInput'
import MobileHeader from './Header'
import { BottomContainer, ColumnContainer, Container, IconImage } from './Styled'

import { RowBetween, RowStart } from '../../utils/StyledComponent'
import styled from 'styled-components'
import NumberInput from '../NumberInput'
import UploadComponent from '../UploadComponent'
import CropEasy from '../crop/CropEasy'
import UploadedImage from '../UploadComponent/UploadedImage'
import { Divider, Modal } from 'antd'
import SelectField from '../SelectField'
import { sizes } from '../../utils/constants/sizes'
import * as CurrencyFormat from 'react-currency-format';
import { createProduct, getProductBySlug, productBySlug, updateProduct } from '../../slices/ProductSlice'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import ResponseModal from '../Modal/ResponseModal'
import { useRouter } from 'next/router'
import ProductVariantCard from '../ProductVariantCard'
import DesktopUpload from '../DesktopComponent/reusable/DesktopUpload'
import MobileUpload from './reusable/MobileUpload'


const MobileProductColor = () => {
    const [loader, setLoader] = useState(false)
    const dispatch = useAppDispatch()
    const productSlug = useAppSelector(productBySlug)
    const router = useRouter()

    const [openCrop, setOpenCrop] = useState(false)
    const [photoUrl, setPhotoUrl] = useState<any>()
    const [file, setFile] = useState(null)
    const [imageUrl, setImageUrl] = useState([])
    const [multiple, setMultiple] = useState(true)

    const [isModalVisible, setIsModalVisible] = useState(false);




    const [size, setSize] = useState(sizes)
    const [responseModal, setResponseModal] = useState(false)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')

    const productInDraft = JSON.parse(localStorage.getItem('productDraft'))
    const activeId = localStorage.getItem('activeId')

    const editableItem = localStorage.getItem('editableId')
    const [sizeList, setSizeList] = useState([])
    const [multipleUpload, setMultipleUpload] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState()
    const [dummyUploadImage, setDummyUploadImage] = useState([""])
    const getSlug = localStorage.getItem('slug')
    const [editSizeData, setEditSizeData] = useState<{ price: number, size: string }>({ price: 0, size: 'Select new Size' })
    const [modalQuantity, setModalQuantity] = useState(0)
    const [editDataId, setEditDataId] = useState('')


    useEffect(() => {
        dispatch(getProductBySlug(getSlug))
    }, [getSlug])

    useEffect(() => {
        const loadData = () => {
            const editableProduct = productSlug?.variants?.find(data => data?._id === editableItem)

            setMultipleUpload(editableProduct ? editableProduct?.variantImg : [])
            setSizeList(editableProduct ? editableProduct?.spec : [])
            setQuantity(editableProduct ? editableProduct?.spec[0]?.quantity : 0)
            setPrice(editableProduct ? editableProduct?.spec[0]?.price : 0)

        }

        loadData()

    }, [editableItem])

    const initialValues: ProductNoColorData = {
        price: 0
    };

    const init: ProductColorAloneData = {
        price: price ? price : 0
    };

    const _initialValues: ProductColorData = {
        description: ''
    };

    const modalInitialValues: ProductSizeData = {
        price: editSizeData?.price,
        size: editSizeData?.size,
    };



    const handleFormSubmit = async (data) => {
        if (multipleUpload?.length < 1) {
            setResponseModal(true)
            setTitle('Minimum of 1 image upload is required')
            setType('Error')
            return
        }

        if (sizeList?.length < 1) {
            setResponseModal(true)
            setTitle('Size selection is required')
            setType('Error')
            return
        }

        const newSizeList = sizeList?.map(data => {
            return {
                size: data.size,
                price: data.price,
                quantity: data.quantity
            }
        })

        const payload = [...productSlug?.variants, {
            variantImg: multipleUpload,
            spec: newSizeList
        }]

        const editablePayload = productSlug?.variants?.map(data => {
            return editableItem === data?._id ? {
                id: editableItem,
                variantImg: multipleUpload,
                spec: newSizeList
            }
                :
                data
        })

        if (editableItem === null) {
            await handleColorMulitplePublish(payload)
        }
        else {
            await handleColorMulitplePublish(editablePayload)
        }

        return router.push('/add-product')

    }


    const handleModalFormSubmit = (db) => {
        if (editDataId !== '') {
            const newData = sizeList?.map(data => {
                return data?._id === editDataId || data?.id === editDataId ? {
                    _id: editDataId,
                    size: db?.size,
                    price: db?.price,
                    quantity: modalQuantity
                }
                    : data
            })
            setSizeList(newData)
        }
        else {
            setSizeList([...sizeList, {
                id: sizeList?.length,
                size: db.size,
                price: db.price,
                quantity: modalQuantity
            }])
        }
        handleCancel()

    }

    const handleNoColorFormSubmit = async (data) => {
        if (multipleUpload?.length < 1) {
            setResponseModal(true)
            setTitle('Minimum of 1 image upload is required')
            setType('Error')
            return
        }

        setLoader(true)
        const payload: ProductCreateFormData = {
            id: productSlug?.id,
            name: productSlug?.name,
            description: productSlug?.description,
            categories: productSlug?.categories,
            variants: [
                {
                    spec: [
                        {
                            price: data?.price,
                            quantity
                        }
                    ],
                    variantImg: multipleUpload
                }
            ],
            isDraft: false,
            status: 'active'
        }


        try {
            var resultAction = await dispatch(updateProduct(payload))
            if (updateProduct.fulfilled.match(resultAction)) {
                setLoader(false)
                setResponseModal(true)
                setTitle('You have successfully added a new product to your store')
                setType('Success')
                setMultipleUpload([])
                setQuantity(1)
                resetForm()
                localStorage.removeItem('slug')
                localStorage.removeItem('productDraft')
                localStorage.removeItem('colorVariety')
                localStorage.removeItem('colorSizeList')
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


    const showModal = () => {

        var sizeL = sizes?.map(data => data.type)

        var sizeB = sizeList?.map(data => data.size)

        var array1 = sizeL.filter(val => !sizeB.includes(val));

        const includeId = array1?.map((data, i) => {
            return {
                id: i,
                type: data
            }
        })
        setSize(includeId)
        setIsModalVisible(true);



    };


    const handleCancel = () => {
        setIsModalVisible(false)
        setEditDataId('')
    };


    const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm } =
        useFormik({
            initialValues,
            validationSchema: ProductNoColorSchema,
            onSubmit: (data: ProductNoColorData) => handleNoColorFormSubmit(data),
            enableReinitialize: true
        });


    const { values: modalValues, errors: modalErrors, touched: modalTouched, handleChange: modalHandleChange, handleSubmit: modalHandleSubmit, handleBlur: modalHandleBlur } =
        useFormik({
            initialValues: modalInitialValues,
            validationSchema: ProductSizeSchema,
            onSubmit: (data: ProductSizeData) => handleModalFormSubmit(data),
            enableReinitialize: true
        });

    const { values: _values, errors: _errors, touched: _touched, handleChange: _handleChange, handleSubmit: _handleSubmit, handleBlur: _handleBlur } =
        useFormik({
            initialValues: _initialValues,
            validationSchema: ProductColorSchema,
            onSubmit: (data: { description: string }) => handleFormSubmit(data),
            enableReinitialize: true
        });

    const { values: colorValues, errors: colorErrors, touched: colorTouched, handleChange: colorHandleChange, handleSubmit: colorHandleSubmit, handleBlur: colorHandleBlur, resetForm: colorResetForm } =
        useFormik({
            initialValues: init,
            validationSchema: ProductColorAloneSchema,
            onSubmit: (data: ProductColorAloneData) => handleColorAlonePublish(data),
            enableReinitialize: true
        });


    const increment = () => {
        const qt = quantity + 1
        setQuantity(qt)
    }

    const decrement = () => {
        if (quantity === 1) {
            return
        }
        const qt = quantity - 1
        setQuantity(qt)
    }

    const modalIncrement = () => {
        const qt = modalQuantity + 1
        setModalQuantity(qt)
    }

    const modalDecrement = () => {
        if (modalQuantity === 1) {
            return
        }
        const qt = modalQuantity - 1
        setModalQuantity(qt)
    }


    const profileImageChange = async (fileChange) => {
        const file = fileChange.target.files[0];
        if (file) {
            setFile(file)
            const fd = URL.createObjectURL(file)
            setPhotoUrl(fd)
            setOpenCrop(true)
        }

    }

    const removeImage = (index) => {
        const update = multipleUpload?.filter((data, i) => i !== index)
        setMultipleUpload(update)
        const popData = dummyUploadImage.slice(0, -1);
        setDummyUploadImage(popData)
    }




    const deleteSize = (index) => {
        const newD = sizeList?.filter((data, i) => i !== index)
        setSizeList(newD)
    }

    const handleSizeAloneDraft = async () => {
        if (multipleUpload?.length < 1) {
            setResponseModal(true)
            setTitle('Minimum of 1 image upload is required')
            setType('Error')
            return
        }
        const newSizeList = sizeList?.map(data => {
            return {
                size: data.size,
                price: data.price,
                quantity: data.quantity
            }
        })
        setLoader(true)
        const payload: ProductCreateFormData = {
            id: productSlug?.id,
            name: productSlug?.name,
            description: productSlug?.description,
            categories: productSlug?.categories,
            variants: [
                {
                    spec: newSizeList,
                    variantImg: multipleUpload
                }
            ],
            isDraft: true,
            status: 'draft'
        }

        try {
            var resultAction = await dispatch(updateProduct(payload))
            if (updateProduct.fulfilled.match(resultAction)) {
                setLoader(false)
                setResponseModal(true)
                setTitle('You have successfully save product as draft')
                setType('Success')
                setMultipleUpload([])
                setQuantity(0)
                resetForm()
                localStorage.removeItem('slug')
                localStorage.removeItem('productDraft')
            }
            else {
                setLoader(false)
                setResponseModal(true)
                setTitle('Error while saving as draft')
                setType('Error')
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleSizeAlonePublish = async () => {
        if (sizeList?.length < 1) {
            setResponseModal(true)
            setTitle('Minimum of 1 size option is required')
            setType('Error')
            return
        }
        if (multipleUpload?.length < 1) {
            setResponseModal(true)
            setTitle('Minimum of 1 image upload is required')
            setType('Error')
            return
        }
        setLoader(true)
        const newSizeList = sizeList?.map(data => {
            return {
                size: data.size,
                price: data.price,
                quantity: data.quantity
            }
        })
        const payload: ProductCreateFormData = {
            id: productSlug?.id,
            name: productSlug?.name,
            description: productSlug?.description,
            categories: productSlug?.categoryies,
            variants: [
                {
                    spec: newSizeList,
                    variantImg: multipleUpload
                }
            ],
            isDraft: false,
            status: 'active'
        }


        try {
            var resultAction = await dispatch(updateProduct(payload))
            if (updateProduct.fulfilled.match(resultAction)) {
                setLoader(false)
                setResponseModal(true)
                setTitle('You have successfully added a new product to your store')
                setType('Success')
                setMultipleUpload([])
                setQuantity(1)
                resetForm()
                localStorage.removeItem('slug')
                localStorage.removeItem('productDraft')
                localStorage.removeItem('colorVariety')
                localStorage.removeItem('colorSizeList')
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

    const handleColorAlonePublish = async (data) => {
        if (multipleUpload?.length < 1) {
            setResponseModal(true)
            setTitle('Minimum of 1 image upload is required')
            setType('Error')
            return
        }
        setLoader(true)
        var payload: ProductCreateFormData = {
            id: productSlug?.id,
            name: productSlug?.name,
            description: productSlug?.description,
            categories: productSlug?.categories,
            isDraft: false,
            status: 'active',
            variants: [
                {
                    spec: [
                        {
                            price: data?.price,
                            quantity
                        }
                    ],
                    variantImg: multipleUpload
                }
            ]
        }

        try {
            var resultAction = await dispatch(updateProduct(payload))
            if (updateProduct.fulfilled.match(resultAction)) {
                setLoader(false)
                setResponseModal(true)
                setTitle('You have successfully added a new product to your store')
                setType('Success')
                setMultipleUpload([])
                setQuantity(1)
                localStorage.removeItem('slug')
                localStorage.removeItem('productDraft')
                localStorage.removeItem('colorVariety')
                localStorage.removeItem('colorSizeList')
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

    const handleColorMulitplePublish = async (variant) => {
        setLoader(true)
        var payloadData: ProductCreateFormData = {
            id: productSlug?.id,
            name: productSlug?.name,
            description: productSlug?.description,
            categories: productSlug?.categories,
            isDraft: true,
            variants: variant,
            status: 'draft',
        }

        try {
            var resultAction = await dispatch(updateProduct(payloadData))
            if (updateProduct.fulfilled.match(resultAction)) {
                setLoader(false)
                setResponseModal(true)
                setTitle('')
                setType('Success')
                setMultipleUpload([])
                setQuantity(1)
                dispatch(getProductBySlug(getSlug))
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

    const handleRessponseModalClose = () => {
        setResponseModal(false)
        if (type === 'Error') {
            return;
        }
        else {
            if (productInDraft?.isColor && !productInDraft?.isSize) {
                return;
            }
            else if (productInDraft?.isColor && productInDraft?.isSize) {
                return;
            }
            return router.push('/products')
        }
    }

    const editSize = (data, index) => {
        setModalQuantity(data?.quantity)
        setEditSizeData(data || { size: data?.size, price: data?.price })
        setEditDataId(data?._id || data?.id)
        showModal()
    }

    const renderSizeList = () => {
        return sizeList?.map((data, i) => {
            return (
                <MiniDiv key={i}>
                    <RowStart>
                        <Paragraph text='Size: ' fontSize={GlobalStyle.size.size14} fontWeight='400' margin='2% 2% 0% 0%' color={GlobalStyle.color.gray} />
                        <Paragraph text={data?.size} fontSize={GlobalStyle.size.size14} fontWeight='400' margin='2% 0% 0% 0%' />
                    </RowStart>
                    <RowStart>
                        <Paragraph text='Price: ' fontSize={GlobalStyle.size.size14} fontWeight='400' margin='2% 2% 0% 0%' color={GlobalStyle.color.gray} />
                        <CurrencyFormat value={data.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <Paragraph text={value} fontSize={GlobalStyle.size.size14} fontWeight='400' margin='2% 0% 0% 0%' />} />
                    </RowStart>
                    <RowBetween>
                        <ContDiv>
                            <RowStart>
                                <Paragraph text='Quantity: ' fontSize={GlobalStyle.size.size14} fontWeight='400' margin='2% 2% 0% 0%' color={GlobalStyle.color.gray} />
                                <Paragraph text={`${data.quantity} item(s)`} fontSize={GlobalStyle.size.size14} fontWeight='400' margin='2% 0% 0% 0%' />
                            </RowStart>
                        </ContDiv>
                        <RowStart>
                            <IconImage src={editIcon} onClick={() => editSize(data, i)} />
                            <Paragraph text='' margin='0% 3px' />
                            <IconImage src={delIcon} onClick={() => deleteSize(i)} />
                        </RowStart>
                    </RowBetween>
                </MiniDiv>
            )
        })
    }

    const addAnotherColor = async () => {
        if (multipleUpload?.length < 1) {
            setResponseModal(true)
            setTitle('Minimum of 1 image upload is required')
            setType('Error')
            return
        }

        if (colorValues.price < 500) {
            setResponseModal(true)
            setTitle('Price must be equal or greater than 500')
            setType('Error')
            return
        }
        const payload = [...productSlug?.variants, {
            variantImg: multipleUpload,
            spec: [
                {
                    price: colorValues.price,
                    quantity: quantity,
                }
            ]
        }]

        await handleColorMulitplePublish(payload)

        await colorResetForm()

        setMultipleUpload([])
        setDummyUploadImage([""])
        setQuantity(1)
    }




    const addNewColor = async () => {
        if (multipleUpload?.length < 1) {
            setResponseModal(true)
            setTitle('Minimum of 1 image upload is required')
            setType('Error')
            return
        }

        if (colorValues.price < 500) {
            setResponseModal(true)
            setTitle('Price must be equal or greater than 500')
            setType('Error')
            return
        }

        const payload = [...productSlug?.variants, {
            variantImg: multipleUpload,
            spec: [
                {
                    price: colorValues.price,
                    quantity: quantity,
                }
            ]
        }]

        const editablePayload = productSlug?.variants?.map(data => {
            return editableItem === data?._id ? {
                id: editableItem,
                variantImg: multipleUpload,
                spec: [
                    {
                        price: colorValues.price,
                        quantity: quantity,
                    }
                ]
            }
                :
                data
        })


        if (editableItem === null) {
            await handleColorMulitplePublish(payload)
        }
        else {
            await handleColorMulitplePublish(editablePayload)
        }




        await colorResetForm()

        setMultipleUpload([])
        setQuantity(1)

        return router.push('/add-product')

    }



    return (
        <Container>
            <MobileHeader
                icon={chevronLeft}
                header="Product Colour Details"
            />
            <br />
            <ColumnContainer>
                <Paragraph text="Upload Images" fontSize={GlobalStyle.size.size16} fontWeight='400' />

                {
                    dummyUploadImage?.length <= 1 ? <MobileUpload profileImageChange={profileImageChange} />
                        :
                        <Grid>
                            {
                                multipleUpload?.map((data, i) => {
                                    return <UploadedImage key={i} index={i} removeImage={() => removeImage(i)} imageUrl={data} />
                                })
                            }
                            {
                                dummyUploadImage?.filter((a, b) => multipleUpload?.length < b + 1).map((data, i) => {
                                    return <UploadComponent key={i} profileImageChange={profileImageChange} />
                                })
                            }
                        </Grid>

                }

                <br />
                {
                    !productInDraft?.isColor && !productInDraft?.isSize && <>
                        <NumberInput
                            label='Price'
                            type='controlled'
                            value={values.price}
                            onChange={handleChange('price')}
                            errorMsg={touched.price ? errors.price : undefined}
                        />
                        <RowStart>
                            <Subdiv>
                                <NumberInput
                                    label='Quantity'
                                    value={quantity}
                                />
                            </Subdiv>
                            <Quantitydiv onClick={() => decrement()}>
                                <Paragraph text='-' fontSize={GlobalStyle.size.size30} />
                            </Quantitydiv>
                            <Quantitydiv onClick={() => increment()}>
                                <Paragraph text='+' fontSize={GlobalStyle.size.size30} />
                            </Quantitydiv>
                        </RowStart>
                    </>
                }

                {
                    productInDraft?.isSize && !productInDraft?.isColor && <>
                        <Paragraph text='Size Options' fontSize={GlobalStyle.size.size16} fontWeight='400' />
                        {renderSizeList()}
                        <View onClick={showModal}>
                            <IconImage
                                src={landMark}
                            />
                            <Paragraph text='Add Sizes' fontSize={GlobalStyle.size.size14} fontFamily='400' margin='0% 0% 0% 3%' />
                        </View>
                    </>
                }


                {
                    productInDraft?.isColor && !productInDraft?.isSize && <>
                        <NumberInput
                            label='Price'
                            type='controlled'
                            value={colorValues.price}
                            onChange={colorHandleChange('price')}
                            errorMsg={colorTouched.price ? colorErrors.price : undefined}
                        />
                        <RowStart>
                            <Subdiv>
                                <NumberInput
                                    label='Quantity'
                                    value={quantity}
                                />
                            </Subdiv>
                            <Quantitydiv onClick={() => decrement()}>
                                <Paragraph text='-' fontSize={GlobalStyle.size.size30} />
                            </Quantitydiv>
                            <Quantitydiv onClick={() => increment()}>
                                <Paragraph text='+' fontSize={GlobalStyle.size.size30} />
                            </Quantitydiv>
                        </RowStart>

                        <Break></Break>
                        {
                            productSlug?.variants?.length < 1 && <View onClick={addAnotherColor}>
                                <IconImage
                                    src={landMark}
                                />
                                <Paragraph text='Add Another Colour' fontSize={GlobalStyle.size.size14} fontFamily='400' margin='0% 0% 0% 3%' />
                            </View>
                        }
                    </>
                }



                {
                    productInDraft?.isColor && productInDraft?.isSize && <>
                        <TextInput
                            label='Color Description'
                            required
                            value={_values.description}
                            onChange={_handleChange('description')}
                            errorMsg={_touched.description ? _errors.description : undefined}
                        />
                        <Paragraph text='Colour Sizes' fontSize={GlobalStyle.size.size16} fontWeight='400' />
                        {
                            renderSizeList()
                        }
                        <View onClick={showModal}>
                            <IconImage
                                src={landMark}
                            />
                            <Paragraph text='Add Sizes' fontSize={GlobalStyle.size.size14} fontFamily='400' margin='0% 0% 0% 3%' />
                        </View>
                        <br />
                    </>
                }


            </ColumnContainer>
            <BottomContainer>
                {
                    productSlug?.variants?.length < 1 ?
                        <Button
                            isLoading={loader}
                            children={productInDraft?.isColor && productInDraft?.isSize ? "Add this colour" : "Publish"}
                            handlePress={
                                !productInDraft?.isColor && !productInDraft?.isSize ? handleSubmit :
                                    productInDraft?.isColor && !productInDraft?.isSize ? colorHandleSubmit :
                                        !productInDraft?.isColor && productInDraft?.isSize ? handleSizeAlonePublish :
                                            _handleSubmit
                            } />
                        :
                        <Button
                            isLoading={loader}
                            children={"Add this colour"}
                            handlePress={
                                productInDraft?.isColor && productInDraft?.isSize ? _handleSubmit : addNewColor
                            }
                        />
                }

                {/* {
                    !productInDraft?.isColor && productInDraft?.isSize && <TextDiv onClick={handleSizeAloneDraft}>
                        <Paragraph text='Save Progress' fontSize={GlobalStyle.size.size14} fontWeight='400' />
                    </TextDiv>
                } */}
            </BottomContainer>

            {openCrop && <CropEasy {...{ photoUrl, setOpenCrop, openCrop, setPhotoUrl, setFile, setImageUrl, setMultipleUpload, multipleUpload, multiple, dummyUploadImage, setDummyUploadImage }} />}

            <ResponseModal
                title={title}
                type={type}
                modalVisible={responseModal}
                setModalVisible={handleRessponseModalClose}
                handlePress={handleRessponseModalClose}

            />

            <Modal title={null} closable={false} footer={null} visible={isModalVisible} onOk={handleCancel} onCancel={handleCancel}>
                <RowBetween>
                    <Paragraph text='Size Details' fontSize={GlobalStyle.size.size16} fontFamily='600' />
                    <div onClick={handleCancel}>
                        <IconImage src={cancel} />
                    </div>
                </RowBetween>

                <ColumnContainer>
                    <SelectField
                        data={size}
                        type={true}
                        value={modalValues.size}
                        placeholder={'Select Size'}
                        onSearch={modalHandleChange('size')}
                        onChange={modalHandleChange('size')}
                        errorMsg={modalTouched.size ? modalErrors.size : undefined}
                    />

                    <NumberInput
                        label='Price'
                        type='controlled'
                        value={modalValues.price}
                        onChange={modalHandleChange('price')}
                        errorMsg={modalTouched.price ? modalErrors.price : undefined}
                    />
                    <RowStart>
                        <Subdiv>
                            <NumberInput
                                label='Quantity'
                                value={modalQuantity}
                            />
                        </Subdiv>
                        <Quantitydiv onClick={() => modalDecrement()}>
                            <Paragraph text='-' fontSize={GlobalStyle.size.size30} />
                        </Quantitydiv>
                        <Quantitydiv onClick={() => modalIncrement()}>
                            <Paragraph text='+' fontSize={GlobalStyle.size.size30} />
                        </Quantitydiv>
                    </RowStart>
                </ColumnContainer>

                <br />
                <BottomContainer>
                    <Button isLoading={loader} children={"Save and add new"} handlePress={modalHandleSubmit} />
                    <br />
                    <br />
                    <ContDiv onClick={() => modalHandleSubmit()}>
                        <Paragraph text='Save and close' fontSize={GlobalStyle.size.size14} textAlign='center' />
                    </ContDiv>
                </BottomContainer>
            </Modal>

        </Container>
    )
}

export default MobileProductColor




const Subdiv = styled.div`
    flex: 1;
    margin-right: 5px;
`

const Quantitydiv = styled.div`
width: 50px;
height: 55px;
display: flex;
justify-content: center;
align-items: center;
background: ${GlobalStyle.color.darkBlack};
border: 0.3px solid ${GlobalStyle.color.lightGray};
border-radius: 10px;
margin: 0% 5px;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    margin: 10px 0%;
`

const View = styled.div`
    display: flex;
    margin-top: 20px;
`

const ContDiv = styled.div`
    width: 100%
`

const MiniDiv = styled.div`
padding: 10px 0%;
    border-bottom: 1px solid ${GlobalStyle.color.darkBlack}
`
const TextDiv = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin: 15px 0%;
`
const Break = styled(Divider)`
    background: ${GlobalStyle.color.lightwhite};
    margin: 10px 0% !important;
`

const Contain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`