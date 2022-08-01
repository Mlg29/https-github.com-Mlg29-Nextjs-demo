import React, { useState } from 'react'
import styled from 'styled-components'
import { cancel, chevronLeft, deleteIcon, landMark, truck } from '../../assets'
import MobileHeader from './Header'
import { BottomContainer, ColumnContainer, Container, IconImage } from './Styled'
import { useFormik } from 'formik';
import { useRouter } from 'next/router'
import SelectField from '../SelectField'
import TextInput from '../TextInput'
import { locationData } from '../../utils/constants/location'
import { DeliveryFormData, LandmarkFormData, locationProp } from '../../utils/types'
import { DeliveryFormSchema, LandmarkFormSchema } from '../../utils/schemas'
import Button from '../Button'
import Paragraph from '../Paragraph'
import { RowBetween } from '../../utils/StyledComponent'
import { GlobalStyle } from '../../utils/themes/themes'
import * as CurrencyFormat from 'react-currency-format';
import { Modal } from 'antd'

const MobileAddDeliveryFee = () => {
    const router = useRouter()
    const [landmark, setLandmark] = useState([])
    const [loader, setLoader] = useState()

    const initialValues: DeliveryFormData = {
        state: '',
        price: ''
    };

    const initialLandmarkValues: LandmarkFormData = {
        city: '',
        price: ''
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };



    const handleAddDelivery = (data) => {

    }

    const handleLandmarkDelivery = (data) => {
        setLandmark([...landmark, { city: data.city, price: data.price }])
        handleCancel()
    }


    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues,
            validationSchema: DeliveryFormSchema,
            onSubmit: (data: DeliveryFormData) => handleAddDelivery(data),
        });


    const { values: modalValues, errors: modalErrors, touched: modalTouched, handleChange: handleModalChange, handleSubmit: handleModalSubmit, handleBlur: handleModalBlur } =
        useFormik({
            initialValues: initialLandmarkValues,
            validationSchema: LandmarkFormSchema,
            onSubmit: (data: LandmarkFormData) => handleLandmarkDelivery(data),
        });

    const locationState = locationData?.map((data: locationProp) => data?.state);

    const locationCity = locationData?.find(
        (data: locationProp) => data?.state === values.state,
    )?.city;

    const deleteLandmark = (item) => {
        const update = landmark?.filter((data, i) => i !== item)
        setLandmark(update)
    }

    return (
        <Container>
            <MobileHeader
                header="Add Shipping Fee"
                icon={chevronLeft}
            />
            <br />
            <ColumnContainer>
                <SelectField
                    data={locationState}
                    value={values.state}
                    placeholder="Select State"
                    onSearch={handleChange('state')}
                    onChange={handleChange('state')}
                    errorMsg={touched.state ? errors.state : undefined}
                />

                <TextInput
                    label='₦ 0.00'
                    value={values.price}
                    onChange={handleChange('price')}
                    errorMsg={touched.price ? errors.price : undefined}
                />
                {
                    values.state === 'Lagos' && <Div>
                        <Paragraph text='Suggested landmarks' fontSize={GlobalStyle.size.size16} fontFamily='600' />
                        <Div>
                            <RowDiv>
                                <RowBetween>
                                    <Paragraph text='Lagos Island' fontSize={GlobalStyle.size.size14} fontFamily='400' />
                                    <Paragraph text='Add Price' fontSize={GlobalStyle.size.size14} fontFamily='400' color={GlobalStyle.color.bazaraTint} />
                                </RowBetween>
                            </RowDiv>
                            <RowDiv>
                                <RowBetween>
                                    <Paragraph text='Lagos Island' fontSize={GlobalStyle.size.size14} fontFamily='400' />
                                    <Paragraph text='Add Price' fontSize={GlobalStyle.size.size14} fontFamily='400' color={GlobalStyle.color.bazaraTint} />
                                </RowBetween>
                            </RowDiv>
                        </Div>
                    </Div>
                }

                <Div>
                    <Paragraph text='landmarks' fontSize={GlobalStyle.size.size16} fontFamily='600' />
                    {
                        landmark?.map((data, i) => {
                            return (
                                <RowDiv key={i}>
                                    <RowBetween>
                                        <Paragraph text={data.city} fontSize={GlobalStyle.size.size14} fontFamily='400' />
                                        <Contain>
                                            <CurrencyFormat value={data.price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <span style={{ color: GlobalStyle.color.gray }}>{value} </span>} />
                                            <DeleteDiv onClick={() => deleteLandmark(i)}>
                                                <IconImage
                                                    src={deleteIcon}
                                                />
                                            </DeleteDiv>
                                        </Contain>

                                    </RowBetween>
                                </RowDiv>

                            )
                        })
                    }
                </Div>
                <View onClick={showModal}>
                    <IconImage
                        src={landMark}
                    />
                    <Paragraph text='Add landmarks' fontSize={GlobalStyle.size.size14} fontFamily='400' margin='0% 0% 0% 3%' />
                </View>
            </ColumnContainer>
            <br />
            <BottomContainer>
                <Button isLoading={loader} children={"Set Fee"} handlePress={handleSubmit} />
            </BottomContainer>

            <Modal title={null}  closable={false} footer={null} visible={isModalVisible} onOk={handleCancel} onCancel={handleCancel}>

                <RowBetween>
                    <Paragraph text='Choose Landmark' fontSize={GlobalStyle.size.size16} fontFamily='600' />
                    <div onClick={handleCancel}>
                        <IconImage src={cancel} />
                    </div>
                </RowBetween>
                <ColumnContainer>
                    <SelectField
                        data={locationCity}
                        value={modalValues.city}
                        placeholder="Select landmark"
                        onSearch={handleModalChange('city')}
                        onChange={handleModalChange('city')}
                        errorMsg={modalTouched.city ? modalErrors.city : undefined}
                    />

                    <TextInput
                        label='Amount'
                        value={modalValues.price}
                        onChange={handleModalChange('price')}
                        errorMsg={modalTouched.price ? modalErrors.price : undefined}
                    />
                </ColumnContainer>

                <br />
                <BottomContainer>
                    <Button isLoading={loader} children={"Add landmark"} handlePress={handleModalSubmit} />
                </BottomContainer>
            </Modal>
        </Container>
    )
}

export default MobileAddDeliveryFee

const Div = styled.div`
margin-top: 20px;
`

const RowDiv = styled.div`
 padding: 15px 0%;
 border-bottom: 1px solid ${GlobalStyle.color.darkBlack}
`


const View = styled.div`
    display: flex;
    margin-top: 20px;
`

const Contain = styled.div`
display: flex;
align-items: center;
`

const DeleteDiv = styled.div`
    margin-top: 5px;
    margin-left: 5px;
`