function maxValue(node, visited=new Set(), max = null) {
    if (visited.has(node.val)) return max;
    if (node.val > max) max = node.val;
    visited.add(node.val);
    node.neighbors.forEach( el => {
        nodeMax = maxValue(el, visited, max);
        if (nodeMax > max) max = nodeMax;
    });
    return max;
}

module.exports = {
    maxValue
};
