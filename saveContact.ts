import * as fs from "fs"
async function saveContact(contactName:string, id :string) {
    console.log(id)
    const file = fs.readFileSync("contact.json")
    const contact = JSON.parse(file as unknown as string);
    
    contact[id] = contactName

    fs.writeFileSync("contact.json",JSON.stringify(contact,null, 2))
    console.log(contact)
}
async function saveGrup(grupid:string) {
    const file = fs.readFileSync("grup.json")
    const grup: Array<any> = JSON.parse(file as unknown as string);
    
    const find = grup.findIndex(el => el === grupid)
    if(find == -1) {
        grup.push(grupid)
    }
    fs.writeFileSync("grup.json", JSON.stringify(grup, null, 2))
}



export default {saveContact, saveGrup}
