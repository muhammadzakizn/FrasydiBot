import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
export default {
    keys : /promote|promosi/i,
    
    functions: async (sock:WASocket, {currentChats, name, textArr, quoted, messages, isGroup, isAdmin}:datas) => {
        
        if(!isGroup) {
             await sock.sendMessage(currentChats, {text:"Command ini hanya bisa digunakan di grup"})
            return    
        }
        if(!isAdmin) {
            return await sock.sendMessage(currentChats, {text: "Command ini hanya bisa digunakan oleh admin"})
        }
        const newtextArr = textArr.map(el => el.trim().split("@").join("")+"@s.whatsapp.net")
        console.log(newtextArr)
      
       


        if(textArr[0] != null) {
            try {
                await sock.groupParticipantsUpdate(
                    currentChats, newtextArr , "promote"
                )
                await sock.sendMessage(currentChats, {text: "Berhasil promosi "+textArr.join(", "), mentions: newtextArr})
            }catch(err) {
                console.log(err)
                await sock.sendMessage(currentChats, {text: "Gagal promosi "+textArr.join(", "), mentions : newtextArr})
            }
            return
        } else if(quoted?.quotedMessage != null) {
            try {
                await sock.groupParticipantsUpdate(
                    currentChats, [quoted.participant||""],"promote"
                )
                await sock.sendMessage(currentChats, {text: "Berhasil promosi @"+quoted.participant?.split("@").at(0), mentions: [quoted.participant||""]})
            }catch(err) {
                await sock.sendMessage(currentChats, {text: "Gagal promosi @"+quoted.participant?.split("@").at(0), mentions: [quoted.participant||""]})
            }
            return
        }
        await sock.sendMessage(currentChats, {text:"Anda harus mention atau menquoted seseorang"}, {quoted:messages})
    }
}