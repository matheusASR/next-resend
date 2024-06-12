import { AppDataSource } from "../data-source";
import { Email } from "../entities";

export default AppDataSource.getRepository(Email);