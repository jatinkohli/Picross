let solution = new Map();
let defaultWidth = 10;
let defaultHeight = 10;
var width;
var height;

createGrid = function() {
    width = document.getElementById("numCols").value;
    height = document.getElementById("numRows").value;

    if (width === "") {
        width = defaultWidth;
        document.getElementById("numCols").value = width;
    } else {
        width = parseInt(document.getElementById("numCols").value);
    }

    if (height === "") {
        height = defaultWidth;
        document.getElementById("numRows").value = width;
    } else {
        height = parseInt(document.getElementById("numRows").value);
    }

    var str = "<table id=\"grid\">";

    str += "<tr>";

    str += "<td \"class=\"header\" onclick=\"window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'\"></td>";
    for (var col of Array(width).keys()) {
        str += "<td id=\"col" + col + "\" class=\"colHeader\"></td>";
    }

    str += "</tr>";
    
    for (var row of Array(height).keys()) {
        str += "<tr>";

        str += "<td id=\"row" + row + "\" class=\"rowHeader\"></td>";

        for (var box of Array(width).keys()) {
            var boxId = row + "-" + box;
            var classStr = "\"initialBox" + (((box % 5) == 0 && box != 0) ? " leftBorder" : "") + 
                    ((((box + 1) % 5) == 0) ? " rightBorder" : "") + 
                    (((row % 5) == 0 && row != 0) ? " topBorder" : "") + 
                    ((((row + 1) % 5) == 0) ? " bottomBorder" : "") + "\"";

            str += "<td id=\"" + boxId + "\" class=" + classStr + " onclick=\"changeBox(this.id, false)\" onauxclick=\"changeBox(this.id, true)\"></td>";

            solution.set(boxId, parseInt((Math.random() * 2)));
        }

        str += "</tr>";
    }

    str += "</table>";

    document.getElementById("grid").innerHTML = str;

    for (var row of Array(height).keys()) {
        document.getElementById("row" + row).innerHTML = getRowHeader(row);
    }

    for (var col of Array(width).keys()) {
        document.getElementById("col" + col).innerHTML = getColHeader(col);
    }
}

getRowHeader = function(row) {
    var str = "";

    var consecutive = 0;
    for (var box of Array(width).keys()) {
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
    var classString = document.getElementById(id).className;

    if (classString.includes("initialBox")) {
        var correct = isRMB == !solution.get(id);
        classString = classString.substring(classString.indexOf("initialBox") + 12);
        classString += solution.get(id) ? " filled" : " notFilled";
    
        if (correct) 
            classString += " correctBox";
        else {
            classString += " incorrectBox";

            document.getElementById(id).innerHTML = "X";
        }

        document.getElementById(id).className = classString;
    }

    if (isRowOrColComplete(id.substring(0,1), true)) {
        document.getElementById("row" + id.substring(0,1)).className += " complete";
    }
    if (isRowOrColComplete(id.substring(2,3), false)) {
        console.log("column complete");
    }

    if (document.getElementsByClassName("initialBox").length == 0) {
        showEndScreen();
    }
}

isRowOrColComplete = function(index, isRow) {
    var complete = true;
    var bounds = isRow ? width : height;

    for (var i = 0; i < bounds; i++) {
        var id = isRow ? index + "-" + i : i + "-" + index;

        if(document.getElementById(id).className.indexOf("initialBox") === 0) {
            complete = false;
            break;
        }
    }

    return complete;
}

showEndScreen = function() {
    var numMistakes = document.getElementsByClassName("incorrectBox").length;
    if (numMistakes == 0) {
        alert("Perfect!");
    } else {
        alert("Completed with " + numMistakes + " mistakes!");
    }
}

window.oncontextmenu = (e) => {
    e.preventDefault();
}