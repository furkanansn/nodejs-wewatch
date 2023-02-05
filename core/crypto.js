const crypto = require("crypto");

class Crypto{
    
    algorithm = "aes-256-cbc"; 
    initVector = crypto.randomBytes(16)
    Securitykey = crypto.randomBytes(32)

    encrypt = (data) => {
                        
        const cipher = crypto.createCipheriv(this.algorithm, this.Securitykey, this.initVector);
        let encryptedData = cipher.update(data, "utf-8", "hex");
        encryptedData += cipher.final("hex");

        return encryptedData
    }

    decrypt = (data) => {
        const decipher = crypto.createDecipheriv(this.algorithm, this.Securitykey, this.initVector);

        let decryptedData = decipher.update(data, "hex", "utf-8");
        
        decryptedData += decipher.final("utf8");

        return decryptedData
    }
}

module.exports = Crypto