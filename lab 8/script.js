console.log("LEC_ARRAYS, task 3");

function arrayDifference(arr1, arr2) {

    let result = arr1.slice();

    for (let i = 0; i < arr2.length; i++) {
        let currentItem = arr2[i];

        let index = result.indexOf(currentItem);

        if (index !== -1) {
            result.splice(index, 1);
        }
    }

    return result;
}

let a1 = [1, 2, 2, 3];
let b1 = [2];
console.log("Різниця [1, 2, 2, 3] - [2]:", arrayDifference(a1, b1)); 

let a2 = [1, 2, 2, 3];
let b2 = [2, 2];
console.log("Різниця [1, 2, 2, 3] - [2, 2]:", arrayDifference(a2, b2));

let a3 = [1, 2, 3];
let b3 = [4, 5, 6];
console.log("Різниця [1, 2, 3] - [4, 5, 6]:", arrayDifference(a3, b3));
