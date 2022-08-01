import React, { useState, useEffect } from 'react'
import { Modal } from "antd"
import styled from 'styled-components'
import Paragraph from '../Paragraph'

import { AddDesktopStaffData, AddStaffData } from '../../utils/types'
import { useFormik } from 'formik'
import { AddDesktopStaffSchema, AddStaffSchema } from '../../utils/schemas'
import TextInput from '../TextInput'
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import { GlobalStyle } from '../../utils/themes/themes'
import { IconImage } from '../DesktopComponent/Styled'
import { cancel, checkbox, good } from '../../assets'
import Button from '../Button'
import { toast, ToastContainer } from 'material-react-toastify';
import { useAppDispatch } from "../../app/hook"
import { addStaff, getStaff } from '../../slices/StaffSlice'
import SelectField from '../SelectField'
import { userRoles } from '../../utils/constants/roles'


function AddStaffModal({ staffModalVisible, closeModal }) {
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()


    const id = localStorage.getItem("activeId")

    const initialValues: AddStaffData = {
        // firstName: '',
        // lastName: '',
        email: '',
        role: '',
    }

    const handleAddStaff = async (data) => {
        setLoading(true)
        const paylaod = {
            userEmail: data?.email,
            role: data?.role,
            storeId: id
        }

        try {
            const response = await dispatch(addStaff(paylaod))
            if (addStaff.fulfilled.match(response)) {
                closeModal()
                dispatch(getStaff(id))
                setLoading(false)
            }
            else {
                setLoading(false)
            }
        }
        catch (e) {
            console.log({ e })
            setLoading(false)
        }
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues,
            validationSchema: AddStaffSchema,
            onSubmit: (data: AddStaffData) => handleAddStaff(data),
        });

        
  const userRoleData = userRoles?.map(data => data?.role)


  const permissionData = userRoles?.find(data => data?.role === values?.role)?.permissions


    return (
        <ModalCard
            title={null}
            centered
            style={{ top: 0 }}
            visible={staffModalVisible}
            onOk={closeModal}
            onCancel={closeModal}
            footer={null}
            closable={false}

        >
            <RowBetween>
                <Paragraph text="Add Staff" fontSize={GlobalStyle.size.size20} fontWeight='700' />
                <div onClick={closeModal}>
                    <IconImage src={cancel} />
                </div>
            </RowBetween>
            {/* <TextInput
                label={'First Name'}
                value={values.firstName}
                onChange={handleChange('firstName')}
                errorMsg={touched.firstName ? errors.firstName : undefined}
            />
            <TextInput
                label={'Last Name'}
                value={values.lastName}
                onChange={handleChange('lastName')}
                errorMsg={touched.lastName ? errors.lastName : undefined}
            /> */}
            <TextInput
                label={'Email Address'}
                value={values.email}
                required
                onChange={handleChange('email')}
                errorMsg={touched.email ? errors.email : undefined}
            />
            <SelectField
                placeholder='Staff role'
                value={values.role}
                data={userRoleData}
                onSearch={handleChange('role')}
                onChange={handleChange('role')}
                errorMsg={touched.role ? errors.role : undefined}
            />

            <TextDiv>
                <Paragraph text='View role permissions' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size16} fontFamily='600' margin='3% 0%' />
            </TextDiv>

            {
                permissionData?.map((data, i) => {
                    return <View key={i}>
                        <IconImage src={good} />
                        <Paragraph key={i} text={data.permission} margin='0% 5px' />
                    </View>
                })
            }
            
            <SubDiv>
                <div></div>
                <Button children='Cancel' type='cancel' handlePress={closeModal} />
                <EmptyDiv></EmptyDiv>
                <Button children='Request' isLoading={loading} handlePress={() => handleSubmit()} />
            </SubDiv>

            <ToastContainer />
        </ModalCard>
    )
}

export default AddStaffModal

const ModalCard = styled(Modal)`
    
`

const ActiveBox = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    background: ${GlobalStyle.color.bazaraTint};
    border-radius: 5px;
`

const InactiveBox = styled.div`
width: 20px;
height: 20px;
background: ${GlobalStyle.color.darkBlack};
border: 1px solid ${GlobalStyle.color.white};
border-radius: 5px;
`

const Div = styled.div`
    width: 90%;
`

const EmptyDiv = styled.div`
    width: 10px;
`

const SubDiv = styled.div`
   display: flex;
   justify-content: space-between;
   margin-top: 10px;
`

const ListDiv = styled.div`
    height: 500px;
    overflow-y: scroll;
    // -ms-overflow-style: none;
    // scrollbar-width: none;

    // ::-webkit-scrollbar {
    //   display: none;
    // }
`


const TextDiv = styled.div`
  cursor: pointer;
`

const View = styled.div`
  padding: 5px 0%;
  display: flex;
`