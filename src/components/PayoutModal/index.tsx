import { Modal } from 'antd'
import { useFormik } from 'formik'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../app/hook'
import { cancel } from '../../assets'
import { addPayouts, getPayouts, updatePayout, verifyAccount } from '../../slices/PayoutSlice'
import { bankCodes } from '../../utils/constants/banckCode'
import { PayoutSchema } from '../../utils/schemas'
import { RowBetween } from '../../utils/StyledComponent'
import { GlobalStyle } from '../../utils/themes/themes'
import { PayoutFormData, PayoutModalData } from '../../utils/types'
import Button from '../Button'
import { BottomContainer, ColumnContainer, IconImage } from '../mobileComponents/Styled'
import Paragraph from '../Paragraph'
import SelectField from '../SelectField'
import TextInput from '../TextInput'

const PayoutModal: React.FC<PayoutModalData> = ({ visible, setVisible, editPayout }) => {
  const [loader, setLoader] = useState(false)
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [codes, setCodes] = useState('')
  const [error, setError] = useState('')
  const [verifyErr, setVerifyErr] = useState('')

  const initialValues: PayoutFormData = {
    bankName: editPayout !== undefined || editPayout !== null ? editPayout?.bankName : '',
    bankNumber: editPayout !== undefined || editPayout !== null ? editPayout?.account : ''
  };

  const handleModalFormSubmit = async (data) => {
    setLoader(true)
    // setError('')
    // setName('')
    // setVerifyErr('')

    try {
      const payload = {
        bankName: data?.bankName,
        account: data?.bankNumber,
        bankCode: codes,
        name: name
      }

      const uppdatePayload = {
        id: editPayout?._id,
        name: name,
        account: data?.bankNumber,
        bankName: data?.bankName,
        backCode: codes
      }

      if (editPayout === undefined || editPayout === null) {
        var responseAction = await dispatch(addPayouts(payload))
        if (addPayouts.fulfilled.match(responseAction)) {
          setLoader(false)
          setVisible()
          resetForm()
          setName('')
          setVerifyErr('')
          dispatch(getPayouts())
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
        var updateResponseAction = await dispatch(updatePayout(uppdatePayload))
        if (updatePayout.fulfilled.match(updateResponseAction)) {
          setLoader(false)
          setVisible()
          resetForm()
          setName('')
          setVerifyErr('')
          dispatch(getPayouts())
        }
        else {
          setLoader(false)
          console.log('error', `Update failed`)
        }

      }
    }
    catch (e) {
      console.log({ e })
      setLoader(false)
    }
  }

  const { values, errors, touched, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues,
      validationSchema: PayoutSchema,
      onSubmit: (data: PayoutFormData) => handleModalFormSubmit(data),
      enableReinitialize: true
    });



  const bankCode = bankCodes?.map(data => {
    return {
      id: data?.id,
      type: data?.name
    }
  })


  useEffect(() => {
    const dd = async () => {
      var code = bankCodes?.find(item => item.name === values.bankName)?.code

      const resData = {
        bankCode: code,
        bankAccount: values?.bankNumber
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
    if (values.bankNumber?.length === 10) {
      dd()
    }
    else {
      setName("")
      setVerifyErr('')
      setError('')
    }
  }, [values.bankNumber, values.bankName])


  return (
    <ModalCard
      title={null}
      centered
      style={{ top: 0 }}
      visible={visible}
      onOk={setVisible}
      onCancel={setVisible}
      footer={null}
      closable={false}

    >
      <ContainerDiv>

        <RowBetween>
          <Paragraph textTransform='capitalize' margin='2% 0%' text={`Payout Account`} fontSize={GlobalStyle.size.size16} fontWeight='700' />
          <div onClick={setVisible}>
            <IconImage src={cancel} />
          </div>
        </RowBetween>
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
          {
            verifyErr === 'no' ? <DivOpp>
              <Paragraph text={error} fontSize={GlobalStyle.size.size12} color={GlobalStyle.color.white} fontFamily='400' />
            </DivOpp>
              : verifyErr === 'yes' ?
                <Div>
                  <Paragraph text={name} fontSize={GlobalStyle.size.size14} color={GlobalStyle.color.white} fontFamily='400' />
                </Div>
                : null
          }

        </ColumnContainer>

        <br />
        <br />
        <br />
        <BottomContainer>
          <Button isLoading={loader} type={!name || name?.length < 1 ? 'cancel' : ''} children={"Save"} handlePress={handleSubmit} disabled={name?.length < 1} />
        </BottomContainer>

      </ContainerDiv>
    </ModalCard>
  )
}

export default PayoutModal


const ContainerDiv = styled.div`
 width: 100%;
`

const ModalCard = styled(Modal)`
    
`
const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  background: ${GlobalStyle.color.green};
  padding: 10px;
  border-radius: 5px;
`

const DivOpp = styled.div`
  display: flex;
  justify-content: flex-start;
  background: ${GlobalStyle.color.red};
  padding: 10px;
  border-radius: 5px;
`
