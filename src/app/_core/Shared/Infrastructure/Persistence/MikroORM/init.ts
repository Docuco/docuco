import { MikroORM } from "@mikro-orm/better-sqlite"
import config from "./mikro-orm.config"

export async function initMikroORM() {
    const orm = await MikroORM.init(config);

    return orm
}