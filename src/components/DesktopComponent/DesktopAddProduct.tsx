import { useFormik } from 'formik';
import { toast, ToastContainer } from 'material-react-toastify';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../app/hook';
import { checkbox } from '../../assets';
import { createProduct } from '../../slices/ProductSlice';
import { categoryList } from '../../utils/constants/categories';
import { ProductSchema } from '../../utils/schemas';
import { RowBetween, RowStart } from '../../utils/StyledComponent';
import { GlobalStyle } from '../../utils/themes/themes';
import { ProductFormData } from '../../utils/types'; import Button from '../Button';
;
import Paragraph from '../Paragraph'
import SelectField from '../SelectField';
import TextInput from '../TextInput';
import { IconImage } from './Styled';

function DesktopAddProduct() {
  const [loader, setLoader] = useState(false)
  const [size, setSize] = useState(false)
  const [color, setColor] = useState(false)
  const activeId = localStorage.getItem('activeId')
  const getSlug = localStorage.getItem('slug')
  const dispatch = useAppDispatch()
  const router = useRouter()

  const initialValues: ProductFormData = {
    productName: '',
    productDescription: '',
    category: ''
  };


  const handleFormSubmit = async (data) => {
    setLoader(true)
    const payload = {
      isColor: color,
      isSize: size,
    }

    const payloadData = {
      id: activeId,
      name: data?.productName,
      description: data?.productDescription,
      categories: data?.category,
      isDraft: true,
      status: 'draft',
      variants: []
    }

    localStorage.setItem('productDraft', JSON.stringify(payload))

    if (getSlug === null) {
      const resultAction = await dispatch(createProduct(payloadData))
      if (createProduct.fulfilled.match(resultAction)) {
        setLoader(false)
        localStorage.setItem('slug', resultAction?.payload?.message?.slug)
        return router.push('/product-variant')

      }
      else {
        toast.error('Unable to create account')
      }
    }
    else {
      setLoader(false)
      return router.push('/product-variant')
    }

    setLoader(false)

  }


  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: ProductSchema,
      onSubmit: (data: ProductFormData) => handleFormSubmit(data),
      enableReinitialize: true
    });



  return (
    <Container>
      <Paragraph text='Create Products' fontSize={GlobalStyle.size.size24} fontWeight='bold' />
      <Paragraph text='Kindly provide your product information below' fontSize={GlobalStyle.size.size15} fontWeight='400' />
      <br />
      <TextInput
        label='Product Name'
        value={values.productName}
        required
        onChange={handleChange('productName')}
        errorMsg={touched.productName ? errors.productName : undefined}
      />
      <TextInput
        label='Tell us about your product'
        isMultiline={true}
        value={values.productDescription}
        onChange={handleChange('productDescription')}
        errorMsg={touched.productDescription ? errors.productDescription : undefined}
      />
      <SelectField
        data={categoryList}
        value={values.category}
        placeholder="Category"
        onSearch={handleChange('category')}
        onChange={handleChange('category')}
        errorMsg={touched.category ? errors.category : undefined}
      />

      <RowStart>
        <Div>
          <RowBetween>
            <Paragraph text="Does your product have sizes?" fontSize={GlobalStyle.size.size16} fontWeight='400' />
            {
              size ? <ActiveBox onClick={() => setSize(false)}><IconImage src={checkbox} /></ActiveBox> : <InactiveBox onClick={() => setSize(true)}></InactiveBox>
            }
          </RowBetween>
        </Div>
        <EmptyDiv></EmptyDiv>
        <Div>
          <RowBetween>
            <Paragraph text="Does your product have colours?" fontSize={GlobalStyle.size.size16} fontWeight='400' />
            {
              color ? <ActiveBox onClick={() => setColor(false)}><IconImage src={checkbox} /></ActiveBox> : <InactiveBox onClick={() => setColor(true)}></InactiveBox>
            }
          </RowBetween>
        </Div>
      </RowStart>

      <Contain>
        <ContainDiv>
          <Button children='Back' type='cancel' handlePress={() => router.back()} />
          <EmptyDiv></EmptyDiv>
          <Button children='Continue' handlePress={handleSubmit} isLoading={loader} />
        </ContainDiv>
      </Contain>

      <ToastContainer />
    </Container >
  )
}

export default DesktopAddProduct


const Container = styled.div`
  // width: 80%;
  width: 600px;
`
const Div = styled.div`
    padding: 20px 15px;
    background: ${GlobalStyle.color.darkBlack};
    width: 49%;
    border-radius: 5px;
`

const EmptyDiv = styled.div`
    width: 20px;
`


const ActiveBox = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    background: ${GlobalStyle.color.bazaraTint};
    border-radius: 50%;
    cursor: pointer;
`

const InactiveBox = styled.div`
width: 20px;
height: 20px;
background: ${GlobalStyle.color.darkBlack};
border: 1px solid ${GlobalStyle.color.white};
border-radius: 50%;
cursor: pointer;
`
const Contain = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 5%;
`
const ContainDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 400px;
`