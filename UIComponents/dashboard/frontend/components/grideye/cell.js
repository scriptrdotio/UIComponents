function Cell(x, y, width, height, temperature) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.temperature = temperature;
    this.customSectors = [];

    this.setTempColors = function(customSectors) {
        this.customSectors = customSectors.ranges;
    }

    this.show = function(p5) { //draws the rectangle in the canvas with the corresponding color depending on temperature
        for(var i = 0; i < this.customSectors.length; i++){
            if(this.temperature > this.customSectors[i].lo && this.temperature < this.customSectors[i].hi){
                var loColor = '';
                var midColor = this.customSectors[i].color.replace('#', '');
                var hiColor = '';

                if (i == 0) {
                    loColor = midColor;
                    hiColor = this.customSectors[i + 1].color.replace('#', '');
                } else if (i == this.customSectors.length - 1) {
                    hiColor = midColor;
                    loColor = this.customSectors[i - 1].color.replace('#', '');
                } else {
                    loColor = this.customSectors[i - 1].color.replace('#', '');
                    hiColor = this.customSectors[i + 1].color.replace('#', '');
                }
                var midTemp = this.customSectors[i].lo + ((this.customSectors[i].hi - this.customSectors[i].lo) / 2);
                var color = '';

                if (this.temperature < midTemp) {
                    color = this.getColor(p5, this.temperature, this.customSectors[i].lo, midTemp, loColor, midColor);
                } else {
                    color = this.getColor(p5, this.temperature, midTemp, this.customSectors[i].hi, midColor, hiColor);
                }
                
                p5.fill(color);
            }
        }
        p5.rect(this.x, this.y, this.width, this.height); //function that draws a rectangle at position x and y with defined width and height
        p5.stroke(0); //border color or the rectangle
        p5.strokeWeight(.1); //border weight
    }
    
    this.getColor = function(p, t, lo, hi, from, to) {
        var fromRGB = [parseInt(from.slice(0, 2), 16), parseInt(from.slice(2, 4), 16), parseInt(from.slice(4, 6), 16)];
        var toRGB = [parseInt(to.slice(0, 2), 16), parseInt(to.slice(2, 4), 16), parseInt(to.slice(4, 6), 16)];

        var red = p.map(t, lo, hi, fromRGB[0], toRGB[0]);
        var green = p.map(t, lo, hi, fromRGB[1], toRGB[1]);
        var blue = p.map(t, lo, hi, fromRGB[2], toRGB[2]);
        if(red < 0 || green < 0 || blue < 0){
            console.log('less than zero');
        }
        return '#' + this.toHex(red) + this.toHex(green) + this.toHex(blue);
    }

    this.toHex = function(dec) {
        var s = parseInt(dec).toString(16);
        if (s.length < 2) {
            s = '0' + s;
        }
        return s;
    }

    this.update = function(newTemperature) {
        //we update the new temperature received without re-creating the Cell object
        this.temperature = newTemperature;
    }
}