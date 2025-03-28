
import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Footer from "@/components/Footer";

const Layout = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth() || {};
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const isActive = (path) => location.pathname === path;
  const isAdmin = user?.role === 'admin';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" color="default" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <Box sx={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                bgcolor: 'primary.main', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'primary.contrastText',
                mr: 1
              }}>
                <Typography variant="h6">M</Typography>
              </Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'text.primary',
                }}
              >
                MushroomID
              </Typography>
            </Box>

            {/* Mobile menu icon */}
            {isMobile && (
              <IconButton
                size="large"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ ml: 'auto' }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Desktop navigation links */}
            {!isMobile && (
              <>
                <Box sx={{ flexGrow: 1, display: 'flex', mx: 4 }}>
                  <Button
                    component={RouterLink}
                    to="/"
                    sx={{ 
                      my: 2, 
                      color: isActive('/') ? 'primary.main' : 'text.primary', 
                      display: 'block',
                      fontWeight: isActive('/') ? 700 : 400
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/feedback"
                    sx={{ 
                      my: 2, 
                      color: isActive('/feedback') ? 'primary.main' : 'text.primary', 
                      display: 'block',
                      fontWeight: isActive('/feedback') ? 700 : 400
                    }}
                  >
                    Feedback
                  </Button>
                  {isAuthenticated && (
                    <Button
                      component={RouterLink}
                      to="/recent-searches"
                      sx={{ 
                        my: 2, 
                        color: isActive('/recent-searches') ? 'primary.main' : 'text.primary', 
                        display: 'block',
                        fontWeight: isActive('/recent-searches') ? 700 : 400
                      }}
                    >
                      Recent Searches
                    </Button>
                  )}
                  {isAdmin && (
                    <Button
                      component={RouterLink}
                      to="/admin/dashboard"
                      sx={{ 
                        my: 2, 
                        color: location.pathname.startsWith('/admin') ? 'primary.main' : 'text.primary', 
                        display: 'block',
                        fontWeight: location.pathname.startsWith('/admin') ? 700 : 400
                      }}
                    >
                      Admin
                    </Button>
                  )}
                </Box>

                {/* User menu or login button */}
                <Box sx={{ flexGrow: 0 }}>
                  {isAuthenticated ? (
                    <>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar sx={{ bgcolor: 'primary.light' }}>
                          {user?.name?.charAt(0).toUpperCase()}
                        </Avatar>
                      </IconButton>
                      <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={handleCloseUserMenu} component={RouterLink} to="/profile">
                          <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu} component={RouterLink} to="/recent-searches">
                          <Typography textAlign="center">Recent Searches</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Button 
                      component={RouterLink}
                      to="/auth"
                      variant="contained"
                      color="primary"
                    >
                      Login
                    </Button>
                  )}
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem>
              <ListItemText 
                primary="MushroomID" 
                primaryTypographyProps={{ variant: 'h6', color: 'primary' }}
              />
            </ListItem>
            <Divider />
            
            <ListItemButton component={RouterLink} to="/">
              <ListItemText primary="Home" />
            </ListItemButton>
            
            <ListItemButton component={RouterLink} to="/feedback">
              <ListItemText primary="Feedback" />
            </ListItemButton>
            
            {isAuthenticated && (
              <>
                <ListItemButton component={RouterLink} to="/profile">
                  <ListItemText primary="Profile" />
                </ListItemButton>
                
                <ListItemButton component={RouterLink} to="/recent-searches">
                  <ListItemText primary="Recent Searches" />
                </ListItemButton>
              </>
            )}
            
            {isAdmin && (
              <ListItemButton component={RouterLink} to="/admin/dashboard">
                <ListItemText primary="Admin Dashboard" />
              </ListItemButton>
            )}
            
            <Divider />
            
            {isAuthenticated ? (
              <ListItemButton onClick={logout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            ) : (
              <ListItemButton component={RouterLink} to="/auth">
                <ListItemText primary="Login / Register" />
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
