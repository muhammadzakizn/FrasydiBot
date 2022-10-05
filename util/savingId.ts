import { proto } from '@adiwajshing/baileys'
import  save  from '../saveContact'
const {saveContact, saveGrup} = save
export default async function saving(messages:proto.IWebMessageInfo[]) {

    if(messages[0].key.participant != null && messages[0].key.remoteJid != "status@broadcast") {
        saveGrup(messages[0].key.remoteJid||"")
        saveContact(messages[0].pushName || "", messages[0].key.participant||"")
        return
    }
    saveContact(messages[0].pushName || "", messages[0].key.remoteJid||"")
    
}