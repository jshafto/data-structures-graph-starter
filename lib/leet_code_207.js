// View the full problem and run the test cases at:
//  https://leetcode.com/problems/course-schedule/

// There are a total of numCourses courses you have to take,
// labeled from 0 to numCourses-1.

// Some courses may have prerequisites, for example
// to take course 0 you have to first take course 1,
// which is expressed as a pair: [0,1]

// Given the total number of courses and a list of
// prerequisite pairs, is it possible for you to finish all courses?



// Example 1:

// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take.
//              To take course 1 you should have finished course 0.
//              So it is possible.
// Example 2:

// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take.
//              To take course 1 you should have finished course
//              0, and to take course 0 you should
//              also have finished course 1. So it is impossible.


// Constraints:

// The input prerequisites is a graph represented by a list of edges,
// not adjacency matrices. Read more about how a graph is represented.
// You may assume that there are no duplicate edges in the input prerequisites.
// 1 <= numCourses <= 10^5


// if a course has no prereqs, it is finishable
// if all of a course's prereqs are finishable, it is finishable

function isFinishable(course, courses, visited = new Set()) {
    if (courses[course].length===0) return true;
    if (visited.has(Number(course))) return false;
    visited.add(Number(course));
    prereqs = courses[course];
    // console.log(prereqs)
    return prereqs.reduce((acc, el) => {
        let newVisited = new Set(visited)
        return acc && isFinishable(el, courses, newVisited);
    }, true)
}

function canFinish(numCourses, prerequisites) {
    if (numCourses===0) return true;
    let courses = {};
    for (let i = 0; i < numCourses; i ++) {
        courses[i] = [];
    }
    prerequisites.forEach( pair => {
        courses[pair[0]].push(pair[1])
    })
    //console.log(courses)
    for (let course in courses) {
        let bool = isFinishable(course, courses);
        if (!bool) return false;
    }
    return true;
}

// iterative strategy: delete all courses with no prereqs
// remove all the deleted courses from the prereqs of the remaining courses
// if you ever find yourself with no empty courses you have a cycle and can return false
// when the graph is empty, return true
function canFinishIter(numCourses, prerequisites) {
    if (numCourses===0) return true;
    let courses = {};
    for (let i = 0; i < numCourses; i ++) {
        courses[i] = [];
    }
    prerequisites.forEach( pair => {
        courses[pair[0]].push(pair[1])
    })

    // while there are any courses in the graph
    while (Object.keys(courses).length > 0) {
        // remove all empty courses and make list of them
        let empties = [];
        for (let course in courses) {
            if (courses[course].length === 0) {
                empties.push(course);
                delete courses[course];
            }
        }
        // if you didn't find any new empties, then you have stopped making progress
        // that means there is a cycle, so you can't finish
        if (empties.length=== 0) return false;

        // otherwise, delete all of the courses that were finishable from all the other lists
        for (let course in courses) {
            empties.forEach(empty => {
                let ind = courses[course].indexOf(Number(empty));
                if (ind > -1) courses[course].splice(ind, 1)
            })
        }
    }
    // if you exit the while loop, your courses were finishable
    return true;
}
// canFinishIter(8, [[1,0],[2,6],[1,7],[6,4],[7,0],[0,5]])
