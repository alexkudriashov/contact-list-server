import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if(token== "undefined") {
            res.status(401).json({message: 'You aren\'t authorized'})
        }
        const isCustomAuth = token.length < 500
        let decodedData
        
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.SECRET)
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        next()
    } catch (e) {
        console.log(e)
    }
}

export default auth