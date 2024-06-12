import { AppDataSource } from "../data-source.ts";
import { Email } from "../entities/index.ts";

export default AppDataSource.getRepository(Email);