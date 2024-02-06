import initTenants from "./initTenants";
import initUsers from "./initUsers";

const initData = async () => {
  await initUsers();
  await initTenants()
}

export default initData;
