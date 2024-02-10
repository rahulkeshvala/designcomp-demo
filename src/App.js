import React, { useEffect, useRef, useState } from 'react';
import ThemeProvider from './theme';
import Home from './page/Home';
import Topbar from './page/Topbar';
import axios from 'axios';
import AddPost from './page/AddPost';

const App = () => {
    const useref = useRef(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetchData, setFetchData] = useState([]);
    const [isSearch, setIsSearch] = useState('');

    const AllData = JSON.parse(localStorage.getItem('data'));
    useref.current = 0;
    useEffect(() => {
        if (!useref.current) {
            mainFunction();
            useref.current = true;
        }
        // eslint-disable-next-line
    }, []);

    const mainFunction = () => {
        if (AllData) {
            setLoading(true);
            setFetchData(AllData);
            setLoading(false);
        } else {
            fetch();
        }
    };

    const fetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `https://jsonplaceholder.typicode.com/posts`
            );
            if (res.status === 200) {
                localStorage.setItem('data', JSON.stringify(res.data));
                setFetchData(res.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <ThemeProvider>
            <Topbar
                isSearch={isSearch}
                setIsSearch={setIsSearch}
                setOpen={setOpen}
            />
            <Home loading={loading} fetchData={fetchData} isSearch={isSearch} />
            <AddPost
                open={open}
                onClose={setOpen}
                mainFunction={mainFunction}
                setFetchData={setFetchData}
            />
        </ThemeProvider>
    );
};

export default App;
