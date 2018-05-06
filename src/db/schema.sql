DROP DATABASE IF EXISTS basketball_league;
CREATE DATABASE basketball_league;
/*--Declare database to use*/
USE basketball_league;

/* CREATE DATA TABLE */
DROP TABLE IF EXISTS `seasons`;
CREATE TABLE `seasons` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `monthYearStartDate` VARCHAR(7) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `divisions`;
CREATE TABLE `divisions` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255),
  `idSeason` INTEGER NOT NULL,
  CONSTRAINT `divisions_seasons`
    FOREIGN KEY (`idSeason`)
    REFERENCES `seasons`(`id`)
    ON DELETE CASCADE,
  PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `totalWins` INTEGER NOT NULL,
  `totalLosses` INTEGER NOT NULL,
  `idDivision` INTEGER NOT NULL,
  CONSTRAINT `divisions_teams`
    FOREIGN KEY (`idDivision`)
    REFERENCES `divisions`(`id`)
    ON DELETE CASCADE,
  PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `games`;
CREATE TABLE `games` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `dateTime` DATE NOT NULL,
  `homeFinalScore` INTEGER NOT NULL,
  `awayFinalScore` INTEGER NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `idDivision` INTEGER NOT NULL,
  `idHomeTeam` INTEGER NOT NULL,
  `idAwayTeam` INTEGER NOT NULL,
  CONSTRAINT `divisions_games`
    FOREIGN KEY (`idDivision`)
    REFERENCES `divisions`(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `games_homeTeam`
    FOREIGN KEY (`idHomeTeam`)
    REFERENCES `teams`(`id`)
    ON DELETE CASCADE,
  CONSTRAINT `games_awayTeam`
    FOREIGN KEY (`idAwayTeam`)
    REFERENCES `teams`(`id`)
    ON DELETE CASCADE,
  PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `players`;
CREATE TABLE `players` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `number` INTEGER,
  `position` VARCHAR(3),
  `height` INTEGER,
  `twoPointMade` INTEGER,
  `twoPointAttempted` INTEGER,
  `threePointMade` INTEGER,
  `threePointAttempted` INTEGER,
  `freeThrowMade` INTEGER,
  `freeThrowAttempted` INTEGER,
  `rebounds` INTEGER,
  `steals` INTEGER,
  `blocks` INTEGER,
  `assists` INTEGER,
  `gamesPlayed` INTEGER,
  `turnovers` INTEGER,
  `idTeam` INTEGER NOT NULL,
  CONSTRAINT `player_team`
    FOREIGN KEY (`idTeam`)
    REFERENCES `teams`(`id`)
    ON DELETE CASCADE,
  PRIMARY KEY (`id`)
);

/*
INSERT DUMMY VALUES
*/
INSERT INTO seasons (monthYearStartDate) VALUES ('01/2017');
INSERT INTO seasons (monthYearStartDate) VALUES ('04/2017');
INSERT INTO divisions (name, description, idSeason)
  VALUES ('Division 1', 'Top division', 1);
INSERT INTO divisions (name, description, idSeason)
  VALUES ('Division 2', 'Second-tier division', 1);
INSERT INTO divisions (name, description, idSeason)
  VALUES ('Division 3', 'Casual division', 1);
INSERT INTO teams (name, totalWins, totalLosses, idDivision)
  VALUES ('Ballers1', 0, 0, 1);
INSERT INTO teams (name, totalWins, totalLosses, idDivision)
  VALUES ('Ballers2', 0, 0, 1);
INSERT INTO teams (name, totalWins, totalLosses, idDivision)
  VALUES ('Ballers3', 0, 0, 1);
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
