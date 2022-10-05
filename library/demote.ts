import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
export default {
    keys : /demote/i,
    
    functions: async (sock:WASocket, {currentChats, name, textArr, quoted, messages}:datas) => {
        const newtextArr = textArr.map(el => el.trim().split("@").join("")+"@s.whatsapp.net")
        console.log(quoted.quotedMessage)
        if(textArr[0] != null) {
            try {
                await sock.groupParticipantsUpdate(
                    currentChats, newtextArr , "demote"
                )
                await sock.sendMessage(currentChats, {text: "Berhasil demote "+textArr.join(", "), mentions: newtextArr})
            }catch(err) {
                console.log(err)
                await sock.sendMessage(currentChats, {text: "Gagal demote "+textArr.join(", "), mentions: newtextArr})
            }
            return
        }else if(quoted?.quotedMessage != null) {
            try {
                await sock.groupParticipantsUpdate(
                    currentChats, [quoted.participant||""],"demote"
                )
                await sock.sendMessage(currentChats, {text: "Berhasil demote @"+quoted.participant?.split("@").at(0), mentions: [quoted.participant||""]})
            }catch(err) {
                await sock.sendMessage(currentChats, {text: "Gagal demote @"+quoted.participant?.split("@").at(0), mentions: [quoted.participant||""]})
            }
            return
        }
        await sock.sendMessage(currentChats, {text:"Anda harus mention atau menquoted seseorang"}, {quoted:messages})
    }
}