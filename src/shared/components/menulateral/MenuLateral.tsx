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
import { useAuthContext, useContextTheme, useDrawerContext } from "../../context";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface IListItemLinkProps {
  label: string;
  icon: string;
  to: string;
  onClick: (() => void) | undefined;
}

const ListItemLink = ({ icon, label, onClick, to }: IListItemLinkProps) => {
  const navigate = useNavigate();

  const resolvePath = useResolvedPath(to);
  const match = useMatch({ path: resolvePath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };
  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toogleDrawerOpen,drawerOptions } = useDrawerContext();
  const {toogleTheme} = useContextTheme()
  const {logout} = useAuthContext()
  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toogleDrawerOpen}
      >
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
              {
                drawerOptions.map(item =>
                  
                  <ListItemLink
                  key={item.patch}
                icon={item.icon}                
                label={item.label}
                to={item.patch}
                onClick={smDown ? toogleDrawerOpen : undefined}
              />
                  
                  )
              }
            </List>
          </Box>

          <Box >
            <List component="nav">
            <ListItemButton onClick={toogleTheme}>
      <ListItemIcon>
        <Icon>dark_mode</Icon>
      </ListItemIcon>
      <ListItemText primary={"Alternar tema"} />
    </ListItemButton>


    <ListItemButton onClick={logout}>
      <ListItemIcon>
        <Icon>logout</Icon>
      </ListItemIcon>
      <ListItemText primary={"Sair"} />
    </ListItemButton>

            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height={"100vh"} marginLeft={smDown ? "0" : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
