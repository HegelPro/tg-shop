import { Button } from "@mui/material";

const ADD_PRODUCT = "В корзину";
const REMOVE_PRODUCT = "Убрать из корзины";

interface CounterProps {
  ones?: boolean;
  counter?: number;
  onAdd: () => void;
  onRemove: () => void;
}
export const Counter = ({ counter = 0, onAdd, onRemove }: CounterProps) =>
  counter === 0 ? (
    <Button onClick={onAdd}>{ADD_PRODUCT}</Button>
  ) : (
    <Button onClick={onRemove}>{REMOVE_PRODUCT}</Button>
  );

// export const Counter = ({ counter, onAdd, onRemove }: CounterProps) => (
//   <Box>
//     <IconButton disabled={counter ? counter <= 0 : true} onClick={onRemove}>
//       <Remove fontSize="large" />
//     </IconButton>
//     <Typography>{counter}</Typography>
//     <IconButton
//       // Make in undefind if we don't have infinit amount of product
//       // disabled={
//       //   productCounter.counter >= productCounter.data.numberOfproduct
//       // }
//       onClick={onAdd}
//     >
//       <Add fontSize="large" />
//     </IconButton>
//   </Box>
// );
