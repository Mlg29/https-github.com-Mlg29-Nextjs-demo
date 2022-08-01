import { Rate, Avatar } from 'antd'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import styled from 'styled-components'
import { verti } from '../../../assets'
import { RowBetween, RowStart } from '../../../utils/StyledComponent'
import { GlobalStyle } from '../../../utils/themes/themes'
import ImageContainer from '../../Image'
import Paragraph from '../../Paragraph'
import TextInput from '../../TextInput'
import { IconImage } from '../Styled'
import * as yup from 'yup';
import moment from 'moment'

function CommentCard({ image, name, comment, date, rate, id }) {
    const [selected, setSelected] = useState('')

    const initialValues: { reply: string } = {
        reply: ''
    }

    const handleCommentSubmit = (data) => {
        console.log({ data })
    }

    const handleSelectChange = (id) => {
        if(selected?.length > 1) {
            setSelected('')
        }
        else {
             setSelected(id)
        }
       
    }


    const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
        useFormik({
            initialValues,
            validationSchema: yup.object().shape({
                reply: yup.string().min(1, ({ min }) => `Comment must be at least ${min} length`).required('Reply is required'),
            }),
            onSubmit: (data: { reply: string }) => handleCommentSubmit(data),
            enableReinitialize: true
        });

    return (
        <Div>
            <RowBetween>
                <RowStart>
                    {
                        image?.length < 1 || image === undefined ? <Avatar size={30} style={{ backgroundColor: '#f56a00', marginRight: '10px' }}><Paragraph text={name.substring(0, 1)} /></Avatar>
                            : <ImageContainer source={image} />
                    }

                    <Paragraph text={name} color={GlobalStyle.color.purple} />
                </RowStart>

                <IconImage
                    src={verti}
                />
            </RowBetween>
            <RowStart>
                <Rate disabled allowHalf value={rate} style={{ fontSize: '10px' }} />
                <EmptyDiv></EmptyDiv>
                <Paragraph text={moment(date).format("Do MMM YY")} fontSize={GlobalStyle.size.size8} margin='4px 0% 0% 0%' />
            </RowStart>
            <Paragraph fontSize={GlobalStyle.size.size12} margin='5px 0%' fontWeight='600' text={comment} />
            <RowStart onClick={() => handleSelectChange(id)} style={{cursor: 'pointer'}}>
                <Paragraph text={'Reply'} fontSize={GlobalStyle.size.size12} fontWeight='600' color={GlobalStyle.color.purple} />
            </RowStart>
            {
                selected === id ? <InputDiv>
                    <TextInput
                        label='Reply'
                        required
                        isMultiline={true}
                        value={values.reply}
                        onChange={handleChange('reply')}
                        errorMsg={touched.reply ? errors.reply : undefined}
                    />
                    <RowBetween>
                        <div></div>
                        <InputDiv onClick={() => handleSubmit()}>
                            <Paragraph text={'Send'} fontSize={GlobalStyle.size.size12} fontWeight='600' color={GlobalStyle.color.bazaraTint} />
                        </InputDiv>

                    </RowBetween>
                </InputDiv>
                    : null
            }
        </Div>
    )
}

export default CommentCard

const EmptyDiv = styled.div`
width: 10px
`

const InputDiv = styled.div`

`

const Div = styled.div`
    margin-top: 10px;
`