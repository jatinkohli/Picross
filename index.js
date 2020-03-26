createGrid = function() {
    const defaultLength = 10;
    const defaultHeight = 10;

    var length = defaultLength;
    var height = defaultHeight;

    var str = "<table id=\"grid\">";
    
    for (var row of Array(height).keys()) {
        str += "<tr>";

        for (var box of Array(length).keys()) {
            var boxId = row.toString() + box;
            str += "<td id=\"" + boxId + "\" class=\"initialBox\" onclick=\"changeBox(this.id)\"></td>";
        }

        str += "</tr>";
    }

    str += "</table>";

    document.getElementById("grid").innerHTML = str;
}

changeBox = function(id) {
    console.log(id);
}