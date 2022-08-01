import { Modal } from 'antd'
import { useFormik } from 'formik'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { categoryList } from '../../utils/constants/categories'
import { EditProductSchema } from '../../utils/schemas'
import { GlobalStyle } from '../../utils/themes/themes'
import { EditProductFormData, EditProductModalType } from '../../utils/types'
import Paragraph from '../Paragraph'
import SelectField from '../SelectField'
import TextInput from '../TextInput'
import { Select, Collapse } from 'antd';
import { sizes } from '../../utils/constants/sizes'
import { RowBetween, RowStart } from '../../utils/StyledComponent'
import ImageContainer from '../Image'
import { IconImage } from '../DesktopComponent/Styled'
import { cancel, del, deleteIcon, editIcon, fancyPlus } from '../../assets'
import UploadedImage from '../UploadComponent/UploadedImage'
import NumberInput from '../NumberInput'
import { toast, ToastContainer } from 'material-react-toastify'
import DesktopUpload from '../DesktopComponent/reusable/DesktopUpload'
import CropEasy from '../crop/CropEasy'
import UploadComponent from '../UploadComponent'
import DesktopUploadedImage from '../UploadComponent/DesktopUploadImage'
import Button from '../Button'
import { updateProduct } from '../../slices/ProductSlice'
import { useAppDispatch } from '../../app/hook'

const { Panel } = Collapse;

