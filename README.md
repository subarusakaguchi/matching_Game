![mag01](https://user-images.githubusercontent.com/50173813/131556485-bdb243c7-6b0e-4e9e-b5c0-fae05ff4d858.png)
# Jogo da Memória
 Jogo da memória desenvolvido durante o curso de desenvolvimento Full Stack do Igor Oliveira (Programador Br), o game conta com funcionalidades de contagem de tempo, contagem de jogadas e sistema de pontuação que considera os dois fatores citados para o cálculo do Score. Além de um sistema de Ranking que salva os dados e os recordes das 5 melhores partidas em Local Storage.
 
# Funcionamento:
Ao clickar em uma carta o código espera pelo segundo click, o que após selecionado é verificado se ocorreu um match, caso sim, os pontos são devidamente adicionados e caso contrário a classe "flip" retirada da carta colocando a mesma em seu estado original. A cada par encontrado é verificado se está foi uma jogada vencedora, o que se for verdade ativa a tela de Score e/ou de ranking dependendo dos pontos feitos.

Os pontos são divididos em duas partes, a primeira que depende do número de cartas formaram par no menor tempo possível, e outra que são pontos bônus que são deduzidos de acordo com o seu desempenho ao longo do jogo todo.
![mag02](https://user-images.githubusercontent.com/50173813/131557097-254c2303-cf73-463a-878d-f3143cd890dd.png)


![mag03](https://user-images.githubusercontent.com/50173813/131557099-06dd6538-d985-4a88-956d-925d817628d1.png)

Uma simples função ```if()``` reajusta os valroes dos pontos recebidos por cada par certo dependendo do momento em que a jogada foi realizada:

```
if (game.timeCount > 30) {
 game.points = 150
}
```

E caso a pontuação final alcance ou supere os 5 melhores jogadores cadastrados no sistema, um nome será pedido (caso contrário será colocado como Anônimo) e a posição no Ranking Substituida:
![Sem título](https://user-images.githubusercontent.com/50173813/131558327-e8813a19-120b-4d5e-aa14-9549aa07020c.png)


![mag04](https://user-images.githubusercontent.com/50173813/131558323-34fd65ce-31d8-43b9-8bbe-b93bba8b2735.png)


![mag05](https://user-images.githubusercontent.com/50173813/131558325-a3b38e64-0dc1-4c72-be31-4b2f50e26752.png)

Todos os dados são salvos em Local Storage, então mesmo após reiniciar os dados é possível manter os dados de forma local.

[Link para o jogo hospedado no GitHub](https://subarusakaguchi.github.io/matching_Game/)
