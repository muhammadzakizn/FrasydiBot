import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
export default {
    keys : /add/i,
    
    functions: async (sock:WASocket, {currentChats, name, textArr, messages}:datas) => {
        const newtextArr = textArr.map(el => el.trim().split("@").join("")+"@s.whatsapp.net")
        console.log(newtextArr)
        if(textArr[0] != null) {
            try {
                await sock.groupParticipantsUpdate(
                    currentChats, newtextArr , "add"
                )
                await sock.sendMessage(currentChats, {text: "Berhasil menambahkan "+textArr.join(", "), mentions: newtextArr})
            }catch(err) {
                console.log(err)
                await sock.sendMessage(currentChats, {text: "Gagal menambahkan "+textArr.join(", "), mentions: newtextArr})
            }
        }
        await sock.sendMessage(currentChats, {text:"Anda harus mention atau menquoted seseorang"}, {quoted:messages})
    }
}