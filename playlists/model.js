const Sequelize = require('sequelize')
const sequelize = require('../db')
const Song = require('../songs/model')
const User = require('../users/model')

const Playlist = sequelize.define('playlists', {
    name: {
        type: Sequelize.STRING,
    allowNull: false,
    field: 'playlist_name'
},
userId: {
  type: Sequelize.INTEGER,
  allowNull: false,
  field: 'user_id'
}
},
{
    tableName: 'playlists',
  timestamps: false
  
})

Playlist.belongsTo(User)
Playlist.hasMany(Song)

module.exports = Playlist