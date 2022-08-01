import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import {
    IconImage,
    ContainerDiv,
    CenterContainer
} from "../../components/DesktopComponent/Styled"
import styled from 'styled-components';
import { logo, pic } from '../../assets'
import { locationProp, PayoutFormData, StoreFormData } from '../../utils/types';
import { MerchantDescriptionSchema, MerchantFormSchema, PayoutSchema, StoreFormSchema } from '../../utils/schemas';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { GlobalStyle } from '../../utils/themes/themes';

import { useAppDispatch, useAppSelector } from '../../app/hook'
import { createUser, oauthLogin } from '../../slices/AuthSlice';
import { useRouter } from 'next/router';
import ResponseModal from '../../components/Modal/ResponseModal';
import Paragraph from '../../components/Paragraph';

import { BottomContainer } from '../../components/mobileComponents/Styled';
import SelectField from '../../components/SelectField';
import { locationData } from '../../utils/constants/location';

import { Steps, Upload } from 'antd';
import { createStore, getStoreById, storebyId, updateStore } from '../../slices/StoreSlice';
import DesktopUpload from '../../components/DesktopComponent/reusable/DesktopUpload';
import CropEasy from '../../components/crop/CropEasy';
import UploadedImage from '../../components/UploadComponent/UploadedImage';
import { bankCodes } from '../../utils/constants/banckCode';
import { addPayouts, getPayouts, payouts, verifyAccount } from '../../slices/PayoutSlice';


const { Dragger } = Upload;

