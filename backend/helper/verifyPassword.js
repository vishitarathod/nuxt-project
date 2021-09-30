import bcrypt from 'bcrypt';
export function verifyPassword(plainPass,encPass){
    return new Promise((resolve,reject)=>{
        return bcrypt.compare(plainPass,encPass)
        .then(async(res)=>{
            if(res){
                resolve(true)
            }else{
                reject(false)
            }
        }).catch((e)=>{
            reject(false)
        })
    })
}