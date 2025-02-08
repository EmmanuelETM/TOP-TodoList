export default function Find(arr, value) {
    let index = arr.findIndex(project => project.name === value);
    return index !== -1 ? index : "invalid name";
};

