import React, { useState, useEffect } from 'react'
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
import { LoginFormData } from '../../utils/types';
import { LoginSchema } from '../../utils/schemas';
import TextInput from '../TextInput';
import Button from '../Button';
import { useRouter } from 'next/router'
import MobileHeader from './Header';
import { oauthLogin, signInUser } from '../../slices/AuthSlice'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import ResponseModal from '../Modal/ResponseModal';
import { getPersonalStore, myStore } from '../../slices/StoreSlice';
import Paragraph from '../Paragraph';
import { GlobalStyle } from '../../utils/themes/themes';



const MobileLogin = () => {
    const dispatch = useAppDispatch()
    const [loader, setLoader] = useState(false)
    const [errorType, setErrorType] = useState("")
    const [errorTitle, setErrorTitle] = useState("")
    const [errorVisible, setErrorVisible] = useState(false)
    const myStoreList = useAppSelector(myStore)


    localStorage.setItem('activeId', myStoreList[0]?.id)
    localStorage.setItem('activeName', myStoreList[0]?.brandName)


    const router = useRouter()

    const initialValues: LoginFormData = {
        email: '',
        password: '',
    };


    const handleFormSubmit = async (data) => {
        try {
            setLoader(true)
            const resultAction = await dispatch(signInUser(data))
            if (signInUser.fulfilled.match(resultAction)) {
                setLoader(false)
                  await  dispatch(getPersonalStore())
                return router.push('/my-store')
            } else {
                if (resultAction.payload) {
                    setLoader(false)
                    setErrorVisible(true)
                    setErrorType('Error')
                    setErrorTitle("Error while logging in")
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
                await  dispatch(getPersonalStore())
                return router.push('/my-store')
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
            validationSchema: LoginSchema,
            onSubmit: (data: LoginFormData) => handleFormSubmit(data),
        });

    return (
        <Container>
            <ColumnContainer>
                <MobileHeader
                    header="Sign in"
                    icon={cancel}

                />
                <br/>
                 <TextInput
                    label='Email'
                    required
                    value={values.email}
                    onChange={handleChange('email')}
                    errorMsg={touched.email ? errors.email : undefined}
                />
                <TextInput
                    label='Password'
                    value={values.password}
                    required
                    isPassword
                    onChange={handleChange('password')}
                    errorMsg={touched.password ? errors.password : undefined}
                />
                <ViewDiv>
                     <SmallText onClick={() => router.push('/reset-password')}>Forgot password?</SmallText>
                </ViewDiv>
                <Button isLoading={loader} children={"Sign in"} handlePress={handleSubmit} />
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
            </ColumnContainer>

            <BottomContainer>
                <View>
                <SmallTextP onClick={() => router.push('/signup')}>Create an account</SmallTextP>
                </View>
                <View>
                    <SmallTextP onClick={() => router.push('/signup')}>Sell on Bazara</SmallTextP>
                </View>

            </BottomContainer>

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

export default MobileLogin


const View = styled.div`
 display: flex;
 justify-content: center;
`

const ViewDiv = styled.div`
 display: flex;
 justify-content: flex-end;
 margin-top: -20px;
`

export const SmallTextP = styled.p`
    font-size: ${GlobalStyle.size.size16};
    font-weight: 400;
    font-family: Nunito;
    line-height: 22px;
    margin:3% 0%;
    color: ${GlobalStyle.color.white}
`