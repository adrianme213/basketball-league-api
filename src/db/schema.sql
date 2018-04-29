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

DROP TABLE IF EXISTS `gamesss`;
CREATE TABLE `gamesss` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `time` VARCHAR(100) NOT NULL,
  `awayTeam` VARCHAR(255),
  `homeTeam` VARCHAR(255),
  `location` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);
/*
INSERT THREE DUMMY VALUES
*/
INSERT INTO gamesss (id, date, time, awayTeam, homeTeam, location)
VALUES (1, '20180403', '1030 pm', 'San Antonio Spurs', 'Los Angeles Clippers',
'Staples Center, Los Angeles, CA');

INSERT INTO gamesss (id, date, time, awayTeam, homeTeam, location)
VALUES (2, '20180403', '700 pm', 'Washington Wizards', 'Houston Rockets',
'Toyota Center, Houston, TX');

INSERT INTO gamesss (id, date, time, awayTeam, homeTeam, location)
VALUES (3, '20180403', '800 pm', 'Boston Celtics', 'Milwaukee Bucks',
'BMO Bradley Center, Milwaukee, WI');

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
