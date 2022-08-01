import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { chevronLeft } from '../../assets'
import { PayoutSchema } from '../../utils/schemas'
import { PayoutFormData } from '../../utils/types'
import Button from '../Button'
import Paragraph from '../Paragraph'
import SelectField from '../SelectField'
import TextInput from '../TextInput'
import MobileHeader from './Header'
import { BottomContainer, ColumnContainer, Container } from './Styled'
import { bankCodes } from '../../utils/constants/banckCode'
import { withRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { addPayouts, verifyAccount } from '../../slices/PayoutSlice'
import styled from 'styled-components'
import { GlobalStyle } from '../../utils/themes/themes'



const MobileAddPayout = () => {
  const [loader, setLoader] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const initialValues: PayoutFormData = {
    bankName: '',
    bankNumber: ''
  };


  const bankCode = bankCodes?.map(data => {
    return {
      id: data?.id,
      type: data?.name
    }
  })

  const handleFormSubmit = async (data) => {
    setLoader(true)
    setError('')
    setName('')
    var code = bankCodes.find(item => item.name === data.bankName).code

    const resData = {
      bankCode: code,
      bankAccount: data?.bankNumber
    }

    try {
      var resultAction = await dispatch(verifyAccount(resData))
      if (verifyAccount.fulfilled.match(resultAction)) {
        setName(resultAction?.payload?.data?.data?.account_name)
        const payload = {
          bankName: data?.bankName,
          account: data?.bankNumber,
          bankCode: code,
          name: resultAction?.payload?.data?.data?.account_name
        }

        var responseAction = await dispatch(addPayouts(payload))
        if (addPayouts.fulfilled.match(responseAction)) {
          setLoader(false)
          return router.push('/payout')
        }
        else {
          if ((responseAction).payload) {
            setLoader(false)
            console.log('error', `Update failed: ${responseAction?.payload}`)
          }
          else {
            setLoader(false)
            console.log('error', `Update failed: ${responseAction?.payload}`)
          }
        }
      }
      else {
        if (resultAction.payload) {
          setLoader(false)
          setError('Account Information not valid')
          console.log('verification error', `Update failed: ${resultAction?.payload}`)
        }
        else {
          setLoader(false)
          setError('Account Information not valid')
          console.log('verification error', `Update failed: ${resultAction?.payload}`)
        }
      }
    }
    catch (e) {
      console.log({ e })
    }
  }

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: PayoutSchema,
      onSubmit: (data: PayoutFormData) => handleFormSubmit(data),
    });


  return (
    <Container>
      <MobileHeader
        icon={chevronLeft}
        header="Product Details"
      />
      <br />
      <ColumnContainer>
        <SelectField
          type={true}
          data={bankCode}
          value={values.bankName}
          placeholder="Bank Name"
          onSearch={handleChange('bankName')}
          onChange={handleChange('bankName')}
          errorMsg={touched.bankName ? errors.bankName : undefined}
        />

        <TextInput
          label='Bank Number'
          required
          value={values.bankNumber}
          onChange={handleChange('bankNumber')}
          errorMsg={touched.bankNumber ? errors.bankNumber : undefined}
        />
        <Div>
          <Paragraph text={error?.length > 1 ? error : name} fontSize={GlobalStyle.size.size14} fontFamily='400' />
        </Div>

      </ColumnContainer>
      <BottomContainer>
        <Button isLoading={loader} children={"Save"} handlePress={handleSubmit} />
      </BottomContainer>
    </Container>
  )
}

export default withRouter(MobileAddPayout)

const Div = styled.div`
  display: flex;
  justify-content: flex-end;
`