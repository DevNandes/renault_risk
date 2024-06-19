# CIRNETV2

## Modelos:

### Importações:
```javascript
import React, { useState } from "react";

// Libs
import { ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

// Componentes
import { ApontamentosAtivos } from "~/components/ApontamentosAtivos";
import { ApontadosAtivos } from "~/components/ApontadosAtivos";

// Funções
import { makeRequestEWS } from "~/functions/request";

// Style
import "~/styles/MateriaPrima.css"
```
- Pontos a serem lembrados:

    * Nem sempre serão estas as suas importações, a única padrão é o React la em cima;
    * O caminho do arquivo sempre deve iniciar com '~/' o que indica a pasta /src, então o resto do caminho tomara esta base;

### Componente:

```javascript
// Este componente tem como função x coisas
const ComponenteX = ({ parametroX, parametroY }) => {
    return(
        <div>
            Ola Mundo!
        </div>
    )
}

```
- Pontos a serem lembrados:

    * O nome do componentes é o unico nome que terá a primeira letra maiuscula, no restante(funções, etc...) usar camel case, que é desta forma: camelCase;
    * Os parametros recebidos por um componente se chamam 'props';
    * Os parametros recebidos devem tambem estar sendo enviados pelo componente pai;
    * É sempre bom um codigo bem comentado então o comentario explicando o que aquele componente faz ou mostra é sempre bem-vindo;
    * O return é sempre o que seja impresso na tela, podemos dizer que ele é o nosso famoso HTML um pouco evoluido;

### Estados:

```javascript
import React, { useState } from "react";

// Este componente tem como função x coisas
const ComponenteX = ({ parametroX, parametroY }) => {
    const [teste, setTeste] = useState("OLA mundo")

    return(
        <div>
            Ola Mundo!
        </div>
    )
}

```
- Pontos a serem lembrados:

    * O estado deve ser importado juntamente ao React(provavelmente o Visual Studio Code te ajudará nisso);
    * O estado nada mais é que uma variavel;
    * Neste caso 'teste' representa o valor que esta sentro da variavel teste ("OLA mundo") e o 'setTeste' nada mais é que uma fomra de definir um novo valor para isso;
    * No retorno nesse caso ia imprimir na tela: OLA mundo;

### Definindo Estados:

```javascript
import React, { useState } from "react";

// Este componente tem como função x coisas
const ComponenteX = ({ parametroX, parametroY }) => {
    const [teste, setTeste] = useState("OLA mundo")

    return(
        <div>
            {/* Define o valor de teste para "LALALA" */}
            {setTeste ("LALALA")}

            {/* Imprime o valor de teste("LALALA") na tela */}
            {teste}
        </div>
    )
}

```
- Pontos a serem lembrados:

    * A abertura de chaves dentro do nosso return possibilita escrever codigos javascript dentro dele, o que não seria possivel sem isso pois ele é como se fosse um 'HTML';
    * O estado nada mais é que uma variavel;
    * Neste caso 'teste' representa o valor ("LALALA") já que o setTeste definiu este novo valor;
    * No retorno nesse caso ia imprimir na tela: teste;
    * O codigo javascript dentro do return será executado toda vez que a tela carregar ou recarregar por algum motivo;

### Eventos

```javascript
import React, { useState } from "react";

// Este componente tem como função x coisas
const ComponenteX = ({ parametroX, parametroY }) => {
    const [teste, setTeste] = useState("OLA mundo")

    // Função que é executada quando o botão é clicado
    const cliqueBotao = () => {
        setTeste("Novo valor após clique")
    }

    return(
        <div>
            {/* Define o valor de teste para "LALALA" */}
            {setTeste("LALALA")}

            {/* Imprime o valor de teste ("LALALA") na tela */}
            {teste}

            {/* Botão que chama a função cliqueBotao quando clicado */}
            <button onClick={cliqueBotao}>Clique-me</button>
        </div>
    )
}
```
- Pontos a serem lembrados:

    * Os eventos são funções que são acionadas em resposta a ações do usuário, como um clique de botão.
    * No exemplo acima, o evento onClick é anexado a um botão e chama a função cliqueBotao quando o botão é clicado.
    * Dentro de cliqueBotao, estamos usando setTeste para definir um novo valor para o estado teste, que será refletido na tela quando o botão for clicado.

### Estruturas Condicionais:

