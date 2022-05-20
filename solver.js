firstPass = function() {
    for (var side = 0; side < 2; side++) { // once for all rows then once for all columns
        var isRow = side == 0;
        var idTemplate = isRow ? "row" : "col";
        var bounds = isRow ? width : height;
        var sep = isRow ? "&nbsp;" : "<br>";

        for (var index = 0; index < bounds; index++) {
            val = document.getElementById(idTemplate + index).innerHTML;
            vals = val.split(sep);
            console.log(vals);
            
            var sum = vals.length - 1;
            for (var i = vals.length - 1; i >= 0; i--) {
                if (vals[i] === '') {
                    vals.splice(i, 1);
                }
            }

            for (var i = 0; i < vals.length; i++) {
                sum += parseInt(vals[i]);
            }
            
            var runningSum = 0;
            for (var num in vals) {
                var numVal = parseInt(vals[num]);
                
                if (bounds - sum < numVal) {
                    for (var i = 0; i < numVal - bounds + sum; i++) {
                        var id = numVal - i - 1 + runningSum;
                        if (document.getElementById(isRow ? index + "-" + id : id + "-" + index).className == "initialBox")
                            console.log(isRow + "-" + index + "-" + numVal);
                        changeBox(isRow ? index + "-" + id : id + "-" + index, false);
                    }
                }

                runningSum += numVal + 1;
            }
        }
    }
}