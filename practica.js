import readline from 'readline'

const students = [{
    age: 22,
    examScores: [],
    gender: 'male',
    name: 'edu'
  },
  {
    age: 29,
    examScores: [],
    gender: 'female',
    name: 'silvia'
  }]

const availableMaleNames = ['pepe', 'juan', 'victor', 'Leo', 'francisco', 'carlos'];
const availableFemaleNames = ['cecilia', 'ana', 'luisa', 'silvia', 'isabel', 'virginia'];
const availableGenders = ['male', 'female'];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });  

function getUserChoice() {
    return new Promise((resolve, reject) => {
      rl.question('Choose option from 1 to 18: \n 1 - show the students in the form of table \n 2 - show the number of students \n 3 - show names of all thestudents \n 4 - remove the last student \n 5 - remove random student \n 6 - show all the details of female students \n 7 - show the number of male and female students \n 8 - shows true if all the students are female \n 9 - show the students from age range 20-25 \n 10 - add a new, random student to the list \n 11 - show the youngest person \n 12 - show average age of all the students \n 13 - show the average age of all female students \n 14 - add random notes to exam score of each student \n 15 - sort the list in alfabetical order (per name )' , function(choice) {
        rl.pause();
        const parsedNumber = parseInt(choice)
        resolve(parsedNumber);
      })
    });
  }


async function studentManagement() {
    let userChoice; 
  
    do {
  
      try {
        userChoice = await getUserChoice();
      } catch (error) {
        console.log(error);
        process.exit(0);
      }
      
      switch (userChoice) {
          case 1:
            console.table(students);
          break;
          
          case 2: 
            console.log(students.length)
          break;
  
          case 3: 
            students.forEach(element => {console.log(element.name)
            });
          break;
  
          case 4: 
            students.pop()
          break;
          
          case 5:
            console.log(students)  
            function calculateRandomNumber(min, max) {
              const randomNumber = Math.floor(Math.random() * (max - min)) + min;
              return randomNumber;
            }
          
            const randomIndex = calculateRandomNumber(0, students.length)
          
            students.splice(randomIndex, 1)

            console.log(students)
          break;
               
          case 6: 
            const females = students.filter(person => person.gender === "female")
            console.log(females)
          break;
          
          case 7:
            const femaleStudents = students.filter(person => person.gender === "female")
            const maleStudents = students.filter(person => person.gender === "male")
            console.log('The number of female students: ', femaleStudents.length)
            console.log('The number of male students: ', maleStudents.length)
          break;

          case 8:
            let allFemale = students.every(isFemale); 
            console.log(allFemale)

            function isFemale(person) {
              return person.gender === "female";
            }

          break;


          case 9:
            const youngStudents = students.filter(student => student.age >= 20 && student.age <= 25)

            function youngStudentsNames(youngStudents) {
              youngStudents.forEach(person => console.log(person.name))
              };
            
            youngStudentsNames(youngStudents)
          
          break;


          case 10:

          const randomAge = calculateRandomAge(20,50)
          function calculateRandomAge(min, max) {
                const randomNumber = Math.floor(Math.random() * (max - min)) + min;
                return randomNumber;
              }
            
          function calculateRandomGender(min, max) {
                const randomGenderIndex = Math.floor(Math.random() * (max - min)) + min;
                //return randomGenderIndex;
                let randomGenderName
                if (randomGenderIndex === 1){
                    randomGenderName = "female"
                } else {
                    randomGenderName = "male"
                }
                return randomGenderName
              }
            
            
          const randomGender = calculateRandomGender(0,2);
            
          function getRandomName(randomGender) {
                let assignedName 
                if (randomGender === 'male') {
                    const randomMaleName = Math.floor(Math.random() * availableMaleNames.length);
                    assignedName = availableMaleNames[randomMaleName]
                } else {
                    const randomFemaleName = Math.floor(Math.random() * availableFemaleNames.length);
                    assignedName = availableFemaleNames[randomFemaleName]
                }
                return assignedName
            }
            
          const randomName = getRandomName(randomGender)
            
            
            
            
            
          let newStudent = {
                age: randomAge,
            
                examScores: [],
            
                gender: randomGender,
            
                name: randomName,
            }

          console.log("Random student details:", newStudent)

          students.push(newStudent);


          break;

          case 11:

          const youngestIndex = findYoungestAge(students)

          function findYoungestAge(students) {
                const agesList = []
                students.forEach(student => {
                    agesList.push(student.age)
                });
                const youngestAge = Math.min(...agesList);
            
                const isYoungest = (age) => age === youngestAge;
                const youngestIndex = agesList.findIndex(isYoungest)
                return youngestAge, youngestIndex
            }
            
          const youngestName = findYoungestName(students, youngestIndex)
            
          function findYoungestName(students, youngestIndex) {
                return students[youngestIndex].name
            }
            
          console.log("The youngest person is", youngestName)
            

          break;

          case 12:

          const averageAge = getAverageAge(students)

          function getAverageAge(students) {
                const agesList = []
                students.forEach(student => {
                    agesList.push(student.age)
                });
                console.log(agesList)
                let totalAge = agesList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                let averageStudentsAge = totalAge / (agesList.length)
                return console.log("The avarage age of students is: ", averageStudentsAge)
            }
            
          break;

          case 13:

          const allFemaleStudents = students.filter(person => person.gender === "female")
            
          function getAverageFemaleAge(allFemaleStudents) {
                const agesList = []
                allFemaleStudents.forEach(student => {
                    agesList.push(student.age)
                });
                //console.log(agesList)
                let totalAge = agesList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                let averageStudentsAge = totalAge / (agesList.length)
                return console.log("The avarage age of female students is: ", averageStudentsAge)
            }
            
          getAverageFemaleAge(allFemaleStudents)

          break;

          case 14:
          
          function getRandomNote(min, max) {
            const randomNumber = Math.floor(Math.random() * (max - min)) + min;
            return randomNumber;
            }
          
          function assignNoteToAllStudents(students) {
              students.forEach(student => student.examScores.push(getRandomNote(0,11)))
              return console.log("This is the result after assinging the note: ", students)
          }
          
          assignNoteToAllStudents(students)

          break;

          case 15:

          const sortedArray = sortArray(students)

          function sortArray(students) {
                students.sort((a, b) => {
                    const nameA = a.name.toUpperCase(); 
                    const nameB = b.name.toUpperCase(); 
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  });
            
                console.log("Sorted array looks like this: ", students)
            }

          break


          default: 
          console.log("You have closed the application")
          rl.close 
  
          }
  
      } while ((userChoice >= 1) && (userChoice <= 18)); 
  }
  
studentManagement()




