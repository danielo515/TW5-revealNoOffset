/*\
title: $:/danielo515/modules/widgets/revealNoOffset.js
type: application/javascript
module-type: widget

Reveal widget without left offset 

\*/

(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var reveal = require("$:/core/modules/widgets/reveal.js").reveal;


var RevealNoOffset = function(parseTreeNode,options) {
    this.initialise(parseTreeNode,options);
};


RevealNoOffset .prototype = new reveal();
RevealNoOffset .prototype.parentexecute = RevealNoOffset.prototype.execute;

RevealNoOffset.prototype.execute = function (){
this.parentexecute();
this.noOffset =  this.getAttribute("offset","left");
};

RevealNoOffset .prototype.readPopupState = function(state) {
    var popupLocationRegExp = /^\((-?[0-9\.E]+),(-?[0-9\.E]+),(-?[0-9\.E]+),(-?[0-9\.E]+)\)$/,
        match = popupLocationRegExp.exec(state);
    // Check if the state matches the location regexp
    if(match) {
        // If so, we're open
        this.isOpen = true;
        // Get the location
        this.popup = {
            left: this.noOffset === "left" ? 0 : parseFloat(match[1]) ,
            top: this.noOffset === "top" ? 0 : parseFloat(match[2]),
            width: parseFloat(match[3]),
            height: parseFloat(match[4])
        };
    } else {
        // If not, we're closed
        this.isOpen = false;
    }
};

exports["reveal-no-offset"] = RevealNoOffset ;

})();