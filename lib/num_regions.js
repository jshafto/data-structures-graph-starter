function _regionsFromStart(node, graph, visited) {
    if (visited.has(node)) return;
    visited.add(node);
    graph[node].forEach( el => _regionsFromStart(el, graph, visited));
}

function numRegions(graph) {
    let visited = new Set();
    let regions = 0;

    for (let node in graph) {
        if (visited.has(node)) continue;
        regions ++;
        _regionsFromStart(node, graph, visited)
    }
    return regions;
}


module.exports = {
    numRegions
};
