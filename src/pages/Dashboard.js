import { Container } from '@mui/material';
import Info from '../components/Dashboard/Info.js';
import Navigation from '../components/Dashboard/Navigation.js';
import Readme from '../components/Dashboard/Readme.js';
import ForceNotice from '../components/Dashboard/ForceNotice.js';

function Dashboard() {
  return (
    <>
      <Container sx={{ display: 'flex' }}>
        <Info />
        <Readme />
        <Navigation />
      </Container>
      <ForceNotice />
    </>
  );
}

export default Dashboard;
