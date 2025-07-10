export interface JWTUser {
  id: string;
  name: string;
}
export interface GraphqlContext {
  user?: JWTUser;
}
