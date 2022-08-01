import React, { useState } from 'react'
import { useFormik } from 'formik';
import {
    ContainerDiv,
    CenterContainer, IconImage
} from "./Styled"
import styled from 'styled-components';
import { logo } from '../../assets'

import { ResetFormData } from '../../utils/types';
import { ResetSchema } from '../../utils/schemas';
import TextInput from '../TextInput';
import Button from '../Button';
import { useRouter } from 'next/router'

import { forgetPassword } from '../../slices/AuthSlice'
import { useAppDispatch } from '../../app/hook'
import ResponseModal from '../Modal/ResponseModal';
import Paragraph from '../Paragraph';
import { GlobalStyle } from '../../utils/themes/themes';
import { BottomContainer } from '../mobileComponents/Styled';





const DesktopResetPassword = () => {
    const dispatch = useAppDispatch()
    const [loader, setLoader] = useState(false)
    const [errorType, setErrorType] = useState("")
    const [errorTitle, setErrorTitle] = useState("")
    const [errorVisible, setErrorVisible] = useState(false)


    const router = useRouter()

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
        <>
            <View>
                <IconImage
                    src={logo}
                />
            </View>
            <ContainerDiv>
                <CenterContainer>

                    <Div>
                    <Paragraph text='Forget Password' fontSize={GlobalStyle.size.size18} fontWeight='700' textAlign='center' margin='0% 0% 4% 0%' />
                        <br />
                        <TextInput
                            label='Email'
                            required
                            value={values.email}
                            onChange={handleChange('email')}
                            errorMsg={touched.email ? errors.email : undefined}
                        />

                        <br />
                        <Button isLoading={loader} children={"Send link"} handlePress={handleSubmit} />

                    </Div>
                </CenterContainer>

                <ResponseModal
                    title={errorTitle}
                    type={errorType}
                    modalVisible={errorVisible}
                    setModalVisible={handleModalClose}
                    handlePress={handleModalClose}
                />
            </ContainerDiv>
            <BottomContainer>
            <ViewDiv onClick={() => router.push('/signup')}>
                            <Paragraph text='Don’t have an account?' fontSize={GlobalStyle.size.size14} fontWeight='400' />
                            <Paragraph text='Create an Account' margin='0% 4px' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                        </ViewDiv>
            </BottomContainer>
        </>

    )
}

export default DesktopResetPassword


const View = styled.div`
display: flex;
padding: 15px;
cursor: pointer;
`

const Div = styled.div`
    width: 90%;
    margin: 8% auto;
    border: 1px solid ${GlobalStyle.color.darkBlack};
    border-radius: 5px;
    padding: 15px;
`
const ViewDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`