// MODULOS
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const axios = require('axios')
const sharp = require('sharp')
const math = require('mathjs')
const { search } = require("simple-play-store-search")
const google = require('google-it')
const isPorn = require('is-porn')
const imgsearch = require('node-reverse-image-search')
const imgbbUploader = require('imgbb-uploader')
const moment = require('moment-timezone')
const get = require('got')
const sinesp = require('sinesp-api')
const { Aki } = require('aki-api')
const request = require('request')
const canvas = require('canvacord')
const { spawn, exec, execFile } = require('child_process')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const { removeBackgroundFromImageBase64 } = require('remove.bg')
const fetch = require('node-fetch')
const ms = require('parse-ms')
const ytsearch = require('yt-search')
const removeAccents = require('remove-accents')

// UTILIDADES
const color = require('./lib/color')
const { randomNimek, sleep, wall, tulis, ss, isUrl } = require('./lib/functions')
const { owner, donate, down, help, admins, adult, readme, lang, convh, paises } = require('./lib/help')
const { stdout } = require('process')
const bent = require('bent')
const { doing } = require('./lib/translate.js')
const { rank, diario, meme, msgFilter, translate, ngtts, killo } = require('./lib')
const { uploadImages } = require('./lib/fether')
const feature = require('./lib/poll')
const { sobre } = require('./lib/sobre')
const BrainlySearch = require('./lib/brainly')
const { coins } = require('./lib/coins')
moment.tz.setDefault('America/Sao_Paulo').locale('pt_BR')
const config = require('./lib/config/config.json')

// AKINATOR & OUTROS
const region = config.akilang
const aki = new Aki(region)
const playaki = async () => { await aki.start() }
playaki()
const cd = 0.18e+7

// JSON'S 
const nsfw_ = JSON.parse(fs.readFileSync('./lib/config/NSFW.json'))
const welkom = JSON.parse(fs.readFileSync('./lib/config/welcome.json'))
const exsv = JSON.parse(fs.readFileSync('./lib/config/exclusive.json'))
const bklist = JSON.parse(fs.readFileSync('./lib/config/blacklist.json'))
const nivel = JSON.parse(fs.readFileSync('./lib/config/level.json'))
const atbk = JSON.parse(fs.readFileSync('./lib/config/anti.json'))
const daily = JSON.parse(fs.readFileSync('./lib/config/diario.json'))
const faki = JSON.parse(fs.readFileSync('./lib/config/fake.json'))
const slce = JSON.parse(fs.readFileSync('./lib/config/silence.json'))
const atstk = JSON.parse(fs.readFileSync('./lib/config/sticker.json'))