```javascript
import React, { useState } from "react";

// Este componente tem como função x coisas
const ComponenteX = ({ parametroX, parametroY }) => {
    const [mostrarTexto, setMostrarTexto] = useState(false);

    return(
        <div>
            {/* Botão que alterna a exibição do texto */}
            <button onClick={() => setMostrarTexto(!mostrarTexto)}>Mostrar/Esconder Texto</button>

            {/* Renderiza o texto apenas se mostrarTexto for verdadeiro */}
            {mostrarTexto && <p>Texto a ser exibido/ocultado</p>}

            {/* Renderiza o primeiro texto se mostrarTexto for verdadeiro caso não ele renderiza o segundo texto */}
            {mostrarTexto ? (
                <p>Texto TESTE1</p>
            ) : (
                <p>Texto TESTE2</p>
            )}
        </div>
    )
}
```
- Pontos a serem lembrados:
    * Estruturas condicionais são usadas para mostrar ou ocultar elementos com base em uma condição.
    * No exemplo acima, usamos o estado mostrarTexto para controlar se um texto será exibido ou não.
    * O botão alterna o valor de mostrarTexto entre verdadeiro e falso, fazendo com que o texto seja mostrado ou ocultado na tela.

### Loops/Iterações:

```javascript
import React, { useState } from "react";

// Este componente tem como função x coisas
const ComponenteX = ({ parametroX, parametroY }) => {
    const [itens, setItens] = useState(["Item 1", "Item 2", "Item 3"]);

    return(
        <div>
            {/* Mapeia a array 'itens' e renderiza cada item */}
            <ul>
                {itens.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}
```
- Pontos a serem lembrados:
    * Os loops, como o map, permitem percorrer uma lista de itens e renderizar cada item.
    * No exemplo acima, estamos mapeando a array itens e renderizando cada item em uma lista não ordenada (<ul>).
    * O atributo key é importante para ajudar o React a identificar cada item de forma única.

### Efeitos:
```javascript
import React, { useState, useEffect } from "react";

const ExemploDeEfeito = () => {
    const [contador, setContador] = useState(0);

    // Este efeito será executado após a renderização inicial e em todas as atualizações
    useEffect(() => {
        document.title = `Contador: ${contador}`;
    });

    return (
        <div>
            <p>Contador: {contador}</p>
            <button onClick={() => setContador(contador + 1)}>Incrementar</button>
        </div>
    );
};
```
- Pontos a serem lembrados:

    * Importe o useEffect do React para usar os efeitos.
    * Declare o efeito dentro do componente usando useEffect.
    * O código dentro do efeito será executado após a renderização inicial e em cada atualização do componente.
    * No exemplo acima, o efeito atualiza o título da página com base no valor do contador.
    * Se você deseja que o efeito seja executado apenas uma vez na montagem do componente, pode passar um array vazio como segundo argumento: useEffect(() => {...}, []).
    * Para efeitos que dependem de variáveis específicas, você pode incluir essas variáveis no array de dependências para que o efeito seja reexecutado apenas quando essas variáveis mudarem.

### Chamada de API:

```javascript
// Este componente tem como função x coisas
import React, { useState } from "react";

// Funções
import { makeRequestEWS } from "~/functions/request";

// Este componente tem como função x coisas
const ComponenteX = ({ parametroX, parametroY }) => {

    // Chamadas
    const getOutraCoisa = async () => {
        return await makeRequestEWS(`/endpoint`);
    };
    const getAlgumaCoisa = async () => {
        const resposta = await makeRequestEWS(`/endpoint`)
        return resposta;
    };
    const getAlgumaOutraCoisa = async ({ parametroH }) => {
        return await makeRequestEWS(`/endpoint/${parametroH}`);
    };

    return(
        <div>
            <button onClick={() => getOutraCoisa()}>Chama Informação</button>
            <p>{resposta}</p>
        </div>
    )
}

```
- Pontos a serem lembrados:

    * Na chamada da API voce deve incluir o import la em cima do makeRequest;
    * Como parametro voce pode passar o endpoint para ela, mas pode não passar nada também;
    * Ela tambem pode receber parametros para complementar a chamada do endpoint;
    * A sua chamada seve ser acionado por algum fator nesse caso eu usei um botao mas pode até ser um efeito que mostrei ali em cima;
    * Ao clicar o botao ele vai tentar buscar no banco de dados algo que este endpoint especifica o que la no EWS2 e colocar dentro do paragrafo na tela;
