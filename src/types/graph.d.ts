export const typeDefs = ["type Query {\n  bye: String!\n  hello: Greeting!\n}\n\ntype Greeting {\n  text: String!\n  error: Boolean!\n}\n"];
/* tslint:disable */

export interface Query {
  bye: string;
  hello: Greeting;
}

export interface Greeting {
  text: string;
  error: boolean;
}
