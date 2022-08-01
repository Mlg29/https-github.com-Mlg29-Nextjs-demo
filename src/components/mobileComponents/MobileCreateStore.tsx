import React, { useState } from 'react'
import { useFormik } from 'formik';
import {
    SmallText,
    Container,
    BottomContainer,
    ColumnContainer,
    IconImage
} from "./Styled"
import { chevronLeft, minus, plus } from '../../assets'
import CropEasy from "../crop/CropEasy"
import { StoreFormData, locationProp } from '../../utils/types';
import { StoreFormSchema } from '../../utils/schemas';
import TextInput from '../TextInput';
import Button from '../Button';

import MobileHeader from './Header';
import SelectField from '../SelectField';
import { locationData } from '../../utils/constants/location';
import { createStore, uploadImage } from '../../slices/StoreSlice';
import { useAppDispatch } from '../../app/hook';
import { useRouter } from 'next/router';
import Paragraph from '../Paragraph';

import styled from 'styled-components';
import ResponseModal from '../Modal/ResponseModal';

import UploadComponent from '../UploadComponent';
import UploadedImage from '../UploadComponent/UploadedImage';
import { GlobalStyle } from '../../utils/themes/themes';

const MobileCreateStore = () => {
    const [loader, setLoader] = useState(false)
    const [errorTitle, setErrorTitle] = useState("")
    const [errorType, setErrorType] = useState("")
    const [errorVisible, setErrorVisible] = useState(false)
    const dispatch = useAppDispatch();
    const router = useRouter()

    const [openCrop, setOpenCrop] = useState(false)
    const [photoUrl, setPhotoUrl] = useState()
    const [file, setFile] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    const initialValues: StoreFormData = {
        storeName: '',
        description: '',
        phoneNumber: '',
        street: '',
        city: '',
        state: ''
    };

    const handleCreateStore = async (data: StoreFormData) => {
        if (!imageUrl) {
            setErrorVisible(true)
            setErrorType('Error')
            setErrorTitle("Image is required")
            return;
        }
        const payload = {
            brandName: data.storeName,
            description: data.description,
            imgUrl: imageUrl,
            address: data.street + " " + data.city + " " + data.state,
            phoneNumber: data.phoneNumber,
            location: {
                state: data.state,
                city: data.city,
                street: data.street,
            },
        };

        console.log({ payload })

        setLoader(true)
        const resultAction = await dispatch(createStore(payload))
        if (createStore.fulfilled.match(resultAction)) {
            setLoader(false)
            return router.push('/store-success')
        } else {
            if (resultAction.payload) {
                setLoader(false)
                setErrorVisible(true)
                setErrorType('Error')
                setErrorTitle("Error creating store")
                console.log('error1', `Update failed: ${resultAction?.payload}`)
            } else {
                setLoader(false)
                setErrorVisible(true)
                setErrorType('Error')
                setErrorTitle("Error creating store")
                console.log('error', `Updated failed: ${resultAction?.payload}`)
            }
        }

    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues,
            validationSchema: StoreFormSchema,
            onSubmit: (data: StoreFormData) => handleCreateStore(data),
        });


    const locationState = locationData?.map((data: locationProp) => data?.state);

    const locationCity = locationData?.find(
        (data: locationProp) => data?.state === values.state,
    )?.city;

    const handleModalClose = () => {
        setErrorVisible(false)
    }

    const profileImageChange = async (fileChange) => {
        const file = fileChange.target.files[0];
        if (file) {
            setFile(file)
            setPhotoUrl(URL.createObjectURL(file))
            setOpenCrop(true)
        }

    }

    const removeImage = () => {
        setImageUrl("")
    }


    return (
        <Container>
            <ColumnContainer>
                <MobileHeader
                    header="Store Information"
                    icon={chevronLeft}
                />
                <br />
                <Paragraph text='Store Cover Image' fontWeight='600' fontSize={GlobalStyle.size.size16} margin={!imageUrl ? "0%" : "0% 0% 4% 0%"} />
                <Contain>
                    {
                        !imageUrl ?
                            <div className="upload-btn-wrapper input-div-small">
                                <IconImage
                                    src={plus}

                                />
                                <input
                                    type="file"
                                    name="myfile"
                                    accept="image/*"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => profileImageChange(e)}
                                />
                            </div>
                            :
                            <UploadedImage removeImage={removeImage} imageUrl={imageUrl} />
                    }

                </Contain>
                <br />
                <TextInput
                    label='Store Name'
                    required
                    value={values.storeName}
                    onChange={handleChange('storeName')}
                    errorMsg={touched.storeName ? errors.storeName : undefined}
                />
                <TextInput
                    label='Description'
                    type='description'
                    isMultiline={true}
                    value={values.description}
                    handleTextChange={handleChange('description')}
                    errorMsg={touched.description ? errors.description : undefined}
                />
                <TextInput
                    label='Phone Number'
                    required
                    value={values.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                    errorMsg={touched.phoneNumber ? errors.phoneNumber : undefined}
                />
                <Paragraph text='Store Location' fontWeight='600' fontSize={GlobalStyle.size.size16} margin="10% 0% 0% 0%" />

                <SelectField
                    data={locationState}
                    value={values.state}
                    placeholder="Select State"
                    onSearch={handleChange('state')}
                    onChange={handleChange('state')}
                    errorMsg={touched.state ? errors.state : undefined}
                />

                <SelectField
                    data={locationCity}
                    value={values.city}
                    placeholder="Select City"
                    onSearch={handleChange('city')}
                    onChange={handleChange('city')}
                    errorMsg={touched.city ? errors.city : undefined}
                />

                <TextInput
                    label='Street'
                    required
                    value={values.street}
                    onChange={handleChange('street')}
                    errorMsg={touched.street ? errors.street : undefined}
                />
            </ColumnContainer>
            <br />
            <BottomContainer>
                <Button isLoading={loader} children={"Create Store"} handlePress={handleSubmit} />
            </BottomContainer>
            <br />
            <ResponseModal
                title={errorTitle}
                type={errorType}
                modalVisible={errorVisible}
                setModalVisible={handleModalClose}
                handlePress={handleModalClose}
            />

            {openCrop && <CropEasy {...{ photoUrl, setOpenCrop, openCrop, setPhotoUrl, setFile, setImageUrl, multiple: false }} />}
        </Container>
    )
}

export default MobileCreateStore


const Contain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`
const Div = styled.div`

`
const MinDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: -20%;
    margin-right: 5%;
    cursor: pointer;
`