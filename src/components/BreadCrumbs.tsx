import { Box, Breadcrumbs, Link, styled } from '@mui/material';
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

// TODO: take hierarchy from store
const TableMenuHeader: React.FC<{ hierarchy: string[] }> = (props) => {
    const breadcrumbs: any = [];

    props.hierarchy.forEach((item, index) => {
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
