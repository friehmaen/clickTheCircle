function CircleTest () {

    this.currentSize = 0;
    this.currentIteration = 0;
    this.increaseAfter = 5;
    this.circleSizes = [5, 10, 20, 30, 50];
    this.clicks = [];
    this.numberOfClicks = 0;

    this.cirle = $("#theCircle");
    this.canvas = $("#theCanvas");
    this.result = $("#result");
    this.controlButton = $("#controlButton");

    this.lastTime = 0;

    this.moveCircleToRandomPosition = function () {
        var new_x = Math.floor(Math.random() * ($(document).width() - this.circleSizes[this.currentSize] * 2) + 1);
        var new_y = Math.floor(Math.random() * ($(document).height() - this.circleSizes[this.currentSize] * 2) + 1);

        this.cirle.attr("cx", new_x);
        this.cirle.attr("cy", new_y);
    };

    this.startTest = function () {
        this.result.hide();

        this.controlButton.click($.proxy(this.stopTest, this));
        this.controlButton.val("Stop Test");

        this.currentIteration = 0;
        this.currentSize = 0;
        this.numberOfClicks = 0;
        this.clicks = [];
        for (var i = 0; i < this.circleSizes.length; i++) {
            this.clicks.push([]);
        }
        this.setCircleSize(this.circleSizes[this.currentSize]);
        this.moveCircleToRandomPosition();

        this.canvas.show();
        this.lastTime = new Date();
    };

    this.stopTest = function () {
        this.canvas.hide();

        this.evaluate();

        this.controlButton.click($.proxy(this.startTest, this));
        this.controlButton.val("Start Test");
    };

    this.evaluate = function () {

        var text = "<br>Average time per click:<br>";

        for (var i = 0; i < this.clicks.length; i++) {
            var count = 0;
            var sum = 0;
            for (var j = 0; j < this.clicks[i].length; j++) {
                sum += this.clicks[i][j];
                count ++;
            }
            text += this.circleSizes[i] + "px: " + sum/count + "ms (" + count + " clicks)<br>";
        }

        this.result.html("Number of clicks: " + this.numberOfClicks + "<br>" + text);
        this.result.show();
    };

    this.clickCallback = function () {
        var timeDiff = new Date() - this.lastTime;
        this.clicks[this.currentSize].push(timeDiff);
        this.currentIteration += 1;
        this.numberOfClicks += 1;

        if (this.currentIteration >= this.increaseAfter) {
            this.currentIteration = 0;
            this.currentSize += 1;

            if (this.currentSize >= this.circleSizes.length) {
                this.stopTest();
                return;
            }
            this.setCircleSize(this.circleSizes[this.currentSize]);
        }
        this.moveCircleToRandomPosition();
        this.lastTime = new Date();
    };

    this.setCircleSize = function (size) {
        this.cirle.attr("r", size);
    };

    this.init = function () {
        this.cirle.click($.proxy(this.clickCallback, this));
        this.controlButton.click($.proxy(this.startTest, this));
    }
}