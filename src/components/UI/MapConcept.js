//without map

let numbers = [1, 2, 3, 4, 5];
let doubledNumbers = [];

for (let i = 0; i < numbers.length; i++) {
    doubledNumbers.push(numbers[i] * 2);
}

console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10]


//with map
let numbers2 = [1, 2, 3, 4, 5];

let doubledNumbers2 = numbers.map((curData) => {
    return curData * 2;
});

console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10]



let names = ["Alice", "Bob", "Charlie"];

let greetings = names.map((name) => {
    return "Hello, " + name + "!";
});

console.log(greetings);
// Output: ["Hello, Alice!", "Hello, Bob!", "Hello, Charlie!"]




let users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

let userDescriptions = users.map((user) => {
    return `${user.name} is ${user.age} years old.`;
});

console.log(userDescriptions);
// Output: ["Alice is 25 years old.", "Bob is 30 years old.", "Charlie is 35 years old."]






/*
const usersNew = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

const UserList = () => {
    return (
        <div>
            {usersNew.map((user, index) => (
                <div key={index}>
                    <h2>{user.name}</h2>
                    <p>Age: {user.age}</p>
                </div>
            ))}
        </div>
    );
};

export default UserList;
*/



/*
What happened here?
.map() loops through the users array.
It returns JSX dynamically for each user.
Each <div> gets unique data from users.
*/