const EditProductModal: React.FC<EditProductModalType> = ({ visible, setVisible, action, editData }) => {
    const [loader, setLoader] = useState(false)
    const dispatch = useAppDispatch()
    const [newVariants, setNewVariants] = useState([])
    const [sizeList, setSizeList] = useState(sizes)
    const [inputList, setInputList] = useState<any>([
        { id: "", size: "", quantity: 0, price: 500 },
    ]);
    const [openCrop, setOpenCrop] = useState(false)
    const [photoUrl, setPhotoUrl] = useState<any>()
    const [file, setFile] = useState(null)
    const [imageUrl, setImageUrl] = useState([])
    const [multiple, setMultiple] = useState(true)
    const [multipleUpload, setMultipleUpload] = useState([])
    const [dummyUploadImage, setDummyUploadImage] = useState([""])

    useEffect(() => {
        setNewVariants(editData?.variants)
    }, [editData])
    const { Option } = Select

    const initialValues: EditProductFormData = {
        productName: editData ? editData?.name : '',
        productDescription: editData ? editData?.description : '',
        category: editData ? editData?.categories : ''
    };


    const handleFormSubmit = async (data) => {
        var checkInput = inputList?.find(data => data.price < 500 || data.price > 999999 || data.price === NaN || data.price === undefined)
        // var checkSize = inputList?.find(data => data.size === '')

        if (multipleUpload?.length > 0 && checkInput) {
            toast.error('Price must be atleast N500 and not greater than N999,999')
            return
        }
        if (newVariants?.length <= 0 && multipleUpload?.length < 0) {
            toast.error('Kindly Add a variant')
            return
        }
        // if (multipleUpload?.length > 0 && checkSize) {
        //     toast.error("Please select variant size")
        //     return;
        // }
        if (multipleUpload?.length > 0 && !checkInput) {
            await newVariants?.push({
                variantImg: multipleUpload,
                spec: inputList,
            })
        }

        const newSizeList = newVariants?.map(data => {
            return {
                spec: data?.spec,
                variantImg: data?.variantImg
            }
        })

        const payload = {
            id: editData?.id,
            name: data?.productName,
            description: data?.productDescription,
            categories: data?.category,
            variants: newSizeList,
            isDraft: false,
            status: 'active',
        }
        setLoader(true)
        try {
            var resultAction = await dispatch(updateProduct(payload))
            if (updateProduct.fulfilled.match(resultAction)) {
                setLoader(false)
                // setResponseModal(true)
                toast.success('You have successfully added a new product to your store')
                // setType('Success')
                setMultipleUpload([])
                setDummyUploadImage([""])
                resetForm()
                setVisible()
                action()
                // return router.push('/products')
            }
            else {
                setLoader(false)
                // setResponseModal(true)
                toast.error('Error while adding a new product to your store')
                //setType('Error')
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleCollapAddClick = (pIndex) => {

        const newD = newVariants?.map((a: any, i) => {
            return i === pIndex ?
                {
                    variantImg: a.variantImg,
                    spec: [...a.spec, { id: "", size: "", quantity: 0, price: 500 }]
                }
                : a
        })
        setNewVariants(newD)
    }

    const removeCollapInputList = (index, pIndex) => {
        const newD = newVariants?.map((a: any, i) => {
            return i === pIndex ?
                {
                    variantImg: a.variantImg,
                    spec: a.spec?.filter((bb, qq) => qq !== index)
                }
                : a
        })
        setNewVariants(newD)
    }

    const handleCollapseInputChange = (e, index, name, pIndex) => {
        const newP = parseInt(e.target.value)
        if (isNaN(newP)) {
            return
        }
        const newD = newVariants?.map((a: any, i) => {
            return i === pIndex ?
                {
                    variantImg: a.variantImg,
                    spec: a.spec?.map((bb, qq) => {
                        return qq === index ? {
                            id: bb.id,
                            price: newP,
                            quantity: bb.quantity,
                            size: bb.size
                        }
                            : bb
                    })
                }
                : a
        })
        setNewVariants(newD)
    }

    const inputCollapIncrement = (value, index, pIndex) => {
        const newD = newVariants?.map((a: any, i) => {
            return i === pIndex ?
                {
                    variantImg: a.variantImg,
                    spec: a.spec?.map((bb, qq) => {
                        return qq === index ? {
                            id: bb.id,
                            price: bb.price,
                            quantity: bb.quantity + 1,
                            size: bb.size
                        }
                            : bb
                    })
                }
                : a
        })
        setNewVariants(newD)
    }

    const inputCollapDecrement = (value, index, pIndex) => {
        const newD = newVariants?.map((a: any, i) => {
            return i === pIndex ?
                {
                    variantImg: a.variantImg,
                    spec: a.spec?.map((bb, qq) => {
                        return qq === index ? {
                            id: bb.id,
                            price: bb.price,
                            quantity: bb.quantity < 1 ? 0 : bb.quantity - 1,
                            size: bb.size
                        }
                            : bb
                    })
                }
                : a
        })
        setNewVariants(newD)
    }

    const handleCollapSizeChange = (e, id, index) => {
        var findSize = sizeList?.find(data => data.type === e)

        var filteredSize = sizeList?.filter(data => data.type !== e)

        const newD = newVariants?.map((a: any, i) => {
            return i === index ?
                {
                    variantImg: a.variantImg,
                    spec: a.spec?.map((bb, qq) => {
                        return qq === id ? {
                            id: bb.id,
                            price: bb.price,
                            quantity: bb.quantity,
                            size: e
                        }
                            : bb
                    })
                }
                : a
        })
        setNewVariants(newD)
        setSizeList(filteredSize)

    };

    const deleteColorAndSizeVar = (index) => {
        var newList = newVariants?.filter((d, i) => i !== index)

        setNewVariants(newList)
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, resetForm } =
        useFormik({
            initialValues,
            validationSchema: EditProductSchema,
            onSubmit: (data: EditProductFormData) => handleFormSubmit(data),
            enableReinitialize: true
        });


    const showColorListBoth = () => {
        return (
            <SelectDiv2>
                {
                    newVariants?.map((data, j) => {
                        return (
                            <Collapse ghost >
                                <PanelContainer showArrow={false} header={
                                    <Color>
                                        <RowBetween>
                                            <RowStart>
                                                <ImageContainer
                                                    source={data?.variantImg[0]}
                                                    width={40}
                                                    height={40}
                                                />
                                                <Cont>
                                                    <Paragraph text={editData?.name} fontSize={GlobalStyle.size.size14} fontWeight='400' />
                                                    <Paragraph text={data?.spec[0]?.price} fontSize={GlobalStyle.size.size12} fontWeight='600' color={GlobalStyle.color.gray} />
                                                </Cont>
                                            </RowStart>
                                            <SubDiv>
                                                <IconImage src={editIcon} onClick={() => { }} />
                                                <IconImage src={deleteIcon} onClick={() => deleteColorAndSizeVar(j)} />
                                            </SubDiv>
                                        </RowBetween>
                                    </Color>
                                } key={j}>
                                    <Paragraph text="Upload Images" fontSize={GlobalStyle.size.size16} fontWeight='400' />
                                    <Div>
                                        <Grid>
                                            {
                                                data?.variantImg?.map((data, i) => {
                                                    return <DesktopUploadedImage key={i} index={i} imageUrl={data} />
                                                })
                                            }

                                            {/* {
                                                dummyUploadImage?.filter((a, b) => data?.image.length < b + 1).map((data, i) => {
                                                    return <UploadComponent key={i} profileImageChange={profileCollapImageChange} />
                                                })
                                            } */}
                                        </Grid>
                                    </Div>
                                    <br />
                                    {data?.spec?.map((x, i) => {
                                        return <SelectDiv>
                                            <DivCont>
                                                <Paragraph text="Size Option" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                                                <SelectInput
                                                    value={x.size?.length < 1 ? "-Select a size-" : x.size}
                                                    showSearch
                                                    placeholder={'-Select a size-'}
                                                    optionFilterProp="children"
                                                    onChange={(e) => handleCollapSizeChange(e, i, j)}
                                                    onSearch={(e) => (e) => handleCollapSizeChange(e, i, j)}
                                                    dropdownClassName="drop"
                                                    dropdownStyle={{ backgroundColor: GlobalStyle.color.black, color: GlobalStyle.color.white }}
                                                    filterOption={(input, option) =>
                                                        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                                    }
                                                >
                                                    {
                                                        sizeList?.map((data: any, i: number) => {
                                                            return <Option key={data.id} value={data.type}>{data.type}</Option>
                                                        })

                                                    }

                                                </SelectInput>
                                            </DivCont>

                                            <EmptyDiv></EmptyDiv>
                                            <DivCont>
                                                <Paragraph text="Quantity" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                                                <InputDiv>
                                                    <Quantitydiv2 onClick={() => inputCollapDecrement(x.quantity, i, j)}>
                                                        <Paragraph text='-' fontSize={GlobalStyle.size.size30} />
                                                    </Quantitydiv2>
                                                    <TextParagraph>
                                                        <Paragraph text={x.quantity.toString()} />
                                                    </TextParagraph>
                                                    <Quantitydiv2 onClick={() => inputCollapIncrement(x.quantity, i, j)}>
                                                        <Paragraph text='+' fontSize={GlobalStyle.size.size30} />
                                                    </Quantitydiv2>
                                                </InputDiv>
                                            </DivCont>

                                            <EmptyDiv></EmptyDiv>
                                            <DivCont>
                                                <Paragraph text="Price" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                                                <NumberInput
                                                    value={x.price}
                                                    onChange={(e) => handleCollapseInputChange(e, i, "price", j)}
                                                    type="numb"
                                                    label={"Price"}
                                                // errorMsg={touched.price ? errors.price : undefined}
                                                />
                                            </DivCont>

                                            <EmptyDiv></EmptyDiv>
                                            <DeleteDiv onClick={() => removeCollapInputList(i, j)}>
                                                <IconImage
                                                    src={del}
                                                />
                                            </DeleteDiv>

                                        </SelectDiv>
                                    })}
                                    <View onClick={() => handleCollapAddClick(j)}>
                                        <IconImage
                                            src={fancyPlus}
                                        />
                                        <Paragraph text='Add Size' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size12} fontFamily='400' margin='0px 0px 0px 7px' />
                                    </View>
                                </PanelContainer>
                            </Collapse>

                        )
                    })
                }
            </SelectDiv2>
        )
    }

    const removeInputList = (index) => {
        const filtered = inputList?.filter((a, i) => i !== index)
        setInputList(filtered)
    }

    const handleInputChange = (e, index, name) => {
        const newP = parseInt(e.target.value)
        if (isNaN(newP)) {
            return
        }
        const list = [...inputList];
        list[index][name] = parseInt(newP);
        setInputList(list);
    };

    const profileImageChange = async (fileChange) => {
        const file = fileChange.target.files[0];
        if (file) {
            setFile(file)
            setImageUrl([])
            const fd = URL.createObjectURL(file)
            setPhotoUrl(fd)
            setOpenCrop(true)
        }

    }

    const inputDecrement = (value, index) => {
        if (value === 0) {
            return;
        }
        else {
            const newD = inputList?.map((a: any, i) => {
                return i === index ?
                    {
                        id: a.id,
                        price: a.price,
                        quantity: value - 1,
                        size: a.size
                    }
                    : a
            })
            setInputList(newD)
        }

    }

    const inputIncrement = (value, index) => {
        const newD = inputList?.map((a: any, i) => {
            return i === index ?
                {
                    id: a.id,
                    price: a.price,
                    quantity: value + 1,
                    size: a.size
                }
                : a
        })
        setInputList(newD)
    }

    const removeImage = (index) => {
        const update = multipleUpload?.filter((data, i) => i !== index)
        setMultipleUpload(update)
        const popData = dummyUploadImage.slice(0, -1);
        setDummyUploadImage(popData)
    }


    const handleAddClick = () => {
        var checkInput = inputList?.find(data => data.price < 500 || data.price > 999999 || data.price === NaN || data.price === undefined)
        // var checkSize = inputList?.find(data => data.size === '')
        // if (checkSize) {
        //     toast.error("Please select variant size")
        //     return;
        // }

        if (checkInput?.length >= 1 || checkInput) {
            toast.error("Price must be atleast N500 and not greater than N999,999")
            return;
        }
        setInputList([...inputList, { id: "", size: "", quantity: 0, price: 500 }]);
    };

    const handleNewColorSelect = async () => {
        // var checkSize = inputList?.find(data => data.size === '')
        // if (checkSize) {
        //     toast.error("Please select variant size")
        //     return;
        // }

        if (multipleUpload?.length < 1) {
            toast.error('Minimum of 1 image upload is required')
            return
        }
        await setNewVariants([...newVariants, {
            variantImg: multipleUpload,
            spec: inputList,
        }])

        setMultipleUpload([])
        setDummyUploadImage([""])
        setInputList([{ id: "", size: "", quantity: 0, price: 500 }])
    }

    const handleSizeChange = (e, id) => {
        var findSize = sizeList?.find(data => data.type === e)

        var filteredSize = sizeList?.filter(data => data.type !== e)

        const updatedData = inputList?.map((x, j) =>
            j === id ? { ...x, size: e, id: findSize?.id } : x
        );

        setInputList(updatedData);
        setSizeList(filteredSize)

    };



    const renderSizeAndColorData = () => {
        return inputList?.sort((a: any, b: any) => a.id - b.id).map((x, i) => {
            return <SelectDiv>
                <DivCont>
                    <Paragraph text="Size Option" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                    <SelectInput
                        value={x.size?.length < 1 ? "-Select a size-" : x.size}
                        showSearch
                        placeholder={'-Select a size-'}
                        optionFilterProp="children"
                        onChange={(e) => handleSizeChange(e, i)}
                        onSearch={(e) => (e) => handleSizeChange(e, i)}
                        dropdownClassName="drop"
                        dropdownStyle={{ backgroundColor: GlobalStyle.color.black, color: GlobalStyle.color.white }}
                        filterOption={(input, option) =>
                            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {
                            sizeList?.map((data: any, i: number) => {
                                return <Option key={data.id} value={data.type}>{data.type}</Option>
                            })

                        }

                    </SelectInput>
                </DivCont>

                <EmptyDiv></EmptyDiv>
                <DivCont>
                    <Paragraph text="Quantity" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                    <InputDiv>
                        <Quantitydiv2 onClick={() => inputDecrement(x.quantity, i)}>
                            <Paragraph text='-' fontSize={GlobalStyle.size.size30} />
                        </Quantitydiv2>
                        <TextParagraph>
                            <Paragraph text={x.quantity.toString()} />
                        </TextParagraph>
                        <Quantitydiv2 onClick={() => inputIncrement(x.quantity, i)}>
                            <Paragraph text='+' fontSize={GlobalStyle.size.size30} />
                        </Quantitydiv2>
                    </InputDiv>
                </DivCont>

                <EmptyDiv></EmptyDiv>
                <DivCont>
                    <Paragraph text="Price" fontSize={GlobalStyle.size.size12} fontWeight='400' margin='0px 0px 5px 0px' />
                    <NumberInput
                        value={x.price}
                        onChange={(e) => handleInputChange(e, i, "price")}
                        type="numb"
                        label={"Price"}
                    // errorMsg={touched.price ? errors.price : undefined}
                    />
                </DivCont>

                <EmptyDiv></EmptyDiv>
                <DeleteDiv onClick={() => removeInputList(i)}>
                    <IconImage
                        src={del}
                    />
                </DeleteDiv>

            </SelectDiv>
        })
    }





    return (
        <ModalContainer
            title={null}
            footer={null}
            centered
            visible={visible}
            onOk={() => setVisible()}
            onCancel={() => setVisible()}
            width={600}
        >
            <Container>
                <RowBetween>
                    <Paragraph text='Edit Products' fontSize={GlobalStyle.size.size24} fontWeight='bold' />
                    <div onClick={() => setVisible()}>
                        <IconImage src={cancel} />
                    </div>
                </RowBetween>

                <Paragraph text='Kindly provide your product information below' fontSize={GlobalStyle.size.size15} fontWeight='400' />
            </Container>
            <br />
            <TextInput
                label='Product Name'
                required
                value={values.productName}
                onChange={handleChange('productName')}
                errorMsg={touched.productName ? errors.productName : undefined}
            />
            <TextInput
                label='Tell us about your product'
                isMultiline={true}
                type='description'
                value={values.productDescription}
                handleTextChange={handleChange('productDescription')}
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

            {showColorListBoth()}
            <br />
            <Paragraph text="Upload Images" fontSize={GlobalStyle.size.size16} fontWeight='400' />
            <Div>
                {
                    dummyUploadImage?.length <= 1 ? <DesktopUpload profileImageChange={profileImageChange} />
                        :
                        <Grid>
                            {
                                multipleUpload?.map((data, i) => {
                                    return <DesktopUploadedImage key={i} index={i} removeImage={() => removeImage(i)} imageUrl={data} />
                                })
                            }

                            {
                                dummyUploadImage?.filter((a, b) => multipleUpload?.length < b + 1).map((data, i) => {
                                    return <UploadComponent key={i} profileImageChange={profileImageChange} />
                                })
                            }
                        </Grid>
                }
            </Div>
            <br />
            {renderSizeAndColorData()}
            <View onClick={() => handleAddClick()}>
                <IconImage
                    src={fancyPlus}
                    width={15}
                />
                <Paragraph text='Add size' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size10} fontFamily='400' margin='3px 0px 0px 7px' />
            </View>
            <View onClick={() => handleNewColorSelect()}>
                <IconImage
                    src={fancyPlus}
                />
                <Paragraph text='Add Another Color' color={GlobalStyle.color.bazaraTint} fontSize={GlobalStyle.size.size14} fontFamily='400' margin='0px 0px 0px 7px' />
            </View>
            <Contain>
                <ContainDiv>
                    <Button children='Update'
                        handlePress={handleSubmit}
                        isLoading={loader} />
                </ContainDiv>
            </Contain>


            <ToastContainer />
            {openCrop && <CropEasy {...{ photoUrl, setOpenCrop, openCrop, setPhotoUrl, setFile, setImageUrl, setMultipleUpload, multipleUpload, multiple, dummyUploadImage, setDummyUploadImage }} />}

        </ModalContainer>
    )
}

export default EditProductModal

const ModalContainer = styled(Modal)`

`

const Container = styled.div`
  // width: 80%;
  width: 550px;
`

const Div1 = styled.div`
    padding: 20px 15px;
    background: ${GlobalStyle.color.darkBlack};
    width: 49%;
    border-radius: 5px;
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


const MiniDiv = styled.div`
padding: 10px 0%;
    border-bottom: 1px solid ${GlobalStyle.color.darkBlack}
`
const EmptyDiv = styled.div`
    width: 20px;
`


const ContDiv = styled.div`
    width: 100%
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    margin: 10px 0%;
`

const Div = styled.div`
    width: 100%;
`


const Subdiv = styled.div`
    flex: 1;
    margin-right: 5px;
`

const Quantitydiv = styled.div`
    width: 50px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${GlobalStyle.color.darkBlack};
    border: 0.3px solid ${GlobalStyle.color.lightGray};
    border-radius: 10px;
    margin: 0% 5px;
    cursor: pointer;
`

const Quantitydiv2 = styled.div`
    width: 50px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin: 0% 5px;
    cursor: pointer;
`

const ContainerDiv = styled.div`
    display: flex;
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
    width: 100%;
`

const View = styled.div`
    display: flex;
    margin-top: 20px;
    cursor: pointer;
`

const SelectDiv = styled.div`
    display: flex;
    width: 550px;
    margin-top: 10px;
`
const SelectDiv2 = styled.div`
    display: flex;
    flex-direction: column;
    width: 550px;
    margin-top: 10px;
`

const SelectInput = styled(Select)`
  width: 150px;
  height: 55px !important;
}
`

const DeleteDiv = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`

const TextParagraph = styled.div`
    display: flex;
    align-items: center;
    width: 100px;
    justify-content: center;
`

const InputDiv = styled.div`
    display: flex;
    border: 0.5px solid ${GlobalStyle.color.lightwhite};
    border-radius: 10px;
    height: 50px;
`

const DivContainerTwo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content:space-between;
  width: 550px;
`;

const InputDivBig = styled.div`
    display: flex;
    justify-content: space-between;
    border: 0.5px solid ${GlobalStyle.color.lightwhite};
    border-radius: 10px;
    height: 50px;
    width: 100%;
`

const ComponentDiv = styled.div`
    width: 550px;
`

const DivCont = styled.div`
   display: flex;
   flex-direction: column;
`

const Cont = styled.div`
   display: flex;
   flex-direction: column;
   margin-left: 24px;
`

const Color = styled.div`
  padding: 10px 0px;
  border-bottom: 1px solid ${GlobalStyle.color.lightwhite};
  width: 100%;
`

const SubDiv = styled.div`
    display: flex;
    width: 60px;
    justify-content: space-around;
`

const PanelContainer = styled(Panel)`
  
`