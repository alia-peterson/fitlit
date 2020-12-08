class UserRepository {
  constructor( data = [] ) {
  	this.users = data
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
}


if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}
