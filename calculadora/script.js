window.onload = function() {

    var mediaSalva = localStorage.getItem("media");
    var situacaoSalva = localStorage.getItem("situacao");

    if (mediaSalva && situacaoSalva) {
        document.getElementById("resultado").innerHTML =
        "Último resultado salvo:<br>Média: " + mediaSalva + "<br>Situação: " + situacaoSalva;
    }

}

function calcularMedia() {

    var n1 = document.getElementById("nota1").value;
    var n2 = document.getElementById("nota2").value;

    if (n1 === "" || n2 === "") {
        document.getElementById("resultado").innerText = "Preencha as notas";
        return;
    }

    var nota1 = parseFloat(n1);
    var nota2 = parseFloat(n2);

    if (isNaN(nota1) || isNaN(nota2)) {
        document.getElementById("resultado").innerText = "Digite apenas números";
        return;
    }

    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
        document.getElementById("resultado").innerText = "Notas de 0 a 10";
        return;
    }

    var media = (nota1 + nota2) / 2;

    var situacao = "";

    if (media >= 7) {
        situacao = "Aprovado";
        document.getElementById("resultado").style.color = "green";
    } 
    else if (media >= 5) {
        situacao = "Recuperação";
        document.getElementById("resultado").style.color = "orange";
    } 
    else {
        situacao = "Reprovado";
        document.getElementById("resultado").style.color = "red";
    }

    document.getElementById("resultado").innerHTML =
    "Média: " + media.toFixed(1) + "<br> Situação: " + situacao;

    localStorage.setItem("media", media.toFixed(1));
    localStorage.setItem("situacao", situacao);

}

function limparDados() {
    localStorage.clear();
    document.getElementById("resultado").innerText = "Dados apagados";
}