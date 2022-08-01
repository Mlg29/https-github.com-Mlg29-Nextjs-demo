import React, { useState } from 'react'
import { useFormik } from 'formik';
import {
    SmallText,
    Container,
    BottomContainer,
    ColumnContainer
} from "./Styled"
import { cancel } from '../../assets'
import TextInput from '../TextInput';
import { ResetFormData } from '../../utils/types';
import { ResetSchema } from '../../utils/schemas';
import Button from '../Button';
import MobileHeader from './Header';

import { useAppDispatch, useAppSelector } from "../../app/hook"
import { forgetPassword } from '../../slices/AuthSlice';
import { useRouter } from "next/router"
import ResponseModal from '../Modal/ResponseModal';
import styled from 'styled-components';

function MobileResetPassword() {
    const dispatch = useAppDispatch()
    const [loader, setLoader] = useState(false)
    const router = useRouter()
    const [errorType, setErrorType] = useState("")
    const [errorTitle, setErrorTitle] = useState("")
    const [errorVisible, setErrorVisible] = useState(false)

    const initialValues: ResetFormData = {
        email: '',
    };

    const handleFormSubmit = async (data) => {
        setLoader(true)
        const resultAction = await dispatch(forgetPassword(data))
        if (forgetPassword.fulfilled.match(resultAction)) {
            setLoader(false)
            setErrorVisible(true)
            setErrorType('Success')
            setErrorTitle("A link to reset your password has been sent to your mail box")

        } else {
            if (resultAction.payload) {
                setLoader(false)
                setErrorVisible(true)
                setErrorType('Error')
                setErrorTitle("Error")
                console.log('error1', `Update failed: ${resultAction?.payload}`)
            } else {
                setLoader(false)
                setErrorVisible(true)
                setErrorType('Error')
                setErrorTitle("Error")
                console.log('error', `Updated failed: ${resultAction?.payload}`)
            }
        }
    }

    const handleModalClose = () => {
        setErrorVisible(false)
    }


    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues,
            validationSchema: ResetSchema,
            onSubmit: (data: ResetFormData) => handleFormSubmit(data),
        });

    return (
        <Container>
            <ColumnContainer>
                <MobileHeader
                    header="Reset Password"
                    icon={cancel}
                />
                <SmallText>Provide the email address associated with your account and we will send you instructions to set a new password.</SmallText>
                <TextInput
                    label='Email'
                    required
                    value={values.email}
                    onChange={handleChange('email')}
                    errorMsg={touched.email ? errors.email : undefined}
                />
            </ColumnContainer>
            <BottomContainer>
                <Button isLoading={loader} children={"Send link"} handlePress={handleSubmit} />
                <View>
                    <SmallText onClick={() => router.push('/login')}>Back to login</SmallText>
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

export default MobileResetPassword

const View = styled.div`
 display: flex;
 justify-content: center;
 margin-top: 5%;
`