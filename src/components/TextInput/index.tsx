import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import styled from "styled-components"
import { InputType } from '../../utils/types'
import { GlobalStyle } from '../../utils/themes/themes'
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { NextPage } from 'next'
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

import 'react-quill/dist/quill.snow.css';


const TextInput: NextPage<InputType> = ({ label, onChange, value, errorMsg, isPassword, isMultiline, disabled, type, handleTextChange, required }) => {
  const [showPassword, setShowPassword] = useState(true)
  const handleClickShowPassword = () => {
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      {
        type === 'description' ? typeof window !== 'undefined' && <QuilDiv> 
          <Quill
          style={{ height: '150px', color: 'white', marginBottom: '8%', borderRadius: '10px' }}
          placeholder='Enter Description'
          theme="snow"
          value={value || ''}
          onChange={handleTextChange}
        />
        </QuilDiv>
          :
          <InputContainer>
            <Input
              id={isMultiline ? "outlined-multiline-static" : "outlined-basic"}
              type={showPassword && isPassword ? 'password' : 'text'}
              value={value}
              label={label}
              placeholder={label}
              multiline={isMultiline}
              rows={4}
              required={required}
              variant="outlined"
              disabled={disabled}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              InputProps={
                isPassword && {
                  endAdornment: <InputAdornment position="end" onClick={handleClickShowPassword}>
                    <IconButton
                      aria-label="toggle password visibility"

                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff onClick={handleChange} style={{ color: 'white' }} /> : <Visibility onClick={handleChange} style={{ color: 'white' }} />}
                    </IconButton>
                  </InputAdornment>
                }
              }

            />
          </InputContainer>
      }

      {errorMsg !== undefined ? (
        <ErrorDiv>
          <Text>{errorMsg}</Text>
        </ErrorDiv>
      ) : null}
    </>
  )
}


const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

export default TextInput

const InputContainer = styled.div`
margin: 20px 0%;
`

const Input = styled(TextField)`
  width: 100%;
`

const Text = styled.p`
  font-size: 12px;
  color: red;
`

const Quill = styled(ReactQuill)`
 
`

const QuilDiv = styled.div`
height: 200px;
border-radius: 10px;
`

const ErrorDiv = styled.div`
  margin-top: -10px;
`

