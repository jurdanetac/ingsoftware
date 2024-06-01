import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Link} from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Página Principal" />
      </ListItemButton>
    </Link>

    <Link to="/clientes" style={{textDecoration: 'none', color: 'white'}}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItemButton>
    </Link>

    <Link to="/transacciones" style={{textDecoration: 'none', color: 'white'}}>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Transacciones" />
      </ListItemButton>
    </Link>

    <Link to="/reportes" style={{textDecoration: 'none', color: 'white'}}>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reportes" />
      </ListItemButton>
    </Link>

    <Link to="/ayuda" style={{textDecoration: 'none', color: 'white'}}>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Ayuda" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
