const { Client } = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
username VARCHAR(225),
password VARCHAR(225)
);

INSERT INTO users(username,password) VALUES('pdz' , 'pdz1234'),
('crimson' , 'crimson1234');

CREATE TABLE IF NOT EXISTS messages(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user_id INTEGER REFERENCES users(id),
message TEXT
);

INSERT INTO messages(user_id , message) VALUES( 1 , 'YOO WASSUP TIHS IS A MESSAGE BY PDZ'),
(1 , 'THIS IS ANOTHER MESSAGE BY PDZ'), (2,'THIS IS A MESSAGE BY CRIMSON');`

async function main(){
    console.log("seeding...")
    const client = new Client ({
        connectionString: "postgresql://pdzdatabase_user:qmIRu6Zi1egqEqa1kohdc3HVQb3RUugx@dpg-d1tnokruibrs73fms3a0-a/pdzdatabase"
    })
    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log("done");
}

main()