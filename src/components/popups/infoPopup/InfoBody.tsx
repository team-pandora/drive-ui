import { InsertDriveFile } from '@mui/icons-material';
import { Box, Button, Divider, styled, Typography } from '@mui/material';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFullPath } from '../../../api/files';
import { popupActions } from '../../../store/popups';
import { fileSizeFormatter } from '../../../utils/files';
import UserAvatar from '../../layout/Avatar';
import AvatarList from '../../layout/AvatarList';
import { InfoProperties } from './InfoProperties';
import { InfoValues } from './InfoValues';

const sharedUserLimit = 6;

const Info = styled(Box)({
    width: '100%',
    height: '100%',
    borderBottom: 'solid 1px lightgray',
    backgroundColor: 'white',
    display: 'flex',
    flexFlow: 'column nowrap',
    overflow: 'hidden',
});

const InfoHeader = styled(Box)({
    margin: '1rem',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
});

const InfoBox = styled(Box)({
    display: 'flex',
    marginBottom: '20px',
});

const InfoText = styled(Typography)({
    fontSize: '18px',
    margin: '10px 1vw 1px 1vw',
    userSelect: 'noneTUTORIAL PLAYLIST
    CSS Tutorial
    Overview
    The Best Guide to Understand CSS Selectors
    Lesson - 1
    The Ultimate Guide to CSS Background Image
    Lesson - 2
    The Best Guide to Understand CSS Colors
    Lesson - 3
    Your One-Stop Guide to Master the Display Property in CSS
    Lesson - 4
    CSS Box Model
    Lesson - 5
    CSS Grid Layout: The Best Guide To Understand Grid Layout
    Lesson - 6
    CSS Flexbox: The Best Guide To Understand Flex Model
    Lesson - 7
    CSS Grid vs Flexbox
    Lesson - 8
    A Beginner's Guide on How to Create a Navbar in CSS
    Lesson - 9
    CSS Keyframes: A Brief Introduction
    Lesson - 10
    CSS Hover Effect - An Introduction
    Lesson - 11
    Everything You Need to Know About CSS Animation
    Lesson - 12
    A Tutorial to Learn Some Useful CSS Effects for Your Webpage
    Lesson - 13
    Learn How to Add CSS Transitions to Your Webpage
    Lesson - 14
    Position Elements on a Web Page Using CSS Positioning
    Lesson - 15
    What is CSS Responsive Web Design and How to Implement it?
    Lesson - 16
    CSS Tricks: Five Tricks To Enhance Your Web Page
    Lesson - 17
    CSS Advanced Tutorial to Understand the A-Z Of CSS
    Lesson - 18
    Solana Crypto: The Rising Star of the Crypto-Market
    Lesson - 19
    What Is ANOVA? Understanding the Fundamentals of ANOVA
    Lesson - 20
    All You Need to Know About C++ Memory Management
    Lesson - 21
    Everything You Need to Know About CSS
    Lesson - 22
    What is CSS: Overview, Syntax and Advantanges
    Lesson 22 of 22By Aryan Gupta
    
    Last updated on Dec 2, 20214083
    ￼
    Previous
    CSS stands for Cascading Style Sheets. It is a design language intended to simplify the process of making web pages presentable. CSS determines the visual structure, layout, and aesthetics. 
    
    CSS allows you to format the design, style, font, and color of text; set margins and padding; background colors, and border styles. It can also be used to position content on a page.
    
    Post Graduate Program: Full Stack Web Development
    in Collaboration with Caltech CTMEENROLL NOW￼',
});

const InfoAccess = styled(Box)({
    margin: '8px 0.5vw 0 0.5vw',
    display: 'flex',
    flexFlow: 'row nowrap',
    '& .MuiButtonBase-root': {
        padding: '0 0.3vw 0 0',
    },
});

const ImageBox = styled(Box)({
    height: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const SButton = styled(Button)({
    height: '42px',
    width: 'fit-content',
    textTransform: 'none',
    margin: '8px 0.5vw 0 0.5vw',
});

const ImageStyle = {
    color: 'rgb(95, 99, 104)',
    width: '6rem',
    height: '6rem',
};

const options: any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: 'numeric' };

type props = {
    owner: {
        name: string;
        color: string;
    };
    users: {
        name: string;
        color: string;
    }[];
};

const InfoPopup: React.FC<props> = ({ owner, users }) => {
    const dir = i18next.dir(i18next.language);
    const selectedFiles = useSelector((state: any) => state.files.selected);
    const dispatch = useDispatch();
    const [path, setPath] = useState<string | undefined | null>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            setPath(await getFullPath(selectedFiles[0].fsObjectId));
        };
        fetchData();
    }, []);

    return (
        <Info dir={dir}>
            <InfoHeader>
                <Typography>{selectedFiles[0].name}</Typography>
            </InfoHeader>
            <Divider />
            <ImageBox>
                <InsertDriveFile sx={ImageStyle} />
            </ImageBox>
            <Divider />
            <InfoText>{`${i18next.t('titles.PeopleWithAccess')}`}</InfoText>
            <InfoAccess>
                <UserAvatar name={owner.name} color={owner.color} isDisabled={false}></UserAvatar>
                <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2, marginRight: '5px' }} />
                {users.slice(0, sharedUserLimit).map((user: { name: string; color: string }) => {
                    return <UserAvatar name={user.name} color={user.color} isDisabled={false} />;
                })}
                {<AvatarList name={`+`} color={''} extraUsers={users.slice(8, users.length)} />}
            </InfoAccess>
            <SButton
                variant="text"
                onClick={() => {
                    dispatch(popupActions.setInfo());
                    dispatch(popupActions.setShare());
                }}
            >
                {`${i18next.t('buttons.Access')}`}
            </SButton>
            <InfoText>{`${i18next.t('messages.Properties')}`}</InfoText>
            <InfoBox>
                <InfoProperties isDeleted={false}></InfoProperties>
                <InfoValues
                    type={selectedFiles[0].type}
                    size={fileSizeFormatter(selectedFiles[0].size)}
                    permission={selectedFiles[0].permission}
                    modified={new Date(selectedFiles[0].stateUpdatedAt)
                        .toLocaleString('en-GB', options)
                        .replace(' at', ',')}
                    created={new Date(selectedFiles[0].stateCreatedAt)
                        .toLocaleString('en-GB', options)
                        .replace(' at', ',')}
                    parent={path}
                ></InfoValues>
            </InfoBox>
        </Info>
    );
};

export default InfoPopup;
