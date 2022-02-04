require('../services/database')

const Hello = mongoose.model('Hello', { 
    text: String 
});

module.exports = Hello;