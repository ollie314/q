
module.exports = iterate;
function iterate(iterable) {
    if (!iterable) {
        return new ArrayIterator([]);
    } else if (Array.isArray(iterable)) {
        return new ArrayIterator(iterable);
    } else if (typeof iterable.next === "function") {
        return iterable;
    } else if (typeof iterable.iterate === "function") {
        return iterable.iterate();
    } else {
        throw new TypeError("Can't iterate " + iterable);
    }
}

function ArrayIterator(array) {
    this.array = array;
    this.index = 0;
}

ArrayIterator.prototype.next = function () {
    var iteration;
    if (this.index < this.array.length) {
        iteration = new Iteration(this.array[this.index++], false);
    } else {
        iteration =  new Iteration(undefined, true);
    }
    return iteration;
};

function Iteration(value, done) {
    this.value = value;
    this.done = done;
}

