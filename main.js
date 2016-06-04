function moveCircleToRandomPosition () {

    var pos = $("#theCircle").position();

    var new_x = Math.floor(Math.random() * ($( document ).width() - circleSizes[currentSize] * 2) + 1);
    var new_y = Math.floor(Math.random() * ($( document ).height() - circleSizes[currentSize] * 2) + 1);

    $("#theCanvas").css({position: 'absolute', left: new_x, top: new_y});
}

var currentSize = 0;
var currentIteration = 0;
var increaseAfter = 2;
var circleSizes = [5, 10, 20, 30, 50];

function startTest() {
    var btn = $("#controlButton");
    btn.click(stopTest);
    btn.val("Stop Test");

    currentIteration = 0;
    currentSize = 0;
    setCircleSize(circleSizes[currentSize]);
    moveCircleToRandomPosition();

    $("#theCanvas").show();
}

function stopTest () {
    $("#theCanvas").hide();

    var btn = $("#controlButton");
    btn.click(startTest);
    btn.val("Start Test");
}

function init () {
    $("#theCircle").click (clickCallback);
    $("#controlButton").click(startTest)
}

function clickCallback() {
    currentIteration += 1;

    if (currentIteration >= increaseAfter) {
        currentIteration = 0;
        currentSize += 1;

        if (currentSize >= circleSizes.length) {
            stopTest();
        }
        setCircleSize(circleSizes[currentSize]);
    }

    moveCircleToRandomPosition();
}

function setCircleSize(size) {
    var c = $("#theCircle");
    c.attr("r", size);
}

init();