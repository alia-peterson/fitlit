class UserRepository {
  constructor( data = [] ) {
  	this.users = data
  }

  returnUserData( userID ) {
  	const userData = this.users.find( user => user.id === userID )
  	return userData
  }

  calculateAverageStepGoal() {
  	this.users.reduce( steps, user => {
      (steps + user.dailyStepGoal) / this.users.length
      return steps
    })
  }
}


module.exports = UserRepository
