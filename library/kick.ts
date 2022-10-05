import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
export default {
    keys : /kick/i,
    
    functions: async (sock:WASocket, {currentChats, name, textArr, messages, quoted, isGroup, isAdmin}:datas) => {
        if(!isGroup) {
            await sock.sendMessage(currentChats, {text:"Command ini hanya bisa digunakan di grup"})
           return    
       }
       if(!isAdmin) {
           return await sock.sendMessage(currentChats, {text: "Command ini hanya bisa digunakan oleh admin"})
       }
      
     
      

       if(quoted?.mentionedJid != null) {
           try {
               await sock.groupParticipantsUpdate(
                   currentChats, quoted.mentionedJid , "remove"
               )
               await sock.sendMessage(currentChats, {text: "Berhasil kick "+quoted.mentionedJid.map(el => "@"+el.split("@").at(0)).join(", "), mentions: quoted.mentionedJid})
           }catch(err) {
               console.log(err)
               await sock.sendMessage(currentChats, {text: "Gagal kick "+quoted.mentionedJid.map(el => "@"+el.split("@").at(0)).join(", "), mentions: quoted.mentionedJid})
           }
           return
       } else if(quoted?.quotedMessage != null) {
           try {
               await sock.groupParticipantsUpdate(
                   currentChats, [quoted.participant||""],"remove"
               )
               await sock.sendMessage(currentChats, {text: "Berhasil kick @"+quoted.participant?.split("@").at(0), mentions: [quoted.participant||""]})
           }catch(err) {
               await sock.sendMessage(currentChats, {text: "Gagal kick @"+quoted.participant?.split("@").at(0), mentions: [quoted.participant||""]})
           }
           return
       }
       await sock.sendMessage(currentChats, {text:"Anda harus mention atau menquoted seseorang"}, {quoted:messages})
    }
}