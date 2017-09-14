# forest-widget #
Javascript-based HTML widget that provides interface for displaying and selecting nodes of forests

## Instructions ##
1. Include forest-widget.js and forest-widget.css
2. Use FOREST_WIDGET_CREATOR.create() to instantiate a new Forest Widget
3. A. Use the new Forest Widget object to call addNode({id, label, parent})
   
   -or-
   
   B.1 Use the new Forest Widget to generate a new node with createNode(label)
   
   B.2 Modify the node object   
   
   B.3 Use the Forest Widget object to add the node by calling addNodeByReference(parent, node)

## Example ##
A live example can be viewed via the following GitHub Page:

https://terencesperringerjr.github.io/forest-widget/example.html
