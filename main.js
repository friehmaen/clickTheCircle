function CircleTest () {

    this.currentSize = 0;
    this.currentIteration = 0;
    this.increaseAfter = 2;
    this.circleSizes = [5, 10, 20, 30, 50];
    this.numberOfClicks = 0;

    this.cirle = $("#theCircle");
    this.canvas = $("#theCanvas");
    this.result = $("#result");
    this.controlButton = $("#controlButton");

    this.moveCircleToRandomPosition = function () {
        var new_x = Math.floor(Math.random() * ($(document).width() - this.circleSizes[this.canvas] * 2) + 1);
        var new_y = Math.floor(Math.random() * ($(document).height() - this.circleSizes[this.currentSize] * 2) + 1);

        this.canvas.css({position: 'absolute', left: new_x, top: new_y});
    };

    this.startTest = function () {
        this.result.hide();

        this.controlButton.click($.proxy(this.stopTest, this));
        this.controlButton.val("Stop Test");

        this.currentIteration = 0;
        this.currentSize = 0;
        this.numberOfClicks = 0;
        this.setCircleSize(this.circleSizes[this.currentSize]);
        this.moveCircleToRandomPosition();

        this.canvas.show();
    };

    this.stopTest = function () {
        this.canvas.hide();

        this.evaluate();

        this.controlButton.click($.proxy(this.startTest, this));
        this.controlButton.val("Start Test");
    };

    this.evaluate = function () {

        this.result.text("Number of clicks: " + this.numberOfClicks);
        this.result.show();
    };

    this.clickCallback = function () {
        this.currentIteration += 1;
        this.numberOfClicks += 1;

        if (this.currentIteration >= this.increaseAfter) {
            this.currentIteration = 0;
            this.currentSize += 1;

            if (this.currentSize >= this.circleSizes.length) {
                this.stopTest();
            }
            this.setCircleSize(this.circleSizes[this.currentSize]);
        }

        this.moveCircleToRandomPosition();
    };

    this.setCircleSize = function (size) {
        this.cirle.attr("r", size);
    };

    this.init = function () {
        this.cirle.click($.proxy(this.clickCallback, this));
        this.controlButton.click($.proxy(this.startTest, this));
    }
}

var test = new CircleTest();
test.init();