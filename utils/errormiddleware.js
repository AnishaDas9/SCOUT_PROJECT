
const errormiddleware = (err, req, res, next)=>{

   

    err.message ||= "Error from Server side";
    err.statuscode ||= 500;
    
    res.status(err.statuscode)
    .json({
        success: false,
        message: err.message
    })
}

class error extends Error{

    constructor(message, statuscode){
        super(message);
        this.statuscode = statuscode;
    }

}

export {errormiddleware, error}