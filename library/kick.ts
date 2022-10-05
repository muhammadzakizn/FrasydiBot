import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
export default {
    keys : /demote/i,
    
    functions: async (sock:WASocket, {currentChats, name, textArr, messages}:datas) => {
        const newtextArr = textArr.map(el => el.trim().split("@").join("")+"@s.whatsapp.net")
        console.log(newtextArr)
        if(textArr[0] != null) {
            try {
                await sock.groupParticipantsUpdate(
                    currentChats, newtextArr , "remove"
                )
                await sock.sendMessage(currentChats, {text: "Berhasil kick "+textArr.join(", "), mentions: newtextArr})
            }catch(err) {
                console.log(err)
                await sock.sendMessage(currentChats, {text: "Gagal kick "+textArr.join(", "), mentions: newtextArr})
            }
        }
        await sock.sendMessage(currentChats, {text:"Anda harus mention atau menquoted seseorang"}, {quoted:messages})
    }
}