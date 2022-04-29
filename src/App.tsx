import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    fontSize: 14,
    textTransform: 'capitalize',
  },
}));

const StyledTableRow = styled(TableRow)({
  transition: 'all 1s',
})

interface IProduct {
  product: string;
  type: string;
  quantity: number;
  unitPrice: number;
}

const exampleData: Array<IProduct> = [
  { product: 'water', type: 'drinks', quantity: 10, unitPrice: 1 },
  { product: 'chicken wings', type: 'food', quantity: 3, unitPrice: 5 },
  { product: 'steak', type: 'food', quantity: 1, unitPrice: 9 },
  { product: 'coffee', type: 'drinks', quantity: 4, unitPrice: 2 },
  { product: 'wine bottle', type: 'drinks', quantity: 1, unitPrice: 7 }
]

const style = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function App() {

  const [data, setData] = React.useState<Array<IProduct>>(exampleData);
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState<IProduct>({
    product: '',
    type: '',
    quantity: 0,
    unitPrice: 0,
  });

  const handleOpen = () => {
    setProduct({
      product: '',
      type: '',
      quantity: 0,
      unitPrice: 0,
    })
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (product.product && product.type) {
      setData([...data, product]);
    }
    setOpen(false);
  }

  const handleChange = (key: string, value: any) => {
    setProduct({ ...product, [key]: value });
  }

  const handleRemove = (value: string) => {
    setData(data.filter(item => item.product !== value));
  }


  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Button variant="contained" onClick={handleOpen}>Add a product</Button>
        <Table sx={{ my: 2 }}>
          <TableHead>
            <TableRow>
              {Object.keys(data[0]).map((key, index) => (
                <StyledTableCell key={index}>{key}</StyledTableCell>
              ))}
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={index}>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unitPrice}</TableCell>
                <TableCell>
                  <Button variant='contained' onClick={() => handleRemove(item.product)}>Remove</Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Add a Product
          </Typography>
          <TextField
            sx={{ my: 2, width: '100%' }}
            label="Product"
            variant="outlined"
            value={product.product}
            onChange={(e) => handleChange('product', e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="label">Type</InputLabel>
            <Select
              labelId="label"
              sx={{ my: 2, width: '100%' }}
              value={product.type}
              onChange={(e) => handleChange('type', e.target.value)}
            >
              <MenuItem value={'drinks'}>drinks</MenuItem>
              <MenuItem value={'food'}>food</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ my: 2, width: '100%' }}
            label="Quantity"
            variant="outlined"
            value={product.quantity}
            onChange={(e) => handleChange('quantity', e.target.value)}
            type="number"
          />
          <TextField
            sx={{ my: 2, width: '100%' }}
            label="Unit Price"
            variant="outlined"
            value={product.unitPrice}
            onChange={(e) => handleChange('unitPrice', e.target.value)}
            type="number"
          />
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </Box>
      </Modal>
    </Container>
  );
}
