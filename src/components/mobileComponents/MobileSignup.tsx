import React, { useState } from 'react'
import { useFormik } from 'formik';
import {
    SmallText,
    RowJustifyAlignBetween,
    IconImage,
    Container,
    AuthItemLabel,
    AuthCard,
    DividerContainer,
    BottomContainer,
    ColumnContainer
} from "./Styled"
import styled from 'styled-components';
import { apple, cancel, google } from '../../assets'
import GoogleLogin from 'react-google-login'
import AppleSignin from 'react-apple-signin-auth';
import { SignupFormData } from '../../utils/types';
import { SignupSchema } from '../../utils/schemas';
import TextInput from '../TextInput';
import Button from '../Button';
import { GlobalStyle } from '../../utils/themes/themes';
import Link from 'next/link'
import MobileHeader from './Header';
import { useAppDispatch } from '../../app/hook'
import { createUser, oauthLogin } from '../../slices/AuthSlice';
import { useRouter } from 'next/router';
import ResponseModal from '../Modal/ResponseModal';

const MobileSignup = () => {
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
        <Container>
            <ColumnContainer>
                <MobileHeader
                    header="Create account"
                    icon={cancel}
                />
                <br />

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
                    value={values.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                    errorMsg={touched.phoneNumber ? errors.phoneNumber : undefined}
                />
                <TextInput
                    label='Password'
                    required
                    value={values.password}
                    isPassword
                    onChange={handleChange('password')}
                    errorMsg={touched.password ? errors.password : undefined}
                />
                <Button isLoading={loader} children={"Create Account"} handlePress={handleSubmit} />
                <DividerContainer>OR</DividerContainer>
                <GoogleLogin
                    clientId="962853764584-0e6b1hshuvm5obq8lipkd4tkoebt3scb.apps.googleusercontent.com"
                    render={(renderProps) => {
                        return (
                            <AuthCard
                                onClick={renderProps.onClick}
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
                />
                <AppleSignin
                    authOptions={{
                        clientId: 'com.example.web',
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
                    // render={(props) => <button {...props}>My Custom Button</button>}
                    render={(renderProps) => {
                        return (
                            <AuthCard
                                onClick={renderProps.onClick}
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
                <View>
                    <SmallText>Already have an account? <Link href={'/login'}><Span>Sign in</Span></Link></SmallText>
                </View>
            </ColumnContainer>

            <ResponseModal
                title={errorTitle}
                type={errorType}
                modalVisible={errorVisible}
                setModalVisible={handleModalClose}
                handlePress={handleModalClose}
            />
        </Container>
    )
}

export default MobileSignup


const View = styled.div`
 display: flex;
 justify-content: center;
 margin-top: 3%;
`

const Span = styled.span`
 color: ${GlobalStyle.color.bazaraTint}
`