module.exports = kconfig = async (kill, message) => {
	
	// Isso possibilita receber os alertas no WhatsApp
	const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
	let { body } = message
	const ownerNumber = config.owner
	
    // Prefix
    const prefix = config.prefix
	
    try {
		
		// PARAMETROS
		const { name, formattedTitle } = chat
		let { pushname, verifiedName, formattedName } = sender
		pushname = pushname || verifiedName || formattedName
        const botNumber = await kill.getHostNumber()
        const blockNumber = await kill.getBlockedIds()
        const user = sender.id
		const isOwner = user.includes(ownerNumber)
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const isGroupOwner = isGroupMsg && user === chat.groupMetadata.id
        const groupAdmins = isGroupMsg ? await kill.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(user) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const isNsfw = isGroupMsg ? nsfw_.includes(groupId) : false
        const autoSticker = isGroupMsg ? atstk.includes(groupId) : false
        const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
		const processTime = (timestamp, now) => { return moment.duration(now - moment(timestamp * 1000)).asSeconds() }
        const comma = body.slice(1).trim().split(/ +/).shift().toLowerCase()
		const command = removeAccents(comma)
		const arg = body.trim().substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)
        const url = args.length !== 0 ? args[0] : ''
        const uaOverride = process.env.UserAgent
        const isBlocked = blockNumber.includes(user)
        const isLeg = exsv.includes(groupId)
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isImage = type === 'image'
        const isVideo = type === 'video'
        const arqs = body.trim().split(' ')
		
		// OUTRAS
        const double = Math.floor(Math.random() * 2) + 1
		const lvpc = Math.floor(Math.random() * 100) + 1
        global.pollfile = 'poll_Config_'+groupId+'.json'
        global.voterslistfile = 'poll_voters_Config_'+groupId+'.json'
		const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
		const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
		const errorImg = 'https://i.ibb.co/jRCpLfn/user.png'
		
        const mess = {
            wait: 'Entendido amore! Só esperar um pouquinho para podermos conversar de novo ok?',
            error: {
                St: `Você usou errado haha!\nPara usar isso, envie ou marque uma foto com essa mensagem, se for um gif, use o comando ${prefix}gif.`,
                Ki: 'Para remover administradores, você precisa primeiro remover o ADM deles.',
                Ad: 'Erros! Não pude adicionar, pode ser por limitação de adicionar ou erros meus.',
				Kl: 'Opa! Isso é apenas meu criador, você não pode acessar.',
				Ga: 'Apenas Administradores podem usar, então trate de virar um haha!',
				Gp: 'Desculpe, mas isso é um comando para grupos.',
				Ac: `Somente grupos que permitem conteúdo +18 podem usar comandos assim, se você é o dono e quer isso, use ${prefix}nsfw enable, ou use no PV.`,
				Ba: 'Caro administrador, se quiser que eu use esses comandos, precisa me deixar ser uma ademira!',
				Na: 'Insira um parametro correto para o comando!',
                Iv: 'Esse link está correto? Ele me parece errado...'
            }
        }

        // Auto-sticker
        if (isGroupMsg && autoSticker && isMedia && isImage && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await kill.sendImageAsSticker(from, imageBase64, { author: '@pedroh790', pack: '@pedroh790', keepScale: true })
        }
		
        // Auto-sticker de videos
		if (isGroupMsg && autoSticker && isMedia && isVideo && !isCmd) {
			const mediaData = await decryptMedia(message, uaOverride)
			const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
			await kill.sendMp4AsSticker(from, videoBase64, null, { stickerMetadata: true, pack: '@pedroh790', author: '@pedroh790', fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', crop: false, loop: 0 })
		}
	
        // MENSAGEM PV
        if (!isCmd && !isGroupMsg) { return console.log('> MENSAGEM AS', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'de', color(pushname)) }
		
		// MENSAGEM GP
        if (!isCmd && isGroupMsg) { return console.log('> MENSAGEM AS', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'de', color(pushname), 'em', color(name || formattedTitle)) }
		
		// COMANDOS
        if (isCmd && !isGroupMsg) { console.log(color(`> COMANDO "${command} [${args.length}]" AS`), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'de', color(pushname)) }
		
		// COMANDOS GP
        if (isCmd && isGroupMsg) { console.log(color(`> COMANDO "${command} [${args.length}]" AS`), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'de', color(pushname), 'em', color(name || formattedTitle)) }
		
        // Impede SPAM
        if (isCmd && !isOwner) msgFilter.addFilter(from)

        switch(command) {
			
        case 'sticker':
        case 'fig':
        case 'figurinha':
        case 'stiker':
            if (isMedia && isImage) {
				const mediaData = await decryptMedia(message, uaOverride)
				const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
				await kill.sendImageAsSticker(from, imageBase64, { author: '@pedroh790', pack: '@pedroh790', keepScale: true })
            } else if (isQuotedImage) {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
				const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
				await kill.sendImageAsSticker(from, imageBase64, { author: '@pedroh790', pack: '@pedroh790', keepScale: true })
            } else if (args.length == 1) {
                const url = args[0]
                if (isUrl(url)) {
                    await kill.sendStickerfromUrl(from, url, { method: 'get' }, { author: '@pedroh790', pack: '@pedroh790', keepScale: true })
                        .catch(err => console.log('Erro: ', err))
                } else {
					await kill.reply(from, mess.error.Iv, id)
                }
            } else {
                await kill.reply(from, mess.error.St, id)
            }
            break
			
        case 'stickergif':
        case 'gifsticker':
        case 'gif':
            if (isMedia && type === 'video' || mimetype === 'image/gif' || isQuotedVideo || isQuotedGif) {
                await kill.reply(from, mess.wait, id)
                try {
                    const encryptMedia = isQuotedGif || isQuotedVideo ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const gifSticker = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    await kill.sendMp4AsSticker(from, gifSticker, null, { stickerMetadata: true, pack: '@pedroh790', author: '@pedroh790', fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', crop: false, loop: 0 })
                } catch (err) {
                    console.error(err)
                    await kill.reply(from, 'Esse sticker obteve erros, é provavel que seja o seu peso, o maximo é de 1MB.', id)
                }
            } else {
                await kill.reply(from, 'Isso somente pode ser usado com videos e gifs.', id)
            }
            break
			
        case 'makesticker':
            if (args.length == 0) return kill.reply(from, 'Faltou algo para usar de referência!', id)
            const stkm = await fetch(`https://api.fdci.se/sosmed/rep.php?gambar=${body.slice(7)}`)
			const stimg = await stkm.json()
            let stkfm = stimg[Math.floor(Math.random() * stimg.length) + 1]
            await kill.sendStickerfromUrl(from, stkfm, { method: 'get' }, { author: '@pedroh790', pack: '@pedroh790', keepScale: true })
			.catch(() => { kill.reply(from, 'Nenhuma imagem recebida ou servidor offline, tente mais tarde.', id) })
            break
			
		case 'img':
            if (isQuotedSticker) {
                await kill.reply(from, mess.wait, id)
                try {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const stickerImg = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    await kill.sendFile(from, stickerImg, '', '', id)
                } catch (err) {
                    console.error(err)
                    await kill.reply(from, 'Desculpe, aconteceu algum erro ao converter...', id)
                }
            } else {
                await kill.reply(from, 'Isso não é um sticker certo?', id)
            }
			break	
			
        case 'stalkig':
            if (args.length == 0) return kill.reply(from, 'Defina o nome de um perfil para a busca.', id)
            const ig = await axios.get(`https://docs-jojo.herokuapp.com/api/stalk?username=${body.slice(9)}`)
			const stkig = JSON.stringify(ig.data)
			if (stkig == '{}') return kill.reply(from, 'Usuario não localizado.', id)
			await kill.sendFileFromUrl(from, `${ig.data.graphql.user.profile_pic_url}`, ``, `✪ Username: ${ig.data.graphql.user.username}\n\n✪ Biografia: ${ig.data.graphql.user.biography}\n\n✪ Seguidores: ${ig.data.graphql.user.edge_followed_by.count}\n\n✪ Seguindo: ${ig.data.graphql.user.edge_follow.count}\n\n✪ Verificada: ${ig.data.graphql.user.is_verified}`, id)
            break
			
		case 'fb':
			if (args.length == 0) return kill.reply(from, 'Você esqueceu de inserir um link do facebook?', id)
            try {
				const fb = await axios.get(`https://mnazria.herokuapp.com/api/fbdownloadervideo?url=${body.slice(4)}`)
				const fbdw = fb.data.resultSD
				await kill.sendFileFromUrl(from, fbdw, 'video.mp4', 'Excelente video!\n~Mas o que diabos aconteceu?...~', id)
			} catch (error) {
				await kill.reply(from, 'O download do video no facebook falhou, pode ser que o servidor esteja offline.', id)
				console.log(error)
			}
            break
			
			
        case 'mp3':
            if (args.length == 0) return kill.reply(from, 'Falta definir o Link para isso!', id)
			try {
				const ytmp3d = await axios.get(`http://st4rz.herokuapp.com/api/yta2?url=${args[0]}`)
				await kill.sendFileFromUrl(from, `${ytmp3d.data.result}`, `${ytmp3d.data.title}.${ytmp3d.data.ext}`, `${ytmp3d.data.title}`, id)
			} catch (error) {
				await kill.reply(from, 'Ah, não consegui enviar, pode ser que o servidor esteja com problemas ou não consigo mandar esse audio.', id)
				console.log(error)
			}
			break
			
			
        case 'mp4':
            if (args.length == 0) return kill.reply(from, 'Falta definir o Link para isso!', id)
			try {
				const ytmp4d = await axios.get(`http://st4rz.herokuapp.com/api/ytv2?url=${args[0]}`)
				await kill.sendFileFromUrl(from, `${ytmp4d.data.result}`, `${ytmp4d.data.title}.${ytmp4d.data.ext}`, `${ytmp4d.data.title}`, id)
			} catch (error) {
				await kill.reply(from, 'Ah, não consegui enviar, pode ser que o servidor esteja com problemas ou não consigo mandar esse video.', id)
				console.log(error)
			}
			break
			
			
        case 'play':
            if (args.length == 0) return kill.reply(from, 'Você usou incorretamente.', id)
			try {
				const ytres = await ytsearch(`${body.slice(6)}`)
				const pyre = ytres.all[0].ago
				if (pyre == '' || pyre == 'null' || pyre == null || pyre == undefined || pyre == 'undefined') {
					var playre = 'Indefinido'
				} else if (pyre.endsWith('years ago')) {
					var playre = pyre.replace('years ago', 'Anos atrás')
				} else if (pyre.endsWith('hours ago')) {
					var playre = pyre.replace('hours ago', 'Horas atrás')
				} else if (pyre.endsWith('minutes ago')) {
					var playre = pyre.replace('minutes ago', 'Minutos atrás')
				} else if (pyre.endsWith('day ago')) {
					var playre = pyre.replace('day ago', 'Dias atrás')
				} else if (pyre.endsWith('months ago')) {
					var playre = pyre.replace('months ago', 'Meses atrás')
				} else if (pyre.endsWith('seconds ago')) {
					var playre = pyre.replace('seconds ago', 'Segundos atrás')
				}
				await kill.sendFileFromUrl(from, `${ytres.all[0].image}`, ``, `*Titulo >* ${ytres.all[0].title}\n\n*Descrição >* ${ytres.all[0].description}\n\n*Link >* https://youtu.be/${ytres.all[0].videoId}\n\n*Duração >*  ${ytres.all[0].timestamp} minutos\n\n*Feito a >* ${playre}\n\n*Visualizações >* ${ytres.all[0].views}\n\n*Autor >* ${ytres.all[0].author.name}\n\n*Canal >* ${ytres.all[0].author.url}`, id)
				const asize = await axios.get(`http://st4rz.herokuapp.com/api/yta2?url=https://www.youtube.com/watch?v=${ytres.all[0].videoId}`)
				await kill.sendFileFromUrl(from, `${asize.data.result}`, `${asize.data.title}.${asize.data.ext}`, `${asize.data.title}`, id)
			} catch (error) {
				await kill.reply(from, 'Desculpe, não foi possivel baixar sua música, talvez o servidor tenha caido... :(', id)
				console.log(error)
			}
            break
			
			
        case 'video':
            if (args.length == 0) return kill.reply(from, 'Você usou incorretamente.', id)
			try {
				const ytvrz = await ytsearch(`${body.slice(7)}`)
				const vyre = ytvrz.all[0].ago
				if (vyre == '' || vyre == 'null' || vyre == null || vyre == undefined || vyre == 'undefined') {
					var videore = 'Indefinido'
				} else if (vyre.endsWith('years ago')) {
					var videore = vyre.replace('years ago', 'Anos atrás')
				} else if (vyre.endsWith('hours ago')) {
					var videore = vyre.replace('hours ago', 'Horas atrás')
				} else if (vyre.endsWith('minutes ago')) {
					var videore = vyre.replace('minutes ago', 'Minutos atrás')
				} else if (vyre.endsWith('day ago')) {
					var videore = vyre.replace('day ago', 'Dias atrás')
				} else if (vyre.endsWith('months ago')) {
					var videore = vyre.replace('months ago', 'Meses atrás')
				} else if (vyre.endsWith('seconds ago')) {
					var videore = vyre.replace('seconds ago', 'Segundos atrás')
				}
				await kill.sendYoutubeLink(from, `${ytvrz.all[0].url}`, `\n\n*Titulo >* ${ytvrz.all[0].title}\n\n*Descrição >* ${ytvrz.all[0].description}\n\n*Duração >*  ${ytvrz.all[0].timestamp} minutos\n\n*Feito a >* ${videore}\n\n*Visualizações >* ${ytvrz.all[0].views}\n\n*Autor >* ${ytvrz.all[0].author.name}\n\n*Canal >* ${ytvrz.all[0].author.url}`)
			} catch (error) {
				await kill.reply(from, 'Ops, não foi possivel procurar pelo video... :(', id)
				console.log(error)
			}
            break
			
        case 'criador':
			await kill.reply(from, `https://wa.me/${config.owner.replace('@c.us', '')}`, id)
            break
			
			
		case 'akinator':
		case 'aki':
			try {
				if (args[0] == '-r') {
					let akinm = args[1].match(/^[0-9]+$/)
					if (!akinm) return kill.reply(from, 'Responda apenas com 0 ou 1!\n0 = Sim\n1 = Não', id)
					const myAnswer = `${args[1]}`
					await aki.step(myAnswer);
					if (aki.progress >= 90 || aki.currentStep >= 90) {
						await aki.win()
						var akiwon = aki.answers[0]
						await kill.sendFileFromUrl(from, `${akiwon.absolute_picture_path}`, '', `✪ Palpite: ${akiwon.name}\n\n✪ De: ${akiwon.description}\n\n✪ Ranking: ${akiwon.ranking}\n\n✪ Pseudo-Nome: ${akiwon.pseudo}\n\n✪ Quantidade de Palpites: ${aki.guessCount}\n\nSe não for essa continue jogando para bater a quantidade de tentativas!`, id)
					} else {
						await kill.reply(from, `Questão: ${aki.question}\n\nResponda com ${prefix}akinator -r [0 ou 1], 0 = sim, 1 = não.`, id)
					}
				} else if (args[0] == '-back' || args[0] == '-new') {
					await aki.back()
					await kill.reply(from, `Questão: ${aki.question}\n\nProgresso: ${aki.progress}\n\nResponda com ${prefix}akinator -r [0 ou 1], 0 = sim, 1 = não.\n\nSe o progresso estiver em 0, poderá jogar, caso contrario, digite mais vezes para chegar a 0 e então jogue, ou continue com o progresso atual de outra pessoa.`, id)
				} else {
					await kill.reply(from, `Questão: ${aki.question}\n\nProgresso: ${aki.progress}\n\nResponda com ${prefix}akinator -r [0 ou 1], 0 = sim, 1 = não.`, id)
				}
			} catch (error) {
				await kill.reply(from, 'Um segundinho, criarei uma nova sessão de jogo pra gente!', id)
				playaki()
				await kill.reply(from, `Questão: ${aki.question}\n\nResponda com ${prefix}akinator -r [0 ou 1], 0 = sim, 1 = não.`, id)
				console.log(error)
			}
			break
			
			
        case 'iris':
			const rndrl = fs.readFileSync('./lib/config/reply.txt').toString().split('\n')
			const repl = rndrl[Math.floor(Math.random() * rndrl.length)]
			const resmf = repl.replace('%name$', `${name}`).replace('%battery%', `${lvpc}`)
			try {
				const iris = await axios.get(`http://simsumi.herokuapp.com/api?text=${body.slice(6)}&lang=pt`)
				if (iris.data.success == '' || iris.data.success == null || iris.data.success == 'Limit 50 queries per hour.') {
					await kill.reply(from, resmf, id)
				} else {
					await kill.reply(from, iris.data.success, id)
					fs.appendFile('./lib/config/reply.txt', `\n${iris.data.success}`)
				}
			} catch (error) {
				await kill.reply(from, resmf, id)
			}
			break
			
			
        case 'wallpaper':
            if (args.length == 0) return kill.reply(from, 'Você precisa me dizer do que quer seu wallpaper!', id)
            const quere = body.slice(6)
            const wallp = await wall(quere)
            await kill.sendFileFromUrl(from, wallp, 'wallp.jpg', '', id)
            break
			
			
        case 'ping':
            await kill.sendText(from, `Pong!\n_Minha velocidade é de ${processTime(t, moment())} segundos._`)
            break
			

        case 'google':
            if (args.length == 0) return kill.reply(from, `Digite algo para buscar.`, id)
		    const googleQuery = body.slice(8)
            google({ 'query': googleQuery }).then(async (results) => {
				let vars = `_*Resultados da pesquisa Google de: ${googleQuery}*_\n`
				for (let i = 0; i < results.length; i++) {
					vars +=  `\n═════════════════\n*Titulo >* ${results[i].title}\n\n*Descrição >* ${results[i].snippet}\n\n*Link >* ${results[i].link}`
				}
				await kill.reply(from, vars, id)
            }).catch(() => { kill.reply(from, 'Erro ao pesquisar na google.', id) })
            break			
			
       case 'clima':
       		if (args.length == 0) return kill.reply(from, 'Insira o nome da sua cidade.', id)
            try {
				const clima = await axios.get(`https://pt.wttr.in/${body.slice(7)}?format=Cidade%20=%20%l+\n\nEstado%20=%20%C+%c+\n\nTemperatura%20=%20%t+\n\nUmidade%20=%20%h\n\nVento%20=%20%w\n\nLua agora%20=%20%m\n\nNascer%20do%20Sol%20=%20%S\n\nPor%20do%20Sol%20=%20%s`)
				await kill.sendFileFromUrl(from, `https://wttr.in/${body.slice(7)}.png`, '', `A foto acima contém uma previsão de 2 dias, a mensagem abaixo é o clima agora.\n\n${clima.data}`, id)
            } catch {
                await kill.reply(from, 'Estranho...\nCertifique-se de não estar usando acentos ok?', id)
            }
            break

        case 'broad':
            if (!isOwner) return kill.reply(from, mess.error.Kl, id)
			const hdgsh = 'Para usar isso, digite o comando, em seguida defina se quer todos[-all], grupos[-gp] e em seguida a sua mensagem de transmissão, devido a motivos desconhecidos para mim, não consegui criar a de apenas contatos.'
			if (args.length == 0) return kill.reply(from, hdgsh, id)
			const chatz = await kill.getAllChatIds()
			if (args[0] == '-all') {
				let msg = body.slice(12)
				for (let ids of chatz) {
					var cvk = await kill.getChatById(ids)
					if (!cvk.isReadOnly) {
						await kill.sendText(ids, `[Transmissão da Esther]\n\n${msg}`)
					} else {
						console.log("Ignorei um grupo/privado pois estava fechado.")
					}
				}
				await kill.reply(from, 'Terminei a transmissão que você pediu.', id)
			} else if (args[0] == '-gp') {
				let msg = body.slice(11)
				for (let bclst of chatz) {
					var notgps = bclst.endsWith('@c.us')
					if (!notgps) {
						var bkgps = await kill.getChatById(bclst)
						if (!bkgps.isReadOnly) {
							await kill.sendText(bclst, `[Transmissão da Esther]\n\n${msg}`)
						} else {
							console.log("Ignorei um grupo/privado pois estava fechado.")
						}
					} else return
				}
				await kill.reply(from, 'Terminei a transmissão que você pediu.', id)
			} else {
				await kill.reply(from, hdgsh, id)
			}
            break
			
        case 'clearall':
            if (!isOwner) return kill.reply(from, mess.error.Kl, id)
            const allChatz = await kill.getAllChats()
            for (let dchat of allChatz) {
                await kill.clearChat(dchat.id)
            }
            await kill.reply(from, 'Limpei todos os Chats!', id)
            break
			
        case 'botstat':
            const loadedMsg = await kill.getAmountOfLoadedMessages()
            const chatIds = await kill.getAllChatIds()
            const groups = await kill.getAllGroups()
            await kill.sendText(from, `Status :\n- *${loadedMsg}* Mensagens recebidas após ligar\n- *${groups.length}* Conversas em grupo\n- *${chatIds.length - groups.length}* Conversas no PV\n- *${chatIds.length}* Total de conversas`)
            break

			
        case 'tela':
            if (!isOwner) return kill.reply(from, mess.error.Kl, id)
            const sesPic = await kill.getSnapshot()
            await kill.sendFile(from, sesPic, 'session.png', 'Neh...', id)
            break
			
        case 'enviar':
            if (args.length == 0) return kill.reply(from, 'Você precisa definir entre [-gp, -pv ou -help] para usar!', id)
			const gid = groupId.replace('@g.us', '')
			const pvid = user.replace('@c.us', '')
			const sdnhlp = `Para usar digite o comando e na frente digite -pv para privado, ou -gp para grupos, e na frente deles use o ID, separando a mensagem por |. Exemplo:\n${prefix}enviar -gp 5518998****-174362736 | ola?\n\nVocê pode obter as IDs com o comando ${prefix}grupos.`
			if (isGroupMsg) {
				if (args[0] == '-gp') {
					await kill.sendText(`${args[1]}` + '@g.us', `_Mensagem >_\n*"${arg.split('|')[1]} "*` + '\n\n_Quem enviou =_ ' + '\n*"' + name + '"*' + '\n\n_Como responder:_')
					await kill.sendText(`${args[1]}` + '@g.us', `${prefix}enviar -gp ${gid} | Coloque sua resposta aqui`)
					await kill.reply(from, 'Sua mensagem foi enviada.', id)
				} else if (args[0] == '-pv') {
					await kill.sendText(`${args[1]}` + '@c.us', `${arg.split('|')[1]}` + '\n\n_Quem enviou =_ ' + '*' + name + '*' + '\n\n_Como responder:_')
					await kill.sendText(`${args[1]}` + '@c.us', `${prefix}enviar -gp ${gid} | Coloque sua resposta aqui`)
					await kill.reply(from, 'Sua mensagem foi enviada.', id)
				} else if (args[0] == '-help' || args[0] == '-h') {
					await kill.reply(from, sdnhlp, id)
				} else {
					await kill.reply(from, sdnhlp, id)
				}
			} else {
				if (args[0] == '-gp') {
					await kill.sendText(`${args[1]}` + '@g.us', `_Mensagem >_\n*"${arg.split('|')[1]} "*` + '\n\n_Quem enviou =_ ' + '\n*"' + pushname + '"*' + '\n\n_Como responder:_')
					await kill.sendText(`${args[1]}` + '@g.us', `${prefix}enviar -gp ${pvid} | Coloque sua resposta aqui`)
					await kill.sendText(from, 'Mensagem enviada.')
				} else if (args[0] == '-pv') {
					await kill.sendText(`${args[1]}` + '@c.us', `${arg.split('|')[1]}` + '\n\n_Quem enviou =_ ' + '*' + pushname + '*' + '\n\n_Como responder:_')
					await kill.sendText(`${args[1]}` + '@c.us', `${prefix}enviar -gp ${pvid} | Coloque sua resposta aqui`)
					await kill.sendText(from, 'Mensagem enviada.')
				} else if (args[0] == '-help' || args[0] == '-h') {
					await kill.reply(from, sdnhlp, id)
				} else {
					await kill.reply(from, sdnhlp, id)
				}
			}
            break

        case 'encerrar':
            if (!isOwner) return kill.reply(from, mess.error.Kl, id)
			await kill.reply(from, 'Pedido recebido!\nIrei me desligar em 5 segundos.', id)
		    await sleep(5000)
			await kill.kill()
            break
			
        case 'date':
        case 'data':
			await kill.reply(from, `Agora são exatamente\n"${time}"`, id)
			break
			
			
        case 'menu':
			const othmen = `Essas são as categorias de Joias:\n\n*${prefix}alianças* _..._\n\n*${prefix}anéis* _..._\n\n*${prefix}brincos* _..._\n\n*${prefix}colares e correntes* _..._\n\n*${prefix}pulseiras* _..._\n\n*${prefix}pingentes* _..._\n\n*${prefix}solitários* _..._`
			if (isGroupMsg) {
				const utinfo = `_Olá,_ *"${pushname}"*!\n_Hoje é dia:_ *${time}*`
				await kill.sendText(from, utinfo + help)
				await kill.sendText(from, othmen)
			} else {
				await kill.sendText(from, help)
				await kill.sendText(from, othmen)
			}
            break
			
			
        case 'dono':
            if (!isOwner) return kill.reply(from, mess.error.Kl, id)
            await kill.sendText(from, owner)
            break
			
			
        case 'down':
            await kill.sendText(from, down)
            break
			
        case 'autosticker':
            if (!isGroupMsg) return await kill.reply(from, mess.error.Gp, id)
            if (!isGroupAdmins) return await kill.reply(from, mess.error.Ga, id)
            if (args[0] == 'on') {
                atstk.push(groupId)
                fs.writeFileSync('./lib/config/sticker.json', JSON.stringify(atstk))
                await kill.reply(from, 'O Auto-Sticker foi ativado, todas as imagens e videos enviadas serão convertidas em sticker.', id)
            } else if (args[0] == 'off') {
                atstk.splice(groupId, 1)
                fs.writeFileSync('./lib/config/sticker.json', JSON.stringify(atstk))
                await kill.reply(from, 'Auto-Sticker desativado, as imagens e videos não serão automaticamente convertidas em sticker.', id)
            } else {
                await kill.reply(from, 'Defina entre [on] e [off].', id)
            }
			break
			
		case 'help':
			if (args.length == 0) return kill.reply(from, 'Defina seu problema a ser enviado ao grupo responsável pela Íris.', id)
			const hpgp = groupId.replace('@g.us', '')
			const hppv = user.replace('@c.us', '')
			if (isGroupMsg) {
				await kill.sendText(ownerNumber, `⚠️ _Requisição de suporte feita pelo_ *${name}*, _a pedido de_ *${pushname}* _do número_ wa.me/${user.replace('@c.us', '')}.\n\n_Motivo:_ ${body.slice(6)}`)
				await kill.sendText(ownerNumber, `${prefix}enviar -gp ${hpgp} | Responda com a solução`)
			} else {
				await kill.sendText(ownerNumber, `⚠️ _Requisição de suporte feita pelo_ *${pushname}* _do número_ wa.me/${user.replace('@c.us', '')}.\n\n_Motivo:_ ${body.slice(6)}`)
				await kill.sendText(ownerNumber, `${prefix}enviar -pv ${hppv} | Responda com a solução`)
			}
			await kill.reply(from, 'Agradecemos por informar um de nossos erros, fique atento que quando vermos iremos responder!', id)
			break
			
		case 'letra':
			if (args.length == 0) return kill.reply(from, 'Insira o nome da sua música.', id)
			try {
				const liric = await axios.get(`https://some-random-api.ml/lyrics?title=${body.slice(7)}`)
				await kill.sendFileFromUrl(from, liric.data.thumbnail.genius, '', `*Titulo:*\n\n${liric.data.title}\n\n*Letra:*\n\n${liric.data.lyrics}`, id)
			} catch (error) {
				await kill.reply(from, 'Desculpe, não achei sua música...', id)
			}
			break
			
			
		/*case 'Nome do comando sem espaços':
			await kill.reply(from, 'Sua mensagem', id)
			break*/
			
			
        default:
            if (isCmd) {
                await kill.reply(from, `⚠️ O comando ${prefix}${command} não existe, reveja nossa lista em ${prefix}menu para continuar.`, id)
            }
            break
			
			
        }
    } catch (err) {
        console.log(color('[ERRO]', 'red'), err)
		//await kill.sendText(ownerNumber, `_Olá, caro dono(a)!_\n_Obtive erros ao executar o comando..._\n\n*${prefix}${body.slice(1)}*\n\n_Peço que corrija por gentileza para podermos usar sem preocupações._\n_Agradecida, Íris._\n\n_Qual erro?_\n\n*${err}*`)
		await kill.reply(from, `⚠️ _Ops, por algum motivo obtive erros com esse comando, por favor evite usa-lo novamente e se possível contate os responsáveis com o comando ${prefix}help._`, id)
    }
}
