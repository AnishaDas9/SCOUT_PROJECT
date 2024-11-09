

const wrapper = (controller)=>{
    return async(req, res, next)=>{//js will automatically handle extra parameter like if we don't pass next
        try {

            await controller(req, res, next);//it will call here by () in parameter there is only reference:

        } catch (error) {
            
            next(error);//if you pass error by calling next if will be go to error middleware in app.js by default behaviour of node
        }
    }
}

export default wrapper