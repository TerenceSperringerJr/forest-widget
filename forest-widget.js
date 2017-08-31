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
	
	function Node(label, id, parent, userSelectedNodes) {
		var thisNode = this,
			input,
			span;
		
		this.label = label;
		this.id = -1;
		this.parent = null;
		this.userSelected = false;
		
		if(id) {
			this.id = id;
		}
		
		if(parent) {
			this.parent = parent;
		}
		
		this.children = [];
		
		this.element = document.createElement("div");
		this.element.className = "node";
		
		input = document.createElement("input");
		input.id = "node-" + this.id;
		input.type = "checkbox";
		input.onchange = function() {
			thisNode.userSelected = this.checked;
			
			if(thisNode.userSelected) {
				//add to userSelected[]
			}
			else {
				//remove from userSelected[]
			}
			
			return;
		}
		
		span = document.createElement("span");
		span.innerHTML = this.label;
		
		this.element.appendChild(input);
		this.element.appendChild(span);
		
		return;
	}
	
	function ForestWidget(parentElementID) {
		var thisForestWidget = this;
		
		(function() {
			var parentElement = document.getElementById(parentElementID),
				widgetBody = document.createElement("div"),
				forestBody = document.createElement("form"),
				optionsBody = document.createElement("form"),
				forest = [],
				userSelectedNodes = [],
				includeAncestors = false,
				includeDescendants = false;
			
			widgetBody.className = "widget-body";
			forestBody.className = "tree-body";
			optionsBody.className = "options-body";
			
			function createCheckbox(value, label) {
				var div = document.createElement("div"),
					input = document.createElement("input"),
					span;
				
				input.type = "checkbox";
				input.value = value;
				
				if(value === "ancestors") {
					input.onchange = function() {
						includeAncestors = input.checked;
						
						return;
					};
				}
				else {
					input.onchange = function() {
						includeDescendants = input.checked;
						
						return;
					};
				}
				
				div.appendChild(input);
				span = document.createElement("span");
				span.innerHTML = label;
				div.appendChild(span);
				
				return div;
			}
			
			optionsBody.appendChild(createCheckbox("ancestors", "Include ancestors"));
			optionsBody.appendChild(createCheckbox("descendants", "Include descendants"));
			
			widgetBody.appendChild(forestBody);
			widgetBody.appendChild(optionsBody);
			parentElement.appendChild(widgetBody);
			
			thisForestWidget.createNode = function(node) {
				if(node.id) {
					return new Node(node.label, node.id, node.parent, userSelectedNodes);
				}
				
				return new Node(node, null, null, userSelectedNodes);
			}
			
			thisForestWidget.addNodeByReference = function(node, parent) {
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
			
			thisForestWidget.addNode = function(input) {
				var node = thisForestWidget.createNode(input);
				
				if(!node.parent) {
					forest.push(node);
					forestBody.appendChild(node.element);
				}
				else {
					node.parent.children.push(node);
					node.parent.element.appendChild(node.element);
				}
				
				return node;
			}
			
			thisForestWidget.getModes = function() {
				return {"includeAncestors": includeAncestors, "includeDescendants": includeDescendants};
			}
			
			thisForestWidget.getUserSelected = function() {
				//
			}
			
			return;
		})();
		
		return;
	}
	
	return new ForestWidgetCreator();
})();
