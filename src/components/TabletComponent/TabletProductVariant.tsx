import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { del, deleteIcon, editIcon, fancyPlus } from '../../assets'
import { getProductBySlug, productBySlug, updateProduct } from '../../slices/ProductSlice'
import { ProductColorAloneSchema, ProductColorSchema, ProductNoColorSchema } from '../../utils/schemas'
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import { GlobalStyle } from '../../utils/themes/themes'
import { ProductColorAloneData, ProductColorData, ProductCreateFormData, ProductNoColorData } from '../../utils/types'
import Paragraph from '../Paragraph'
import { IconImage } from './Styled'
import UploadedImage from '../UploadComponent/UploadedImage'
import UploadComponent from '../UploadComponent'
import CropEasy from '../crop/CropEasy'
import NumberInput from '../NumberInput'
import Button from '../Button'

import { sizes } from '../../utils/constants/sizes'
import { Select, Collapse } from 'antd';
import { toast, ToastContainer } from 'material-react-toastify';
import ImageContainer from '../Image'




const { Panel } = Collapse;


function TabletProductVariant() {

    const [loader, setLoader] = useState(false)
    const dispatch = useAppDispatch()
    const productSlug = useAppSelector(productBySlug)
    const router = useRouter()
    const [price, setPrice] = useState<number>(0)
    const [openCrop, setOpenCrop] = useState(false)
    const [photoUrl, setPhotoUrl] = useState<any>()
    const [file, setFile] = useState(null)
    const [collapOpenCrop, setCollapOpenCrop] = useState(false)
    const [collapPhotoUrl, setCollapPhotoUrl] = useState<any>()
    const [collapFile, setCollapFile] = useState(null)
    const [imageUrl, setImageUrl] = useState([])
    const [collapImageUrl, setCollapImageUrl] = useState([])
    const [multiple, setMultiple] = useState(true)
    const [multipleUpload, setMultipleUpload] = useState([])
    const productInDraft = JSON.parse(localStorage.getItem('productDraft'))
    const activeId = localStorage.getItem('activeId')
    const [responseModal, setResponseModal] = useState(false)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const getSlug = localStorage.getItem('slug')
    const [sizeList, setSizeList] = useState(sizes)
    const [quantity, setQuantity] = useState(1)
    const { Option } = Select
    const [inputList, setInputList] = useState<any>([
        { id: "", size: "", quantity: 0, price: 500 },
    ]);
    const [colorList, setColorList] = useState<any>([]);

    const [colorListBoth, setColorListBoth] = useState<any>([]);


    const initialValues: ProductNoColorData = {
        price: 0
    };

    const init: ProductColorAloneData = {
        price: price ? price : 0
    };

    const _initialValues: ProductColorData = {
        description: ''
    };


    useEffect(() => {
        dispatch(getProductBySlug(getSlug))
    }, [getSlug])

    const handleNoColorAndSizeFormSubmit = async () => {
        if (multipleUpload?.length < 1) {
            toast.error('Minimum of 1 image upload is required')
            return
        }
        if (price < 500) {
            toast.error('Price must be atleast N500 and not greater than N999,999')
            return
        }

        setLoader(true)
        const payload: ProductCreateFormData = {
            id: productSlug?.id,
            name: productSlug?.name,
            description: productSlug?.description,
            categories: productSlug?.category,
            variants: [
                {
                    spec: [
                        {
                            price: Math.floor(price * (100) / 100),
                            // parseInt(price)
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
                // setResponseModal(true)
                toast.success('You have successfully added a new product to your store')
                // setType('Success')
                setMultipleUpload([])
                setQuantity(1)
                localStorage.removeItem('slug')
                localStorage.removeItem('productDraft')
                localStorage.removeItem('colorVariety')
                localStorage.removeItem('colorSizeList')

                return router.push('/products')
            }
            else {
                setLoader(false)
                // setResponseModal(true)
                toast.error('Error while adding a new product to your store')
                // setType('Error')
            }
        }
        catch (e) {
            console.log(e)
        }



    }



    const dummyUploadImage = new Array("", "", "", "", "");

    const profileImageChange = async (fileChange) => {
        const file = fileChange.target.files[0];
        if (file) {
            setFile(file)
            setImageUrl([])
            const fd = URL.createObjectURL(file)
            setPhotoUrl(fd)
            setOpenCrop(true)
        }

    }

    const profileCollapImageChange = async (fileChange) => {
        const file = fileChange.target.files[0];
        if (file) {
            setCollapFile(file)
            setCollapImageUrl([])
            const fd = URL.createObjectURL(file)
            setCollapPhotoUrl(fd)
            setCollapOpenCrop(true)
        }
    }

    const removeImage = (index) => {
        const update = multipleUpload?.filter((data, i) => i !== index)
        setMultipleUpload(update)
    }

    const handleColorAloneSubmit = async () => {
        if (multipleUpload?.length > 0 && price < 500) {
            toast.error('Price must be atleast N500 and not greater than N999,999')
            return
        }
        if (colorList?.length <= 0 && multipleUpload?.length <= 0) {
            toast.error('Kindly Add a variant')
            return
        }

        if (multipleUpload?.length > 0 && price >= 500) {
            await colorList?.push({
                image: multipleUpload,
                price: parseInt(price),
                quantity: quantity,
            })
        }

        const list = colorList?.map(dd => {
            return {
                spec: [
                    {
                        price: dd.price,
                        quantity: dd.quantity
                    }
                ],
                variantImg: dd.image
            }
        })

        setLoader(true)
        const payload = {
            id: productSlug?.id,
            name: productSlug?.name,
            description: productSlug?.description,
            categories: productSlug?.category,
            variants: list,
            isDraft: false,
            status: 'active',
        }

        try {
            var resultAction = await dispatch(updateProduct(payload))
            if (updateProduct.fulfilled.match(resultAction)) {
                setLoader(false)
                // setResponseModal(true)
                toast.success('You have successfully added a new product to your store')
                // setType('Success')
                setMultipleUpload([])
                setQuantity(1)
                localStorage.removeItem('slug')
                localStorage.removeItem('productDraft')
                localStorage.removeItem('colorVariety')
                localStorage.removeItem('colorSizeList')
                return router.push('/products')
            }
            else {
                setLoader(false)
                // setResponseModal(true)
                toast.error('Error while adding a new product to your store')
                //setType('Error')
            }
        }
        catch (e) {
            console.log(e)
        }


    }


    // const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm } =
    //     useFormik({
    //         initialValues,
    //         validationSchema: ProductNoColorSchema,
    //         onSubmit: (data: ProductNoColorData) => handleNoColorAndSizeFormSubmit(data),
    //         enableReinitialize: true
    //     });

    const { values: _values, errors: _errors, touched: _touched, handleChange: _handleChange, handleSubmit: _handleSubmit, handleBlur: _handleBlur } =
        useFormik({
            initialValues: _initialValues,
            validationSchema: ProductColorSchema,
            onSubmit: (data: { description: string }) => console.log(data),
            enableReinitialize: true
        });

    const { values: colorValues, errors: colorErrors, touched: colorTouched, handleChange: colorHandleChange, handleSubmit: colorHandleSubmit, handleBlur: colorHandleBlur, resetForm: colorResetForm } =
        useFormik({
            initialValues: init,
            validationSchema: ProductColorAloneSchema,
            onSubmit: (data: ProductColorAloneData) => console.log(data),
            enableReinitialize: true
        });

    const increment = () => {
        const qt = quantity + 1
        setQuantity(qt)
        setPrice(price)
    }

    const decrement = () => {
        if (quantity === 0) {
            return
        }
        const qt = quantity - 1
        setQuantity(qt)
        setPrice(price)
    }

    const renderNoSizeNoColorData = () => {
        return (
            <ComponentDiv>
                <DivContainerTwo>
                    <Paragraph text="Price" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 3px 0px' />
                    <EmptyDiv></EmptyDiv>
                    <Paragraph text="Quantity" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 3px 50px' />
                    <EmptyDiv></EmptyDiv>
                    <EmptyDiv></EmptyDiv>
                </DivContainerTwo>
                <SelectDiv>
                    <NumberInput
                        value={price}
                        onChange={(e) => handlePriceChange(e, "price")}
                        // onChange={handleChange('price')}
                        label={"Price"}
                        type="controlled"
                    />
                    <EmptyDiv></EmptyDiv>
                    <InputDivBig>
                        <Quantitydiv2 onClick={() => decrement()}>
                            <Paragraph text='-' fontSize={GlobalStyle.size.size30} />
                        </Quantitydiv2>
                        <TextParagraph>
                            <Paragraph text={quantity.toString()} />
                        </TextParagraph>
                        <Quantitydiv2 onClick={() => increment()}>
                            <Paragraph text='+' fontSize={GlobalStyle.size.size30} />
                        </Quantitydiv2>
                    </InputDivBig>
                </SelectDiv>
            </ComponentDiv>
        )
    }

    const handleSizeChange = (e, id) => {
        var findSize = sizeList?.find(data => data.type === e)

        var filteredSize = sizeList?.filter(data => data.type !== e)

        const updatedData = inputList?.map((x, j) =>
            j === id ? { ...x, size: e, id: findSize?.id } : x
        );

        setInputList(updatedData);
        setSizeList(filteredSize)

    };

    const handleCollapSizeChange = (e, id, index) => {
        var findSize = sizeList?.find(data => data.type === e)

        var filteredSize = sizeList?.filter(data => data.type !== e)

        const newD = colorListBoth?.map((a: any, i) => {
            return i === index ?
                {
                    image: a.image,
                    input: a.input?.map((bb, qq) => {
                        return qq === id ? {
                            id: bb.id,
                            price: bb.price,
                            quantity: bb.quantity,
                            size: e
                        }
                            : bb
                    })
                }
                : a
        })
        setColorListBoth(newD)
        setSizeList(filteredSize)

    };

    const inputDecrement = (value, index) => {
        if (value === 0) {
            return;
        }
        else {
            const newD = inputList?.map((a: any, i) => {
                return i === index ?
                    {
                        id: a.id,
                        price: a.price,
                        quantity: value - 1,
                        size: a.size
                    }
                    : a
            })
            setInputList(newD)
        }

    }

    const inputIncrement = (value, index) => {
        const newD = inputList?.map((a: any, i) => {
            return i === index ?
                {
                    id: a.id,
                    price: a.price,
                    quantity: value + 1,
                    size: a.size
                }
                : a
        })
        setInputList(newD)
    }

    const inputCollapIncrement = (value, index, pIndex) => {
        const newD = colorListBoth?.map((a: any, i) => {
            return i === pIndex ?
                {
                    image: a.image,
                    input: a.input?.map((bb, qq) => {
                        return qq === index ? {
                            id: bb.id,
                            price: bb.price,
                            quantity: bb.quantity + 1,
                            size: bb.size
                        }
                            : bb
                    })
                }
                : a
        })
        setColorListBoth(newD)
    }

    const handleCollapPrice = (e, index) => {
        const newD = colorList?.map((a: any, i) => {
            return i === index ?
                {
                    image: a?.image,
                    price: e,
                    quantity: a?.quantity,
                }
                : a
        })
        setColorList(newD)
    }
    const collapDecrement = (index) => {
        const newD = colorList?.map((a: any, i) => {
            return i === index ?
                {
                    image: a?.image,
                    price: a?.price,
                    quantity: a?.quantity < 1 ? 0 : a?.quantity - 1,
                }
                : a
        })
        setColorList(newD)
    }

    const collapIncrement = (index) => {
        const newD = colorList?.map((a: any, i) => {
            return i === index ?
                {
                    image: a?.image,
                    price: a?.price,
                    quantity: a?.quantity + 1,
                }
                : a
        })
        setColorList(newD)
    }

    const inputCollapDecrement = (value, index, pIndex) => {
        const newD = colorListBoth?.map((a: any, i) => {
            return i === pIndex ?
                {
                    image: a.image,
                    input: a.input?.map((bb, qq) => {
                        return qq === index ? {
                            id: bb.id,
                            price: bb.price,
                            quantity: bb.quantity < 1 ? 0 : bb.quantity - 1,
                            size: bb.size
                        }
                            : bb
                    })
                }
                : a
        })
        setColorListBoth(newD)
    }

    const handleInputChange = (e, index, name) => {
        const list = [...inputList];
        list[index][name] = parseInt(e.target.value);
        setInputList(list);
    };

    const handleCollapseInputChange = (e, index, name, pIndex) => {
        const newD = colorListBoth?.map((a: any, i) => {
            return i === pIndex ?
                {
                    image: a.image,
                    input: a.input?.map((bb, qq) => {
                        return qq === index ? {
                            id: bb.id,
                            price: e.target.value,
                            quantity: bb.quantity,
                            size: bb.size
                        }
                            : bb
                    })
                }
                : a
        })
        setColorListBoth(newD)
    }

    const handlePriceChange = (e, name) => {
        setPrice(e.target.value)
    };

    const removeInputList = (index) => {
        const filtered = inputList?.filter((a, i) => i !== index)
        setInputList(filtered)
    }

    const removeCollapInputList = (index, pIndex) => {
        const newD = colorListBoth?.map((a: any, i) => {
            return i === pIndex ?
                {
                    image: a.image,
                    input: a.input?.filter((bb, qq) => qq !== index)
                }
                : a
        })
        setColorListBoth(newD)
    }

    const handleCollapAddClick = (pIndex) => {

        const newD = colorListBoth?.map((a: any, i) => {
            return i === pIndex ?
                {
                    image: a.image,
                    input: a.input?.find(data => data?.size === '') ? a.input : [...a.input, { id: "", size: "", quantity: 0, price: 500 }]
                }
                : a
        })
        setColorListBoth(newD)
    }

    const handleAddClick = () => {
        var checkInput = inputList?.find(data => data.price < 500 || data.price > 999999 || data.price === NaN || data.price === undefined)
        var checkSize = inputList?.find(data => data.size === '')
        if (checkSize) {
            toast.error("Please select variant size")
            return;
        }

        if (checkInput?.length >= 1 || checkInput) {
            toast.error("Price must be atleast N500 and not greater than N999,999")
            return;
        }
        setInputList([...inputList, { id: "", size: "", quantity: 0, price: 500 }]);
    };

    const renderSizeAloneData = () => {
        return inputList?.sort((a: any, b: any) => a.id - b.id).map((x, i) => {
            return <SelectDiv>
                <DivCont>
                    <Paragraph text="Size Option" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                    <SelectInput
                        value={x.size?.length < 1 ? "-Select a size-" : x.size}
                        showSearch
                        placeholder={'-Select a size-'}
                        optionFilterProp="children"
                        onChange={(e) => handleSizeChange(e, i)}
                        onSearch={(e) => (e) => handleSizeChange(e, i)}
                        dropdownClassName="drop"
                        dropdownStyle={{ backgroundColor: GlobalStyle.color.black, color: GlobalStyle.color.white }}
                        filterOption={(input, option) =>
                            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {
                            sizeList?.map((data: any, i: number) => {
                                return <Option key={data.id} value={data.type}>{data.type}</Option>
                            })

                        }

                    </SelectInput>
                </DivCont>

                <EmptyDiv></EmptyDiv>
                <DivCont>
                    <Paragraph text="Quantity" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                    <InputDiv>
                        <Quantitydiv2 onClick={() => inputDecrement(x.quantity, i)}>
                            <Paragraph text='-' fontSize={GlobalStyle.size.size30} />
                        </Quantitydiv2>
                        <TextParagraph>
                            <Paragraph text={x.quantity.toString()} />
                        </TextParagraph>
                        <Quantitydiv2 onClick={() => inputIncrement(x.quantity, i)}>
                            <Paragraph text='+' fontSize={GlobalStyle.size.size30} />
                        </Quantitydiv2>
                    </InputDiv>
                </DivCont>

                <EmptyDiv></EmptyDiv>
                <DivCont>
                    <Paragraph text="Price" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                    <NumberInput
                        value={x.price}
                        onChange={(e) => handleInputChange(e, i, "price")}
                        type="controlled"
                        label={"Price"}
                    // errorMsg={touched.price ? errors.price : undefined}
                    />
                </DivCont>

                <EmptyDiv></EmptyDiv>
                <DeleteDiv onClick={() => removeInputList(i)}>
                    <IconImage
                        src={del}
                    />
                </DeleteDiv>

            </SelectDiv>
        })
    }


    const handleSizeAlonePublish = async () => {
        var checkSize = inputList?.find(data => data.size === '')
        if (inputList?.length <= 0) {
            toast.error('Minimum of 1 size option is required')
            return
        }
        if (checkSize) {
            toast.error("Please select variant size")
            return;
        }
        if (multipleUpload?.length < 1) {
            toast.error('Minimum of 1 image upload is required')
            return
        }
        setLoader(true)
        const newSizeList = inputList?.map(data => {
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
            categories: productSlug?.category,
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
                await toast.success('You have successfully added a new product to your store')
                setMultipleUpload([])
                setQuantity(1)
                // resetForm()
                localStorage.removeItem('slug')
                localStorage.removeItem('productDraft')
                localStorage.removeItem('colorVariety')
                localStorage.removeItem('colorSizeList')

                return router.push('/products')
            }
            else {
                setLoader(false)
                setResponseModal(true)
                toast.error('Error while adding a new product to your store')
                // setType('Error')
            }
        }
        catch (e) {
            console.log(e)
        }
    }


    const handleNewColorSelect = async () => {
        var checkSize = inputList?.find(data => data.size === '')
        if (checkSize) {
            toast.error("Please select variant size")
            return;
        }

        if (multipleUpload?.length < 1) {
            toast.error('Minimum of 1 image upload is required')
            return
        }
        await setColorListBoth([...colorListBoth, {
            image: multipleUpload,
            input: inputList,
        }])

        setMultipleUpload([])
        setInputList([{ id: "", size: "", quantity: 0, price: 500 }])
    }


    const handleAnotherColorSelect = async () => {
        if (multipleUpload?.length < 1) {
            toast.error('Minimum of 1 image upload is required')
            return
        }
        if (price < 500) {
            toast.error('Minimum price expected is 500')
            return
        }

        await setColorList([...colorList, {
            image: multipleUpload,
            price: parseInt(price),
            quantity: quantity,
        }])

        setMultipleUpload([])
        setQuantity(0)
        setPrice(0)
        // resetForm()

    }

    const deleteColorVar = (index) => {
        var newList = colorList?.filter((d, i) => i !== index)

        setColorList(newList)
    }

    const deleteColorAndSizeVar = (index) => {
        var newList = colorListBoth?.filter((d, i) => i !== index)

        setColorListBoth(newList)
    }

    console.log({ colorList })
    const showColorList = () => {
        return (
            <SelectDiv2>
                {
                    colorList?.map((data, j) => {
                        return (
                            <Collapse ghost >
                                <PanelContainer showArrow={false} header={
                                    <Color>
                                        <RowBetween>
                                            <RowStart>
                                                <ImageContainer
                                                    source={data?.image[0]}
                                                    width={40}
                                                    height={40}
                                                />
                                                <Cont>
                                                    <Paragraph text={productSlug?.name} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                                                    <Paragraph text={data?.price} fontSize={GlobalStyle.size.size12} fontWeight='600' color={GlobalStyle.color.gray} />
                                                </Cont>
                                            </RowStart>
                                            <SubDiv>
                                                <IconImage src={editIcon} onClick={() => { }} />
                                                <IconImage src={deleteIcon} onClick={() => deleteColorVar(j)} />
                                            </SubDiv>
                                        </RowBetween>
                                    </Color>
                                } key={j}>
                                    <Paragraph text="Upload Images" fontSize={GlobalStyle.size.size16} fontWeight='400' />
                                    <Div>
                                        <Grid>
                                            {
                                                data?.image.map((data, i) => {
                                                    return <UploadedImage key={i} index={i} imageUrl={data} />
                                                })
                                            }

                                            {/* {
                                                dummyUploadImage?.filter((a, b) => data?.image.length < b + 1).map((data, i) => {
                                                    return <UploadComponent key={i} profileImageChange={profileCollapImageChange} />
                                                })
                                            } */}
                                        </Grid>
                                    </Div>
                                    <br />
                                    <ComponentDiv>
                                        <DivContainerTwo>
                                            <Paragraph text="Price" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 3px 0px' />
                                            <EmptyDiv></EmptyDiv>
                                            <Paragraph text="Quantity" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 3px 50px' />
                                            <EmptyDiv></EmptyDiv>
                                            <EmptyDiv></EmptyDiv>
                                        </DivContainerTwo>
                                        <SelectDiv>
                                            <NumberInput
                                                value={data?.price}
                                                onChange={(e: any) => handleCollapPrice(e.target.value, j)}
                                                label={"Price"}
                                                type="controlled"
                                            />
                                            <EmptyDiv></EmptyDiv>
                                            <InputDivBig>
                                                <Quantitydiv2 onClick={() => collapDecrement(j)}>
                                                    <Paragraph text='-' fontSize={GlobalStyle.size.size30} />
                                                </Quantitydiv2>
                                                <TextParagraph>
                                                    <Paragraph text={data?.quantity.toString()} />
                                                </TextParagraph>
                                                <Quantitydiv2 onClick={() => collapIncrement(j)}>
                                                    <Paragraph text='+' fontSize={GlobalStyle.size.size30} />
                                                </Quantitydiv2>
                                            </InputDivBig>
                                        </SelectDiv>
                                    </ComponentDiv>
                                </PanelContainer>
                            </Collapse>

                        )
                    })
                }
            </SelectDiv2>
        )
    }

    const showColorListBoth = () => {
        return (
            <SelectDiv2>
                {
                    colorListBoth?.map((data, j) => {
                        return (
                            <Collapse ghost >
                                <PanelContainer showArrow={false} header={
                                    <Color>
                                        <RowBetween>
                                            <RowStart>
                                                <ImageContainer
                                                    source={data?.image[0]}
                                                    width={40}
                                                    height={40}
                                                />
                                                <Cont>
                                                    <Paragraph text={productSlug?.name} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                                                    <Paragraph text={data?.input[0]?.price} fontSize={GlobalStyle.size.size12} fontWeight='600' color={GlobalStyle.color.gray} />
                                                </Cont>
                                            </RowStart>
                                            <SubDiv>
                                                <IconImage src={editIcon} onClick={() => { }} />
                                                <IconImage src={deleteIcon} onClick={() => deleteColorAndSizeVar(j)} />
                                            </SubDiv>
                                        </RowBetween>
                                    </Color>
                                } key={j}>
                                    <Paragraph text="Upload Images" fontSize={GlobalStyle.size.size16} fontWeight='400' />
                                    <Div>
                                        <Grid>
                                            {
                                                data?.image.map((data, i) => {
                                                    return <UploadedImage key={i} index={i} imageUrl={data} />
                                                })
                                            }

                                            {/* {
                                                dummyUploadImage?.filter((a, b) => data?.image.length < b + 1).map((data, i) => {
                                                    return <UploadComponent key={i} profileImageChange={profileCollapImageChange} />
                                                })
                                            } */}
                                        </Grid>
                                    </Div>
                                    <br />
                                    {data?.input?.sort((a: any, b: any) => a.id - b.id).map((x, i) => {
                                        return <SelectDiv>
                                            <DivCont>
                                                <Paragraph text="Size Option" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                                                <SelectInput
                                                    value={x.size?.length < 1 ? "-Select a size-" : x.size}
                                                    showSearch
                                                    placeholder={'-Select a size-'}
                                                    optionFilterProp="children"
                                                    onChange={(e) => handleCollapSizeChange(e, i, j)}
                                                    onSearch={(e) => (e) => handleCollapSizeChange(e, i, j)}
                                                    dropdownClassName="drop"
                                                    dropdownStyle={{ backgroundColor: GlobalStyle.color.black, color: GlobalStyle.color.white }}
                                                    filterOption={(input, option) =>
                                                        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                                    }
                                                >
                                                    {
                                                        sizeList?.map((data: any, i: number) => {
                                                            return <Option key={data.id} value={data.type}>{data.type}</Option>
                                                        })

                                                    }

                                                </SelectInput>
                                            </DivCont>

                                            <EmptyDiv></EmptyDiv>
                                            <DivCont>
                                                <Paragraph text="Quantity" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                                                <InputDiv>
                                                    <Quantitydiv2 onClick={() => inputCollapDecrement(x.quantity, i, j)}>
                                                        <Paragraph text='-' fontSize={GlobalStyle.size.size30} />
                                                    </Quantitydiv2>
                                                    <TextParagraph>
                                                        <Paragraph text={x.quantity.toString()} />
                                                    </TextParagraph>
                                                    <Quantitydiv2 onClick={() => inputCollapIncrement(x.quantity, i, j)}>
                                                        <Paragraph text='+' fontSize={GlobalStyle.size.size30} />
                                                    </Quantitydiv2>
                                                </InputDiv>
                                            </DivCont>

                                            <EmptyDiv></EmptyDiv>
                                            <DivCont>
                                                <Paragraph text="Price" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                                                <NumberInput
                                                    value={x.price}
                                                    onChange={(e) => handleCollapseInputChange(e, i, "price", j)}
                                                    type="controlled"
                                                    label={"Price"}
                                                // errorMsg={touched.price ? errors.price : undefined}
                                                />
                                            </DivCont>

                                            <EmptyDiv></EmptyDiv>
                                            <DeleteDiv onClick={() => removeCollapInputList(i, j)}>
                                                <IconImage
                                                    src={del}
                                                />
                                            </DeleteDiv>

                                        </SelectDiv>
                                    })}
                                    <View onClick={() => handleCollapAddClick(j)}>
                                        <IconImage
                                            src={fancyPlus}
                                        />
                                        <Paragraph text='Add Size' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size12} fontFamily='400' margin='0px 0px 0px 7px' />
                                    </View>
                                </PanelContainer>
                            </Collapse>

                        )
                    })
                }
            </SelectDiv2>
        )
    }



    const renderColorAloneData = () => {
        return (
            <ComponentDiv>
                <DivContainerTwo>
                    <Paragraph text="Price" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 3px 0px' />
                    <EmptyDiv></EmptyDiv>
                    <Paragraph text="Quantity" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 3px 50px' />
                    <EmptyDiv></EmptyDiv>
                    <EmptyDiv></EmptyDiv>
                </DivContainerTwo>
                <SelectDiv>
                    <NumberInput
                        value={price}
                        onChange={(e: any) => setPrice(e.target.value)}
                        label={"Price"}
                        type="controlled"
                    />
                    <EmptyDiv></EmptyDiv>
                    <InputDivBig>
                        <Quantitydiv2 onClick={() => decrement()}>
                            <Paragraph text='-' fontSize={GlobalStyle.size.size30} />
                        </Quantitydiv2>
                        <TextParagraph>
                            <Paragraph text={quantity.toString()} />
                        </TextParagraph>
                        <Quantitydiv2 onClick={() => increment()}>
                            <Paragraph text='+' fontSize={GlobalStyle.size.size30} />
                        </Quantitydiv2>
                    </InputDivBig>
                </SelectDiv>
            </ComponentDiv>
        )
    }


    const renderSizeAndColorData = () => {
        return inputList?.sort((a: any, b: any) => a.id - b.id).map((x, i) => {
            return <SelectDiv>
                <DivCont>
                    <Paragraph text="Size Option" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                    <SelectInput
                        value={x.size?.length < 1 ? "-Select a size-" : x.size}
                        showSearch
                        placeholder={'-Select a size-'}
                        optionFilterProp="children"
                        onChange={(e) => handleSizeChange(e, i)}
                        onSearch={(e) => (e) => handleSizeChange(e, i)}
                        dropdownClassName="drop"
                        dropdownStyle={{ backgroundColor: GlobalStyle.color.black, color: GlobalStyle.color.white }}
                        filterOption={(input, option) =>
                            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {
                            sizeList?.map((data: any, i: number) => {
                                return <Option key={data.id} value={data.type}>{data.type}</Option>
                            })

                        }

                    </SelectInput>
                </DivCont>

                <EmptyDiv></EmptyDiv>
                <DivCont>
                    <Paragraph text="Quantity" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                    <InputDiv>
                        <Quantitydiv2 onClick={() => inputDecrement(x.quantity, i)}>
                            <Paragraph text='-' fontSize={GlobalStyle.size.size30} />
                        </Quantitydiv2>
                        <TextParagraph>
                            <Paragraph text={x.quantity.toString()} />
                        </TextParagraph>
                        <Quantitydiv2 onClick={() => inputIncrement(x.quantity, i)}>
                            <Paragraph text='+' fontSize={GlobalStyle.size.size30} />
                        </Quantitydiv2>
                    </InputDiv>
                </DivCont>

                <EmptyDiv></EmptyDiv>
                <DivCont>
                    <Paragraph text="Price" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                    <NumberInput
                        value={x.price}
                        onChange={(e) => handleInputChange(e, i, "price")}
                        type="controlled"
                        label={"Price"}
                    // errorMsg={touched.price ? errors.price : undefined}
                    />
                </DivCont>

                <EmptyDiv></EmptyDiv>
                <DeleteDiv onClick={() => removeInputList(i)}>
                    <IconImage
                        src={del}
                    />
                </DeleteDiv>

            </SelectDiv>
        })
    }


    const handleColorAndSizeSubmit = async () => {
        var checkInput = inputList?.find(data => data.price < 500 || data.price > 999999 || data.price === NaN || data.price === undefined)
        var checkSize = inputList?.find(data => data.size === '')

        if (multipleUpload?.length > 0 && checkInput) {
            toast.error('Price must be atleast N500 and not greater than N999,999')
            return
        }
        if (colorListBoth?.length <= 0 && multipleUpload?.length <= 0) {
            toast.error('Kindly Add a variant')
            return
        }
        if (multipleUpload?.length > 0 && checkSize) {
            toast.error("Please select variant size")
            return;
        }
        if (multipleUpload?.length > 0 && !checkInput) {
            await colorListBoth?.push({
                image: multipleUpload,
                input: inputList,
            })
        }

        const newSizeList = colorListBoth?.map(data => {
            return {
                spec: data?.input,
                variantImg: data?.image
            }
        })

        const payload = {
            id: productSlug?.id,
            name: productSlug?.name,
            description: productSlug?.description,
            categories: productSlug?.categories,
            variants: newSizeList,
            isDraft: false,
            status: 'active',
        }
        setLoader(true)
        try {
            var resultAction = await dispatch(updateProduct(payload))
            if (updateProduct.fulfilled.match(resultAction)) {
                setLoader(false)
                // setResponseModal(true)
                toast.success('You have successfully added a new product to your store')
                // setType('Success')
                setMultipleUpload([])
                setQuantity(1)
                localStorage.removeItem('slug')
                localStorage.removeItem('productDraft')
                localStorage.removeItem('colorVariety')
                localStorage.removeItem('colorSizeList')
                return router.push('/products')
            }
            else {
                setLoader(false)
                // setResponseModal(true)
                toast.error('Error while adding a new product to your store')
                //setType('Error')
            }
        }
        catch (e) {
            console.log(e)
        }

    }


    const backButtonPressed = () => {
        setLoader(true)
        localStorage.setItem('slug', productSlug?.slug)
        return router.back()
    }




    return (
        <Container>
            <Paragraph text='Create Products' fontSize={GlobalStyle.size.size24} fontWeight='bold' />
            <Paragraph text='Kindly provide your product information below' fontSize={GlobalStyle.size.size15} fontWeight='400' />
            {
                colorList?.length > 0 && <>
                    {showColorList()}
                </>
            }
            {
                colorListBoth?.length > 0 && <>
                    {showColorListBoth()}
                </>
            }
            <br />
            <Paragraph text="Upload Images" fontSize={GlobalStyle.size.size16} fontWeight='400' />
            <Div>
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
            </Div>
            <br />
            {!productInDraft?.isColor && !productInDraft?.isSize && renderNoSizeNoColorData()}

{!productInDraft?.isColor && productInDraft?.isSize && <>
    {renderSizeAloneData()}
    <View onClick={() => handleAddClick()}>
        <IconImage
            src={fancyPlus}
        />
        <Paragraph text='Add Sizes' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size14} fontFamily='400' margin='0px 0px 0px 7px' />
    </View>
</>}

{productInDraft?.isColor && !productInDraft?.isSize && <>
    {renderColorAloneData()}
    <View onClick={() => handleAnotherColorSelect()}>
        <IconImage
            src={fancyPlus}
        />
        <Paragraph text='Add Another Color' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size14} fontFamily='400' margin='0px 0px 0px 7px' />
    </View>
</>}

{productInDraft?.isColor && productInDraft?.isSize && <>
    {renderSizeAndColorData()}
    <View onClick={() => handleAddClick()}>
        <IconImage
            src={fancyPlus}
            width={15}
        />
        <Paragraph text='Add size' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size10} fontFamily='400' margin='3px 0px 0px 7px' />
    </View>
    <View onClick={() => handleNewColorSelect()}>
        <IconImage
            src={fancyPlus}
        />
        <Paragraph text='Add Another Color' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size14} fontFamily='400' margin='0px 0px 0px 7px' />
    </View>
</>}




<Contain>
    <ContainDiv>
        <Button children='Back' type='cancel' isLoading={loader} handlePress={() => backButtonPressed()}
        />
        <EmptyDiv></EmptyDiv>
        <Button children='Publish'
            handlePress={
                !productInDraft?.isColor && !productInDraft?.isSize ? handleNoColorAndSizeFormSubmit :
                    productInDraft?.isColor && !productInDraft?.isSize ? handleColorAloneSubmit :
                        !productInDraft?.isColor && productInDraft?.isSize ? handleSizeAlonePublish :
                            handleColorAndSizeSubmit
            }
            isLoading={loader} />
    </ContainDiv>
</Contain>

            {openCrop && <CropEasy {...{ photoUrl, setOpenCrop, openCrop, setPhotoUrl, setFile, setImageUrl, setMultipleUpload, multipleUpload, multiple }} />}

            {collapOpenCrop && <CropEasy {...{ photoUrl: collapPhotoUrl, setOpenCrop: setCollapOpenCrop, openCrop: collapOpenCrop, setPhotoUrl: setCollapPhotoUrl, setFile: setCollapFile, setImageUrl: setCollapImageUrl, setMultipleUpload, multipleUpload, multiple: false }} />}

            <ToastContainer />
        </Container>
    )


}

