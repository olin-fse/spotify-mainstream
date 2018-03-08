CREATE USER 'test'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* to 'spotify'@'localhost';

CREATE DATABASE IF NOT EXISTS `spotifymainstream` DEFAULT CHARACTER SET utf8;
USE `spotifymainstream`;

CREATE TABLE `users` (
  `username` varchar(50) DEFAULT '',
  `display_name` varchar(50) DEFAULT '',
  `access_token` varchar(300) DEFAULT '',
  `refresh_token` varchar(300) DEFAULT '',
  `fav_artist_id` varchar(50) DEFAULT '',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
