import React, { useState } from 'react'
import { Backdrop, Box, Card, CircularProgress, Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import Image from '../components/Image'
import dummy from '../assets/dummy-image-square.jpg'

const hideScrollbar = {
    height: "93vh",
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        width: 5,
        borderRadius: 10
    },
    '&::-webkit-scrollbar-track': {
        background: '#161C24',
        borderRadius: 10
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#355a8b',
        borderRadius: 10
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555'
    },
};

const Home = (props) => {
    const { fetchData, loading, isSearch } = props;

    const [page, setPage] = useState(1)

    const handleChangeinvoicePage = (event, newPage) => {
        setPage(newPage)
    };

    const resulListtarray = () => {
        if (isSearch.length) {
            return fetchData.filter((x) => (x?.title).toLowerCase().includes(isSearch.toLowerCase()))
        } else {
            return fetchData
        }
    }

    const rowPerPage = 9
    const countVal = Math.ceil(resulListtarray()?.length / rowPerPage);
    const begin = (page - 1) * rowPerPage;
    const end = begin + rowPerPage;

    return (
        <Box sx={{ ...hideScrollbar }}>
            <Container sx={{ py: 5 }}>
                <Backdrop open={loading} sx={{ zIndex: 1000, color: '#fff' }}>
                    <CircularProgress color="info" />
                </Backdrop>
                <Grid container spacing={3}>
                    {resulListtarray().slice(begin, end).map((obj, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ height: "100%" }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <Image alt={"dummy"} src={dummy} ratio="21/9" />
                                    </Box>
                                    <Stack spacing={2} sx={{ p: 3 }}>
                                        <Typography variant="h6" noWrap>
                                            {obj.title}
                                        </Typography>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                                            <Stack direction="row" spacing={0.5}>
                                                <Typography variant="body2" >{obj.body}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
                {fetchData.length && <Box sx={{ my: 2 }}>
                    <Grid container justifyContent={'center'}>
                        <Grid item>
                            <Pagination
                                count={countVal}
                                variant="outlined"
                                shape="rounded"
                                onChange={handleChangeinvoicePage}
                                page={page}
                                data-test-id="paginationTestId"
                            />
                        </Grid>
                    </Grid>
                </Box>}
            </Container>
        </Box>
    )
}

export default Home;