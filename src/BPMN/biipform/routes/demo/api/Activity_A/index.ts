import { Result, Params } from "./config";
    import RouterRequest from "../../../../../../monoCommon/RouterRequest"; 
    import { User } from "../../../../../../server/models/User";
    import RouterError from "../../../../../../monoCommon/RouterError";
    
    export async function method(
        user: User,
        params: Params, routerRequest: RouterRequest
        ): Promise<RouterError | Result> {
              console.log("params", params);  
              return null;
    }    