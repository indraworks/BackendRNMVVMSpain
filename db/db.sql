-- ini hanya utk catatan/backup karena kita createnya pakai sql di 
-- sqlnya mySQL atau mySQL workbench 


USE udemy_delivery;

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(180) NOT NULL UNIQUE,
    name VARCHAR(90) NOT NULL,
    lastname VARCHAR(90) NOT NULL,
    phone VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(225) NULL,
    password VARCHAR(90) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    update_at  TIMESTAMP(0) NOT NULL
)

