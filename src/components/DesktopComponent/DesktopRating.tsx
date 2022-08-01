import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RowStart } from '../../utils/StyledComponent'
import Paragraph from '../Paragraph'
import CommentCard from './../mobileComponents/reusable/CommentCard'
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { getStoreById, getStoreRating, storebyId, storeRatings } from '../../slices/StoreSlice'
import { Progress, Rate } from 'antd';
import { GlobalStyle } from '../../utils/themes/themes'

function DesktopRating() {
    const dispatch = useAppDispatch()
    const storeRating = useAppSelector(storeRatings)
    const storeData = useAppSelector(storebyId)

    const id = localStorage.getItem('activeId')

    useEffect(() => {
        dispatch(getStoreRating(id))
        dispatch(getStoreById(id))
        // dispatch(getStoreRating("9frx748dsPZn5vFKz7RhQMI07"))
        // dispatch(getStoreById("9frx748dsPZn5vFKz7RhQMI07"))
    }, [id])

    const ratingComments = storeRating?.filter(data => data?.comment?.length > 1)
    const excellent = storeRating?.filter(data => data?.rating === 5)
    const good = storeRating?.filter(data => data?.rating === 4)
    const average = storeRating?.filter(data => data?.rating === 3)
    const poor = storeRating?.filter(data => data?.rating === 2)
    const terrible = storeRating?.filter(data => data?.rating === 1)


    return (
        <ContainerBox>
            <Paragraph text={`Reviews and Ratings (${storeData?.rating})`} fontSize={GlobalStyle.size.size24} fontWeight='700' />
            <br />

            <RowStart>
                <CenterDiv>
                    <Paragraph text={storeData?.rating} fontSize={GlobalStyle.size.size30} fontWeight='700' />
                    <RateBox disabled allowHalf value={storeData?.rating} />
                    {
                        storeData?.rating === 0 ? <Button>No reviews yet.</Button> : <Button>{storeData?.rating} out of 5.0 Rating</Button>
                    }
                </CenterDiv>
                <Contain>
                    <Paragraph text={`${storeData?.ratingCount} review`} fontSize={GlobalStyle.size.size16} fontWeight='600' />
                    <RowDiv>
                        <SubDiv> <Paragraph text={'Excellent'} fontSize={GlobalStyle.size.size12} fontWeight='600' /></SubDiv>

                        <ProgressDiv>
                            <Progress percent={excellent?.length} showInfo={false} size="small" />
                        </ProgressDiv>
                        <SubDiv2>
                            <Paragraph text={excellent?.length} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                        </SubDiv2>

                    </RowDiv>
                    <RowDiv>
                        <SubDiv>
                            <Paragraph text={'Very good'} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                        </SubDiv>

                        <ProgressDiv>
                            <Progress percent={good?.length} showInfo={false} size="small" />
                        </ProgressDiv>
                        <SubDiv2>
                            <Paragraph text={good?.length} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                        </SubDiv2>

                    </RowDiv>
                    <RowDiv>
                        <SubDiv>
                            <Paragraph text={'Average'} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                        </SubDiv>

                        <ProgressDiv>
                            <Progress percent={average?.length} showInfo={false} size="small" />
                        </ProgressDiv>
                        <SubDiv2>
                            <Paragraph text={average?.length} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                        </SubDiv2>

                    </RowDiv>
                    <RowDiv>
                        <SubDiv>
                            <Paragraph text={'Poor'} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                        </SubDiv>

                        <ProgressDiv>
                            <Progress percent={poor?.length} showInfo={false} size="small" />
                        </ProgressDiv>
                        <SubDiv2>
                            <Paragraph text={poor?.length} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                        </SubDiv2>

                    </RowDiv>
                    <RowDiv>
                        <SubDiv>
                            <Paragraph text={'Terrible'} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                        </SubDiv>

                        <ProgressDiv>
                            <Progress percent={terrible?.length} showInfo={false} size="small" />
                        </ProgressDiv>
                        <SubDiv2>
                            <Paragraph text={terrible?.length} fontSize={GlobalStyle.size.size12} fontWeight='600' />
                        </SubDiv2>

                    </RowDiv>
                    <br />
                </Contain>
            </RowStart>
            <br />
            <Paragraph text={`All Comments`} fontSize={GlobalStyle.size.size16} fontWeight='600' />
            {
                ratingComments?.map(data => {
                    return <CommentCard
                        image={data?.imgUrls[0]}
                        name={data?.client?.fName + " " + data?.client?.lName}
                        comment={data?.comment}
                        date={data?.createdAt}
                        rate={data?.rating}
                        id={data?._id}
                    />
                })
            }
        </ContainerBox>
    )
}

export default DesktopRating

const Contain = styled.div`
width: 300px;
margin-left: 20px;
`

const ContainerBox = styled.div`
    width: 600px;
    margin-left: 10px;
`
const CenterDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 12px 0%;
    width: 300px;
`

const Button = styled.button`
    width: 100%;
    padding: 5px;
    border-radius: 15px;
    border: none;
    margin-top: 10px;
    color: ${GlobalStyle.color.black}
`

const RowDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const SubDiv = styled.div`
    width: 20%;
`
const SubDiv2 = styled.div`
    width: 20%;
    display: flex;
    justify-content: flex-end;
`

const ProgressDiv = styled.div`
    width: 60%;
    margin-top: -5px;
}
`

const RateBox = styled(Rate)`
    
`