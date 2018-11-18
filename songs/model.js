const Sequelize = require('sequelize')
const sequelize = require('../db')

const Song = sequelize.define('songs', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'song_title'
    },

    artist: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'artist_name',
      },

      album: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'album_name',
      },
      playlistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'playlist_id'
      }
    }, {
        tableName: 'songs',
        timestamps: false
        
      })

      module.exports = Song

