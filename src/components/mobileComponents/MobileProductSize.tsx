
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { cancel, chevronLeft, delIcon, editIcon, landMark } from '../../assets'
import { GlobalStyle } from '../../utils/themes/themes'
import { ProductSizeData } from '../../utils/types'
import Button from '../Button'
import Paragraph from '../Paragraph'

import MobileHeader from './Header'
import { BottomContainer, ColumnContainer, Container, IconImage } from './Styled'

import { RowBetween, RowStart } from '../../utils/StyledComponent'
import styled from 'styled-components'
import NumberInput from '../NumberInput'
import UploadComponent from '../UploadComponent'
import CropEasy from '../crop/CropEasy'
import UploadedImage from '../UploadComponent/UploadedImage'
import { Modal } from 'antd'
import { sizes } from '../../utils/constants/sizes'
import SelectField from '../SelectField'
import { ProductSizeSchema } from '../../utils/schemas'
import * as CurrencyFormat from 'react-currency-format';



const MobileProductSize = () => {
    const [loader, setLoader] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [openCrop, setOpenCrop] = useState(false)
    const [photoUrl, setPhotoUrl] = useState()
    const [file, setFile] = useState(null)
    const [imageUrl, setImageUrl] = useState([])
    const [multiple, setMultiple] = useState(true)
    const [multipleUpload, setMultipleUpload] = useState([])
    const [sizeList, setSizeList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);

    const initialValues: ProductSizeData = {
        price: 500,
        size: 'Select new Size',
    };


    const showModal = () => {
        setIsModalVisible(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };



    const { values, errors, touched, handleChange, handleSubmit, handleBlur, handleReset } =
        useFormik({
            initialValues,
            validationSchema: ProductSizeSchema,
            onSubmit: (data: ProductSizeData) => handleFormSubmit(data),
        });




    const handleFormSubmit = (data) => {
        setSizeList([...sizeList, {
            size: data.size,
            price: data.price,
            quantity: quantity
        }])

        handleCancel()

    }



    const increment = () => {
        const qt = quantity + 1
        setQuantity(qt)
    }

    const decrement = () => {
        if (quantity === 0) {
            return
        }
        const qt = quantity - 1
        setQuantity(qt)
    }

    const profileImageChange = async (fileChange) => {
        const file = fileChange.target.files[0];
        if (file) {
            setFile(file)
            setPhotoUrl(URL.createObjectURL(file))
            setOpenCrop(true)
        }

    }

    const removeImage = (index) => {
        const update = multipleUpload?.filter((data, i) => i !== index)
        setMultipleUpload(update)
    }



    const dummyUploadImage = new Array("", "", "", "", "", "");

    const deleteSize = (index) => {
        const newD = sizeList?.filter((data, i) => i !== index)
        setSizeList(newD)
    }

    return (
        <Container>
            <MobileHeader
                icon={chevronLeft}
                header="Product Size Details"
            />
            <br />
            <ColumnContainer>
                <Paragraph text="Upload size images" fontSize={GlobalStyle.size.size16} fontWeight='400' />
                <Grid>
                    {
                        multipleUpload?.map((data, i) => {
                            return <UploadedImage key={i} index={i} removeImage={() => removeImage(i)} imageUrl={data} />
                        })
                    }

                    {
                        dummyUploadImage.filter((a, b) => multipleUpload?.length < b + 1).map((data, i) => {
                            return <UploadComponent key={i} index={i} profileImageChange={profileImageChange} />
                        })
                    }
                </Grid>
                <br />
                <Paragraph text='Size Options' fontSize={GlobalStyle.size.size16} fontWeight='400' />
                {
                    sizeList?.map((data, i) => {
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
                                        <IconImage src={editIcon} />
                                        <IconImage src={delIcon} onClick={() => deleteSize(i)} />
                                    </RowStart>
                                </RowBetween>
                            </MiniDiv>
                        )
                    })
                }

                <View onClick={showModal}>
                    <IconImage
                        src={landMark}
                    />
                    <Paragraph text='Add Sizes' fontSize={GlobalStyle.size.size14} fontFamily='400' margin='0% 0% 0% 3%' />
                </View>

            </ColumnContainer>
            <BottomContainer>
                <Button isLoading={loader} children={"Publish"} handlePress={handleSubmit} />
            </BottomContainer>

            {openCrop && <CropEasy {...{ photoUrl, setOpenCrop, openCrop, setPhotoUrl, setFile, setImageUrl, setMultipleUpload, multipleUpload, multiple }} />}


            <Modal title={null} closable={false} footer={null} visible={isModalVisible} onOk={handleCancel} onCancel={handleCancel}>
                <RowBetween>
                    <Paragraph text='Choose Landmark' fontSize={GlobalStyle.size.size16} fontFamily='600' />
                    <div onClick={handleCancel}>
                        <IconImage src={cancel} />
                    </div>
                </RowBetween>

                <ColumnContainer>
                    <SelectField
                        data={sizes}
                        type={true}
                        value={values.size}
                        placeholder={values.size}
                        onSearch={handleChange('size')}
                        onChange={handleChange('size')}
                        errorMsg={touched.size ? errors.size : undefined}
                    />

                    <NumberInput
                        label='Price'
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
                </ColumnContainer>

                <br />
                <BottomContainer>
                    <Button isLoading={loader} children={"Save and add new"} handlePress={handleSubmit} />
                    <br />
                    <br />
                    <ContDiv onClick={() => handleSubmit()}>
                        <Paragraph text='Save and close' fontSize={GlobalStyle.size.size14} textAlign='center' />
                    </ContDiv>
                </BottomContainer>
            </Modal>
        </Container>
    )
}

export default MobileProductSize


const Div = styled.div`
    padding: 5px 0%;
`


const MiniDiv = styled.div`
padding: 10px 0%;
    border-bottom: 1px solid ${GlobalStyle.color.darkBlack}
`

const ContDiv = styled.div`
    width: 100%
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