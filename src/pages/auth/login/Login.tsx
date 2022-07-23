import {API} from "../../../DAL/API";
import {useDispatch, useSelector} from "react-redux";
import {handlerNetworkError} from "../../../utils/HandlerErrorsUtils";
import {AppStoreType} from "../../app/store";

export const Login = () => {

const dispatch=useDispatch()

        const testRegister = () => {
          API.authMe().then((res)=>{
                  console.log(res)
              })
              .catch((e)=>{
              handlerNetworkError(dispatch,e)
          })
        }


    return (
        <div>
            <button onClick={testRegister}>fetch</button>
        </div>
    )
}