import { useNavigate, useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../components";
import { LayoutBaseDePagina } from "../../layouts";
import { useEffect, useMemo, useState } from "react";
import {
  IListagemPessoas,
  PessoaServices,
} from "../../services/api/pessoas/PessoasServices";
import { useDebounce } from "../../hooks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { Environment } from "../../environments";

export const ListagemDePessoas = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useNavigate()

  const [rows, setRows] = useState<IListagemPessoas[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [itemDelete, setItemDelete] = useState(0);

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      PessoaServices.getAll(pagina, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }, [busca, pagina]);

  const handleDelete = () => {
    PessoaServices.deleteById(itemDelete).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        let newRows = rows.filter((row) => row.id !== itemDelete);
        setRows(newRows);
        setOpen(false);
      }
    });
  };

  const opemAviso = (id: number) => {
    setOpen(true);
    setItemDelete(id);
   
  };

 
  return (
    <LayoutBaseDePagina
      titulo="Listagem de Pessoas"
      BarraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova"
          mostrarInputBusca
          textoDaBusca={busca}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: "1" }, { replace: true })
          }
        aoClicarEmNovo={()=>navigate('/pessoas/detalhe/nova')}
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={200}>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton onClick={() => opemAviso(row.id)} size="small">
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton onClick={()=> navigate(`/pessoas/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.LIMITITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(
                      totalCount / Environment.LIMITITE_DE_LINHAS
                    )}
                    onChange={(_, newPage) =>
                      setSearchParams({ busca, pagina: newPage.toString() },{ replace: true })
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>{"AVISO"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja Realmente excluir esse registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleDelete}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </LayoutBaseDePagina>
  );
};
