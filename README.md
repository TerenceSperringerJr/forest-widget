# forest-widget #
Javascript-based HTML widget that provides interface for displaying and selecting nodes of forests

1. Include forest-widget.js
2. Use FOREST_WIDGET_CREATOR.create() to instantiate a new Forest Widget
3. A. Use the new Forest Widget object to call addNode({id, label, parent})
   B. 1. Use the new Forest Widget to generate a new node with createNode(label)
      2. Modify the node object
      3. Use the Forest Widget object to add the node by calling addNodeByReference(parent, node)

A live example can be viewed via the following GitHub Page:

https://terencesperringerjr.github.io/forest-widget/example.html
