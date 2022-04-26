const person = {
    name:'abc',
    age:'20',
    bod:'asdasd'
}

const [nameas,...rest] = [person.name];
console.log(nameas);
console.log(rest);