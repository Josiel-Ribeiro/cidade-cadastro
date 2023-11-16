import { Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import Box from "@mui/material/Box"
import { ReactNode } from "react"
import { useDrawerContext } from "../context"


interface ILayoutBaseDePagina{
    children:ReactNode
    titulo:string
    BarraDeFerramentas?:ReactNode
  }

export const LayoutBaseDePagina = ({children,titulo,BarraDeFerramentas}:ILayoutBaseDePagina)=>{

const theme = useTheme()
const smDawn = useMediaQuery(theme.breakpoints.down('sm'))
const mdDawn = useMediaQuery(theme.breakpoints.down('md'))
const {toogleDrawerOpen} = useDrawerContext()

    return(
        <Box sx={{height:"100%", display:"flex", flexDirection:"column", gap:1}}>
           <Box sx={{padding:1 ,height:theme.spacing(smDawn? 6:mdDawn?8 : 12)}} display={"flex"} alignItems={'center'} gap={1}>
             {
                smDawn && <IconButton onClick={toogleDrawerOpen}>
                <Icon>menu</Icon>
             </IconButton>
             }


            <Typography
             variant={smDawn?'h5': mdDawn? 'h4':'h3'}
              sx={{
                overflow:"hidden",
                whiteSpace:"nowrap",
                textOverflow:"ellipsis"
              }}
              >
              
            {titulo}
            </Typography>
          
           </Box>
         
       {
        BarraDeFerramentas && (
          <Box>
          {BarraDeFerramentas}
          
       </Box>
        )
       }
        
       <Box sx={{
        flex:1,
        overflow:"auto"
       }}>
        {children}
       </Box>
        </Box>
    )
}