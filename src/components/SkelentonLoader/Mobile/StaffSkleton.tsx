import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
import { GlobalStyle } from '../../../utils/themes/themes';

function StaffSkeleton() {
    return (
        <Stack spacing={1}>
            <Skeleton variant="text" width={"100%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            <Skeleton variant="rectangular" width={"100%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
                <Skeleton variant="rectangular" width={"20%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
                <Skeleton variant="rectangular" width={"20%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
                <Skeleton variant="rectangular" width={"20%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
                <Skeleton variant="rectangular" width={"20%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
                <Skeleton variant="rectangular" width={"20%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
                <Skeleton variant="rectangular" width={"20%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
                <Skeleton variant="rectangular" width={"20%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
                <Skeleton variant="rectangular" width={"20%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
                <Skeleton variant="rectangular" width={"20%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
                <Skeleton variant="rectangular" width={"20%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            </Div>
         
            
        </Stack>
    )
}

export default StaffSkeleton

const Div = styled.div`
    display: flex;
`
const SubDiv1 = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-right: 5px;
`