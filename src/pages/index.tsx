
import React, { useEffect, useState } from 'react'

import styles from "../../styles/Home.module.css"

import { useRouter } from 'next/router'
import Login from './login'
import Button from '../components/Button'
import { RowCenter } from '../utils/StyledComponent'

import styled from 'styled-components'
import Paragraph from '../components/Paragraph'


function index() {

 const router = useRouter()


  return (
    <Div>
        <RowCenter>
            <Button children="Go To Login" handlePress={() => router.push('/login')} />
        </RowCenter>
    </Div>
  )
}

export default index


const Div = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow-y: scroll;
`