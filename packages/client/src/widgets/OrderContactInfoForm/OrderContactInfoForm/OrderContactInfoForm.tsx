import { Stack, TextField } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { routingPaths } from "shared/config/routingPaths";
import { BackButtonProvider } from "shared/ui/BackButtonProvider/BackButtonProvider";
import { MainButtonProvider } from "shared/ui/MainButtonProvider/MainButtonProvider";

const TEXT = "Отправить контактные данные";
const FULLNAME_LABEL = "ФИО";
const EMAIL_LABEL = "Электронная почта";
const TEL_LABEL = "Контактный телефон";

export const OrderContactInfoForm = () => {
  const navigate = useNavigate();

  const toOrderContactInfoFormPage = useCallback(() => {
    navigate(routingPaths.ProductListPage);
  }, [navigate]);

  const toOrderListPage = useCallback(() => {
    navigate(routingPaths.OrderListPage);
  }, [navigate]);

  return (
    <MainButtonProvider show text={TEXT} onClick={toOrderListPage}>
      <BackButtonProvider show onClick={toOrderContactInfoFormPage}>
        <Stack
          spacing={2}
          component="form"
        >
          <TextField
            label={FULLNAME_LABEL}
            // name="name"
            variant="standard"
          />
          <TextField
            label={EMAIL_LABEL}
            type="email"
            variant="standard"
          />
          <TextField
            label={TEL_LABEL}
            type="tel"
            variant="standard"
          />
        </Stack>
      </BackButtonProvider>
    </MainButtonProvider>
  );
};
