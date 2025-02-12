const firstNames = [
    'Tom', 'Thomas', 'Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Hannah', 'Isla', 'Jack',
    'Kevin', 'Laura', 'Michael', 'Nina', 'Oliver', 'Patricia', 'Quincy', 'Rachel', 'Samuel', 'Tina',
    'Uma', 'Victor', 'Wendy', 'Xavier', 'Yvonne', 'Zachary', 'Amelia', 'Benjamin', 'Catherine', 'David',
    'Eleanor', 'Frank', 'Grace', 'Harry', 'Ivy', 'Jacob', 'Karen', 'Liam', 'Megan', 'Noah',
    'Aisha', 'Arjun', 'Bao', 'Carlos', 'Chloe', 'Deepak', 'Esmé', 'Fatima', 'Hiroshi', 'Imani',
    'Jamal', 'Kai', 'Lina', 'Mei', 'Nia', 'Omar', 'Priya', 'Ravi', 'Sofia', 'Zara', 'YesTonyExists', 'AndTony'

]
const lastNames = [
    'Smith', 'Brown', 'Johnson', 'Evans', 'Wilson', 'Thompson', 'Taylor', 'Anderson', 'Clark', 'Wright',
    'Martin', 'Walker', 'White', 'Hill', 'Adams', 'Harris', 'Scott', 'Moore', 'Green', 'Hall',
    'Allen', 'Young', 'King', 'Baker', 'Parker', 'Phillips', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
    'Turner', 'Morris', 'Murphy', 'Cook', 'Rogers', 'Reed', 'Kelly', 'Cooper', 'Morgan', 'Bailey',
    'Ahmed', 'Chen', 'Diaz', 'Garcia', 'Hassan', 'Huang', 'Ibrahim', 'Kim', 'Kumar', 'Lee', 'Lopez', 'Nguyen',
    'Okafor', 'Patel', 'Ramirez', 'Rodriguez', 'Singh', 'Tanaka', 'Yusuf', 'Zhang'
]
const cities = ['London', 'Cambridge', 'Oxford', 'Manchester', 'Bristol']

export type User = {
    id: number,
    firstName: string
    fullName: string
    city: string
}

export const getRandomUser = (i: number): User => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const fullName = `${firstName} ${lastName}`
    return {
        firstName,
        fullName,
        id: i + 1,
        city: cities[Math.floor(Math.random() * cities.length)]
    }
}