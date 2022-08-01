import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { useRouter } from "next/router"
import { Dropdown, Menu, Space, Table, Tag, Timeline, Button as Btn, Modal, DatePicker } from 'antd';
import { getProduct, products, updateProduct } from '../../slices/ProductSlice';
import Paragraph from '../Paragraph';
import { GlobalStyle } from '../../utils/themes/themes';
import * as CurrencyFormat from 'react-currency-format';
import styled from 'styled-components';
import SearchInput from '../SearchInput';
import Button from '../Button';
import { RowBetween, RowStart } from '../../utils/StyledComponent';
import ImageContainer from '../Image';
import { IconImage } from './Styled';
import { bigStaff, cancel, hori } from '../../assets';
import { DownOutlined } from '@ant-design/icons';
import { ProductUpdateFormData } from '../../utils/types';
import ResponseModal from '../Modal/ResponseModal';
import AddStaffModal from '../AddStaffModal';
import { getStaff, staffsData } from '../../slices/StaffSlice';
import { Avatar } from 'antd'
import moment from 'moment';
import EmptyTable from '../EmptyTable';


function DesktopStaff() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const staffList = useAppSelector(staffsData)
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState("")
  const [searchValue, setSearchValue] = useState('')
  const [staffOpen, setStaffOpen] = useState(false)
  const [roleChangeOpen, setRoleChangeOpen] = useState(false)
  const [selectRole, setSelectRole] = useState(null)

  const filterStaff = status?.length > 1 ? staffList?.filter(data => data?.role.toLowerCase() === status.toLowerCase()) : staffList?.filter(data => data?.role.toLowerCase().includes(searchValue.toLowerCase()) || data?.user?.fName.toLowerCase().includes(searchValue.toLowerCase()) || data?.user?.lName.toLowerCase().includes(searchValue.toLowerCase()) )


  const showAddModal = () => {
    setStaffOpen(true)
  }

  const showRoleChangeModal = (item, type) => {
    setRoleChangeOpen(true)
    setSelectRole({
      name: item?.name,
      role: type
    })
  }

  const closeRoleChangeModal = () => {
    setRoleChangeOpen(false)
    setSelectRole(null)
  }

  const handleUpdateStaff = () => {
    console.log("yeag")
  }


  const closeStaffModal = () => {
    setStaffOpen(false)
  }

  const id = localStorage.getItem("activeId")

  useEffect(() => {
    dispatch(getStaff(id))
  }, [id])

  const updateProductStatus = async (data) => {
    const payload: ProductUpdateFormData = {
      id: data?.key,
      status: data?.status === 'active' ? 'inactive' : 'active'
    }

    const resultAction = await dispatch(updateProduct(payload))
    if (updateProduct.fulfilled.match(resultAction)) {
      setType('Success')
      setTitle('Product status updated successfully')
      setVisible(true)
      dispatch(getProduct(id))
    }
    else {
      setType('Error')
      setTitle('Unable to update product status')
      setVisible(true)
    }
  }

  const menu = (item) => (
    <Menu>
      <Menu.Item>
        <SubDiv>
          <Paragraph text={'Remove User'} fontSize={GlobalStyle.size.size12} />
        </SubDiv>
      </Menu.Item>

    </Menu>
  );

  const actionMenu = (item) => (
    <Menu>
      <Menu.Item>
        <SubDiv onClick={() => showRoleChangeModal(item, "Super Admin")}>
          <Paragraph text={'Super Admin'} fontSize={GlobalStyle.size.size12} />
        </SubDiv>
      </Menu.Item>
      <Menu.Item>
        <SubDiv onClick={() => showRoleChangeModal(item, "Admin")}>
          <Paragraph text={'Admin'} fontSize={GlobalStyle.size.size12} />
        </SubDiv>
      </Menu.Item>
      <Menu.Item>
        <SubDiv onClick={() => showRoleChangeModal(item, "Store Vetter")}>
          <Paragraph text={'Store Vetter'} fontSize={GlobalStyle.size.size12} />
        </SubDiv>
      </Menu.Item>
      <Menu.Item>
        <SubDiv onClick={() => showRoleChangeModal(item, "Store Owner")}>
          <Paragraph text={'Store Owner'} fontSize={GlobalStyle.size.size12} />
        </SubDiv>
      </Menu.Item>
      <Menu.Item>
        <SubDiv onClick={() => showRoleChangeModal(item, "Store Manager")}>
          <Paragraph text={'Store Manager'} fontSize={GlobalStyle.size.size12} />
        </SubDiv>
      </Menu.Item>
      <Menu.Item>
        <SubDiv onClick={() => showRoleChangeModal(item, "Store Attendant")}>
          <Paragraph text={'Store Attendant'} fontSize={GlobalStyle.size.size12} />
        </SubDiv>
      </Menu.Item>

    </Menu>
  );

  const handleModalClose = () => {
    setVisible(false)
  }


  const columns = [
    {
      title: '',
      dataIndex: '',
      key: '',
      width: 10,
      render: (item) => {
        return <InactiveBox></InactiveBox>
      }
    },
    {
      title: 'User',
      dataIndex: '',
      key: '',
      width: 500,
      render: (item) => {
        return <RowStart>
          {
            item?.image?.length < 1 || item?.image === undefined ? <Avatar size={30} style={{ backgroundColor: '#f56a00', marginRight: '5px' }}><Paragraph text={item?.name.substring(0, 1)} /></Avatar>
              : <ImageContainer type='round' source={item.image} width={35} height={35} />
          }
          <EmptyDiv></EmptyDiv>
          <Paragraph text={item.name} fontSize={GlobalStyle.size.size16} />
        </RowStart>
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: item => <Paragraph text={item} fontSize={GlobalStyle.size.size16} />,
    },
    {
      title: 'Date Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: item => <Paragraph text={moment(item).format("Do MMM YY")} fontSize={GlobalStyle.size.size16} />,
    },
    {
      title: 'Role',
      dataIndex: '',
      key: '',
      render: item => <Dropdown overlay={actionMenu(item)}>
        <BtnDiv>
          <Space>
            {item?.role}
            <DownOutlined />
          </Space>
        </BtnDiv>
      </Dropdown>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text) => (
        <>
          <Tag color={text === 'active' ? GlobalStyle.color.antdGreen : text === 'inactive' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdPurple}>
            {text?.length < 1 || text === undefined ? <Paragraph textTransform='capitalize' text={'N/A'} fontSize={GlobalStyle.size.size16} color={text === 'active' ? GlobalStyle.color.antdGreen : text === 'inactive' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdPurple} /> : <Paragraph textTransform='capitalize' text={text} fontSize={GlobalStyle.size.size12} color={text === 'active' ? GlobalStyle.color.antdGreen : text === 'inactive' ? GlobalStyle.color.antdRed : GlobalStyle.color.antdPurple} />}
          </Tag>
        </>
      ),
    },
    {
      title: 'Action',
      key: '',
      dataIndex: '',
      width: 200,
      render: (item) => (
        <>
          <Dropdown overlay={menu(item)}>
            <IconImage
              src={hori}

            />
          </Dropdown>

        </>
      ),
    }
  ];

  const renderData = () => {
    return filterStaff?.map(data => {
      return {
        key: data?.id,
        slug: data?.slug,
        name: data?.user?.fName + " " + data?.user?.lName,
        email: data?.user?.email,
        createdAt: data?.createdAt,
        role: data?.role,
      }
    })
  }

  const subMenu = () => (
    <MenuDiv>
      <Paragraph text="Filter Staff" fontSize={GlobalStyle.size.size16} fontWeight='600' />
      <Paragraph text="By Status" fontSize={GlobalStyle.size.size14} fontWeight='700' margin='10px 0px' />
      <MenuItem>
      <TextDiv style={{ backgroundColor: status === '' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus("")}>
          <Paragraph text="All" fontSize={GlobalStyle.size.size12} fontWeight='600' />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'Super Admin' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus("Super Admin")}>
          <Paragraph text="Super Admin" fontSize={GlobalStyle.size.size12} fontWeight='600' />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'Admin' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus("Admin")}>
          <Paragraph text="Admin" fontSize={GlobalStyle.size.size12} fontWeight='600' />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'Store Vetter' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus("Store Vetter")}>
          <Paragraph text="Store Vetter" fontSize={GlobalStyle.size.size12} fontWeight='600' />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'Store Owner' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus("Store Owner")}>
          <Paragraph text="Store Owner" fontSize={GlobalStyle.size.size12} fontWeight='600' />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'Store Manager' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus("Store Manager")}>
          <Paragraph text="Store Manager" fontSize={GlobalStyle.size.size12} fontWeight='600' />
        </TextDiv>
        <TextDiv style={{ backgroundColor: status === 'Store Attendant' && GlobalStyle.color.bazaraTint }} onClick={() => setStatus("Store Attendant")}>
          <Paragraph text="Store Attendant" fontSize={GlobalStyle.size.size12} fontWeight='600' />
        </TextDiv>
      </MenuItem>

    </MenuDiv>
  )

  return (
    <>
      <Paragraph text={`Staff Role (${staffList?.length === undefined ? 0 : staffList?.length})`} fontSize={GlobalStyle.size.size24} fontWeight='bold' margin='0% 0% 1% 10px' />
      <View>
        <Div>
          <SearchBox>
            <SearchInput label={'Search user or user role'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </SearchBox>
          <EmptyDiv></EmptyDiv>
          <ButtonBox>
          <Dropdown overlay={subMenu} trigger={['click']} placement="bottomRight">
              <ButtonFilterText>
                <Paragraph text='Filter' textAlign='center' />
              </ButtonFilterText>
            </Dropdown>
          </ButtonBox>
          <EmptyDiv></EmptyDiv>
          <ButtonBox>
            <Button children={'Add Member'} handlePress={() => showAddModal()} />
          </ButtonBox>
        </Div>
      </View>
      <Table 
        columns={columns} 
        size="small" 
        locale={{ emptyText: <EmptyTable 
          icon={bigStaff} 
          header='Staff Role' 
          title='You haven’t added any user to your store. Users you add to your store will be viewed here.' /> 
        }} 
        dataSource={renderData()} 
        pagination={
        { defaultPageSize: 12 }}
      />


      <ResponseModal
        title={title}
        type={type}
        modalVisible={visible}
        setModalVisible={handleModalClose}
        handlePress={handleModalClose}
      />

      <AddStaffModal
        staffModalVisible={staffOpen}
        closeModal={closeStaffModal}
      />


      <ModalCard
        title={null}
        centered
        style={{ top: 20 }}
        visible={roleChangeOpen}
        onOk={closeRoleChangeModal}
        onCancel={closeRoleChangeModal}
        footer={null}
        width={400}
        closable={false}

      >
        <RowBetween>
          <Paragraph text='Change Staff Role' fontSize={GlobalStyle.size.size20} fontWeight='700' />
          <div onClick={closeRoleChangeModal}>
            <IconImage src={cancel} />
          </div>
        </RowBetween>

        <Paragraph fontSize={GlobalStyle.size.size14} fontWeight='400' text={`You are about to change ${selectRole?.name} role to ${selectRole?.role}. `} />
        <br />

        <ButDiv>
          <ContainerBetween>
            <EmptyDiv></EmptyDiv>
            <ButDiv2>
              <Button type='cancel' children='Cancel' handlePress={closeRoleChangeModal} />
            </ButDiv2>
            <ButDiv2>
              <Button children='Confirm' handlePress={() => handleUpdateStaff()} />
            </ButDiv2>
          </ContainerBetween>
        </ButDiv>
      </ModalCard>
    </>
  )
}

