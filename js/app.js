window.onload = function() {
  var s = new whacAMole({
    'rows': 4,
        //the number of rows in the game
    'cols': 7,
        //the number of cols in the game
    'width': 51,
        //the block width
    'height': 51,
        //the block height
    'container': 'stage',
        //the play area
    'clock': 'clock',
        //the clock wrapper
    'score': 'score',
        //the score wrapper
    'play_btn': 'play',
        //the play button
    'stop_btn': 'stop',
        //the stop button
    'color': '#',
        //the block color
    'delay': 0,
        //the display dalay between block
    'duration': 30,
        //the game duration in seconds
    'padding': 2,
         //the space between blocs
    }).create();

};
var whacAMole = function whacAMole(conf) {
  this.rows = 6;
  this.cols = 6;
  this.total = 0;
  this.elements = [];
  this.score = 0;
  this.scoreWrapper = null;
  this.clockWrapper = null;
  this.running = null;
  this.waitAclick = null;
  this.options = {
    'delay': 0,
    'width': 40,
    'height': 40,
    'padding': 1,
    'score_label': 'Score: ',
    'duration': 30,
    'time_remain_label': 'Time Remaining: ',
    'wfaclick_delay': 1400
    };
  this.active = 0;
  this.wait = 0;
  this.nextwait = 0;
  this.container = null;
if (this.initialize) {
    this.initialize.apply(this, arguments);

    }
    return this;
};
whacAMole.prototype.initialize = function(opts) {
    this.setOptions(opts);
    if (this.options.difficulty < 1) {
        this.options.difficulty = 1;
    }
    if (this.options.difficulty > 3) {
        this.options.difficulty = 3;
    }
    this.options.difficulty = Number('0.' + this.options.difficulty);
    return this;
};

whacAMole.prototype.setOptions = function(o) {
    for (var v in o) {
        if (o[v]) {
            this.options[v] = o[v];
        }
    }
};
whacAMole.prototype.create = function() {
    if (this.container || this.options.container) {
        this.container = document.getElementById(this.options.container) || document.body;
        var rows = this.options.rows || this.rows;
        var cols = this.options.cols || this.cols;
        this.total = rows * cols;

        //Create draw pointer
        var pointer = {
            'dir': 0,
            'x': -this.options.width - (2 * this.options.padding),
            'y': 0,
            'width': this.options.width,
            'height': this.options.height,
            'cols': cols,
            'rows': rows - 1,
            'count': 0,
            'total': rows * cols,
            'delay': 0,
            'color': this.options.color,
            'delay_step': this.options.delay,
            'padding': this.options.padding
        };
        this.draw(pointer.cols, pointer);
        return this;
    } else {
        window.alert('A container is required, Game cannot be played');
    }
};
whacAMole.prototype.startUI = function() {
    this.wait = this.options.wfaclick_delay;
    var play = document.getElementById(this.options.play_btn) || null;
    var stop = document.getElementById(this.options.stop_btn) || null;
    var self = this;
    //Add score
    if (!this.scoreWrapper) {
        this.scoreWrapper = document.getElementById(this.options.score) || null;
    }
    if (this.scoreWrapper) {
        this.scoreWrapper.innerHTML = this.options.score_label;
    }
    //Add clock
    if (!this.clockWrapper) {
        this.clockWrapper = document.getElementById(this.options.clock) || null;
    }
    if (this.clockWrapper) {
        this.clockWrapper.innerHTML = this.options.time_remain_label + this.options.duration + ' s';
    }
    //Add buttons behaviors
    if (play) {
        play.onclick = function() {
            if (self.running) {
                return;
            }
            self.updateClock();
            self.play();
        };
    }
    if (stop) {
        stop.onclick = function() {
            self.stop();
        };
    }
};
//Update clock and game function
whacAMole.prototype.updateClock = function() {
    var self = this;
    var enlapsed = 1;
    var end = this.options.duration;
    this.running = window.setInterval(function() {
        var p = (enlapsed / end) * 100;
        var d = Math.round((enlapsed / end) * (self.options.wfaclick_delay * 0.4));
        self.nextwait = self.options.wfaclick_delay - d;
        if ((end - enlapsed) === 0) {
            self.stop();
            return;
        }
        self.clockWrapper.innerHTML = self.options.time_remain_label + (end - enlapsed) + ' s';
        enlapsed++;
    }, 1000);

};
whacAMole.prototype.updateScore = function() {
    if (this.scoreWrapper) {
        this.scoreWrapper.innerHTML = this.options.score_label + this.score;
    }
};
whacAMole.prototype.play = function() {
    var self = this;
    this.score = 0;
    this.wait = this.options.wfaclick_delay;
    this.nextwait = this.wait;
    //Update UI and add attach event to the stage
    this.updateScore();
    this.container.onmousedown = function(ev) {
        self.waitAclick = window.clearTimeout(self.waitAclick);
        ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target && target.className == 'active') {
            self.score++;
            self.updateScore();
            target.className = '';
        }
        window.setTimeout(function() {
            self.refresh();
        }, Math.random() * 500);
    };
    this.refresh();
};
whacAMole.prototype.stop = function() {
    //reset timeouts
    this.running = window.clearInterval(this.running);
    this.running = null;
    this.waitAclick = window.clearTimeout(this.waitAclick);
    this.waitAclick = null;
    //reset click wait and update the UI
    this.refresh();
    if (this.clockWrapper) {
        this.clockWrapper.innerHTML = this.options.time_remain_label + this.options.duration + ' s';
    }
    //Remove events
    this.container.onmousedown = null;
};
whacAMole.prototype.refresh = function() {
    var i;
    var self = this;
    this.randomize();
    this.waitAclick = window.clearTimeout(this.waitAclick);
    this.wait = this.nextwait;
    for (i = 0; i < this.total; i++) {
        this.elements[i].className = (this.active == i) ? 'active' : '';
    }
    if (this.active !== -1) {
        this.waitAclick = window.setTimeout(function() {
            self.refresh();
        }, this.wait);
    }
};
whacAMole.prototype.randomize = function() {
    if (!this.running) {
        this.active = -1;
        return;
    }
    var i = Math.floor((Math.random() * this.total));
    if (i == this.active) {
        this.randomize();
    } else {
        this.active = i;
    }
};

