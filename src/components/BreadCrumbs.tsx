import { Box, Breadcrumbs, Link, styled } from '@mui/material';
import i18next from 'i18next';
import { Key } from 'react';
import { useSelector } from 'react-redux';
import HeaderMenu from './HeaderMenu';

const StyledBreadcrumb = styled(Link)({
    padding: '4px',
    '&:hover': {
        textDecoration: 'none',
        backgroundColor: 'rgba(0,0,0,.04)',
        borderRadius: '4px',
    },
    display: 'flex',
});

const HeaderBar = styled(Box)({
    width: '100%',
    height: '40px',
    borderBottom: 'solid 1px lightgray',
    display: 'flex',
    justifyContent: 'space-between',
});

type props = {
    title: string;
};

const TableMenuHeader: React.FC<props> = ({ title }) => {
    const breadcrumbs: any = [];

    const hierarchy = useSelector((state: any) => state.files.hierarchy);

    const breadcrumbsContent = hierarchy.length ? hierarchy : [title];

    breadcrumbsContent.forEach((item: any, index: number) => {
        breadcrumbs.push(
            <StyledBreadcrumb key={index} href={`/`} underline="hover" color="inherit">
                {item}
            </StyledBreadcrumb>,
        );
    });

    return (
        <HeaderBar>
            <Breadcrumbs sx={{ fontSize: '1.1rem', width: '70%' }} separator=">" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <HeaderMenu />
        </HeaderBar>
    );
};

export default TableMenuHeader;
