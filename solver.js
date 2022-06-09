firstPass = function() {
    for (var side = 0; side < 2; side++) { // once for all rows then once for all columns
        var isRow = side == 0;
        var idTemplate = isRow ? "row" : "col";
        var bounds = isRow ? width : height;
        var sep = isRow ? "&nbsp;" : "<br>";

        for (var index = 0; index < bounds; index++) {
            var rowVal = document.getElementById(idTemplate + index).innerHTML;
            var vals = rowVal.split(sep);
            
            for (var i = vals.length - 1; i >= 0; i--) {
                if (vals[i] === '') {
                    vals.splice(i, 1);
                }
            }
            console.log(vals);
            
            var sum = vals.length - 1;
            for (var i = 0; i < vals.length; i++) {
                sum += parseInt(vals[i]);
            }
            console.log(sum)
            
            var runningSum = 0;
            for (var val in vals) {
                var num = parseInt(vals[val]);
                
                if (bounds - sum < num) {
                    for (var i = 0; i < num - bounds + sum; i++) {
                        var id = num - i - 1 + runningSum;
                        if (document.getElementById(isRow ? index + "-" + id : id + "-" + index).className == "initialBox")
                            console.log(isRow + "-" + index + "-" + num);
                        changeBox(isRow ? index + "-" + id : id + "-" + index, false);
                    }
                }

                runningSum += num + 1;
            }
        }
    }
}