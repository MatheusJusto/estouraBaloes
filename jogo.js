var timerId = null; //var armazena chamada da func timeout

(function iniciaJogo() {
 	var url = window.location.search;
 	var nivelJogo = url.replace('?', '');
 	var tempoCronometro = 0;
 	var qtdBaloes = 25;


 	if(nivelJogo == 1) {
 		tempoCronometro = 120;
 	}
 	if(nivelJogo == 2) {
 		tempoCronometro = 60;
 	}
 	if(nivelJogo == 3) {
 		tempoCronometro = 30;
 	}

 	//insere cronometro
 	document.getElementById('cronometro').innerHTML = tempoCronometro;
 	insereBaloes(qtdBaloes);

 	//imprimir baloesInteiros 
 	document.getElementById('baloesInteiros').innerHTML = qtdBaloes;

 	//imprimir baloesEstourados 
 	document.getElementById('baloesEstourados').innerHTML = 0;


 	contadorTempo(tempoCronometro + 1);




}());

function gameOver() {
	alert("FIM DE JOGO!!! \n você não conseguiu estourar todos os balões a tempo")
}

function contadorTempo(segundos) {
	segundos -=  1;

	if(segundos == -1) {
		clearTimeout(timerId); //para execução do set time out; 
		gameOver();
		return false;
	}


	document.getElementById('cronometro').innerHTML = segundos; 
	timerId = setTimeout("contadorTempo("+segundos+")", 1000); 
	
};

function insereBaloes(qtdBaloes) {

	for(var i = 1; i <= qtdBaloes; i++) {
		var balao = document.createElement('img');
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.classList.add('baloes');
		balao.id = 'balão'+i;
		balao.onclick = function() {
			estourar(this);
		}


		document.getElementById('cenario').appendChild(balao);
	};
};

function estourar(e) {
	var idBalao = e.id;
	document.getElementById(idBalao).src = "imagens/balao_azul_pequeno_estourado.png"
	document.getElementById(idBalao).setAttribute('onclick','')
	pontuacao(-1);
}

function pontuacao(acao) {
	var baloesInteiros =   document.getElementById('baloesInteiros').innerHTML;
	var baloesEstourados = document.getElementById('baloesEstourados').innerHTML;

		baloesInteiros  =  parseInt(baloesInteiros)
		baloesEstourados = parseInt(baloesEstourados)

		baloesInteiros += acao;
		baloesEstourados -= acao;

		document.getElementById('baloesInteiros').innerHTML = baloesInteiros;
		document.getElementById('baloesEstourados').innerHTML = baloesEstourados;


	situacaoJogo(baloesInteiros, baloesEstourados);


}

function situacaoJogo(baloesInteiros, baloesEstourados) {
	if(baloesInteiros == 0) {
		alert('Parabens!!! \n você conseguiu estourar todos os balões a tempo');
		pararJogo();
	}			
}

function pararJogo() {
	clearTimeout(timerId);
}