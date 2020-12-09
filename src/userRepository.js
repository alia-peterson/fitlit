class UserRepository {
  constructor( data = [] ) {
  	this.users = data
    this.currentUser = ''
  }

  returnUserData( userID ) {
  	const userData = this.users.find( user => user.id === userID )
  	return userData
  }

  calculateAverageStepGoal() {
  	return this.users.reduce( (steps, user) => {
      return steps += user.dailyStepGoal / this.users.length
    }, 0)
  }

  populateHydrationData( hydrationInput = hydrationData ) {
    this.users.forEach(user => {
      hydrationInput.filter(entry => {
        if (entry.userID === user.id) {
          user.hydrationEntry.push(entry)
        }
      })

    })
  }
}



if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
