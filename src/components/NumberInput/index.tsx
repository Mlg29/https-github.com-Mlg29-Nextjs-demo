import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import styled from "styled-components"
import { NumberType } from '../../utils/types'
import { GlobalStyle } from '../../utils/themes/themes'
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { NextPage } from 'next'
import NumberFormat from 'react-number-format'
import OutlinedInput from '@mui/material/OutlinedInput';
import { prefix } from '../../utils/constants/categories'
import { InputNumber } from 'antd';
import Paragraph from '../Paragraph'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const NumberInput: NextPage<NumberType> = ({ label, onChange, value, errorMsg, type }) => {


  return (
    <InputContainer>
      {
        type === "controlled" ?
          <Input
            id="outlined-start-adornment"
            type={'number'}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Paragraph text={prefix} /></InputAdornment>,
              inputMode: 'numeric',
            }}
            value={value}
            // label={label}
            placeholder={label}
            rows={4}
            variant="outlined"
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
          />
          : type === "numb" ?
           <Div>
             <InputG>
              <InputText>{prefix}</InputText>
              <Control aria-label="Amount (to the nearest dollar)" value={value} onChange={onChange} />
            </InputG>
           </Div>
            : <Input
              id={"outlined-basic"}
              type={'number'}
              value={value}
              label={label}
              placeholder={label}
              rows={4}
              variant="outlined"
              onChange={onChange}
              InputLabelProps={{ shrink: true }}

            />
      }
      {errorMsg !== undefined ? (
        <div>
          <Text>{errorMsg}</Text>
        </div>
      ) : null}
    </InputContainer>
  )
}

export default NumberInput

const InputContainer = styled.div`
width: 100%;
margin: 10px 0%;
`

const Input = styled(TextField)`
  width: 100%;
`

const Text = styled.p`
  font-size: 12px;
  color: red;
`

const Div = styled.div`
  border: 1px solid ${GlobalStyle.color.lightwhite};
  margin-top: -8px;
  border-radius: 5px;
`
const InputG = styled(InputGroup)`
  background: transparent;
`

const InputText = styled(InputGroup.Text)`
  background: transparent;
  color: white;
  border: none;
`

const Control= styled(Form.Control)`
  background: transparent;
  border: none;
  height: 45px;
  color: white;

  :focus {
    background: transparent;
    color: white;
    border: none;
    box-shadow: none;
  }
`