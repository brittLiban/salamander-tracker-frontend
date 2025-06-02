'use client';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Salamander Tracker
        </Typography>
        <Button color="inherit" component={Link} href="/videos">
          Videos
        </Button>
      </Toolbar>
    </AppBar>
  );
}
