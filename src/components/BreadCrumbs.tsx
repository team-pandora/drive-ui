import { Box, Breadcrumbs, Link, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { filesActions } from '../store/files';
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
    const dispatch = useDispatch();
    const breadcrumbs: any = [];

    const hierarchy = useSelector((state: any) => state.files.hierarchy);

    const breadcrumbsContent = hierarchy.length ? hierarchy : [title];

    const handleClick = (event: any, item: any) => {
        event.preventDefault();
        console.log('sdafsdafd', item);

        dispatch(filesActions.setHierarchy({ type: 'replace', content: item }));
    };

    breadcrumbsContent.forEach((item: any, index: number) => {
        breadcrumbs.push(
            <StyledBreadcrumb
                onClick={(event) => handleClick(event, item)}
                key={index}
                href={`/`}
                underline="hover"
                color="inherit"
            >
                {item === title ? item : item.name}
            </StyledBreadcrumb>,
        );
    });

    return (
        <HeaderBar>
            <Breadcrumbs sx={{ fontSize: '1.1rem', width: '70%' }} separator=">" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <HeaderMenu page={title} />
        </HeaderBar>
    );
};

export default TableMenuHeader;
