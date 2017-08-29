/*
	Forest Widget
*/

"use strict";

var FOREST_WIDGET_CREATOR =
(function() {
	function ForestWidgetCreator() {
		return;
	}
	
	ForestWidgetCreator.prototype.create = function(parentElementID) {
		if(!parentElementID) {
			console.error("Failed to provide parent element ID to ForestWidgetCreator.create(parentElementID)");
			return null;
		}
		
		return new ForestWidget(parentElementID);
	}
	
	function Node(label) {
		this.parent = null;
		this.children = [];
		this.label = label;
		
		this.element = document.createElement("div");
		this.element.className = "node";
		this.element.innerHTML = "<input type='checkbox'><span>" + this.label + "</span>";
		
		return;
	}
	
	function ForestWidget(parentElementID) {
		var thisForestWidget = this;
		this.mode = "independent";
		
		(function() {
			var parentElement = document.getElementById(parentElementID),
				widgetBody = document.createElement("div"),
				forestBody = document.createElement("form"),
				optionsBody = document.createElement("form"),
				forest = [],
				mode = "independent";
			
			widgetBody.className = "widget-body";
			forestBody.className = "tree-body";
			optionsBody.className = "options-body";
			
			function createRadioButton(value, label, checked) {
				var div = document.createElement("div"),
					input = document.createElement("input"),
					span;
				
				input.type = "radio";
				input.name = "selection-group";
				input.value = value;
				
				input.onchange = function() {
					thisForestWidget.mode = input.value;
					
					return;
				};
				
				if(checked) {
					input.setAttribute("checked", true);
				}
				
				div.appendChild(input);
				span = document.createElement("span");
				span.innerHTML = label;
				div.appendChild(span);
				
				return div;
			}
			
			optionsBody.appendChild(createRadioButton("independent", "Select independently", "checked"));
			optionsBody.appendChild(createRadioButton("ancestors", "Include ancestors"));
			optionsBody.appendChild(createRadioButton("descendants", "Include descendants"));
			optionsBody.appendChild(createRadioButton("both", "Include ancestors & descendants"));
			
			widgetBody.appendChild(forestBody);
			widgetBody.appendChild(optionsBody);
			parentElement.appendChild(widgetBody);
			
			thisForestWidget.createNode = function(label) {
				return new Node(label);
			}
			
			thisForestWidget.addNode = function(node, parent) {
				if(!parent) {
					forest.push(node);
					forestBody.appendChild(node.element);
				}
				else {
					parent.children.push(node);
					parent.element.appendChild(node.element);
				}
				
				return;
			}
			
			return;
		})();
		
		return;
	}
	
	return new ForestWidgetCreator();
})();
