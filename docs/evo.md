Revisão 5 protocolo facial
Índice
1. Equipamento Ativo Enviando Dados para o Servidor
2. Servidor Ativo Enviando Dados para o Equipamento
3. Firmware especiais
Notas
Noções básicas iniciais
Notas
Noções básicas iniciais
1.1 Registro
1.2 Enviar Logs
2.1 Obter Lista de Usuários
2.2 Obter Informações do Usuário
2.3 Definir/Enviar Informações de Usuário
2.4 Deletar Usuários
2.5 Obter Nome do Usuário
2.6 Definir Nome dos Usuários
2.7 Habilitar Usuário
2.8 Desabilitar Usuário
2.9 Remover Todos os Usuários
2.10 Obter Logs Novos
2.11 Obter Todos os Logs
2.12 Limpar Todos os Logs
2.13 Limpar Aparelho
2.14 Reiniciar Aparelho
2.15 Remover Todos os Administradores
2.16 Definir Data e Hora
2.17 Definir Parâmetros do Equipamento
2.18 Ativar ou Desativar "Servidor Ratify"
2.19 Abertura remota de porta
3.1 Controle de GIRO
3.1.1 Configuração do hardware para controle de giro
3.2 Equipamento 4G
3.2.1 Registro inicial
3.2.2 Exemplo de Acesso (comunicando 4G)
3.2.3 Exemplo de Acesso (sem comunicação 4G)
Utilize o protocolo WebSocket para comunicação (versão RFC645513)
Porta de escuta padrão: (configurável, preferencialmente acima de 1024, sem TLS)
Dados no formato JSON
Utilize JavaScript para serializar e desserializar se necessário
Regras de formatação JSON:
Todos os pares chave-valor utilizam caracteres minúsculos (lower-case)
O Evo facial atua como Client. Ao fazer a configuração e aponta-lo para um servidor, ele enviará o "cmd: Reg" (abaixo) no polling de
20s.
O equipamento enviará essa informação até que seja processada pelo servidor, que deve retornar o comando abaixo:
O comando pode conter outras opções também:
Valores de backupnum
Nota: Um usuário pode ter:
{
"cmd":"reg",
"sn":"ABCD12345678",
"devinfo":{
"modelname":"AiFace",
"usersize":5000,
"facesize":5000,
"fpsize":0,
"palmsize":0,
"cardsize":5000,
"pwdsize":5000,
"logsize":500000,
"useduser":2,
"usedface":2,
"usedfp":0,
"usedpalm":0,
"usedcard":1,
"usedpwd":1,
"usedlog":22,
"usednewlog":16,
"usedrtlog":16,
"netinuse":1,
"usb4g":0,
"fpalgo":"thbio3.0",
"firmware":"VERSÃO DO FIRMWARE",
"time":"2024-12-31 00:00:00",
"intercom":0,
"floors":48,
"charid":1,
"useosdp":0,
"dislanguage":524417,
"curip":"IP DO EQUIPAMENTO",
"mac":"ENDEREÇO MAC"}
}
{
"ret":"reg",
"result":true
}
{
"ret":"reg",
"result":true,
"cloudtime":"2024-01-30 11:30:25",
"nosenduser":true
}
0 a 9 : Impressão digital
10 : Senha
11 : Cartão RFID
50 : Foto (Base64)
Até 10 impressões digitais
Uma senha
Um cartão RFID
1. Equipamento Ativo Enviando Dados para o Servidor
1.1 Registro
Mensagem enviada pelo equipamento:
Resposta do servidor:
1.2 Enviar Logs
Mensagem enviada pelo Equipamento:
Uma face
{
 "cmd": "reg",
 "sn": "ZX0006827500",
 "cpusn": "123456789",
 "devinfo": {
 "modelname":"tfs30",
 "usersize":3000,
 "fpsize": 3000,
 "cardsize": 3000,
 "pwdsize": 3000,
 "logsize": 100000,
 "useduser": 1000,
 "usedfp": 1000,
 "usedcard": 2000,
 "usedpwd": 400,
 "usedlog": 100000,
 "usednewlog": 5000,
 "fpalgo": "thbio3.0",
 "firmware": "th600w v6.1",
 "time": "2023-12-23 13:49:30",
 "mac": "00-01-A9-01-00-01"
 }
}
Sucesso
{
 "ret": "reg",
 "result": true,
 "cloudtime": "2023-12-23 13:49:30",
 "nosenduser": true
}
Falha
{
 "ret": "reg",
 "result": false,
 "reason": "did not reg"
}
{
 "cmd": "sendlog",
 "sn": "zx12345678",
 "count": 2,
 "logindex": 10,
 "record": [
 {
O equipamento envia este comando quando há registros em sua memória interna que ainda não foram recebidos pelo servidor.
Quando o equipamento recebe o retorno positivo do servidor, ele cessa de mandar aqueles registros.
Os parâmetros access e message são pertinentes aos equipamentos que trabalham de forma online. Ao acessar menu > servidor >
servidor valida > sim/renúncia offline, o equipamento irá considerar estes campos. O campo access com valor 1 permite o registro,
caso seja 0, não permite o registro. O campo message mostra a mensagem na tela no ato do reconhecimento.
Isso é ideal para controlar o acesso de forma mais flexível ao equipamento, criando a lógica para aquele usuário e alterando estes
campos conforme necessidade.
Resposta do servidor:
2. Servidor Ativo Enviando Dados para o Equipamento
2.1 Obter Lista de Usuários
Mensagem enviada pelo servidor:
Resposta do equipamento:
 "enrollid": 1,
 "time": "2023-12-23 13:49:30",
 "mode": 0,
 "inout": 0,
 "event": 0,
 "temp": 36.5,
 "verifymode": 13,
 "image": "gesg524hgd"
 }
 ]
}
Sucesso
{
 "ret": "sendlog",
 "result": true,
 "count": 2,
 "logindex": 10,
 "cloudtime": "2023-12-23 13:49:30",
 "access": 1,
 "message": "message"
}
{
 "cmd": "getuserlist",
 "stn": true
}
Com usuários:
{
 "ret": "getuserlist",
 "result": true,
 "count": 40,
 "from": 0,
 "to": 39,
 "record": [
 { "enrollid": 1, "admin": 0, "backupnum": 0 },
 { "enrollid": 2, "admin": 1, "backupnum": 0 },
 { "enrollid": 39, "admin": 0, "backupnum": 10 }
2.2 Obter Informações do Usuário
Mensagem enviada pelo servidor:
Resposta do equipamento:
Reason: 1 -> Imagem muito grande;
Reason: 5 -> Face não identificada na imagem;
Reason: 6 -> Mais de uma face na imagem;
Reason: 7 -> Largura ou altura da imagem muito larga;
Reason: 8 -> Face muito grande;
Reason: 9 ->Face muito pequena;
Reason 10 -> Imagem com qualidade muito baixa;
Reason: 11 -> imagem parcial da face (angulada, parcialmente coberta etc);
Reason: 12 -> Face já cadastrada;
Outro: Decodificação da imagem falhou
2.3 Definir/Enviar Informações de Usuário
 ]
}
Sem usuários:
{
 "ret": "getuserlist",
 "result": true,
 "count": 0,
 "from": 0,
 "to": 0,
 "record": []
}
{
 "cmd": "getuserinfo",
 "enrollid": 1,
 "backupnum": 50
}
Sucesso
{
 "ret": "getuserinfo",
 "result": true,
 "enrollid": 1,
 "name": "Fulano",
 "backupnum": 50,
 "admin": 0,
 "record": "aabbccddeeffggddssiifdjdkjfkjdsjlkjal"
}
Falha
{
 "ret": "getuserinfo",
 "result": false,
 "reason": 1
}
Mensagem enviada pelo servidor:
Resposta do equipamento:
2.4 Deletar Usuários
Para deletar o usuário do equipamento como um todo, utilize "backupnum": 12
Caso queira apagar algum dos campos, utilize o valor respectivo de backupnum
Mensagem enviada pelo servidor:
Resposta do equipamento:
{
 "cmd": "setuserinfo",
 "enrollid": 1,
 "name": "Fulano",
 "verifymode": 1,
 "card": 123456,
 "pwd": 123456,
 "enable":1,
 "shiftid": 1,
 "zoneid": 1,
 "groupid":1,
 "birthday": "03-04",
 "starttime": "2023-03-02 00:00:00",
 "endtime": "2023-03-30 00:00:00",
 "backupnum": 0,
 "admin": 0,
 "record": "aabbccddeeffggddssiifdjdkjfkjdsjlkjalflsgsadg"
}
Sucesso
{
 "ret": "setuserinfo",
 "result": true
}
Falha
{
 "ret": "setuserinfo",
 "result": false,
 "reason": 1
}
{
 "cmd": "deleteuser",
 "enrollid": 1,
 "backupnum": 12
}
Sucesso
{
 "ret": "deleteuser",
 "result": true
}
2.5 Obter Nome do Usuário
Mensagem enviada pelo servidor:
Resposta do equipamento:
2.6 Definir Nome dos Usuários
Mensagem enviada pelo servidor:
Resposta do equipamento:
Falha
{
 "ret": "deleteuser",
 "result": false,
 "reason": 1
}
{
 "cmd": "getusername",
 "enrollid": 1
}
Sucesso
{
 "ret": "getusername",
 "result": true,
 "record": "Fulano"
}
Falha
{
 "ret": "getusername",
 "result": false,
 "reason": 1
}
{
 "cmd": "setusername",
 "count": 50,
 "record": [
 { "enrollid": 1, "name": "Fulano" },
 { "enrollid": 50, "name": "Ciclano" }
 ]
}
Sucesso
{
 "ret": "setusername",
 "result": true
}
2.7 Habilitar Usuário
Mensagem enviada pelo servidor:
Resposta do equipamento:
2.8 Desabilitar Usuário
Mensagem enviada pelo servidor:
Resposta do equipamento:
Falha
{
 "ret": "setusername",
 "result": false,
 "reason": 1
}
{
 "cmd": "enableuser",
 "enrollid": 1,
 "enflag": 1
}
Sucesso
{
 "ret": "enableuser",
 "result": true
}
Falha
{
 "ret": "enableuser",
 "result": false,
 "reason": 1
}
{
 "cmd": "enableuser",
 "enrollid": 1,
 "enflag": 0
}
Sucesso
{
 "ret": "enableuser",
 "result": true
}
Falha
2.9 Remover Todos os Usuários
Mensagem enviada pelo servidor:
Resposta do equipamento:
2.10 Obter Logs Novos
Mensagem enviada pelo servidor:
Resposta do equipamento:
{
 "ret": "enableuser",
 "result": false,
 "reason": 1
}
{
 "cmd": "cleanuser"
}
Sucesso
{
 "ret": "cleanuser",
 "result": true
}
Falha
{
 "ret": "cleanuser",
 "result": false,
 "reason": 1
}
{
 "cmd": "getnewlog",
 "stn": true
}
Com logs
{
 "ret": "getnewlog",
 "result": true,
 "count": 1000,
 "from": 0,
 "to": 49,
 "record": [
 {
 "enrollid": 1,
 "time": "2023-12-23 13:49:30",
 "mode": 0,
 "inout": 0,
 "event": 0
 }
2.11 Obter Todos os Logs
Mensagem enviada pelo servidor:
2.12 Limpar Todos os Logs
Mensagem enviada pelo servidor:
Resposta do equipamento:
2.13 Limpar Aparelho
Mensagem enviada pelo servidor:
 ]
}
Sem logs
{
 "ret": "getnewlog",
 "result": true,
 "count": 0,
 "from": 0,
 "to": 0,
 "record": []
}
{
 "cmd": "getalllog",
 "stn": true,
 "from": "2023-12-01",
 "to": "2023-12-24"
}
{
 "cmd": "cleanlog"
}
Sucesso
{
 "ret": "cleanlog",
 "result": true
}
Falha
{
 "ret": "cleanlog",
 "result": false,
 "reason": 1
}
{
 "cmd": "initsys"
Resposta do equipamento:
2.14 Reiniciar Aparelho
Mensagem enviada pelo servidor:
Nota: Não há retorno para este comando.
2.15 Remover Todos os Administradores
Mensagem enviada pelo servidor:
2.16 Definir Data e Hora
Mensagem enviada pelo servidor:
2.17 Definir Parâmetros do Equipamento
Mensagem enviada pelo servidor:
}
Sucesso
{
 "ret": "initsys",
 "result": true
}
Falha
{
 "ret": "initsys",
 "result": false,
 "reason": 1
}
{
 "cmd": "reboot"
}
{
 "cmd": "cleanadmin"
}
{
 "cmd": "settime",
 "cloudtime": "2023-12-23 13:49:30"
}
{
 "cmd": "setdevinfo",
 "deviceid": 1,
 "language": 0,
 "volume": 0,
 "screensaver": 0,
2.18 Ativar ou Desativar "Servidor Ratify"
Mensagem enviada pelo servidor:
2.19 Abertura remota de porta
Mensagem enviada pelo servidor:
3. Firmware especiais:
3.1 Controle de GIRO
Altera o valor "Inout" para contemplar a se houve e giro e qual a direção
Valores de inout: 7 = Não girou; 6 = girou na direção A, 5 = Girou na direção B;
Exemplo de log:
Dessa forma, nada é alterado comparado ao log convencional, deve-se apenar observar o valor de inout
3.1.1 Configuração do hardware para controle de giro
CM -> Comum
NA -> Normalmente Aberto
 "verifymode": 0
}
{
 "cmd": "setdevinfo",
 "server_verify": 1
}
{
 "cmd": "opendoor",
 "doornum": 1
}
//Não girou
{
"cmd":"sendlog",
"sn":"ZYSA11003779",
"count":1,
"logindex":0,
"record":[
{
"enrollid":1,
"name":"",
"time":"2024-09-18 17:24:25",
"mode":3,
"inout":7,
"event":0
}
]
}
NF -> Normalmente Fechado
GND -> Terra (Ground)
Ligação do acionamento do facial para a placa Semi-eletrônica:
Configuração na placa Semi-eletrônica:
Na Semi-eletrônica configurar o retorno de giro nos relés 2 e 3
Ligação do retorno de giro na Semi-eletrônica:
Quando efetuar o giro, de acordo com a configuração realizada acima, a Semi-eletrônica irá enviar um pulso negativo no FIRE IN e no
EXIT BUTTON para confirmação do giro.
Relé 2 Semi-eletrônica: CM gnd - NA fio branco FIRE IN
Relé 3 Semi-eletrônica: CM gnd - NA fio amarelo BUTTON
ANTES DE LIGAR CONFERIR SE OS JUMPERS DOS RELES NÃO ESTÃO FECHADOS COM O 12V. SE ESTIVER, HAVERÁ
CURTO E DANIFICARA OS EQUIPAMENTOS
Pinagem
GND: Preto - Qualquer chicote
FIRE_IN: Branco - Chicote COM (Vermelho)
BUTTON: Amarelo - Chicote ACESSO (Branco)
Configurações no Evo Facial:
Atualizar o firmware da personalização TurnstilePass
Acesso > Acesso > {"Tempo de acionamento": "1seg"}
Acesso > Acesso > {"Nova Verif.": "10seg"}
Turno > Aba: Regras > {"Nova Verif.": "1seg"}
3.2 Equipamento 4G
Altera a mensagem de acesso (sendlog) do equipamento enquanto o mesmo estiver utilizando a comunicação 4G.
Desabilitado a porta USB para comportar o periférico 4G
3.2.1 Registro inicial
Fio CM e NA do relé do facial na botoeira da Semi-eletrônica
Quando o facial acionar o rele precisa liberar ambos na Semi-eletrônica
Recebido: {
 "cmd": "reg",
 "sn": "SERIAL EQUIPAMENTO",
 "devinfo": {
 "modelname": "AiFace",
 "manufacturer": "",
 "usersize": 5000,
 "facesize": 5000,
 "fpsize": 0,
 "palmsize": 0,
 "cardsize": 5000,
 "pwdsize": 5000,
 "logsize": 500000,
 "useduser": 58,
 "usedface": 50,
 "usedfp": 0,
 "usedpalm": 0,
 "usedcard": 0,
 "usedpwd": 0,
O Registro inicial agora contém um novo campo informando se o equipamento utiliza a tecnologia 4G, marcado como "usb4g
3.2.2 Exemplo de Acesso (sendlog) enquanto comunicando 4G
*Adicionado os campos "note" e "msg" enquanto comunicando 4G
3.2.3 Exemplo de Acesso (sendlog) enquanto não comunicando 4G
Se mantém o mesmo do protocolo/comunicação padrão
 "usedlog": 0,
 "usednewlog": 0,
 "usedrtlog": 0,
 "netinuse": 1,
 "usb4g": 1, // <- NOVO CAMPO
 "fpalgo": "thbio3.0",
 "firmware": "ai806_f06v_v5.06",
 "time": "2025-01-01 01:02:03",
 "intercom": 0,
 "floors": 48,
 "charid": 0,
 "useosdp": 0,
 "dislanguage": 524417,
 "curip": "192.168.000.001",
 "mac": "00-01-A9-1A-ED-E5"
 }
}
{
 "enrollid": 123456789,
 "name": "TESTE 4G ON",
 "time": "2025-01-01 01:02:03",
 "mode": 0,
 "inout": 0,
 "event": 1,
 "note": { // <-- Campo novo
 "msg": "4g on" // <-- Campo novo
 }
{
 "enrollid": 82034,
 "name": "TESTE 4G OFF ",
 "time": "2025-01-01 01:02:03",
 "mode": 8,
 "inout": 0,
 "event": 0
 },