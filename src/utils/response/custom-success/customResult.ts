import {SuccesResponse} from "./types"

export const customResult = (status_code : number,message : string,data? : any[] | {} ) :SuccesResponse => {
    const result = {
        status : status_code,
        message,
        data
    }
    return result;
}