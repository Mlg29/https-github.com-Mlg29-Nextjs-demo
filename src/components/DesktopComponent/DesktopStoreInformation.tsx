import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Paragraph from '../Paragraph'
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useRouter } from 'next/router';
import SelectField from '../SelectField';
import { locationData } from '../../utils/constants/location';
import { updateStore } from '../../slices/StoreSlice';
import { getStoreById, storebyId } from '../../slices/StoreSlice';
import { useFormik } from 'formik';
import Image from "../Image"
import CropEasy from "../crop/CropEasy"
import { StoreFormData, locationProp, StoreCreateFormData } from '../../utils/types';
import { StoreFormSchema } from '../../utils/schemas';
import TextInput from '../TextInput';
import Button from '../Button';
import { IconImage } from './Styled';
import { minus, plus } from '../../assets';
import {toast, ToastContainer} from "material-react-toastify"
import { GlobalStyle } from '../../utils/themes/themes';


function DesktopStoreInformation() {
    const [loader, setLoader] = useState(false)
    const dispatch = useAppDispatch();
    const storebyIdData = useAppSelector(storebyId)
    const router = useRouter()
    const activeId = typeof window !== "undefined" ? localStorage?.getItem("activeId") : null
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

    useEffect(() => {
        if(storebyIdData) {
             setImageUrl(storebyIdData?.imgUrl)
        }
       
    }, [storebyIdData?.imgUrl])


    const handleUpdateStore = async (data: StoreFormData) => {
        if (!imageUrl) {
            toast.error("Image is required")
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
            toast.success("You have successfully updated your store information")
        } else {
            if (resultAction.payload) {
                setLoader(false)
                toast.error("Error creating store")
                console.log('error1', `Update failed: ${resultAction?.payload}`)
            } else {
                setLoader(false)
                toast.error("Error creating store")
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
        <ContainerBox>
            <Paragraph text='Store information' fontSize={GlobalStyle.size.size24} fontWeight='700' />
            <br />
            <Paragraph text='Store Cover Images' fontWeight='600' fontSize={GlobalStyle.size.size16} margin={!imageUrl ? "0%" : "0% 0% 1% 0%"} />
            <Contain>
                {
                    !imageUrl ? <div className="upload-btn-wrapper input-div">
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
                            <Image source={imageUrl} width={80} height={80} />
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

            <br />
            <Bottom>
                <BottomDiv>
                    <Button isLoading={loader} children={"Update Store"} handlePress={handleSubmit} />
                </BottomDiv>
            </Bottom>

            <ToastContainer />

            {openCrop && <CropEasy {...{ photoUrl, setOpenCrop, openCrop, setPhotoUrl, setFile, setImageUrl, multiple: false }} />}
        </ContainerBox>
    )
}

export default DesktopStoreInformation


const Contain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

const ContainerBox = styled.div`
    width: 600px;
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
const BottomDiv = styled.div`
    width: 150px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: flex-end;
`