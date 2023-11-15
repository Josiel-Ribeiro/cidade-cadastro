import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { useDrawerContext } from "../../context";
import axios from "axios"

export const MenuLateral = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
 const smDown = useMediaQuery(theme.breakpoints.down('sm'))
 const {isDrawerOpen,toogleDrawerOpen} = useDrawerContext()
  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown? "temporary":"permanent"} onClose={toogleDrawerOpen}>
        <Box
          width={theme.spacing(28)}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box
            width={"100%"}
            height={theme.spacing(20)}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="/ativo.jpg"
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Pagina Inicial" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height={ "100vh"} marginLeft={ smDown?"0" : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};


