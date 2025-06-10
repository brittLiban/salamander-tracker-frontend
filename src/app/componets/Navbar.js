'use client';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Salamander Tracker
        </Typography>

        <Box display="flex" gap={2}>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/videos">
            Videos
          </Button>
          <Button color="inherit" component={Link} href="/jobs">
            Jobs
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
