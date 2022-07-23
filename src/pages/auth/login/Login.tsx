import {API} from "../../../DAL/API";
import {useDispatch, useSelector} from "react-redux";
import {handlerNetworkError} from "../../../utils/HandlerErrorsUtils";
import {AppStoreType} from "../../app/store";

export const Login = () => {
// const error=useSelector((state:AppStoreType)=>state.error.errors)
const dispatch=useDispatch()

        const testRegister = () => {
          API.authRegister({email:`goropashnyj9000@gmail.com`,password:'123'})
              .then((res)=>{
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