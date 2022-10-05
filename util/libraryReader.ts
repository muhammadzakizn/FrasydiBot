import path from "path"
import * as fs from "fs"
export default function readDir() {
    const library = fs.readdirSync(path.join(__dirname, "../library"))
    const result:any = []
    library.forEach(el => {
        const hasil = require(path.join(__dirname,"../library", el)).default
        result.push(hasil)        
    })
    console.log(result)
    return result
}

