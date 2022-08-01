import React, { useState } from 'react'
import { useFormik } from 'formik';
import {
    ContainerDiv,
    CenterContainer,
    AuthCard, AuthItemLabel, IconImage
} from "./Styled"
import styled from 'styled-components';
import { apple, cancel, google, logo } from '../../assets'
import GoogleLogin from 'react-google-login'
import AppleSignin from 'react-apple-signin-auth';
import { LoginFormData, MerchantFormData, SignupFormData } from '../../utils/types';
import { LoginSchema, MerchantSchema, SignupSchema } from '../../utils/schemas';
import TextInput from '../TextInput';
import Button from '../Button';
import { useRouter } from 'next/router'

import { createUser, oauthLogin, signInUser } from '../../slices/AuthSlice'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import ResponseModal from '../Modal/ResponseModal';
import Paragraph from '../Paragraph';
import { GlobalStyle } from '../../utils/themes/themes';
import { BottomContainer } from '../mobileComponents/Styled';
import { RowStart } from '../../utils/StyledComponent';
import { Divider } from 'antd';




const DesktopMerchant = () => {
    const dispatch = useAppDispatch()
    const [loader, setLoader] = useState(false)
    const [errorType, setErrorType] = useState("")
    const [errorTitle, setErrorTitle] = useState("")
    const [errorVisible, setErrorVisible] = useState(false)


    const router = useRouter()

    const initialValues: MerchantFormData = {
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        password: '',
    };

    const handleFormSubmit = async (data) => {
        const payload = {
            fName: data.firstName,
            lName: data.lastName,
            password: data.password,
            mobile: data.mobile,
            email: data.email,
        };

        try {
            setLoader(true)
            const resultAction = await dispatch(createUser(payload))
            if (createUser.fulfilled.match(resultAction)) {
                setLoader(false)
                return router.push('/merchant-store-creation/0')
            } else {
                if (resultAction.payload) {
                    setLoader(false)
                    setErrorVisible(true)
                    setErrorType('Error')
                    setErrorTitle("Error while Creating your account")
                    console.log('error1', `Update failed: ${resultAction.error.message}`)
                } else {
                    setLoader(false)
                    setErrorVisible(true)
                    setErrorType('Error')
                    setErrorTitle(resultAction.error.message)
                    console.log('error', `Updated failed: ${resultAction.error.message}`)
                }
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleSuccess = async (response) => {
        var actionToken = await response?.tokenObj;
        var payload = {
            authToken: actionToken.id_token,
            authType: "google",
        };
        try {
            var resultAction = await dispatch(oauthLogin(payload))
            if (oauthLogin.fulfilled.match(resultAction)) {
                setLoader(false)
                return router.push('/merchant-store-creation/0')
            } else {
                if (resultAction.payload) {
                    setLoader(false)
                    console.log('error1', `Update failed: ${resultAction.error.message}`)
                } else {
                    setLoader(false)
                    console.log('error', `Updated failed: ${resultAction.error.message}`)
                }
            }
        }
        catch (e) {

        }
    }

    const handleFailure = () => {

    }

    const handleModalClose = () => {
        setErrorVisible(false)
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues,
            validationSchema: MerchantSchema,
            onSubmit: (data: MerchantFormData) => handleFormSubmit(data),
        });


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
                        <Subdiv>
                            <Paragraph text='Join Bazara as a Merchant' fontSize={GlobalStyle.size.size18} fontWeight='700' textAlign='center' margin='0% 0% 4% 0%' />
                            <TextInput
                                label='First Name'
                                required
                                value={values.firstName}
                                onChange={handleChange('firstName')}
                                errorMsg={touched.firstName ? errors.firstName : undefined}
                            />
                            <TextInput
                                label='Last Name'
                                required
                                value={values.lastName}
                                onChange={handleChange('lastName')}
                                errorMsg={touched.lastName ? errors.lastName : undefined}
                            />
                            <TextInput
                                label='Email'
                                required
                                value={values.email}
                                onChange={handleChange('email')}
                                errorMsg={touched.email ? errors.email : undefined}
                            />
                            <TextInput
                                label='Phone Number'
                                required
                                value={values.mobile}
                                onChange={handleChange('mobile')}
                                errorMsg={touched.mobile ? errors.mobile : undefined}
                            />
                            <TextInput
                                label='Password'
                                required
                                value={values.password}
                                isPassword
                                onChange={handleChange('password')}
                                errorMsg={touched.password ? errors.password : undefined}
                            />
                            
                            <Button isLoading={loader} children={"Create Store"} handlePress={handleSubmit} />

                        </Subdiv>
                        <DividerContainer>OR</DividerContainer>
                        <GoogleLogin
                            clientId="962853764584-0e6b1hshuvm5obq8lipkd4tkoebt3scb.apps.googleusercontent.com"
                            render={(renderProps) => {
                                return (
                                    <AuthCard
                                        onClick={renderProps.onClick}
                                    // disabled={renderProps.disabled}
                                    >
                                        <IconImage
                                            src={google}
                                            width={24}
                                            height={24}
                                        />
                                        <AuthItemLabel>
                                            Sign in with Google
                                        </AuthItemLabel>
                                        <div></div>
                                    </AuthCard>
                                );
                            }}
                            buttonText="Login"
                            onSuccess={handleSuccess}
                            onFailure={handleFailure}
                        // cookiePolicy={'single_host_origin'}
                        />
                        <AppleSignin
                            authOptions={{
                                clientId: '962853764584-0aimp14rac2qi4er2e0mmdgp97cu246o.apps.googleusercontent.com',
                                scope: 'email name',
                                redirectURI: 'https://example.com',
                                state: 'state',
                                nonce: 'nonce',
                                usePopup: true
                            }}
                            uiType="dark"
                            className="apple-auth-btn"
                            noDefaultStyle={false}
                            buttonExtraChildren="Continue with Apple"
                            onSuccess={(response) => console.log(response)}
                            onError={(error) => console.error(error)}
                            skipScript={false}
                            iconProp={{ style: { marginTop: '10px' } }}
                            render={(renderProps) => {
                                return (
                                    <AuthCard
                                        onClick={renderProps.onClick}
                                    // disabled={renderProps.disabled}
                                    >
                                        <IconImage
                                            src={apple}
                                            width={24}
                                            height={24}
                                        />
                                        <AuthItemLabel>
                                            Sign in with Apple
                                        </AuthItemLabel>
                                        <div></div>
                                    </AuthCard>
                                );
                            }}
                        />
                    </Div>
                </CenterContainer>
            </ContainerDiv>
            <BottomContainer>
                <ViewDiv onClick={() => router.push('/login')}>
                    <Paragraph text='Already have a store account? ' fontSize={GlobalStyle.size.size14} fontWeight='400' />
                    <Paragraph text='Sign In' margin='0% 4px' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                </ViewDiv>
            </BottomContainer>

            <ResponseModal
                title={errorTitle}
                type={errorType}
                modalVisible={errorVisible}
                setModalVisible={handleModalClose}
                handlePress={handleModalClose}
            />
        </>

    )
}

export default DesktopMerchant


const View = styled.div`
    display: flex;
    padding: 15px;
    cursor: pointer;
`

const ViewDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;

`

const Div = styled.div`
    width: 90%;
    margin: 4% auto;
`

const TextDiv = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
`

const Subdiv = styled.div`
 border: 1px solid ${GlobalStyle.color.darkBlack};
 border-radius: 5px;
 padding: 15px;
`

const MildDiv = styled.div`
    width: 10px;
`
 const DividerContainer = styled(Divider)`
    margin: 1px 0px !important;
`