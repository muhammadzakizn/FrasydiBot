import * as fs from "fs"
export async function contactReader() {
    const contact = JSON.parse(fs.readFileSync("../contact.json") as unknown as string)
    return contact
}

export async function grupReader() {
    const grup = JSON.parse(fs.readFileSync("../grup.json") as unknown as string)
    return grup
}