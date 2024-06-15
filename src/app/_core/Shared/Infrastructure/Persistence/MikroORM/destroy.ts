import { initMikroORM } from "./init";

export async function closeDBSession() {
    const orm = await initMikroORM();
    await orm.close();
}
