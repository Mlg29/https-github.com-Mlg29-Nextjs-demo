import React, { useEffect, useState } from 'react'
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
import { StoreFormData, locationProp, StoreCreateFormData } from '../../utils/types';
import { StoreFormSchema } from '../../utils/schemas';
import TextInput from '../TextInput';
import Button from '../Button';

import MobileHeader from './Header';
import SelectField from '../SelectField';
import { locationData } from '../../utils/constants/location';
import { updateStore } from '../../slices/StoreSlice';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useRouter } from 'next/router';
import Paragraph from '../Paragraph';
import renderHTML from 'react-render-html';
import HTMLRenderer from "react-html-renderer"
import styled from 'styled-components';
import { GlobalStyle } from '../../utils/themes/themes';
import ResponseModal from '../Modal/ResponseModal';
import { getStoreById, storebyId } from '../../slices/StoreSlice';
import Image from "../Image"

const MobileEditStore = () => {
    const [loader, setLoader] = useState(false)
    const [responseTitle, setResponseTitle] = useState("")
    const [responseType, setResponseType] = useState("")
    const [responseVisible, setResponseVisible] = useState(false)
    const dispatch = useAppDispatch();
    const storebyIdData = useAppSelector(storebyId)
    const router = useRouter()
    const activeId =  typeof window !== "undefined" ? localStorage?.getItem("activeId") : null

    const [openCrop, setOpenCrop] = useState(false)
    const [photoUrl, setPhotoUrl] = useState()
    const [file, setFile] = useState(null)
    const [imageUrl, setImageUrl] = useState(storebyIdData?.imgUrl)

    const initialValues: StoreFormData = {
        storeName: storebyIdData?.brandName,
        description: storebyIdData?.description,
        phoneNumber: '',
        street: storebyIdData?.location?.street,
        city: storebyIdData?.location?.city,
        state: storebyIdData?.location?.state
    };


    useEffect(() => {
        dispatch(getStoreById(activeId))
    }, [activeId, imageUrl])


    const handleUpdateStore = async (data: StoreFormData) => {
        if (!imageUrl) {
            setResponseVisible(true)
            setResponseType('Error')
            setResponseTitle("Image is required")
            return;
        }

        const payload = {
            id: activeId,
            brandName: data.storeName,
            description: data.description,
            imgUrl: imageUrl,
            address: data.street + " " + data.city + " " + data.state,
            phoneNumber: data.phoneNumber,
            status:'active',
            isDraft: false,
            location: {
                state: data.state,
                city: data.city,
                street: data.street,
            },
        };


        setLoader(true)
        const resultAction = await dispatch(updateStore(payload))
        if (updateStore.fulfilled.match(resultAction)) {
            setLoader(false)
            dispatch(getStoreById(activeId))
            setResponseVisible(true)
            setResponseType('Success')
            setResponseTitle("You have successfully updated your store information")
        } else {
            if (resultAction.payload) {
                setLoader(false)
                setResponseVisible(true)
                setResponseType('Error')
                setResponseTitle("Error creating store")
                console.log('error1', `Update failed: ${resultAction?.payload}`)
            } else {
                setLoader(false)
                setResponseVisible(true)
                setResponseType('Error')
                setResponseTitle("Error creating store")
                console.log('error', `Updated failed: ${resultAction?.payload}`)
            }
        }

    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues,
            validationSchema: StoreFormSchema,
            onSubmit: (data: StoreFormData) => handleUpdateStore(data),
            enableReinitialize: true
        });


    const locationState = locationData?.map((data: locationProp) => data?.state);

    const locationCity = locationData?.find(
        (data: locationProp) => data?.state === values.state,
    )?.city;

    const handleModalClose = () => {
        setResponseVisible(false)
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
                <Paragraph text='Edit Cover Image' fontWeight='600' fontSize={GlobalStyle.size.size16} margin={!imageUrl ? "0%" : "0% 0% 4% 0%"} />
                <Contain>
                    {
                        !imageUrl ? <div className="upload-btn-wrapper input-div-small">
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
                            <Div>
                                <MinDiv onClick={removeImage}>
                                    <IconImage src={minus} />
                                </MinDiv>
                                <Image source={imageUrl} width={110} height={120} />
                            </Div>
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
                    type="description"
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
                <Button isLoading={loader} children={"Update Store"} handlePress={handleSubmit} />
            </BottomContainer>
            <br />
            <ResponseModal
                title={responseTitle}
                type={responseType}
                modalVisible={responseVisible}
                setModalVisible={handleModalClose}
                handlePress={handleModalClose}
            />

            {openCrop && <CropEasy {...{ photoUrl, setOpenCrop, openCrop, setPhotoUrl, setFile, setImageUrl, multiple: false }} />}
        </Container>
    )
}

export default MobileEditStore


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