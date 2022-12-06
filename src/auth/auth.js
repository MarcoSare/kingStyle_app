const getToken =  () =>{
    const token = localStorage.getItem("kingstyle_token")
        if(token===null)
           return null
        else
            return token;       
}


export default {getToken}

