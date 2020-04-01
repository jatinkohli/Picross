let solution = new Map();
let defaultLength = 10;
let defaultHeight = 10;
var length;
var height;

createGrid = function() {
    length = document.getElementById("numCols").value;
    height = document.getElementById("numRows").value;

    if (length === "") {
        length = defaultLength;
        document.getElementById("numCols").value = length;
    } else {
        length = parseInt(document.getElementById("numCols").value);
    }

    if (height === "") {
        height = defaultLength;
        document.getElementById("numRows").value = length;
    } else {
        height = parseInt(document.getElementById("numRows").value);
    }

    var str = "<table id=\"grid\">";

    str += "<tr>";

    str += "<td \"class=\"header\"></td>";
    for (var col of Array(length).keys()) {
        str += "<td id=\"col" + col + "\" class=\"colHeader\"></td>";
    }

    str += "</tr>";
    
    for (var row of Array(height).keys()) {
        str += "<tr>";

        str += "<td id=\"row" + row + "\" class=\"rowHeader\"></td>";

        for (var box of Array(length).keys()) {
            var boxId = row.toString() + box;
            str += "<td id=\"" + boxId + "\" class=\"initialBox\" onclick=\"changeBox(this.id, false)\" onauxclick=\"changeBox(this.id, true)\"></td>";

            solution.set(boxId, parseInt((Math.random() * 2)));
        }

        str += "</tr>";
    }

    str += "</table>";

    document.getElementById("grid").innerHTML = str;

    for (var row of Array(height).keys()) {
        document.getElementById("row" + row).innerHTML = getRowHeader(row);
    }

    for (var col of Array(length).keys()) {
        document.getElementById("col" + col).innerHTML = getColHeader(col);
    }
}

getRowHeader = function(row) {
    var str = "";

    var consecutive = 0;
    for (var box of Array(length).keys()) {
        var boxId = row.toString() + box;
        var sol = solution.get(boxId);

        if (sol)
            consecutive++;
        else {
            if (consecutive != 0)
                str += consecutive + "&nbsp";
            consecutive = 0;
        }
    }

    if (consecutive != 0)
        str += consecutive;

    return str;
}

getColHeader = function(col) {
    var str = "";

    var consecutive = 0;
    for (var row of Array(height).keys()) {
        var boxId = row.toString() + col;
        var sol = solution.get(boxId);

        if (sol)
            consecutive++;
        else {
            if (consecutive != 0)
                str += consecutive + "<br>";
            consecutive = 0;
        }
    }

    if (consecutive != 0)
        str += consecutive;

    return str;
}

changeBox = function(id, isRMB) {
    if (document.getElementById(id).className == "initialBox") {
        var correct = isRMB == !solution.get(id);
        var filledClass = solution.get(id) ? "filled" : "notFilled";
    
        if (correct) 
            document.getElementById(id).className = "correctBox " + filledClass;
        else {
            document.getElementById(id).className = "incorrectBox " + filledClass;

            document.getElementById(id).innerHTML = "X";
        }
    }

    if (document.getElementsByClassName("initialBox").length == 0) {
        showEndScreen();
    }
}

showEndScreen = function() {

}

window.oncontextmenu = (e) => {
    e.preventDefault();
}