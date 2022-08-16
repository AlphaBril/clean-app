import { Session } from 'neo4j-driver';
import { User } from './user.d';
import { generateParams } from '../../../shared/utils';

export const updateUser = async (session: Session, userData: User, token: string) => {
    const result = await session.run(
        "MATCH (n: `user`) " +
        "WHERE n.Token = $oldToken " +
        "SET " + generateParams(Object.keys(userData), 'n', true) + " " +
        "RETURN n", { oldToken: token, ...userData });
    return result.records.map((p: any) => p.get(0));
};