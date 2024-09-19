function init() {
    var chessBoard = document.getElementById("tavola");
    var ciao = "<tr><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th>"
    let chiaro = false
    for (var i = 0; i<8; i++){
        var number = 8-i
        chiaro=!chiaro;
        ciao+="<tr>"
        for (const letter of ["A", "B", "C", "D", "E", "F", "G", "H"]){
            ciao+="<td id='"+letter+number+"' class='"+(chiaro?"chiaro":"scuro")+"'></td>"
            chiaro=!chiaro
        }
        ciao+="</tr>"
    }
    chessBoard.innerHTML=ciao
    for (const pos of ["A1", "C1", "E1", "G1", "B2", "D2", "F2", "H2", "A3", "C3", "E3", "G3"]){
        document.getElementById(pos).innerHTML='<span class="bianco" onclick="mossa(this)"></span>'
    }
    for (const pos of ["A7", "C7", "E7", "G7", "B8", "D8", "F8", "H8", "B6", "D6", "F6", "H6"]){
        document.getElementById(pos).innerHTML='<span class="nero" onclick="mossa(this)"></span>'
    }
}

var turnochiaro = true

function mossa(pedina) {
    const color = pedina.className
    const pos = pedina.parentElement.id
    if((turnochiaro && color=="nero") || (!turnochiaro && color=="bianco"))
        return
    const bloc=controlla_dia(color,pos)

    for(const b of bloc)
        document.getElementById(b).style.backgroundColor="#1692e8"
}

function controlla_dia(color, pos){
    var direction = 1
    if (color == "nero"){
        direction = -1
    }
    var bloc = [String.fromCharCode(pos[0].charCodeAt(0)+1)+(parseInt(pos[1])+direction), String.fromCharCode(pos[0].charCodeAt(0)-1)+(parseInt(pos[1])+direction)]
    for(const b of bloc){
        if(b[0].charCodeAt(0)<65 || b[0].charCodeAt(0)>72 || parseInt(b[1])<1 || parseInt(b[1])>8)
            bloc.splice(bloc.indexOf(b), 1)
    }
    return bloc
}