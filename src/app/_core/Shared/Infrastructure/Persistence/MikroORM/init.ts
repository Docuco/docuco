import { MikroORM } from "@mikro-orm/postgresql";
import config from "./mikro-orm.config"

let orm: MikroORM | null = null;

export async function initMikroORM(): Promise<MikroORM> {
    if (!orm) {
        orm = await MikroORM.init(config) as MikroORM;
    }

    await orm.connect()
    
    return orm
}
