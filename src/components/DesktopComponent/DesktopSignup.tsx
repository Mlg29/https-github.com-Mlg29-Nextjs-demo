import React, { useState } from 'react'
import { useFormik } from 'formik';
import {
    IconImage,
    AuthItemLabel,
    AuthCard,
    DividerContainer,
    ContainerDiv,
    CenterContainer
} from "./Styled"
import styled from 'styled-components';
import { apple, cancel, google, logo } from '../../assets'
import GoogleLogin from 'react-google-login'
import AppleSignin from 'react-apple-signin-auth';
import { SignupFormData } from '../../utils/types';
import { SignupSchema } from '../../utils/schemas';
import TextInput from '../TextInput';
import Button from '../Button';
import { GlobalStyle } from '../../utils/themes/themes';
import Link from 'next/link'

import { useAppDispatch } from '../../app/hook'
import { createUser, oauthLogin } from '../../slices/AuthSlice';
import { useRouter } from 'next/router';
import ResponseModal from '../Modal/ResponseModal';
import Paragraph from '../Paragraph';
import { RowStart } from '../../utils/StyledComponent';
import { BottomContainer } from '../mobileComponents/Styled';





const DesktopSignup = () => {
    const dispatch = useAppDispatch()
    const [loader, setLoader] = useState(false)
    const router = useRouter()
    const [errorType, setErrorType] = useState("")
    const [errorTitle, setErrorTitle] = useState("")
    const [errorVisible, setErrorVisible] = useState(false)


    const initialValues: SignupFormData = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
    };

    const handleFormSubmit = async (data) => {
        const payload = {
            fName: data.firstName,
            lName: data.lastName,
            password: data.password,
            mobile: data.phoneNumber,
            email: data.email,
        };

        try {
            setLoader(true)
            const resultAction = await dispatch(createUser(payload))
            if (createUser.fulfilled.match(resultAction)) {
                setLoader(false)
                return router.push('/create-store')
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
                return router.push('/create-store')
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
            validationSchema: SignupSchema,
            onSubmit: (data: SignupFormData) => handleFormSubmit(data),
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
                    <Paragraph text='Get Started' fontSize={GlobalStyle.size.size18} fontWeight='700' textAlign='center' margin='0% 0% 4% 0%' />
                        <RowStart>
                            <TextInput
                                label='First Name'
                                required
                                value={values.firstName}
                                onChange={handleChange('firstName')}
                                errorMsg={touched.firstName ? errors.firstName : undefined}
                            />
                            <MildDiv></MildDiv>
                            <TextInput
                                label='Last Name'
                                required
                                value={values.lastName}
                                onChange={handleChange('lastName')}
                                errorMsg={touched.lastName ? errors.lastName : undefined}
                            />
                        </RowStart>
                        <RowStart>
                            <TextInput
                                label='Email'
                                required
                                value={values.email}
                                onChange={handleChange('email')}
                                errorMsg={touched.email ? errors.email : undefined}
                            />
                            <MildDiv></MildDiv>
                            <TextInput
                                label='Phone Number'
                                required
                                value={values.phoneNumber}
                                onChange={handleChange('phoneNumber')}
                                errorMsg={touched.phoneNumber ? errors.phoneNumber : undefined}
                            />
                        </RowStart>
                        <TextInput
                            label='Password'
                            required
                            value={values.password}
                            isPassword
                            onChange={handleChange('password')}
                            errorMsg={touched.password ? errors.password : undefined}
                        />
                        <br />
                        <Button isLoading={loader} children={"Create Account"} handlePress={handleSubmit} />
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
                                            Create account using Google
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
                                            Create account using Apple
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
                    <Paragraph text='Have an account?' fontSize={GlobalStyle.size.size14} fontWeight='400' />
                    <Paragraph text='Sign in' margin='0% 4px' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                </ViewDiv>
            </BottomContainer>
        </>
    )
}

export default DesktopSignup


const View = styled.div`
   display: flex;
padding: 15px;
cursor: pointer;
`

const Div = styled.div`
    width: 90%;
    margin: 8% auto;
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
