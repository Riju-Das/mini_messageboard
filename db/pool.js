const { Pool } = require("pg");

module.exports = new Pool({
    connectionString: "postgresql://pdzdatabase_user:qmIRu6Zi1egqEqa1kohdc3HVQb3RUugx@dpg-d1tnokruibrs73fms3a0-a/pdzdatabase",
    ssl: {
        rejectUnauthorized: false
    }
});