const MerchantSteps = () => {
    const dispatch = useAppDispatch()
    const [loader, setLoader] = useState(false)
    const router = useRouter()
    const [errorType, setErrorType] = useState("")
    const [errorTitle, setErrorTitle] = useState("")
    const [errorVisible, setErrorVisible] = useState(false)
    const [openCrop, setOpenCrop] = useState(false)
    const [photoUrl, setPhotoUrl] = useState()
    const [file, setFile] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const storebyIds = useAppSelector(storebyId)
    const { Step } = Steps;
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [verifyErr, setVerifyErr] = useState('')
    const [codes,setCodes] = useState('')
    const urlStep = router?.query?.steps
    const payout = useAppSelector(payouts)
    const activeStep = parseInt(urlStep)
    const activeId = typeof window !== 'undefined' ? localStorage.getItem('activeId') : null
    const merchantSlug = typeof window !== 'undefined' ? localStorage.getItem('merchant-slug') : null

    useEffect(() => {
        if (merchantSlug !== null || merchantSlug !== undefined) {
            dispatch(getStoreById(merchantSlug))
        }

    }, [merchantSlug])

    console.log({payout})

    useEffect(() => {
        dispatch(getPayouts())
    }, [])

    const steps = [
        {
            title: 'First',
            content: 'First-content',
        },
        {
            title: 'Second',
            content: 'Second-content',
        },
        {
            title: 'Last',
            content: 'Last-content',
        },
    ];

    const initialValues: { storeName: string, phoneNumber: string, street: string, state: string, city: string } = {
        storeName: '',
        phoneNumber: '',
        street: '',
        city: '',
        state: ''
    };

    const initialValues2: { description: string } = {
        description: ''
    };

    const initialValues3: PayoutFormData = {
        bankName: '',
        bankNumber: '',
    };

    const handleFormSubmit = async (data) => {
        const payload = {
            brandName: data.storeName,
            description: data.description,
            imgUrl: "",
            address: data.street + " " + data.city + " " + data.state,
            phoneNumber: data.phoneNumber,
            location: {
                state: data.state,
                city: data.city,
                street: data.street,
            },
            isDraft: true,
            status: 'draft'
        };

        setLoader(true)
        const resultAction = await dispatch(createStore(payload))
        if (createStore.fulfilled.match(resultAction)) {
            setLoader(false)
            localStorage.setItem('merchant-slug', resultAction?.payload?.id)
            return router.push('/merchant-store-creation/1')
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

    const handleModalClose = () => {
        setErrorVisible(false)
    }

    const handleFormSubmit2 = async (data) => {
        if (!imageUrl) {
            setErrorVisible(true)
            setErrorType('Error')
            setErrorTitle("Image is required")
            return;
        }
        const payload = {
            id: storebyIds?.id,
            brandName: storebyIds?.brandName,
            description: data.description,
            imgUrl: imageUrl,
            address: storebyIds?.location?.street + " " + storebyIds?.location?.city + " " + storebyIds?.location?.state,
            phoneNumber: storebyIds?.mobile,
            location: {
                state: storebyIds?.location?.state,
                city: storebyIds?.location?.city,
                street: storebyIds?.location?.street,
            },
            isDraft: false,
            status: 'active',
        };

        setLoader(true)
        const resultAction = await dispatch(updateStore(payload))
        if (updateStore.fulfilled.match(resultAction)) {
            setLoader(false)
            localStorage.removeItem('merchant-slug')
            if(payout?.payouts?.length > 0) {
                return router.push('/my-store')
            }
            else {
                localStorage.setItem("activeId", storebyIds?.id)
                localStorage.setItem("activeName", storebyIds?.brandName)
                setErrorVisible(true)
                setErrorType('Success')
                setErrorTitle("")
                return router.push('/merchant-store-creation/2')
            }
            
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

    const handleFormSubmit3 = async (data) => {
        setLoader(true)
        setError('')
        setErrorTitle('')
        setName('')

        try {

                const payload = {
                    bankName: data?.bankName,
                    account: data?.bankNumber,
                    bankCode: codes,
                    name: name
                }

                var responseAction = await dispatch(addPayouts(payload))
                if (addPayouts.fulfilled.match(responseAction)) {
                    setLoader(false)
                    setErrorVisible(true)
                    setErrorType('Success')
                    setErrorTitle("You’re almost there. Now let’s add other items to your store")
                    return router.push('/my-store')
                }
                else {
                    setErrorVisible(true)
                    setErrorType('Error')
                    setErrorTitle("Something went wrong...")
                }
        } 
        catch (e) {
            console.log({ e })
            setLoader(false)
        }
    }


    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues,
            validationSchema: MerchantFormSchema,
            onSubmit: (data: { storeName: string, phoneNumber: string, street: string, state: string, city: string }) => handleFormSubmit(data),
        });

    const { values: values2, errors: errors2, touched: touched2, handleChange: handleChange2, handleSubmit: handleSubmit2 } =
        useFormik({
            initialValues: initialValues2,
            validationSchema: MerchantDescriptionSchema,
            onSubmit: (data: { description: string }) => handleFormSubmit2(data),
        });

    const { values: values3, errors: errors3, touched: touched3, handleChange: handleChange3, handleSubmit: handleSubmit3 } =
        useFormik({
            initialValues: initialValues3,
            validationSchema: PayoutSchema,
            onSubmit: (data: PayoutFormData) => handleFormSubmit3(data),
        });

    const locationState = locationData?.map((data: locationProp) => data?.state);

    const locationCity = locationData?.find(
        (data: locationProp) => data?.state === values.state,
    )?.city;


    const bankCode = bankCodes?.map(data => {
        return {
            id: data?.id,
            type: data?.name
        }
    })

    useEffect(() => {
        const dd = async () => {
          var code = bankCodes.find(item => item.name === values3.bankName)?.code
    
          const resData = {
            bankCode: code,
            bankAccount: values3?.bankNumber
          }
          try {
            var resultAction = await dispatch(verifyAccount(resData))
            if (verifyAccount.fulfilled.match(resultAction)) {
              setName(resultAction?.payload?.data?.data?.account_name)
              setCodes(code)
              setVerifyErr('yes')
            }
            else {
              setLoader(false)
              setName("")
             setVerifyErr('no')
             setError('Account Information not valid')
            }
          }
          catch (e) {
            console.log(e)
          }
        }
        if (values3.bankNumber?.length === 10) {
          dd()
        }
        else {
          setName("")
          setVerifyErr('')
          setError('')
        }
      }, [values3.bankNumber, values3.bankName])

    return (
        <>
            <View>
                <IconImage
                    src={logo}
                />
            </View>

            <ContainerDiv>
                <CenterContainer>

                    <Div>
                        <Paragraph text='Join Bazara as a Merchant' fontSize={GlobalStyle.size.size18} fontWeight='700' textAlign='center' margin='0% 0% 4% 0%' />

                        <Steps current={activeStep}>
                            {steps.map(item => (
                                <Step key={item.title} />
                            ))}
                        </Steps>
                        <br/>

                        {
                            activeStep === 0 && <Subdiv>
                                <Paragraph text='Store basic information' fontSize={GlobalStyle.size.size15} fontWeight='700' margin='0% 0% 2% 0%' />
                                <TextInput
                                    label='Store Name'
                                    required
                                    value={values.storeName}
                                    onChange={handleChange('storeName')}
                                    errorMsg={touched.storeName ? errors.storeName : undefined}
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
                                <Button isLoading={loader} children={"Continue"} handlePress={handleSubmit} />
                            </Subdiv>
                        }

                        {
                            activeStep === 1 && <Subdiv>
                                <Paragraph text='Let us know you' fontSize={GlobalStyle.size.size15} fontWeight='700' margin='0% 0% 2% 0%' />
                                <TextInput
                                    label='Store Description'
                                    type='description'
                                    isMultiline={true}
                                    value={values2.description}
                                    handleTextChange={handleChange2('description')}
                                    errorMsg={touched2.description ? errors2.description : undefined}
                                />
                                <Paragraph text='Store Cover Images' fontSize={GlobalStyle.size.size15} fontWeight='700' margin='0% 0% 2% 0%' />
                                <Contain>
                                    {
                                        !imageUrl ?
                                            <DesktopUpload profileImageChange={profileImageChange} />
                                            :
                                            <UploadedImage removeImage={removeImage} imageUrl={imageUrl} />
                                    }

                                </Contain>


                                <br />
                                <Button isLoading={loader} children={"Agree & Continue"} handlePress={handleSubmit2} />
                            </Subdiv>
                        }


                        {
                            activeStep === 2 && <Subdiv>
                                <Paragraph text='Payout Details' fontSize={GlobalStyle.size.size15} fontWeight='700' margin='0% 0% 2% 0%' />
                                <SelectField
                                    type={true}
                                    data={bankCode}
                                    value={values3.bankName}
                                    placeholder="Select Bank Name"
                                    onSearch={handleChange3('bankName')}
                                    onChange={handleChange3('bankName')}
                                    errorMsg={touched3.bankName ? errors3.bankName : undefined}
                                />

                                <TextInput
                                    label='Bank Number'
                                    required
                                    value={values3.bankNumber}
                                    onChange={handleChange3('bankNumber')}
                                    errorMsg={touched3.bankNumber ? errors3.bankNumber : undefined}
                                />
                                {/* {
                                    verifyErr ? <DivOpp>
                                        <Paragraph text={error} fontSize={GlobalStyle.size.size12} color={GlobalStyle.color.red} fontFamily='400' />
                                    </DivOpp>
                                        :
                                        <DivSucc>
                                            <Paragraph text={name} fontSize={GlobalStyle.size.size14} fontFamily='400' />
                                        </DivSucc>
                                } */}
                                  {verifyErr === 'no' ? <DivOpp1>
              <Paragraph text={error} fontSize={GlobalStyle.size.size12} color={GlobalStyle.color.white} fontFamily='400' />
            </DivOpp1>
              : verifyErr === 'yes' ? 
              <Div2>
                <Paragraph text={name} fontSize={GlobalStyle.size.size14} color={GlobalStyle.color.white} fontFamily='400' />
              </Div2>
              : null
          }

                                <br />
                                <Button isLoading={loader} type={!name || name?.length < 1 ? 'cancel' : ''} children={"Create Store"} handlePress={handleSubmit3} disabled={name?.length < 1} />
                            </Subdiv>
                        }

                    </Div>
                </CenterContainer>
            </ContainerDiv>
            <BottomContainer>
                <ViewDiv onClick={() => router.push('/login')}>
                    <Paragraph text='Already have a store account?' fontSize={GlobalStyle.size.size14} fontWeight='400' />
                    <Paragraph text='Sign in' margin='0% 4px' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                </ViewDiv>
            </BottomContainer>
            <ResponseModal
                title={errorTitle}
                type={errorType}
                modalVisible={errorVisible}
                setModalVisible={handleModalClose}
                handlePress={handleModalClose}
            />
            {openCrop && <CropEasy {...{ photoUrl, setOpenCrop, openCrop, setPhotoUrl, setFile, setImageUrl }} />}
        </>
    )
}

export default MerchantSteps


const View = styled.div`
   display: flex;
padding: 15px;
cursor: pointer;
`

const Div = styled.div`
    width: 90%;
    margin: 8% auto;
`

const DivSucc = styled.div`
  display: flex;
  justify-content: flex-end;
`

const MildDiv = styled.div`
    width: 10px;
`
const ViewDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const Subdiv = styled.div`
 border: 1px solid ${GlobalStyle.color.darkBlack};
 border-radius: 5px;
 padding: 15px;
`
const Contain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`




const Div2 = styled.div`
  display: flex;
  justify-content: flex-start;
  background: ${GlobalStyle.color.green};
  padding: 10px;
  border-radius: 5px;
`

const DivOpp1 = styled.div`
  display: flex;
  justify-content: flex-start;
  background: ${GlobalStyle.color.red};
  padding: 10px;
  border-radius: 5px;
`