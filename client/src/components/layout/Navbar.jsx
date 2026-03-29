import { Group, Button, Text, Container, Box } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box 
      component="nav" 
      style={{ 
        borderBottom: '1px solid var(--mantine-color-default-border)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        backgroundColor: 'var(--mantine-color-body)',
        backdropFilter: 'blur(8px)',
        // opacity: 0.98
      }}
    >
      <Container size="lg">
        <Group justify="space-between" h={64}>
          <Text 
            fw={800} 
            size="xl" 
            component={Link} 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              color: 'var(--mantine-color-text)',
              letterSpacing: '-0.5px'
            }}
          >
            useJetLag ✈️
          </Text>
          
          <Group gap="xs">
            <Button variant="subtle" component={Link} to="/explore">Explore</Button>
            {isLoggedIn && <Button variant="subtle" component={Link} to="/trip">My Trips</Button>}
            {isLoggedIn && (
              <Button 
                variant="filled" 
                component={Link} 
                to="/get-started-upload"
                radius="xl"
                color="blue"
              >
                New Trip
              </Button>
            )}

            {!isLoggedIn && <Button variant="subtle" component={Link} to="/login">Login</Button>}
            
            {isLoggedIn
              ? <Button variant="outline" radius="xl" onClick={() => { logout(); navigate('/'); }}>Logout</Button>
              : <Button variant="filled" component={Link} to="/register" radius="xl" color="blue">Sign Up</Button>
            }
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
