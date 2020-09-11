-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 11-Set-2020 às 06:14
-- Versão do servidor: 10.4.13-MariaDB
-- versão do PHP: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `locacao_imobiliaria`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fone` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `email`, `fone`) VALUES
(3, 'Victor', 'victorsouzar1999@gmail.com', '(48)996547648');

-- --------------------------------------------------------

--
-- Estrutura da tabela `contratos`
--

CREATE TABLE `contratos` (
  `id` int(11) NOT NULL,
  `imovel_id` int(11) NOT NULL,
  `proprietario_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `data_ini` date NOT NULL,
  `data_fim` date NOT NULL,
  `taxa_adm` float NOT NULL,
  `aluguel` float NOT NULL,
  `condominio` float NOT NULL,
  `iptu` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `contratos`
--

INSERT INTO `contratos` (`id`, `imovel_id`, `proprietario_id`, `cliente_id`, `data_ini`, `data_fim`, `taxa_adm`, `aluguel`, `condominio`, `iptu`) VALUES
(10, 5, 7, 3, '2020-09-10', '2021-08-31', 60, 1000, 200, 100),
(11, 0, 0, 0, '0000-00-00', '0000-00-00', 0, 0, 0, 0),
(12, 5, 7, 3, '2020-10-20', '2021-09-30', 49.99, 795.5, 199.98, 203.21);

-- --------------------------------------------------------

--
-- Estrutura da tabela `imoveis`
--

