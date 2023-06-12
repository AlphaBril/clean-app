import { Session } from "neo4j-driver";

export const getUserWithId = async (session: Session, id: number) => {
  const cypher = `MATCH (n: user) WHERE Id(n) = $id RETURN n`;
  const result = await session.run(cypher, { id });
  return result.records.map((p) => p.get("n"))[0];
};
