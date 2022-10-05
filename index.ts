require("dotenv").config()
import   makeWASocket, { DisconnectReason, Browsers, useMultiFileAuthState }  from '@adiwajshing/baileys'
import  { Boom }  from '@hapi/boom'
import e from 'cors'
import * as fs  from 'fs'
import readDir from './util/libraryReader'
import replayMessage from './util/replayMessage'
import saving from './util/savingId'

async function connectToWhatsApp () {
    
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
    const sock = makeWASocket({
        // can provide additional config here
        printQRInTerminal: true,
        browser: Browsers.macOS('Desktop'),
        syncFullHistory: true,
        auth:state
    })
   
    sock.ev.on ('creds.update', saveCreds)
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect }:any = update
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error )?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out
            if(shouldReconnect) {
                connectToWhatsApp()
            }
        } else if(connection === 'open') {
            console.log('opened connection')
        }
    })
    sock.ev.on('messages.upsert', async ({ messages,type }) => {
        console.log(type)
        if(!messages[0].key.fromMe && messages[0].message != null) {
           
            saving(messages)
            replayMessage(messages[0], sock)
            await sock.readMessages([messages[0].key])
        }
        
    })
    
}

// run in main file
connectToWhatsApp()