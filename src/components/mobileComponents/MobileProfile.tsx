import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { chevronLeft, minus, plus, profile } from '../../assets'
import MobileHeader from './Header'
import { GlobalBreak, IconImage } from './Styled'
import Image from "../Image"
import Paragraph from '../Paragraph'
import { RowBetween } from '../../utils/StyledComponent'
import { GlobalStyle } from '../../utils/themes/themes'
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
import LoadingState from '../Loader'
import ProfileSkeleton from '../SkelentonLoader/Mobile/ProfileSkeleton'


const MobileProfile = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [loader, setLoader] = useState(false)
  const profileData = useAppSelector(profileInfo)
  const profileLoading = useAppSelector(profileLoader)
  const [edit, setEdit] = useState(false)
  const [imageUrl, setImageUrl] = useState(profileData ? profileData?.imgUrl : "")
  const antIcon = <LoadingOutlined style={{ fontSize: 12 }} spin />;
  const [stateLoader, setStateLoader] = useState(false)

  const initialValues: ProfileFormData = {
    lName: profileData ? profileData?.lName : '',
    fName: profileData ? profileData?.fName : '',
    email: profileData ? profileData?.email : '',
    mobile: profileData ? profileData?.mobile : ''
  }


  useEffect(() => {
    setStateLoader(true)
    const loadData = async () => {
      await dispatch(getProfile())
      setStateLoader(false)
    }
    loadData()
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
      setStateLoader(true)
      const resultAction = await dispatch(uploadImage(data))
      if (uploadImage.fulfilled.match(resultAction)) {
        const pd = {
          imgUrl: resultAction?.payload
        }
        var resultResponse = await dispatch(updateProfile(pd))
        if (updateProfile.fulfilled.match(resultResponse)) {
          await dispatch(getProfile())
          setLoader(false)
          setStateLoader(false)
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

  const handleProfileUpdate = async (data) => {
    setLoader(true)
    setStateLoader(true)
    try {
      var resultAction = await dispatch(updateProfile(data))
      if (updateProfile.fulfilled.match(resultAction)) {
       await dispatch(getProfile())
        setEdit(false)
        setLoader(false)
        setStateLoader(false)
        toast.success("Profile updated successfully");
      }
      else {
        console.log("Error")
      }
    }
    catch (e) {
      setLoader(false)
      setStateLoader(false)
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


  return (
    <ContainerBox>
      {
        stateLoader ? <ProfileSkeleton />
          :
          <>
            <ContainerDiv>
              <MobileHeader
                icon={chevronLeft}
                header="Profile"
              />
            </ContainerDiv>
            <>
              <DivContain>
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
                        <ImageContainer type='round' source={imageUrl} width={80} height={80} />
                      </div>
                  }
                </Contain>
                <Paragraph text={profileData?.lName + " " + profileData?.fName} fontSize={GlobalStyle.size.size14} fontWeight="400" margin='0px 0px 0px 5px' />
              </DivContain>

              <Subdiv>
                <RowBetween>
                  <Paragraph text={`Basic Information`} fontSize={GlobalStyle.size.size14} fontWeight="400" />
                  <PointerDiv onClick={edit ? () => handleSubmit() : () => setEdit(true)}>
                    <Paragraph text={edit ? 'Save' : 'Edit'} fontSize={GlobalStyle.size.size12} fontWeight="400" color={GlobalStyle.color.bazaraTint} />
                  </PointerDiv>
                </RowBetween>
              </Subdiv>
              {
                edit ?
                  <BoxDiv>
                    <TextInput
                      label='Surname'
                      required
                      value={values.lName}
                      onChange={handleChange('lName')}
                      errorMsg={touched.lName ? errors.lName : undefined}
                      disabled={!edit}
                    />
                    <TextInput
                      label='First name'
                      required
                      value={values.fName}
                      onChange={handleChange('fName')}
                      disabled={!edit}
                      errorMsg={touched.fName ? errors.fName : undefined}
                    />
                    <TextInput
                      label='Phone number'
                      required
                      value={values.mobile}
                      onChange={handleChange('mobile')}
                      disabled={!edit}
                      errorMsg={touched.mobile ? errors.mobile : undefined}
                    />
                    <Box>
                      <Paragraph text='Email' fontSize={GlobalStyle.size.size12} color={GlobalStyle.color.ashes} />
                      <Paragraph text={profileData?.email} fontSize={GlobalStyle.size.size15} margin="3px 0px" />
                    </Box>
                  </BoxDiv>
                  :
                  <>
                    <Box2>
                      <Paragraph text='Surname' fontSize={GlobalStyle.size.size12} color={GlobalStyle.color.ashes} />
                      <Paragraph text={profileData?.lName} fontSize={GlobalStyle.size.size15} margin="3px 0px" />
                    </Box2>
                    <Break></Break>
                    <Box2>
                      <Paragraph text='First name' fontSize={GlobalStyle.size.size12} color={GlobalStyle.color.ashes} />
                      <Paragraph text={profileData?.fName} fontSize={GlobalStyle.size.size15} margin="3px 0px" />
                    </Box2>
                    <Break></Break>
                    <Box2>
                      <Paragraph text='Phone number' fontSize={GlobalStyle.size.size12} color={GlobalStyle.color.ashes} />
                      <Paragraph text={profileData?.mobile} fontSize={GlobalStyle.size.size15} margin="3px 0px" />
                    </Box2>
                    <Break></Break>
                    <Box2>
                      <Paragraph text='Email' fontSize={GlobalStyle.size.size12} color={GlobalStyle.color.ashes} />
                      <Paragraph text={profileData?.email} fontSize={GlobalStyle.size.size15} margin="3px 0px" />
                    </Box2>

                  </>
              }

              <Subdiv>
                <RowBetween>
                  <Paragraph text="Security" fontSize={GlobalStyle.size.size14} fontWeight="400" />
                </RowBetween>
              </Subdiv>
              <Box>
                <Paragraph text='Password' fontSize={GlobalStyle.size.size12} fontWeight="600" color={GlobalStyle.color.gray} margin='5px 0%' />
                <RowBetween>
                  <Paragraph text='xxxxxxxxxxx' fontSize={GlobalStyle.size.size14} fontWeight="400" />
                  <PointerDiv onClick={() => requestPassowrdChange()}>
                    <Paragraph text='Change password' fontSize={GlobalStyle.size.size12} fontWeight="400" color={GlobalStyle.color.bazaraTint} />
                  </PointerDiv>

                </RowBetween>
              </Box>

              <ToastContainer />
            </>
          </>
      }


    </ContainerBox>
  )
}

export default MobileProfile

const ContainerBox = styled.div`

`

const ContainerDiv = styled.div`
  padding: 10px 15px;
`

const DivContain = styled.div`
  display: flex;
  margin: 5px 10px 10px 0px;
  align-items: center;
  padding: 0px 15px;
`

const Contain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`
const Div = styled.div`
position: relative;
width: 100%;
max-width: 200px;
`
const MinDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: -20%;
    margin-right: 5%;
    cursor: pointer;
`

const Subdiv = styled.div`
  padding: 10px 15px;
  background: ${GlobalStyle.color.artBoard}
`

const Box = styled.div`
padding: 2px 15px;
`
const Box2 = styled.div`
padding: 5px 15px;
border-bottom: 1px solid ${GlobalStyle.color.artBoard};
`
const BoxDiv = styled.div`
padding: 0px 15px;
`

const PointerDiv = styled.div`
  cursor: pointer;

`

const Break = styled.hr`
  color: ${GlobalStyle.color.artBoard};
  margin:0px;
`