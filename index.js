const TelegramBot = require( 'node-telegram-bot-api');
const TOKEN = '<TOKEN BOT TELEGRAM>';
const bot = new TelegramBot( TOKEN, { polling: true } );
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const db = lowdb(adapter);
const shortid = require('shortid');


bot.on('text', (msg) => {
		bot.getChatMember(msg.chat.id,msg.from.id).then(resp => {
		const teee=resp.status


if (msg.text.search(/\/cadastrarNegocio+/ ) != -1){
		if(teee == "creator"|teee == "administrator") {
			var str = msg.text
			var regex = /(Usuario_Compra:)([a-z|A-Z|0-9|\W]*)(.)(Usuario_Venda:)([a-z|A-Z|0-9|\W]*)(.)(BTC_TRANS:)([0-9.9]*)(.)(VALOR:)([0-9.9]*)/
			
			if (str.search(regex) != -1){
				var datas = new Date()
				
				var result = str.match(regex)
		
				db.get('negocios')
				.push({ ID:shortid.generate(), Cadastro: msg.from.username, Usuario_Compra: result[2],Usuario_Venda:result[5],BTC:result[8],Valor:result[11],Data:datas})
				.write()
				bot.sendMessage(msg.chat.id,'Negocio cadastrado com sucesso!\nSegue BD de backup e validação!')
				const remoteFile = 'database.json'
    return bot.sendDocument(msg.chat.id, remoteFile, [{disable_notification: true}]);
			}else{bot.sendMessage(msg.chat.id,'/cadastrarNegocio Usuario_Compra:<usr> Usuario_Venda:<usr> BTC_TRANS:<QTD_BTC> VALOR:<VALOR>')}
		} else {bot.sendMessage(msg.chat.id,'Você não tem permissão!')}
	}
	
if (msg.text.search(/\/ajuda+/ ) != -1|msg.text.search(/\/start+/ ) != -1){

	var resposta=`Este bot gerenca as solicitações P2P do grupo!`
	resposta+=`\nUtilize /vender para colocar uma solicitação de venda`
	resposta+=`\nUtilize /excluirVenda para excluir uma solicitação de venda`
	resposta+=`\nUtilize /livroVenda para exibir uma o livro de vendas`
	resposta+=`\nUtilize /comprar para colocar uma solicitação de compra`
	resposta+=`\nUtilize /excluirCompra para excluir uma solicitação de compra`
	resposta+=`\nUtilize /livroCompra para exibir uma o livro de compras`

		if(teee == "creator"|teee == "administrator") {
		resposta+=`\nUtilize /cadastrarNegocio para exibir uma o livro de compras`}
		bot.sendMessage(msg.chat.id,resposta)

}

if (msg.text.search(/\/excluirVenda+/ ) != -1){
	db.get('venda')
	.remove({ Usuario: msg.from.username})
	.write()

	var resposta=`Venda Excluida com Sucesso!`
	bot.sendMessage(msg.chat.id,resposta)
}

if (msg.text.search(/\/excluirCompra+/ ) != -1){
	db.get('compra')
	.remove({ Usuario: msg.from.username})
	.write()

	var resposta=`Compra Excluida com Sucesso!`
	bot.sendMessage(msg.chat.id,resposta)
}

if (msg.text.search(/\/livroCompra+/ ) != -1){
			const n =db.get('compra')
			.sortBy('id')
			.value()
			
			var Resposta=`Ofertas de compras:`
			
			for (var i in n) {
			var usu=JSON.parse(JSON.stringify(n[i]))['Usuario']
			var btc=JSON.parse(JSON.stringify(n[i]))['BTC']
			var valor=JSON.parse(JSON.stringify(n[i]))['Valor']
			var banco=JSON.parse(JSON.stringify(n[i]))['Banco']
			Resposta+=`\n******************************`
			var q=db.get('negocios')
			.filter({Usuario_Compra: `${usu}`})
			.size()
			.value()
			q+=db.get('negocios')
			.filter({Usuario_Compra: `@${usu}`})
			.size()
			.value()
			
			Resposta+=`\nUsuário:@${usu}\nQtd_BTC:${btc}\nValor:R$${valor}\nBanco:${banco}\nCompras já Realizadas:${q}`
			}		
			
			bot.sendMessage(msg.chat.id,Resposta)

}
if (msg.text.search(/\/livroVenda+/ ) != -1){
			const n =db.get('venda')
			.sortBy('id')
			.value()
			
			var Resposta=`Ofertas de vendas:`
			
			for (var i in n) {
			var usu=JSON.parse(JSON.stringify(n[i]))['Usuario']
			var btc=JSON.parse(JSON.stringify(n[i]))['BTC']
			var valor=JSON.parse(JSON.stringify(n[i]))['Valor']
			var banco=JSON.parse(JSON.stringify(n[i]))['Banco']
			Resposta+=`\n**************************`
			var q=db.get('negocios')
			.filter({Usuario_Venda: `${usu}`})
			.size()
			.value()
			q+=db.get('negocios')
			.filter({Usuario_Venda: `@${usu}`})
			.size()
			.value()
			
			Resposta+=`\nUsuário:@${usu}\nQtd_BTC:${btc}\nValor:R$${valor}\nBanco:${banco}\nVendas já Realizadas:${q}`
			}	
			bot.sendMessage(msg.chat.id,Resposta)

}
	
	
	//VENDA
if (msg.text.search(/\/vender+/ ) != -1){
	var str = msg.text
	var regex = /(BTC:)([0-9.9]*)(.)(VALOR:)([0-9.9]*)(.)(BANCO:)([a-z|A-Z]*)/
			
	if (str.search(regex) != -1){
		var result = str.match(regex)
		
			db.get('venda')
			.remove({ Usuario: msg.from.username})
			.write()
		
			db.get('venda')
			.push({ ID:shortid.generate(), Usuario: msg.from.username, BTC: result[2],Valor:result[5],Banco:result[8]})
			.write()
			
			bot.sendMessage(msg.chat.id, `Ordem de venda de ${result[2]} BTC por R$ ${result[5]} no banco ${result[8]} inserida com sucesso!`)
			
			const n =db.get('venda')
			.sortBy('id')
			.value()
			
			var Resposta=`Ofertas de vendas:`
			
			for (var i in n) {
			var usu=JSON.parse(JSON.stringify(n[i]))['Usuario']
			var btc=JSON.parse(JSON.stringify(n[i]))['BTC']
			var valor=JSON.parse(JSON.stringify(n[i]))['Valor']
			var banco=JSON.parse(JSON.stringify(n[i]))['Banco']
			Resposta+=`\n**************************`
			Resposta+=`\nUsuário:@${usu}\nQtd_BTC:${btc}\nValor:R$${valor}\nBanco:${banco}`
			}	
			
			bot.sendMessage(msg.chat.id,Resposta)
		}
		
	else  {
		bot.sendMessage(msg.chat.id, `/vender BTC:<QTD_BTC> VALOR:<VALOR_VENDA> BANCO:<BANCO>`)
		}
} //fim venda

	//COMPRA
if (msg.text.search(/\/comprar+/ ) != -1){
	var str = msg.text
	var regex = /(BTC:)([0-9.9]*)(.)(VALOR:)([0-9.9]*)(.)(BANCO:)([a-z|A-Z]*)/
			
	if (str.search(regex) != -1){
		var result = str.match(regex)
			
			db.get('compra')
			.remove({ Usuario: msg.from.username})
			.write()
			
			db.get('compra')
			.push({ ID:shortid.generate(), Usuario: msg.from.username, BTC: result[2],Valor:result[5],Banco:result[8]})
			.write()
			
			
			bot.sendMessage(msg.chat.id, `Ordem de compra de ${result[2]} BTC por R$ ${result[5]} no banco ${result[8]} inserida com sucesso!`)
			
			setTimeout(function() {
			console.log('Ordem de compra Recebida!');
			}, 3000);
			
			const n =db.get('compra')
			.sortBy('id')
			.value()
			
			var Resposta=`Ofertas de compras:`
			
			for (var i in n) {
			var usu=JSON.parse(JSON.stringify(n[i]))['Usuario']
			var btc=JSON.parse(JSON.stringify(n[i]))['BTC']
			var valor=JSON.parse(JSON.stringify(n[i]))['Valor']
			var banco=JSON.parse(JSON.stringify(n[i]))['Banco']
			Resposta+=`\n**************************`
			Resposta+=`\nUsuário:@${usu}\nQtd_BTC:${btc}\nValor:R$${valor}\nBanco:${banco}`
			}	
			
			bot.sendMessage(msg.chat.id,Resposta)
		}
		
	else  {
		bot.sendMessage(msg.chat.id, `/comprar BTC:<QTD_BTC> VALOR:<VALOR_VENDA> BANCO:<BANCO>`)
		}
} //fim COMPRA  		
})
})