DROP TABLE IF EXISTS message;

CREATE TABLE message(
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
job_id int NOT NULL,
alias VARCHAR(64) NOT NULL,
content VARCHAR(64) NOT NULL,
dateTime DATETIME NOT NULL,
ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS job;

CREATE TABLE job(
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(64) NOT NULL,
content VARCHAR(512) NOT NULL,
imageUrl VARCHAR(256),
category VARCHAR (64),
alias VARCHAR (64),
dateTime DATETIME NOT NULL,
importance int(2) NOT NULL
)
ENGINE=InnoDB DEFAULT CHARSET=latin1;

