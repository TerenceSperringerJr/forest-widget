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
	
	function Node(label, id, parent, dataInstance) {
		var thisNode = this,
			input,
			span,
			i;
		
		this.data = {
			id: -1,
			label: label,
			parent: null,
			userSelected: false,
			includeAncestors: false,
			includeDescendants: false
		};
		
		if(id) {
			this.data.id = id;
		}
		
		if(parent) {
			this.data.parent = parent;
		}
		
		this.children = [];
		
		this.element = document.createElement("div");
		this.element.className = "node";
		
		input = document.createElement("input");
		input.id = "node-" + this.data.id;
		input.type = "checkbox";
		input.onchange = function() {
			thisNode.data.userSelected = this.checked;
			thisNode.data.includeAncestors = dataInstance.includeAncestors;
			thisNode.data.includeDescendants = dataInstance.includeDescendants;
			
			if(thisNode.data.userSelected) {
				for(i = 0; i < dataInstance.userSelectedNodes.length; i++) {
					if(dataInstance.userSelectedNodes[i] === thisNode.data) {
						return;
					}
				}
				
				dataInstance.userSelectedNodes.push(thisNode.data);
			}
			else {
				thisNode.data.includeAncestors = dataInstance.includeAncestors;
				thisNode.data.includeDescendants = dataInstance.includeDescendants;
				
				for(i = 0; i < dataInstance.userSelectedNodes.length; i++) {
					if(dataInstance.userSelectedNodes[i] === thisNode.data) {
						dataInstance.userSelectedNodes.splice(i, 1);
						break;
					}
				}
			}
			
			return;
		}
		
		span = document.createElement("span");
		span.innerHTML = this.data.label;
		
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
				dataInstance = {
					userSelectedNodes: [],
					includeAncestors: false,
					includeDescendants: false
				};
			
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
						dataInstance.includeAncestors = input.checked;
						
						return;
					};
				}
				else {
					input.onchange = function() {
						dataInstance.includeDescendants = input.checked;
						
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
					return new Node(node.label, node.id, node.parent, dataInstance);
				}
				
				return new Node(node, null, null, dataInstance);
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
				return {"includeAncestors": dataInstance.includeAncestors, "includeDescendants": dataInstance.includeDescendants};
			}
			
			thisForestWidget.getUserSelectedNodes = function() {
				return dataInstance.userSelectedNodes;
			}
			
			return;
		})();
		
		return;
	}
	
	return new ForestWidgetCreator();
})();
