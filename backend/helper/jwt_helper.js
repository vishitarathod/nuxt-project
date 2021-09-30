import JWT from 'jsonwebtoken'
// import dotenv from "dotenv";
// dotenv.config()

//generate access token
export function signAccessToken(userId) {
    console.log('+++++++',userId)
    return new Promise((resolve, reject) => {
        const payload={}
        const secret = process.env.secret;
        const option = {
            expiresIn: '20s',
            audience:userId
        };
        //generate token
        JWT.sign(payload, secret, option, (err, token) => {
            if (err) {
                console.log(err);
                return reject(Error());
            }
            resolve(token);
        });
    });
}


//verify access token
export function verifyAccessToken(req, res, next) {
    if (!req.headers['authorization'])
        return next(Error());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    //verify token
    JWT.verify(token,process.env.secret, (err, payload) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Unauthorized' });
            } else {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        }
        // req.payload = payload;
        const userId=payload.aud
        res.locals.userID=userId;
        next();
    });
}

//generate refresh token
export function signReferesToken(userId) {
    return new Promise((resolve, reject) => {
        const payload={}
        const secret = process.env.secretRef
        const option = {
            expiresIn: '15h',
            audience:userId
        };
        //generate token
        JWT.sign(payload, secret, option, (err, token) => {
            if (err) {
                console.log(err);
                return reject(Error());
            }
            resolve(token);
        });
    });
}

//verify refresh token
export async function veifyRefreshToken(token){
    try {
        // console.log("token+++++",token)
     const payload= await JWT.verify(token,process.env.secretRef)
    //  console.log(payload)
     return payload.aud
    } catch (error) {
        return error
    }
 }