export default DesktopStaff

const ModalCard = styled(Modal)`
    
`

const View = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Div = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 700px;
`
const EmptyDiv = styled.div`
    width: 20px;
`
const SearchBox = styled.div`
    width: 80%;
`

const ButtonBox = styled.div`
    width: 200px;
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

const SubDiv = styled.div`

`

const Min = styled.div`
width: 5px;
`

const BtnDiv = styled(Btn)`
  background: ${GlobalStyle.color.darkBlack} !important;
  border: none;
`

const ButDiv = styled.div`
 
`
const ButDiv2 = styled.div`
  width: 140px;
`

const ContainerBetween = styled.div`
  display: flex;
  justify-content: space-between;
`
const ButtonFilterText = styled.div`
    background: transparent;
    border: 1px solid ${GlobalStyle.color.bazaraTint};
    width: 100%;
    padding: 10px;
    font-size: 14px;
    color: ${GlobalStyle.color.bazaraTint};
    border-radius: 10px;
    cursor: pointer;
`
const TextDiv = styled.div`
  border: 0.5px solid ${GlobalStyle.color.lightwhite};
  min-width: 100px;
  border-radius: 30px; 
  display: flex;
  justify-content: center;
  padding: 5px;
  cursor: pointer;

`


const MenuDiv = styled(Menu)`
  background: ${GlobalStyle.color.primaryBg} !important;
  width: 350px !important;
  padding: 10px 15px;
`

const MenuItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  margin-top: 10px;
`

const DatePick = styled(DatePicker)`
  width: 100%;
  background: ${GlobalStyle.color.primaryBg};
  padding: 10px;
  border: 0.5px solid ${GlobalStyle.color.lightwhite};
  border-color: none !important;
`