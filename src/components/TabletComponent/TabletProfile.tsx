import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Paragraph from '../Paragraph'
import TextInput from '../TextInput'
import { useFormik } from 'formik'
import { ProfileFormData } from '../../utils/types'
import { ProfileFormSchema } from '../../utils/schemas'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { changePassword, getProfile, profileInfo, profileLoader, updateProfile } from '../../slices/ProfileSlice'
import { ToastContainer, toast } from 'material-react-toastify';
import { useRouter } from 'next/router'
import ImageContainer from '../Image'
import { uploadImage } from '../../slices/StoreSlice'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { IconImage } from './Styled'
import { minus, profile } from '../../assets'
import { GlobalStyle } from '../../utils/themes/themes'
import Button from '../Button'


function TabletProfile() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [loader, setLoader] = useState(false)
    const profileData = useAppSelector(profileInfo)
    const [imageUrl, setImageUrl] = useState(profileData ? profileData?.imgUrl : "")
    const antIcon = <LoadingOutlined style={{ fontSize: 12 }} spin />;

    const initialValues: ProfileFormData = {
        lName: profileData ? profileData?.lName : '',
        fName: profileData ? profileData?.fName : '',
        email: profileData ? profileData?.email : '',
        mobile: profileData ? profileData?.mobile : ''
    }

    useEffect(() => {
        dispatch(getProfile())
    }, [])

    useEffect(() => {
        const loadImage = () => {
            setImageUrl(profileData?.imgUrl)
        }
        loadImage()
    }, [profileData])

    const profileImageChange = async (fileChange) => {
        const file = fileChange.target.files[0];

        try {
            const data = new FormData();
            await data.append("image", file);
            setLoader(true)
            const resultAction = await dispatch(uploadImage(data))
            if (uploadImage.fulfilled.match(resultAction)) {
                const pd = {
                    imgUrl: resultAction?.payload
                }
                var resultResponse = await dispatch(updateProfile(pd))
                if (updateProfile.fulfilled.match(resultResponse)) {
                    dispatch(getProfile())
                    setLoader(false)
                    toast.success("Profile Image updated successfully");
                }
                else {
                    setLoader(false)
                    console.log("Error")
                }
            }
            else {
                console.log('Error')
            }
        }
        catch (e) {
            console.log({ e })
        }

    }

    const removeImage = () => {
        setImageUrl("")
    }


    const requestPassowrdChange = async () => {
        setLoader(true)
        const data = {
            email: profileData?.email
        }
        try {
            var resultAction = await dispatch(changePassword(data))
            if (changePassword.fulfilled.match(resultAction)) {
                localStorage.removeItem('activeId')
                localStorage.removeItem('token')
                localStorage.removeItem('activeName')
                setLoader(false)
                return router.push('/login')
            }
            else {
                console.log("error")
                setLoader(false)
            }
        }
        catch (e) {
            console.log({ e })
        }
    }

    const handleProfileUpdate = async (data) => {
        setLoader(true)
        try {
            var resultAction = await dispatch(updateProfile(data))
            if (updateProfile.fulfilled.match(resultAction)) {
                dispatch(getProfile())
                setLoader(false)
                toast.success("Profile updated successfully");
            }
            else {
                console.log("Error")
            }
        }
        catch (e) {
            setLoader(false)
            console.log(e)
        }
    }



    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues,
            validationSchema: ProfileFormSchema,
            onSubmit: (data: ProfileFormData) => handleProfileUpdate(data),
            enableReinitialize: true
        });

    return (
        <ContainerBox>
            <Paragraph text='Profile' fontSize={GlobalStyle.size.size24} fontWeight='700' />
            <br />
            <DivContain>
                <Paragraph text='Profile Picture' fontSize={GlobalStyle.size.size14} fontWeight='400' margin='0% 0% 5px 0%' />
                <Contain>
                    {
                        !imageUrl ? <div className="upload-btn-wrapper">
                            <IconImage
                                src={profile}
                                width={100} height={100}
                            />
                            <input
                                type="file"
                                name="myfile"
                                accept="image/*"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => profileImageChange(e)}
                            />
                        </div>
                            :
                            <div>
                                <MinDiv onClick={removeImage}>
                                    <IconImage src={minus} />
                                </MinDiv>
                                <ImageContainer source={imageUrl} width={100} height={100} />
                            </div>
                    }
                </Contain>

            </DivContain>
            <br />
            <RowDiv>
                <InputDiv>
                    <TextInput
                        label='Surname'
                        required
                        value={values.lName}
                        onChange={handleChange('lName')}
                        errorMsg={touched.lName ? errors.lName : undefined}
                    />
                </InputDiv>

                <EmptyDiv></EmptyDiv>
                <InputDiv>
                    <TextInput
                        label='First name'
                        required
                        value={values.fName}
                        onChange={handleChange('fName')}
                        errorMsg={touched.fName ? errors.fName : undefined}
                    />
                </InputDiv>

            </RowDiv>
            <InputDiv>
                <TextInput
                    label='Phone number'
                    required
                    value={values.mobile}
                    onChange={handleChange('mobile')}
                    errorMsg={touched.mobile ? errors.mobile : undefined}
                />
            </InputDiv>
            <InputDiv>
                <Paragraph text='Email Address' fontSize={GlobalStyle.size.size15} color={GlobalStyle.color.ashes} />
               <Input2Div>
                 <Paragraph text={profileData?.email} fontSize={GlobalStyle.size.size15} margin="3px 0px" />
               </Input2Div>
            </InputDiv>
            <br/>
            <Paragraph text='Password' fontSize={GlobalStyle.size.size15} color={GlobalStyle.color.ashes} />
            <RowDiv>
                <InputDiv>
                <Paragraph text='************' fontSize={GlobalStyle.size.size15} color={GlobalStyle.color.ashes} />
                </InputDiv>

                <InputDiv onClick={() => requestPassowrdChange()}> 
                <Paragraph text='Change password' fontSize={GlobalStyle.size.size14} color={GlobalStyle.color.bazaraTint} />
                </InputDiv>
            </RowDiv>

            <BtnContainer>
                <BtnDiv>
                    <Button children='Save' handlePress={() => handleSubmit()} />
                </BtnDiv>
            </BtnContainer>

            <ToastContainer />
        </ContainerBox>
    )
}

export default TabletProfile

const ContainerBox = styled.div`
    width: 450px;
    margin-left: 10px;
`
const MinDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: -20%;
    margin-right: 5%;
    cursor: pointer;
`

const DivContain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 1px;
`
const Contain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

const RowDiv = styled.div`
    display: flex;
    width: 100%;
`

const EmptyDiv = styled.div`
    width: 10px;
`

const InputDiv = styled.div`
    width: 100%;
`
const Input2Div = styled.div`
    background: ${GlobalStyle.color.darkBlack};
    padding: 5px 10px;
`

const BtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
`
const BtnDiv = styled.div`
    width: 130px;
`