import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
import { GlobalStyle } from '../../../utils/themes/themes';

function ProfileSkeleton() {
    return (
        <Box>
        <Stack spacing={1}>
            <Skeleton variant="text" width={"100%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
            <Div>  
                <Skeleton variant="circular" width={130} height={130} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                <SubDiv>
                    <Skeleton variant="text" width={"80%"} height={50} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv>
              
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
            </Div>
            <Div>
                <SubDiv1>
                    <Skeleton variant="rectangular" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                    <Skeleton variant="text" width={"100%"} height={30} style={{ background: `${GlobalStyle.color.lightwhite}` }} />
                </SubDiv1>
            </Div>
           
         
            
        </Stack>
        </Box>
    )
}

export default ProfileSkeleton

const Div = styled.div`
    display: flex;
`
const SubDiv = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
`
const SubDiv1 = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
`
const Box = styled.div`
padding: 2px 10px;
`