CREATE TABLE `imoveis` (
  `id` int(11) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `proprietario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `imoveis`
--

INSERT INTO `imoveis` (`id`, `endereco`, `proprietario_id`) VALUES
(2, '', 0),
(4, '', 0),
(5, 'Rua Telegrafista Adolfo Coelho, 613\nCentro, Sombrio - SC', 7);

-- --------------------------------------------------------

--
-- Estrutura da tabela `mensalidades`
--

CREATE TABLE `mensalidades` (
  `id` int(11) NOT NULL,
  `data_ini` date NOT NULL,
  `data_fim` date NOT NULL,
  `valor` float NOT NULL,
  `contrato_id` int(11) NOT NULL,
  `pago` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `mensalidades`
--

INSERT INTO `mensalidades` (`id`, `data_ini`, `data_fim`, `valor`, `contrato_id`, `pago`) VALUES
(25, '2021-08-01', '2021-09-01', 1300, 0, 0),
(26, '2020-09-10', '2020-10-01', 910, 10, 1),
(27, '2020-10-01', '2020-11-01', 1300, 10, 0),
(28, '2020-11-01', '2020-12-01', 1300, 10, 0),
(29, '2020-12-01', '2021-01-01', 1300, 10, 0),
(30, '2021-01-01', '2021-02-01', 1300, 10, 0),
(31, '2021-02-01', '2021-03-01', 1300, 10, 0),
(32, '2021-03-01', '2021-04-01', 1300, 10, 0),
(33, '2021-04-01', '2021-05-01', 1300, 10, 0),
(34, '2021-05-01', '2021-06-01', 1300, 10, 0),
(35, '2021-06-01', '2021-07-01', 1300, 10, 0),
(36, '2021-07-01', '2021-08-01', 1300, 10, 0),
(37, '2021-08-01', '2021-09-01', 1300, 10, 0),
(38, '2020-09-11', '2020-10-01', 0, 11, 0),
(39, '2020-10-01', '2020-11-01', 0, 11, 0),
(40, '2020-11-01', '2020-12-01', 0, 11, 0),
(41, '2020-12-01', '2021-01-01', 0, 11, 0),
(42, '2021-01-01', '2021-02-01', 0, 11, 0),
(43, '2021-02-01', '2021-03-01', 0, 11, 0),
(44, '2021-03-01', '2021-04-01', 0, 11, 0),
(45, '2021-04-01', '2021-05-01', 0, 11, 0),
(46, '2021-05-01', '2021-06-01', 0, 11, 0),
(47, '2021-06-01', '2021-07-01', 0, 11, 0),
(48, '2021-07-01', '2021-08-01', 0, 11, 0),
(49, '2020-10-20', '2020-11-01', 464.009, 12, 0),
(50, '2021-08-01', '2021-09-01', 0, 11, 0),
(51, '2020-11-01', '2020-12-01', 1198.69, 12, 0),
(52, '2020-12-01', '2021-01-01', 1198.69, 12, 0),
(53, '2021-01-01', '2021-02-01', 1198.69, 12, 0),
(54, '2021-02-01', '2021-03-01', 1198.69, 12, 0),
(55, '2021-03-01', '2021-04-01', 1198.69, 12, 0),
(56, '2021-04-01', '2021-05-01', 1198.69, 12, 0),
(57, '2021-05-01', '2021-06-01', 1198.69, 12, 0),
(58, '2021-06-01', '2021-07-01', 1198.69, 12, 0),
(59, '2021-07-01', '2021-08-01', 1198.69, 12, 0),
(60, '2021-08-01', '2021-09-01', 1198.69, 12, 0),
(61, '2021-09-01', '2021-10-01', 1198.69, 12, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `proprietarios`
--

CREATE TABLE `proprietarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fone` varchar(13) NOT NULL,
  `dia_repasse` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `proprietarios`
--

INSERT INTO `proprietarios` (`id`, `nome`, `email`, `fone`, `dia_repasse`) VALUES
(7, 'Victor Souza da Rosa', 'victorsouzar1999@gmail.com', '(48)996547648', 1),
(9, 'Maria Eduarda Lucas', 'marialucasduda@outlook.com', '48998070829', 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `repasses`
--

CREATE TABLE `repasses` (
  `id` int(11) NOT NULL,
  `data_ini` date NOT NULL,
  `data_fim` date NOT NULL,
  `valor` float NOT NULL,
  `contrato_id` int(11) NOT NULL,
  `realizado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `repasses`
--

INSERT INTO `repasses` (`id`, `data_ini`, `data_fim`, `valor`, `contrato_id`, `realizado`) VALUES
(25, '2020-09-10', '2020-10-01', 710, 10, 1),
(26, '2020-10-01', '2020-11-01', 1040, 10, 0),
(27, '2020-11-01', '2020-12-01', 1040, 10, 0),
(28, '2020-12-01', '2021-01-01', 1040, 10, 0),
(29, '2021-01-01', '2021-02-01', 1040, 10, 0),
(30, '2021-02-01', '2021-03-01', 1040, 10, 0),
(31, '2021-03-01', '2021-04-01', 1040, 10, 0),
(32, '2021-04-01', '2021-05-01', 1040, 10, 0),
(33, '2021-05-01', '2021-06-01', 1040, 10, 0),
(34, '2021-06-01', '2021-07-01', 1040, 10, 0),
(35, '2021-07-01', '2021-08-01', 1040, 10, 0),
(36, '2021-08-01', '2021-09-01', 1040, 10, 0),
(37, '2020-09-11', '2020-10-01', 0, 11, 0),
(38, '2020-10-01', '2020-11-01', 0, 11, 0),
(39, '2020-11-01', '2020-12-01', 0, 11, 0),
(40, '2020-12-01', '2021-01-01', 0, 11, 0),
(41, '2021-01-01', '2021-02-01', 0, 11, 0),
(42, '2021-02-01', '2021-03-01', 0, 11, 0),
(43, '2021-03-01', '2021-04-01', 0, 11, 0),
(44, '2021-04-01', '2021-05-01', 0, 11, 0),
(45, '2021-05-01', '2021-06-01', 0, 11, 0),
(46, '2021-06-01', '2021-07-01', 0, 11, 0),
(47, '2021-07-01', '2021-08-01', 0, 11, 0),
(48, '2020-10-20', '2020-11-01', 336.607, 12, 0),
(49, '2021-08-01', '2021-09-01', 0, 11, 0),
(50, '2020-11-01', '2020-12-01', 948.72, 12, 0),
(51, '2020-12-01', '2021-01-01', 948.72, 12, 0),
(52, '2021-01-01', '2021-02-01', 948.72, 12, 0),
(53, '2021-02-01', '2021-03-01', 948.72, 12, 0),
(54, '2021-03-01', '2021-04-01', 948.72, 12, 0),
(55, '2021-04-01', '2021-05-01', 948.72, 12, 0),
(56, '2021-05-01', '2021-06-01', 948.72, 12, 0),
(57, '2021-06-01', '2021-07-01', 948.72, 12, 0),
(58, '2021-07-01', '2021-08-01', 948.72, 12, 0),
(59, '2021-08-01', '2021-09-01', 948.72, 12, 0),
(60, '2021-09-01', '2021-10-01', 948.72, 12, 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `contratos`
--
ALTER TABLE `contratos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `imoveis`
--
ALTER TABLE `imoveis`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `mensalidades`
--
ALTER TABLE `mensalidades`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `proprietarios`
--
ALTER TABLE `proprietarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `repasses`
--
ALTER TABLE `repasses`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `contratos`
--
ALTER TABLE `contratos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `imoveis`
--
ALTER TABLE `imoveis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `mensalidades`
--
ALTER TABLE `mensalidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de tabela `proprietarios`
--
ALTER TABLE `proprietarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de tabela `repasses`
--
ALTER TABLE `repasses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
