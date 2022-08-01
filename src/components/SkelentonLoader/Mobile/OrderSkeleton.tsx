import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
import { GlobalStyle } from '../../../utils/themes/themes';

function OrderSkeleton() {
    return (
        <Stack spacing={1}>
            <Skeleton variant="text" width={"100%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            <Skeleton variant="rectangular" width={"100%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={80} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="rectangular" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}`, marginTop: '5px' }} />
                </SubDiv1>
                <SubDiv>
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={80} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="rectangular" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}`, marginTop: '5px' }} />
                </SubDiv1>
                <SubDiv>
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={80} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="rectangular" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}`, marginTop: '5px' }} />
                </SubDiv1>
                <SubDiv>
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={80} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="rectangular" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}`, marginTop: '5px' }} />
                </SubDiv1>
                <SubDiv>
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={80} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="rectangular" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}`, marginTop: '5px' }} />
                </SubDiv1>
                <SubDiv>
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={80} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="rectangular" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}`, marginTop: '5px' }} />
                </SubDiv1>
                <SubDiv>
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={20} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
            </Div>

        </Stack>
    )
}

export default OrderSkeleton

const Div = styled.div`
    display: flex;
`
const SubDiv1 = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%
`
const SubDiv = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
`