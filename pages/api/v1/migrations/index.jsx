import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

const migrationConf = {
      databaseUrl: process.env.DATABASE_URL,
      schema: process.env.SCHEMA,
      dryRun: true, // Aplica as migrações (remova ou mantenha true para simulação)
      dir: join("infra", "database", "migrations"),
      direction: "up",
      verbose: true,      
      migrationsTable: "pgmigrations",
    };

export default async function migrations(request, response) {
  try {   
    
    //aqui vamos organizar agora para quando for GET faça o dryRun como true para simulação e POST para real
    if(request.method === "GET"){

      const migrations = await migrationRunner(migrationConf);
      console.log(migrations);
      return response.status(200).json(migrations);

    }

    if(request.method === "POST"){
       const migrations = await migrationRunner(
        ...migrationConf,
        dryRun:false,
       );

    return response.status(200).json(migrations);
    }
    
    return response.status(405);

  } catch (error) {
    console.error("Erro ao executar migrações:", error);
    return response.status(500).json({
      error: "Falha ao executar migrações",
      details: error.message,
    });
  }
}