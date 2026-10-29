CREATE DATABASE IF NOT EXISTS atv_jogos;
USE atv_jogos;

CREATE TABLE genero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    desenvolvedora VARCHAR(100) NOT NULL,
    sinopse TEXT,
    genero_id INT NOT NULL,
    FOREIGN KEY (genero_id) REFERENCES genero(id)
);