export default TabletProductVariant

const Container = styled.div`
//   width: 80%;
width: 500px;
  //padding-left: 10px;
`

const MiniDiv = styled.div`
padding: 10px 0%;
    border-bottom: 1px solid ${GlobalStyle.color.darkBlack}
`
const EmptyDiv = styled.div`
    width: 20px;
`


const ContDiv = styled.div`
    width: 100%
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    margin: 10px 0%;
`

const Div = styled.div`
    width: 500px;
`


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
    cursor: pointer;
`

const Quantitydiv2 = styled.div`
    width: 50px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin: 0% 5px;
    cursor: pointer;
`

const ContainerDiv = styled.div`
    display: flex;
`

const Contain = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 5%;
    width: 500px;
`
const ContainDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 400px;
`

const View = styled.div`
    display: flex;
    margin-top: 20px;
    cursor: pointer;
`

const SelectDiv = styled.div`
    display: flex;
    width: 500px;
    margin-top: 10px;
`
const SelectDiv2 = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    margin-top: 10px;
`

const SelectInput = styled(Select)`
  width: 150px;
  height: 55px !important;
}
`

const DeleteDiv = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`

const TextParagraph = styled.div`
    display: flex;
    align-items: center;
    width: 100px;
    justify-content: center;
`

const InputDiv = styled.div`
    display: flex;
    border: 0.5px solid ${GlobalStyle.color.lightwhite};
    border-radius: 10px;
    height: 50px;
`

const DivContainerTwo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content:space-between;
  width: 500px;
`;

const InputDivBig = styled.div`
    display: flex;
    justify-content: space-between;
    border: 0.5px solid ${GlobalStyle.color.lightwhite};
    border-radius: 10px;
    height: 50px;
    width: 100%;
`

const ComponentDiv = styled.div`
    width: 500px;
`

const DivCont = styled.div`
   display: flex;
   flex-direction: column;
`

const Cont = styled.div`
   display: flex;
   flex-direction: column;
   margin-left: 24px;
`

const Color = styled.div`
  padding: 10px 0px;
  border-bottom: 1px solid ${GlobalStyle.color.lightwhite};
  width: 100%;
`

const SubDiv = styled.div`
    display: flex;
    width: 60px;
    justify-content: space-around;
`

const PanelContainer = styled(Panel)`
  
`