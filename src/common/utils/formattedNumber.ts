export const formattedNumber  = (phone:string|undefined)=>{
    if(phone){
        return `+1 ${phone.substring(1, 4)} ${phone.substring(4, 7)} ${phone.substring(7)}`
    }else{
        return 'Not data'
    }
}