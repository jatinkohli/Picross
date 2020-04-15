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

    str += "<td \"class=\"header\" onclick=\"window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'\"></td>";
    for (var col of Array(length).keys()) {
        str += "<td id=\"col" + col + "\" class=\"colHeader\"></td>";
    }

    str += "</tr>";
    
    for (var row of Array(height).keys()) {
        str += "<tr>";

        str += "<td id=\"row" + row + "\" class=\"rowHeader\"></td>";

        for (var box of Array(length).keys()) {
            var boxId = row + "-" + box;
            var classStr = "\"initialBox" + (((box % 5) == 0) ? " leftBorder" : "") + 
                    ((((box + 1) % 5) == 0) ? " rightBorder" : "") + 
                    (((row % 5) == 0) ? " topBorder" : "") + 
                    ((((row + 1) % 5) == 0) ? " bottomBorder" : "") + "\"";

            str += "<td id=\"" + boxId + "\" class=" + classStr + " onclick=\"changeBox(this.id, false)\" onauxclick=\"changeBox(this.id, true)\"></td>";

            solution.set(boxId, parseInt((Math.random() * 2)));
        }

        str += "</tr>";
    }

    str += "</table>";

    document.getElementById("grid").innerHTML = str;

    // for (box of document.getElementsByClassName("initialBox")) {
    //     box.addEventListener("onmousedown");
    // }

    for (var row of Array(height).keys()) {
        document.getElementById("row" + row).innerHTML = getRowHeader(row);
        
        document.getElementById("row" + row).className += (((row % 5) == 0) ? " topBorder" : "") + 
                ((((row + 1) % 5) == 0) ? " bottomBorder" : "");
    }

    for (var col of Array(length).keys()) {
        document.getElementById("col" + col).innerHTML = getColHeader(col);

        document.getElementById("col" + col).className += (((col % 5) == 0) ? " leftBorder" : "") + 
                ((((col + 1) % 5) == 0) ? " rightBorder" : "");
    }
}

getRowHeader = function(row) {
    var str = "";

    var consecutive = 0;
    for (var box of Array(length).keys()) {
        var boxId = row + "-" + box;

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
        var boxId = row + "-" + col;
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
    console.log(id.substring(id.indexOf("-") + 1));

    var classString = document.getElementById(id).className;

    if (classString.includes("initialBox")) {
        var correct = isRMB == !solution.get(id);
        classString = classString.substring(classString.indexOf(" ") + 1);
        classString += solution.get(id) ? " filled" : " notFilled";
    
        if (correct) 
            classString += " correctBox";
        else {
            classString += " incorrectBox";

            document.getElementById(id).innerHTML = "X";
        }

        document.getElementById(id).className = classString;
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