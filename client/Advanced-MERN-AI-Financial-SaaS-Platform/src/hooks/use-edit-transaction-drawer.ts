import {
  useQueryState,
  parseAsBoolean,
  parseAsString,
} from "nuqs";

const useEditTransactionDrawer = () => {
  const [open, setOpen] = useQueryState("edit", parseAsBoolean.withDefault(false));
  const [transactionId, setTransactionId] = useQueryState("transactionId", parseAsString.withDefault(""));

  const onOpenDrawer = (id: string) => {
    setTransactionId(id);
    setOpen(true);
  };

  const onCloseDrawer = () => {
    setTransactionId("");
    setOpen(false);
  };

  return { open, transactionId, onOpenDrawer, onCloseDrawer };
};

export default useEditTransactionDrawer;
