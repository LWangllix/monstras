import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Pending from "../components/register/Pending";
import Registration from "../components/register/Registration";
import { Permissions } from "../config";
import api from "../server/routers/api";
import { UserContext } from "../utils/AppContextProvider";
import { personTypes } from "../utils/constants";

const Anketa = () => {
  const [companyName, setCompanyName] = useState<string>();
  const [companyCode, setCompanyCode] = useState<string>();
  const { user, hasPermission } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    if (hasPermission(Permissions.User.id)) {
      router.push("/");
      return;
    }
    axios.get("/api/userInfo").then((res) => {
      const data = res.data;
      const { companyCode, companyName } = data;
      setCompanyCode(companyCode);
      setCompanyName(companyName);
      setLoading(false);
    });
  }, [user.user.id]);

  if (loading) return <div />;

  // @ts-ignore
  if (user.user.permission.user === Permissions.User.statuses.PENDING) {
    return <Pending />;
  }

  return (
    <Registration
      onSubmit={(v) => {
        const { person_type, tenant_code, tenant_name, phone_number, email } =
          v;
        const legalPerson = person_type.value === personTypes.legalPerson.value;
        api.users
          .askRegistration({
            companyCode: (legalPerson && tenant_code) || null,
            companyName: (legalPerson && tenant_name) || null,
            email: email,
            phone: phone_number,
            legalPerson,
          })
          .then(() => location.reload());
      }}
      submitText="Tęsti"
      initialValues={{
        person_type: companyName
          ? personTypes.legalPerson
          : personTypes.individual,
        phone_number: user.user.phone,
        email: user.user.email,
        tenant_code: companyName,
        tenant_name: companyCode,
      }}
    />
  );
};
export default Anketa;
