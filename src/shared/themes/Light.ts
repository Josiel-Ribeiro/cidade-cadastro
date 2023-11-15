import { createTheme } from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";

export const LightTheme = createTheme({
    palette:{
    primary:{
        main:yellow[700] ,
        light:yellow[800],
        dark:yellow[500],
        contrastText:"#ffffff",
    },
    secondary:{
        main:cyan[700] ,
        light:cyan[800],
        dark:cyan[500],
        contrastText:"#ffffff",
    },background:{
        default:"f7f6f3",
        paper:"#ffffff"
    }
    }
})