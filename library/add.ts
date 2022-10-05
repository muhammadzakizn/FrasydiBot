import { datas } from './../util/replayMessage';
import { WASocket } from '@adiwajshing/baileys';
export default {
    keys : /add/i,
    
    functions: async (sock:WASocket, {currentChats, name, textArr, messages, quoted, isGroup, isAdmin}:datas) => {
        if(!isGroup) {
            await sock.sendMessage(currentChats, {text:"Command ini hanya bisa digunakan di grup"})
           return    
       }
       if(!isAdmin) {
           return await sock.sendMessage(currentChats, {text: "Command ini hanya bisa digunakan oleh admin"})
       }
       const newtextArr = textArr.map(el => el.trim().split("@").join("")+"@s.whatsapp.net")
      
       if(textArr[0] != null) {
           try {
               await sock.groupParticipantsUpdate(
                   currentChats, newtextArr , "add"
               )
               await sock.sendMessage(currentChats, {text: "Berhasil add "+textArr.join(", "), mentions: newtextArr})
           }catch(err) {
               console.log(err)
               await sock.sendMessage(currentChats, {text: "Gagal add "+textArr.join(", "), mentions : newtextArr})
           }
           return
       } else if(quoted?.quotedMessage?.contactMessage != null) {
            const number:string = quoted.quotedMessage.contactMessage.vcard?.split(":").at(4)?.split(";").at(1)?.split("=").at(1) ||""
            console.log(number)
            try {

                await sock.groupParticipantsUpdate(
                    currentChats, [number+"@s.whatsapp.net"] , "add"
                )
                await sock.sendMessage(currentChats, {text: "Berhasil add @"+number, mentions : [number+"@s.whatsapp.net"]})
            }catch(err) {
               console.log(err)
               await sock.sendMessage(currentChats, {text: "Gagal add @"+number, mentions : [number+"@s.whatsapp.net"]})
                
            }
            return
       } else if(quoted?.quotedMessage?.contactsArrayMessage != null) {
            const contacts:any = quoted.quotedMessage.contactsArrayMessage.contacts ||""
            const numbers:Array<string> = [] 
            const numberCon:Array<string> = []
            contacts.forEach((el:any) => {
                const number:string = el.vcard?.split(":").at(4)?.split(";").at(1)?.split("=").at(1) ||""
                numbers.push("@"+number)
                numberCon.push(number+"@s.whatsapp.net")
            })
            try {
                await sock.groupParticipantsUpdate(
                    currentChats, numberCon, "add"
                )
                await sock.sendMessage(currentChats, {text: "Berhasil add "+numbers.join(", "), mentions : numberCon})
            }catch(err) {
                console.log(err)
                await sock.sendMessage(currentChats, {text: "Gagal add "+numbers.join(", "), mentions : numberCon})
            }
            return
       }
       await sock.sendMessage(currentChats, {text:"Anda harus mention seseorang"}, {quoted:messages})
    }
}