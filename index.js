const express = require("express")
const mysql = require("mysql2/promise")
const app = express()

app.use(express.json())

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root", 
    database: "atv_jogos"
})

app.get("/generos", async (req, res) => {
    const [generos] = await db.execute("SELECT * FROM genero")
    return res.json(generos)
})

app.post("/generos", async (req, res) => {
    const { nome, descricao } = req.body

    if (!nome) {
        return res.status(400).json({ error: "O nome do gênero é obrigatório" })
    }

    const [resultado] = await db.execute(
        "INSERT INTO genero (nome, descricao) VALUES (?, ?)",
        [nome, descricao || null]
    )

    return res.status(201).json({ id: resultado.insertId, nome, descricao: descricao || null })
})

app.get("/jogos", async (req, res) => {
    const [jogos] = await db.execute("SELECT * FROM jogos")
    return res.json(jogos)
})

app.get("/jogos/:id", async (req, res) => {
    const id = req.params.id

    const [jogos] = await db.execute(
        "SELECT * FROM jogos WHERE id = ?",
        [id]
    )

    if (jogos.length === 0) {
        return res.status(404).json({ error: "Jogo não encontrado!" })
    }

    return res.json(jogos[0])
})

app.post("/jogos", async (req, res) => {
    const { nome, desenvolvedora, sinopse, genero_id } = req.body

    if (!nome || !desenvolvedora || !genero_id) {
        return res.status(400).json({ error: "Nome, desenvolvedora e genero_id são obrigatórios" })
    }

    const [resultado] = await db.execute(
        "INSERT INTO jogos (nome, desenvolvedora, sinopse, genero_id) VALUES (?, ?, ?, ?)",
        [nome, desenvolvedora, sinopse || null, genero_id]
    )

    return res.status(201).json({ id: resultado.insertId, nome, desenvolvedora, sinopse: sinopse || null, genero_id })
})

app.put("/jogos/:id", async (req, res) => {
    const id = req.params.id
    const { nome, desenvolvedora, sinopse, genero_id } = req.body

    if (!nome || !desenvolvedora || !genero_id) {
        return res.status(400).json({ error: "Nome, desenvolvedora e genero_id são obrigatórios" })
    }

    const [resultado] = await db.execute(
        "UPDATE jogos SET nome = ?, desenvolvedora = ?, sinopse = ?, genero_id = ? WHERE id = ?",
        [nome, desenvolvedora, sinopse || null, genero_id, id]
    )

    if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: "Jogo não encontrado!" })
    }

    return res.json({ id, nome, desenvolvedora, sinopse: sinopse || null, genero_id })
})

app.delete("/jogos/:id", async (req, res) => {
    const id = req.params.id

    const [resultado] = await db.execute(
        "DELETE FROM jogos WHERE id = ?",
        [id]
    )

    if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: "Jogo não encontrado!" })
    }

    return res.status(204).end()
})

app.listen(3000, () => console.log("API no ar na porta 3000"))