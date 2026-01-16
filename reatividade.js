const projeto = {
    id: 1,
    descricao: 'Alura Tracker Pro Max',
}

const proxy = new Proxy(projeto, {
    get(objetoOriginal, chave) {
        console.log(`Alguém pediu a chave ${chave} do projeto`)
        return objetoOriginal[chave]
    },
    set(ObjetoOriginal, chave, valor) {
        console.log(`Alguém alterou a chave ${chave} do projeto para ${valor}`)
        objetoOriginal[chave] = valor
    }
})

proxy.descricao = 'Reatividade é algo'

console.log(proxy.descricao)