whacAMole.prototype.draw = function(max, pointer) {
    var active, next, dir, prop, dim;
    var c = 0;
    active = (pointer.dir % 2 === 0) ? 'cols' : 'rows';
    next = (pointer.dir % 2 > 0) ? 'cols' : 'rows';
    dir = (pointer.dir < 2) ? 1 : -1;
    prop = (pointer.dir % 2 > 0) ? 'y' : 'x';
    dim = (prop == 'x') ? pointer.width + (2 * pointer.padding) : pointer.height + (2 * pointer.padding);
    while (c < max && pointer.count < pointer.total) {
        pointer[prop] += (dir * dim);
        pointer.delay = pointer.count * pointer.delay_step;
        this.addElement('', pointer);
        pointer.count++;
        c++;
    }
    if (pointer.count < pointer.total) {
        pointer[active] = pointer[active] - 1;
        pointer.dir = (pointer.dir + 1 < 4) ? pointer.dir + 1 : 0;
        this.draw(pointer[next], pointer);
    }
    return this;
};
whacAMole.prototype.addElement = function(content, pos) {
    var scope = this;
    var id = pos.count;
    var eStyle = {
        'position': 'absolute',
        'left': pos.x + 'px',
        'top': pos.y + 'px',
        'height': pos.height + 'px',
        'width': pos.width + 'px',
        'background-color': pos.color,
        'color': '#fff',
        'vertical-align': 'middle',
        'text-align': 'center',
        'line-height': pos.height + 'px',
        'margin': pos.padding + 'px'
    };
    window.setTimeout(function() {
        var e = document.createElement('div');
        e.id = id;
        e.innerHTML = content;
        scope.setElementStyle(e, eStyle);
        scope.container.appendChild(e);
        scope.elements[id] = e;
        if (id == scope.total - 1) {
            scope.startUI();
        }
    }, pos.delay);
};

whacAMole.prototype.setElementStyle = function(e, s) {
    if (!e || !s) {
        return;
    }
    var r = /(-)(\w)/i;
    var prop, p, m = null;
    for (p in s) {
        prop = p;
        m = r.exec(p);
        prop = (m) ? p.replace(r, m[2].toUpperCase()) : p;
        e.style[prop] = s[p];
    }
};
