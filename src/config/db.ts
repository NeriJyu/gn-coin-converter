import sqLite3 from "sqlite3";

export const openConnection = () => {
  let db = new sqLite3.Database(process.env.DATABASE_FILE || "./tmp.db");

  return db;
};

export const dbQueryFirst = async (query: string, params?: any[]) => {
  const first: any = await dbQuery(query, params);

  return first[0];
};

export const dbQuery = (query: string, params?: any[]) => {
  let db = openConnection();

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  }).finally(() => {
    db.close();
  });
};
