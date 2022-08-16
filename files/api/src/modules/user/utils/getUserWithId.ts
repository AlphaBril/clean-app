import { Session } from 'neo4j-driver';

export const getUserWithId = async (session: Session, id: number) => {
    const result = await session.run(
        "MATCH (n: `user`) " +
        "WHERE Id(n) = $id " + 
        "RETURN n", { id: id });
    return result.records.map((p: any) => p.get(0));
};