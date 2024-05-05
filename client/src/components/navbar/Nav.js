import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import SortSharpIcon from '@mui/icons-material/SortSharp';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Updated styled components with custom colors and class name
const CustomStyledAppBar = styled(AppBar)(({ theme }) => ({
    borderRadius: theme.spacing(1),
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'blue', // Change background color to blue
    '&.custom-navbar': { // Add custom class name
        backgroundColor: 'blue', // Change background color to red when using custom class
    },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
}));

const Logo = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    },
}));

const AnimatedIconsContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

const NavBar = ({ customClass }) => { // Receive custom class as props
    const [showIcons, setShowIcons] = useState(false);
    const [count, setCount] = useState(0);
    const navigation = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/getVocabularyList');
                if (response.data && response.data.count) {
                    setCount(response.data.count);
                }
            } catch (error) {
                console.error('Error fetching count:', error);
            }
        }

        setShowIcons(true);
        fetchData();
    }, []);
    

    return (
        <CustomStyledAppBar position="static" className={`custom-navbar ${customClass}`}> {/* Add custom class */}
            <StyledToolbar>
                <Logo variant="h1" component="div">
                    Never Give Up
                </Logo>
                <AnimatedIconsContainer>
                    <Slide direction="down" in={showIcons} timeout={500}>
                        <div>
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                aria-label="Create Vocabulary"
                                onClick={() => navigation('/')}
                            >
                                <AddSharpIcon />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                aria-label="Notifications"
                                onClick={() => navigation('/list')}
                            >
                                <Badge badgeContent={count} color="error">
                                    <SortSharpIcon />
                                </Badge>
                            </IconButton>
                        </div>
                    </Slide>
                </AnimatedIconsContainer>
            </StyledToolbar>
        </CustomStyledAppBar>
    );
};

export default NavBar;
