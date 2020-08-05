function breadthFirstSearch(startingNode, targetVal) {
    if (!startingNode) return null;
    let visited = new Set();
    let nodesToVisit = [ startingNode ]
    while (nodesToVisit.length > 0) {
        let node = nodesToVisit.shift();
        if (visited.has(node.val)) continue;
        if (node.val === targetVal) return node;
        visited.add(node.val);
        nodesToVisit.push(...node.neighbors);
    }
    return null;
}

module.exports = {
    breadthFirstSearch
};
